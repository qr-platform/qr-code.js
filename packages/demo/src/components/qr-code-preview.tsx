import React from 'react'
import {
  addToast,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Tooltip
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { Options as QRCodeJsOptions } from '@qr-platform/qr-code.js' // QRCodeJs direct import removed
import { useAtomValue } from 'jotai'

// import { imageOptions } from '../data/qr-data'
import qrCodeService from '../services/qr-code-service'
import { qrConfigAtom } from '../store'

export const QRCodePreview: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)
  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    selectedBorderId, // Note: qrCodeService.generateQRCode doesn't explicitly use this.
    qrData,
    isAdvancedMode,
    advancedOptions
  } = qrConfig

  const [isLoading, setIsLoading] = React.useState(false)
  const [isValidating, setIsValidating] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean | null>(null)
  const qrContainerRef = React.useRef<HTMLDivElement>(null)
  const [isQrVisible, setIsQrVisible] = React.useState(true) // For fade animation

  React.useEffect(() => {
    const effectLogic = async () => {
      setIsQrVisible(false)
      await new Promise(resolve => setTimeout(resolve, 200))

      // Renamed original function to be part of the effect logic
      const generateQRCodeAsync = async () => {
        setIsLoading(true)
        setIsValid(null)

        try {
          const initialized = await qrCodeService.initialize()
          if (!initialized) {
            addToast({
              title: 'Error',
              description:
                'Failed to initialize QR code service. Check console for details.',
              color: 'danger'
            })
            setIsLoading(false)
            if (qrContainerRef.current) {
              qrContainerRef.current.textContent = 'QR Service initialization failed.'
            }
            return
          }

          let generationAttempted = false
          let generationSuccess = false // To track if the service call was successful

          if (isAdvancedMode) {
            if (qrData && advancedOptions && qrContainerRef.current) {
              const optionsForLib: QRCodeJsOptions = {
                ...(advancedOptions as any), // Temporary cast
                data: qrData // Ensure qrData from store overrides
              }
              generationSuccess = await qrCodeService.generateQRCode({
                element: qrContainerRef.current!,
                data: qrData,
                templateId: null, // templateId - not used in advanced mode directly here
                template: null, // template - not used in advanced mode directly here
                styleId: null, // styleId - not used in advanced mode directly here
                style: null, // style - not used in advanced mode directly here
                image: null, // handled by advancedOptions
                text: null, // handled by advancedOptions
                textId: null, // handled by advancedOptions
                options: optionsForLib
              })
              generationAttempted = true
            } else {
              console.warn('Advanced mode: qrData or advancedOptions missing.')
            }
          } else {
            // Simple Mode
            console.log('qrData', qrData)
            if (qrData) {
              generationSuccess = await qrCodeService.generateQRCode({
                element: qrContainerRef.current!,
                data: qrData,
                templateId: selectedTemplateId,
                template: null, // template (raw content)
                styleId: selectedStyleId,
                style: null, // style (raw content)
                image: null,
                text: null, // text (raw content)
                textId: selectedTextTemplateId,
                options: { isResponsive: true }
              })
              generationAttempted = true
            } else {
              console.warn('Simple mode: qrData missing.')
            }
          }

          if (!generationAttempted && qrContainerRef.current) {
            qrContainerRef.current.textContent =
              'Cannot generate QR: Missing data or options.'
            addToast({
              title: 'Info',
              description: 'Not enough data or options to generate QR code.',
              color: 'default'
            })
          } else if (
            generationAttempted &&
            !generationSuccess &&
            qrContainerRef.current &&
            qrContainerRef.current.innerHTML === ''
          ) {
            // If generation was attempted, failed, and service didn't put an error message
            qrContainerRef.current.textContent = 'Failed to generate QR code.'
            addToast({
              title: 'Error',
              description: 'Failed to generate QR code. Service indicated failure.',
              color: 'danger'
            })
          }
        } catch (error) {
          console.error('Error during QR code generation process:', error)
          addToast({
            title: 'Error',
            description:
              error instanceof Error ? error.message : 'Failed to generate QR code',
            color: 'danger'
          })
          if (qrContainerRef.current && qrContainerRef.current.innerHTML === '') {
            qrContainerRef.current.textContent =
              'Failed to generate QR code due to an error.'
          }
        } finally {
          setIsLoading(false)
          // Start fade-in animation after QR code is potentially updated and spinner is hidden
          requestAnimationFrame(() => {
            setIsQrVisible(true)
          })
        }
      }

      if (qrContainerRef.current) {
        void generateQRCodeAsync() // Call the inner function that contains the original logic
      }
    } // Closing bracket for effectLogic

    // Call the new effectLogic function
    if (qrContainerRef.current) {
      // Still check qrContainerRef.current before starting
      void effectLogic()
    }
  }, [
    qrData,
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    // qrContainerRef.current, // qrContainerRef.current should not be a dependency
    selectedBorderId,
    isAdvancedMode,
    advancedOptions
  ])

  const handleValidate = async () => {
    setIsValidating(true)
    try {
      // Assuming qrCodeService.validateQRCode() uses the instance it generated
      const result = await qrCodeService.validateQRCode()
      setIsValid(result.isValid)

      addToast({
        title: result.isValid ? 'Validation Successful' : 'Validation Failed',
        description: result.isValid
          ? 'QR code is valid and scannable'
          : `QR code validation failed: ${result.reason || 'Unknown reason'}`,
        color: result.isValid ? 'success' : 'danger'
      })
    } catch (error) {
      console.error('Error validating QR code:', error)
      setIsValid(false)

      addToast({
        title: 'Validation Error',
        description:
          error instanceof Error ? error.message : 'Failed to validate QR code',
        color: 'danger'
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleDownload = async (format: 'svg' | 'png') => {
    // qrInstanceRef.current is removed. The service manages the instance.
    // The service's downloadQRCode method will handle if QR is not ready.
    try {
      const success = await qrCodeService.downloadQRCode(format)
      if (success) {
        addToast({
          title: 'Download Successful',
          description: `QR code downloaded as ${format.toUpperCase()}`,
          color: 'success'
        })
      } else {
        // This case means qrCodeService.downloadQRCode returned false,
        // likely because this.qr was null in the service.
        addToast({
          title: 'Download Error',
          description: 'QR code not available or not generated. Generate QR code first.',
          color: 'danger'
        })
      }
    } catch (error) {
      // This catch is for unexpected errors from the service method itself
      console.error(`Error downloading QR code as ${format}:`, error)
      addToast({
        title: 'Download Error',
        description:
          error instanceof Error
            ? error.message
            : `Failed to download QR code as ${format.toUpperCase()}`,
        color: 'danger'
      })
    }
  }

  return (
    <Card className="h-full border border-default-200 shadow-sm rounded-lg bg-white dark:bg-gray-950">
      <CardBody className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-0">Preview</h2>

        <div
          className={`bg-white dark:bg-black flex items-center justify-center rounded-lg p-4 overflow-hidden
            ${
              isValid === true
                ? 'border-2 border-success-500'
                : isValid === false
                  ? 'border-2 border-danger-500'
                  : 'border-2 border-transparent'
            }`}
        >
          {isLoading ? (
            <Spinner color="primary" />
          ) : (
            <div
              ref={qrContainerRef}
              className={`w-80 flex items-center justify-center transition-opacity duration-200 ease-in-out ${
                isQrVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* QR code will be appended here by QRCodeJs instance */}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-default-500">
          {isAdvancedMode ? (
            <p>Mode: Advanced Configuration</p>
          ) : (
            <>
              <p>Template: {selectedTemplateId || 'Default'}</p>
              <p>Style: {selectedStyleId || 'Default'}</p>
              <p>
                Image:
                {selectedImageId === 'none' ? 'None' : selectedImageId || 'Default'}
              </p>
              <p>Text: {selectedTextTemplateId || 'Default'}</p>
              <p>Border: {selectedBorderId || 'Default'}</p>
            </>
          )}
        </div>
      </CardBody>

      <CardFooter className="flex justify-center gap-2 pt-0">
        <ButtonGroup variant="flat">
          <Tooltip content="Validate QR code">
            <Button
              color={
                isValid === true ? 'success' : isValid === false ? 'danger' : 'primary'
              }
              isLoading={isValidating}
              onPress={handleValidate}
              startContent={<Icon icon="lucide:check-circle" />}
            >
              Validate
            </Button>
          </Tooltip>

          <Tooltip content="Download as SVG">
            <Button
              onPress={() => void handleDownload('svg')}
              startContent={<Icon icon="lucide:download" />}
            >
              SVG
            </Button>
          </Tooltip>

          <Tooltip content="Download as PNG">
            <Button
              onPress={() => void handleDownload('png')}
              startContent={<Icon icon="lucide:image" />}
            >
              PNG
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
