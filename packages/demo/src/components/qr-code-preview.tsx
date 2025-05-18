import React, { useDeferredValue } from 'react'
import {
  addToast,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  // removeToast was assumed, but not exported by @heroui/react
  // Spinner,
  Tooltip
} from '@heroui/react'
import { Options as QRCodeJsOptions } from '@qr-platform/qr-code.js' // QRCodeJs direct import removed
import { useAtomValue } from 'jotai'
import { CheckCircle, Download, Image } from 'lucide-react'

import useThrottle from '../hooks/use-throttle' // Import useThrottle
import qrCodeService from '../services/qr-code-service'
import { qrConfigAtom } from '../store'
import { Box, Flex } from './ui/boxes'

export const QRCodePreview: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)
  const defferedQrConfig = useDeferredValue(qrConfig)

  const throttledQrConfig = useThrottle(defferedQrConfig, 300)
  const { isAdvancedMode } = qrConfig // For instant UI updates if needed

  const [isValidating, setIsValidating] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean | null>(null)
  const qrContainerRef = React.useRef<HTMLDivElement>(null)
  const [isQrVisible, setIsQrVisible] = React.useState(true) // For fade animation
  const validationTimerRef = React.useRef<number | null>(null) // Changed NodeJS.Timeout to number

  React.useEffect(
    () =>
      // Cleanup timer on component unmount
      () => {
        if (validationTimerRef.current) {
          clearTimeout(validationTimerRef.current)
        }
      },
    []
  )

  // QR code generation logic, wrapped in useCallback
  const generateQRCodeAsync = async (
    currentConfig: typeof qrConfig,
    container: HTMLDivElement | null
  ) => {
    if (!container) {
      return
    }

    setIsQrVisible(false)
    await new Promise(resolve => setTimeout(resolve, 300)) // For fade effect

    setIsValid(null)

    try {
      const initialized = await qrCodeService.initialize()
      if (!initialized) {
        addToast({
          title: 'Error',
          description: 'Failed to initialize QR code service. Check console for details.',
          color: 'danger'
        })
        if (container) {
          container.textContent = 'QR Service initialization failed.'
        }
        return
      }

      let generationAttempted = false
      let generationSuccess = false
      const {
        selectedTemplateId: currentSelectedTemplateId,
        selectedStyleId: currentSelectedStyleId,
        selectedImage: currentSelectedImage,
        selectedTextTemplateId: currentSelectedTextTemplateId,
        selectedBorderId: currentSelectedBorderId,
        qrData: currentQrData,
        isAdvancedMode: currentConfigIsAdvancedMode, // Use from currentConfig
        advancedOptions: currentAdvancedOptions
      } = currentConfig

      if (currentConfigIsAdvancedMode) {
        if (currentQrData && currentAdvancedOptions && container) {
          const optionsForLib: QRCodeJsOptions = {
            ...(currentAdvancedOptions as any),
            data: currentQrData
          }
          generationSuccess = await qrCodeService.generateQRCode({
            element: container,
            data: currentQrData,
            templateId: null,
            template: null,
            styleId: null,
            style: null,
            image: null,
            text: null,
            textId: null,
            options: optionsForLib
          })
          generationAttempted = true
        } else {
          console.warn('Advanced mode: qrData or advancedOptions missing.')
        }
      } else {
        // Simple Mode
        if (currentQrData && container) {
          generationSuccess = await qrCodeService.generateQRCode({
            element: container,
            data: currentQrData,
            templateId: currentSelectedTemplateId,
            template: null,
            styleId: currentSelectedStyleId,
            borderId: currentSelectedBorderId,
            style: null,
            image: currentSelectedImage,
            text: null,
            textId: currentSelectedTextTemplateId,
            options: { isResponsive: true }
          })
          generationAttempted = true
        } else {
          console.warn('Simple mode: qrData missing or container missing.')
        }
      }

      if (!generationAttempted && container) {
        container.textContent = 'Cannot generate QR : Missing data or options.'
        addToast({
          title: 'Info',
          description: 'Not enough data or options to generate QR code.',
          color: 'default'
        })
      } else if (
        generationAttempted &&
        !generationSuccess &&
        container &&
        container.innerHTML === ''
      ) {
        container.textContent = 'Failed to generate QR code.'
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
      if (container && container.innerHTML === '') {
        container.textContent = 'Failed to generate QR code due to an error.'
      }
    } finally {
      requestAnimationFrame(() => {
        setIsQrVisible(true)
      })
    }
  }

  React.useEffect(() => {
    void generateQRCodeAsync(throttledQrConfig, qrContainerRef.current)
  }, [throttledQrConfig]) // Dependencies

  const handleValidate = async () => {
    setIsValidating(true)
    // Toasts will be managed by their own lifecycle or manual dismissal
    // as removeToast or a clearAllToasts mechanism is not confirmed for @heroui/react.

    try {
      // Assuming qrCodeService.validateQRCode() uses the instance it generated
      const result = await qrCodeService.validateQRCode()
      setIsValid(result.isValid)

      addToast({
        // Not capturing ID as we can't use it to remove
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
        // Not capturing ID
        title: 'Validation Error',
        timeout: 4000,
        description:
          error instanceof Error ? error.message : 'Failed to validate QR code',
        color: 'danger'
      })
    } finally {
      setIsValidating(false)

      // Clear any existing timer for validation auto-clear
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current)
      }

      // Set a new timer to clear validation state
      validationTimerRef.current = setTimeout(() => {
        setIsValid(null)
        validationTimerRef.current = null // Optional: clear the ref after the timer executes
      }, 4000)
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
        <Flex
          className={`rounded-lg p-4 overflow-hidden
            ${
              isValid === true
                ? 'border-2 border-success-500'
                : isValid === false
                  ? 'border-2 border-danger-500'
                  : 'border-2 border-transparent'
            }`}
        >
          <Flex
            ref={qrContainerRef}
            className={`w-80 min-h-80 transition-opacity duration-200 ease-in-out ${
              isQrVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* QR code will be appended here by QRCodeJs library */}
          </Flex>
        </Flex>

        <Box className="my-2 w-full text-sm text-default-500">
          {/* Adjusted w-full for better layout control */}
          {isAdvancedMode ? (
            <p className="text-center text-default-600">Mode: Advanced Configuration</p>
          ) : (
            <Box className="mx-auto max-w-[340px] p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <dl className="grid grid-cols-[max-content,1fr] gap-x-4 gap-y-2 text-left">
                <dt className="font-semibold text-default-700">Template:</dt>
                <dd className="text-default-600 truncate">
                  {qrConfig.getSelectedBaseTemplateName()}
                </dd>

                <dt className="font-semibold text-default-700">Style:</dt>
                <dd className="text-default-600 truncate">
                  {qrConfig.getSelectedStyleTemplateName()}
                </dd>

                <dt className="font-semibold text-default-700">Image:</dt>
                <dd className="text-default-600 truncate">
                  {qrConfig.getSelectedImageName()}
                </dd>

                <dt className="font-semibold text-default-700">Text:</dt>
                <dd className="text-default-600 truncate">
                  {qrConfig.getSelectedTextTemplateName()}
                </dd>

                <dt className="font-semibold text-default-700">Border:</dt>
                <dd className="text-default-600 truncate">
                  {qrConfig.getSelectedBorderTemplateName()}
                </dd>
              </dl>
            </Box>
          )}
        </Box>
      </CardBody>

      <CardFooter className="flex justify-center gap-2 pt-0">
        <ButtonGroup variant="flat">
          <Tooltip content="Validate QR code">
            <Button
              color={
                isValid === true ? 'success' : isValid === false ? 'danger' : 'primary'
              }
              isLoading={isValidating}
              onPress={() => void handleValidate()}
              startContent={<CheckCircle className="w-4 h-4" />}
            >
              Validate
            </Button>
          </Tooltip>

          <Tooltip content="Download as SVG">
            <Button
              onPress={() => void handleDownload('svg')}
              startContent={<Download className="w-4 h-4" />}
            >
              SVG
            </Button>
          </Tooltip>

          <Tooltip content="Download as PNG">
            <Button
              onPress={() => void handleDownload('png')}
              startContent={<Image className="w-4 h-4" />}
            >
              PNG
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
