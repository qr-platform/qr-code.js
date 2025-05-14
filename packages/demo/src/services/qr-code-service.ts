// QR Code Service to handle interactions with the QR-Code.js library
import { QRCodeJs as QRCodeJsLib, QRCodeJsOptions } from '@qr-platform/qr-code.js' // Renaming to avoid conflict with local variable
import { SettingsOptions } from '@qr-platform/qr-code.js/lib/types/settings-options'

// Define the QRCodeJs interface based on the usage in the example
// We'll assume the imported QRCodeJsLib matches this structure for now.
// If not, this interface might need to be updated or removed in favor of types from the library.

interface GenerateQRCodeOptions {
  element: HTMLElement
  data?: string
  templateId?: string | null
  template?: string | null
  styleId?: string | null
  style?: string | null
  image?: string | null
  text?: string | null
  textId?: string | null
  options?: QRCodeJsOptions
}

// Token for authentication
const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXJlY3QtejJ6ZHBoM2NlY3NiejFqNyIsImNsaWVudCI6ImNvZGVwZW4iLCJwbGFuIjoicHJvIiwiZG9tYWlucyI6WyJjb2RlcGVuLmlvIiwiY2Rwbi5pbyJdLCJpYXQiOjE3NDQ2MDg3NTEsImV4cCI6MjYwODUyMjM1MX0.g9dKZGw7Kf4_Y-yJLzePdSoIcPOWDJyAWDtOR7bukjemPPdp5vuevaNdyyoqyPli-kZbEec9tlUferY05FkhTl7myw-bOIjTy7Uj9PjDwkzwI8OXGu7VxwCjo7EHESm6MfQ5vrF_b5bjNtpycBYuD3p2vMwqTsvjSreGjA77B6Lfwhb-4eHpdcIfSOFbtmplim4NPgl4Pz257IJ5qeWhSWErzR2oN9I-NgH4kscyUiL8ATERpry4U8YUDfmljvKg8ElPLr6LmgejlH2GJO9WzqhgEgyf4Yf1OdOg3uIkVBgCrNx4NaxjJCpksw84vgB2Cv792GQdNP_btthFFVeJdQ'

// Class to handle QR code operations
export class QRCodeService {
  private static instance: QRCodeService
  private isInitialized = false
  private qr: QRCodeJsLib | null = null

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
      if (!QRCodeJsLib) {
        throw new Error('QRCodeJs library not loaded via import')
      }

      try {
        await QRCodeJsLib.token(AUTH_TOKEN)
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

  public async generateQRCode({
    element,
    data,
    templateId,
    template,
    styleId,
    style,
    image,
    text,
    textId,
    options
  }: GenerateQRCodeOptions): Promise<boolean> {
    console.log('element', element)
    if (!element) {
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
        console.error('QR Code service initialization failed')
        throw new Error('QR Code service initialization failed')
      }
    }

    try {
      if (QRCodeJsLib == null) {
        throw new Error('QRCodeJs not initialized in generateQRCode')
      }

      const qrCodeSettings = {
        data: data ?? 'https://qr-platform.com'
      } as SettingsOptions

      if (templateId) {
        qrCodeSettings.templateId = templateId
      } else if (template) {
        qrCodeSettings.template = template
      }
      if (style) {
        qrCodeSettings.style = style
      } else if (styleId) {
        qrCodeSettings.styleId = styleId
      }

      if (image) {
        qrCodeSettings.image = image
      }

      if (textId) {
        qrCodeSettings.textId = textId
      } else if (text) {
        qrCodeSettings.text = text
      }

      if (options) {
        qrCodeSettings.options = options
      }

      this.qr = QRCodeJsLib.useSettings(qrCodeSettings).build()

      if (!this.qr) {
        throw new Error('Failed to create QR code instance')
      }

      // Clear the element before appending the QR code
      if (element) {
        element.innerHTML = ''
      }

      await this.qr.append(element)

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
    if (!this.qr) {
      return { isValid: false, reason: 'No QR code has been generated' }
    }

    try {
      return await this.qr.validateScanning()
    } catch (error) {
      console.error('Failed to validate QR code:', error)
      return {
        isValid: false,
        reason: error instanceof Error ? error.message : 'Unknown validation error'
      }
    }
  }

  public async downloadQRCode(format: 'svg' | 'png'): Promise<boolean> {
    if (!this.qr) {
      return false
    }

    try {
      if (format === 'png') {
        await this.qr.download({ extension: 'png' })
      } else {
        await this.qr.download({ extension: 'svg' })
      }
      return true
    } catch (error) {
      console.error(`Failed to download QR code as ${format}:`, error)
      return false
    }
  }
}

export default QRCodeService.getInstance()
