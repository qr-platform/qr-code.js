// QR Code Service to handle interactions with the QR-Code.js library
import { QRCodeJs as QRCodeJsLib } from '@qr-platform/qr-code.js' // Renaming to avoid conflict with local variable

// Define the QRCodeJs interface based on the usage in the example
// We'll assume the imported QRCodeJsLib matches this structure for now.
// If not, this interface might need to be updated or removed in favor of types from the library.
interface QRCodeJsStatic {
  setTemplate: (template: string) => typeof QRCodeJsLib
  setStyle: (style: any) => typeof QRCodeJsLib
  setStyleId: (styleId: string | null) => Promise<typeof QRCodeJsLib>
  setTemplateId: (templateId: string | null) => Promise<typeof QRCodeJsLib>
  setBorderId: (borderId: string | null) => Promise<typeof QRCodeJsLib>
  setTextId: (textId: string | null) => Promise<typeof QRCodeJsLib>
  setImage: (imageUrl: string | null) => Promise<typeof QRCodeJsLib>
  token: (token: string) => Promise<void>
  useStyle: (style: any) => typeof QRCodeJsLib
  useTemplate: (template: string) => typeof QRCodeJsLib
  useSettings: (settings: QRCodeSettings) => typeof QRCodeJsLib
  build: () => QRCodeInstance
  new (options: QRCodeOptions): QRCodeInstance // This is the constructor signature
  setOptions: (options: any, overrideOpts?: any) => Promise<typeof QRCodeJsLib>
}

interface QRCodeSettings {
  id?: string
  description?: string
  style?: { primaryColor?: string; secondaryColor?: string }
  template?: string
  data: string
  image?: string
  imageOptions?: {
    imageSize?: number
    margin?: number
    roundedValue?: number
  }
}

interface QRCodeOptions {
  data: string
  image?: string
  imageOptions?: {
    imageSize?: number
    margin?: number
    roundedValue?: number
  }
  shape?: string
  margin?: number
  qrOptions?: {
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    typeNumber?: number
  }
  dotsOptions?: {
    type?: string
    color?: string
    size?: number
  }
  cornersSquareOptions?: {
    type?: string
    color?: string
  }
  cornersDotOptions?: {
    type?: string
    color?: string
  }
  backgroundOptions?: {
    color?: string
    round?: number
  }
}

interface QRCodeInstance {
  append: (element: HTMLElement) => Promise<void>
  validateScanning: (
    validatorId?: string
  ) => Promise<{ isValid: boolean; reason?: string }>
  download: (options: {
    extension: 'svg' | 'png'
    width?: number
    height?: number
  }) => void
  getSettings: () => QRCodeSettings
  getId: () => string
}

// Global declaration is no longer needed as we import the module.
// declare global {
//   interface Window {
//     QRCodeJs?: QRCodeJsStatic
//   }
// }

// Token for authentication
const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXJlY3QtejJ6ZHBoM2NlY3NiejFqNyIsImNsaWVudCI6ImNvZGVwZW4iLCJwbGFuIjoicHJvIiwiZG9tYWlucyI6WyJjb2RlcGVuLmlvIiwiY2Rwbi5pbyJdLCJpYXQiOjE3NDQ2MDg3NTEsImV4cCI6MjYwODUyMjM1MX0.g9dKZGw7Kf4_Y-yJLzePdSoIcPOWDJyAWDtOR7bukjemPPdp5vuevaNdyyoqyPli-kZbEec9tlUferY05FkhTl7myw-bOIjTy7Uj9PjDwkzwI8OXGu7VxwCjo7EHESm6MfQ5vrF_b5bjNtpycBYuD3p2vMwqTsvjSreGjA77B6Lfwhb-4eHpdcIfSOFbtmplim4NPgl4Pz257IJ5qeWhSWErzR2oN9I-NgH4kscyUiL8ATERpry4U8YUDfmljvKg8ElPLr6LmgejlH2GJO9WzqhgEgyf4Yf1OdOg3uIkVBgCrNx4NaxjJCpksw84vgB2Cv792GQdNP_btthFFVeJdQ'

// Class to handle QR code operations
export class QRCodeService {
  private static instance: QRCodeService
  private isInitialized = false
  private currentQRCode: QRCodeInstance | null = null
  private QRCodeJs: QRCodeJsStatic | null = null // Will hold the imported QRCodeJsLib module

  private constructor() {}

  public static getInstance(): QRCodeService {
    if (!QRCodeService.instance) {
      QRCodeService.instance = new QRCodeService()
    }
    return QRCodeService.instance
  }

  public async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true
    }

    try {
      // QRCodeJs is now imported directly
      if (!QRCodeJsLib) {
        throw new Error('QRCodeJs library not loaded via import')
      }

      this.QRCodeJs = QRCodeJsLib as unknown as QRCodeJsStatic // Assign imported module

      // Set authentication token
      try {
        await this.QRCodeJs.token(AUTH_TOKEN)
      } catch (tokenError) {
        console.error('Error setting token:', tokenError)
        throw new Error(
          `Failed to set authentication token: ${tokenError instanceof Error ? tokenError.message : 'Unknown token error'}`
        )
      }

      this.isInitialized = true
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`Failed to initialize QR Code service: ${errorMessage}`, error)
      return false
    }
  }

  // loadQRCodeJsScript is no longer needed.
  // setupMockQRCode is no longer needed as the library is imported.

  public async generateQRCode(
    element: HTMLElement,
    data: string,
    templateId: string | null,
    styleId: string | null,
    imageUrl: string | null,
    textTemplateId: string | null,
    advancedOptions?: any
  ): Promise<boolean> {
    if (!element) {
      console.error('generateQRCode called with a null element.')
      return false
    }

    if (!this.isInitialized) {
      const initialized = await this.initialize()
      if (!initialized) {
        // Create a visual error indicator in the element
        if (element) {
          element.innerHTML = `
            <div class="flex flex-col items-center justify-center w-full h-full text-center p-2 bg-danger-50 text-danger-600 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p class="text-xs mt-2">QR Code service initialization failed</p>
            </div>
          `
        }
        return false
      }
    }

    try {
      if (!this.QRCodeJs) {
        throw new Error('QRCodeJs not initialized in generateQRCode')
      }
      // Clear the element
      if (element) {
        element.innerHTML = ''
      } else {
        // This path should ideally not be reached if the top-level guard is effective
        console.error(
          'Element is null immediately before clearing innerHTML in generateQRCode try block.'
        )
        return false // Prevent further execution if element is unexpectedly null here
      }

      // Apply settings
      if (templateId) {
        await this.QRCodeJs.setTemplateId(templateId)
      }

      if (styleId) {
        await this.QRCodeJs.setStyleId(styleId)
      }

      if (textTemplateId) {
        await this.QRCodeJs.setTextId(textTemplateId)
      }

      await this.QRCodeJs.setImage(imageUrl)

      // Apply advanced options if provided
      if (advancedOptions) {
        const options = {
          shape: advancedOptions.shape?.type,
          margin: advancedOptions.shape?.margin,
          qrOptions: {
            errorCorrectionLevel: advancedOptions.errorCorrection
          },
          dotsOptions: {
            type: advancedOptions.dots?.type,
            color: advancedOptions.dots?.color,
            size: advancedOptions.dots?.size
          },
          cornersSquareOptions: {
            type: advancedOptions.corners?.squareType,
            color: advancedOptions.corners?.squareColor
          },
          cornersDotOptions: {
            type: advancedOptions.corners?.dotType,
            color: advancedOptions.corners?.dotColor
          },
          backgroundOptions: {
            color: advancedOptions.background?.color,
            round: advancedOptions.background?.round
          }
        }

        await this.QRCodeJs.setOptions(options)
      }

      // Create QR code instance
      const qrOptions = {
        data: data || 'https://example.com',
        imageOptions: {
          imageSize: 0.4,
          margin: 0.5,
          roundedValue: 0.5
        }
      }

      // QRCodeJs from the library is expected to be a class with a constructor
      this.currentQRCode = new (this.QRCodeJs as any)(qrOptions)

      if (!this.currentQRCode) {
        throw new Error('Failed to create QR code instance')
      }

      await this.currentQRCode.append(element)

      return true
    } catch (error) {
      console.error('Failed to generate QR code:', error)
      if (element) {
        element.innerHTML = `
          <div class="flex flex-col items-center justify-center w-full h-full text-center p-2 bg-danger-50 text-danger-600 rounded">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="text-xs mt-2">Error: ${error instanceof Error ? error.message : 'Failed to generate QR code'}</p>
          </div>
        `
      }
      return false
    }
  }

  public async validateQRCode(): Promise<{ isValid: boolean; reason?: string }> {
    if (!this.currentQRCode) {
      return { isValid: false, reason: 'No QR code has been generated' }
    }

    try {
      const defaultValidatorId = 'default'
      return await this.currentQRCode.validateScanning(defaultValidatorId)
    } catch (error) {
      console.error('Failed to validate QR code:', error)
      return {
        isValid: false,
        reason: error instanceof Error ? error.message : 'Unknown validation error'
      }
    }
  }

  public downloadQRCode(format: 'svg' | 'png'): boolean {
    if (!this.currentQRCode) {
      return false
    }

    try {
      if (format === 'png') {
        this.currentQRCode.download({ extension: 'png', width: 535, height: 460 })
      } else {
        this.currentQRCode.download({ extension: 'svg' })
      }
      return true
    } catch (error) {
      console.error(`Failed to download QR code as ${format}:`, error)
      return false
    }
  }
}

export default QRCodeService.getInstance()
