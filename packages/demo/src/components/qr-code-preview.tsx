import React from 'react'
import {
  addToast,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Tooltip
} from '@heroui/react'
import { useAtomValue } from 'jotai'
import { CheckCircle, Download, Image } from 'lucide-react'

import useThrottle from '../hooks/use-throttle' // Import useThrottle
import qrCodeService from '../services/qr-code-service'
import { qrConfigAtom } from '../store'
import { Box, Flex } from './ui/boxes'

export const QRCodePreview: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)
  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImage,
    selectedTextTemplateId,
    selectedBorderId,
    qrData,
    isAdvancedMode,
    advancedOptions
  } = qrConfig

  const [isLoading, setIsLoading] = React.useState(false)
  const [isValidating, setIsValidating] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean | null>(null)
  const qrContainerRef = React.useRef<HTMLDivElement>(null)
  const [isQrVisible, setIsQrVisible] = React.useState(true)
  const validationTimerRef = React.useRef<number | null>(null)

  // Create an object of dependencies for throttling
  const qrGenerationParams = React.useMemo(
    () => ({
      isAdvancedMode,
      selectedTemplateId,
      selectedStyleId,
      selectedImage,
      selectedTextTemplateId,
      selectedBorderId,
      qrData,
      advancedOptions
    }),
    [
      isAdvancedMode,
      selectedTemplateId,
      selectedStyleId,
      selectedImage,
      selectedTextTemplateId,
      selectedBorderId,
      qrData,
      advancedOptions
    ]
  )

  const throttledQrGenerationParams = useThrottle(qrGenerationParams, 300)

  React.useEffect(() => {
    void generateQRCodeAsync(throttledQrGenerationParams, qrContainerRef.current)
  }, [throttledQrGenerationParams, qrContainerRef.current]) // Dependency is now the throttled object

  // console.log(defferedQrConfig)

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
    currentConfig: any,
    container: HTMLDivElement | null
  ) => {
    if (!container) {
      setIsLoading(false)
      return
    }

    setIsQrVisible(false)
    await new Promise(resolve => setTimeout(resolve, 300)) // For fade effect

    setIsLoading(true)
    setIsValid(null)

    try {
      const initialized = await qrCodeService.initialize()
      if (!initialized) {
        addToast({
          title: 'Error',
          description: 'Failed to initialize QR code service. Check console for details.',
          color: 'danger'
        })
        setIsLoading(false)
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
        selectedTextTemplateId: currentSelectedTextTemplateIdFromConfig, // Renamed to avoid conflict
        selectedBorderId: currentSelectedBorderId,
        qrData: currentQrData,
        advancedOptions: currentAdvancedOptions
      } = currentConfig

      // if (hasActiveCustomText && customTextIsMeaningful) {
      //   textIdForService = null // Custom text overrides template text
      // }

      console.log('advancedOptions', currentAdvancedOptions)

      // let finalOptionsForService: QRCodeJsOptions
      // if (currentConfigIsAdvancedMode) {
      //   // AdvancedOptions from the store already have text overrides merged by applyTemplatesToAdvancedOptions
      //   const { data: _advancedData, ...restOfAdvancedOptions } =
      //     currentAdvancedOptions as any
      //   finalOptionsForService = {
      //     ...restOfAdvancedOptions,
      //     data: currentQrData // Explicitly use currentQrData
      //     // borderOptions.decorations are already correctly set in restOfAdvancedOptions by the store
      //   }
      // } else {
      // Simple Mode
      // finalOptionsForService = { isResponsive: true } // Base for simple mode
      // If custom text is active and meaningful, merge the borderOptions from the (already processed) advancedOptions.
      // This ensures custom text (which is part of advancedOptions.borderOptions) appears even in simple mode.
      // if (hasActiveCustomText && customTextIsMeaningful) {
      // if (currentAdvancedOptions.borderOptions) {
      // finalOptionsForService.borderOptions = currentAdvancedOptions.borderOptions
      // }
      // }
      // }

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
          textId: currentSelectedTextTemplateIdFromConfig,
          options: currentAdvancedOptions
        })
        generationAttempted = true
      } else if (container) {
        // This condition implies currentQrData is missing
        console.warn('QR Data missing, cannot generate.')
        container.textContent = 'QR Data is required to generate the code.'
      } else {
        // This condition implies container is missing (should be rare due to initial check)
        console.warn('QR container missing.')
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
      setIsLoading(false)
      setIsQrVisible(true)
    }
  }

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
      <CardBody className="flex flex-col items-center justify-start">
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
          <Box className="w-80 min-h-80">
            {!isLoading && (
              <Flex
                ref={qrContainerRef}
                className={`transition-opacity duration-200 ease-in-out ${
                  isQrVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </Box>
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
