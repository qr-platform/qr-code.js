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

import { useQRCode } from '../context/qr-code-context'
import qrCodeService from '../services/qr-code-service'

export const QRCodePreview: React.FC = () => {
  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    qrData,
    getSelectedImageUrl
  } = useQRCode()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isValidating, setIsValidating] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean | null>(null)
  const qrContainerRef = React.useRef<HTMLDivElement>(null)

  // Generate QR code when options change
  React.useEffect(() => {
    const generateQRCode = async () => {
      if (!qrContainerRef.current) return

      setIsLoading(true)
      setIsValid(null)

      try {
        // Initialize QR code service
        const initialized = await qrCodeService.initialize()
        if (!initialized) {
          addToast({
            title: 'Error',
            description:
              'Failed to initialize QR code service. Check console for details.',
            color: 'danger'
          })
          setIsLoading(false)
          return
        }

        const success = await qrCodeService.generateQRCode(
          qrContainerRef.current,
          qrData,
          selectedTemplateId,
          selectedStyleId,
          getSelectedImageUrl(),
          selectedTextTemplateId
        )

        if (!success) {
          addToast({
            title: 'Error',
            description: 'Failed to generate QR code. Check console for details.',
            color: 'danger'
          })
        }
      } catch (error) {
        console.error('Error generating QR code:', error)
        addToast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Failed to generate QR code',
          color: 'danger'
        })
      } finally {
        setIsLoading(false)
      }
    }

    void generateQRCode()
  }, [
    qrData,
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId
  ])

  const handleValidate = async () => {
    setIsValidating(true)
    try {
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

  const handleDownload = (format: 'svg' | 'png') => {
    try {
      const success = qrCodeService.downloadQRCode(format)
      if (success) {
        addToast({
          title: 'Download Successful',
          description: `QR code downloaded as ${format.toUpperCase()}`,
          color: 'success'
        })
      } else {
        addToast({
          title: 'Download Error',
          description: `Failed to download QR code as ${format.toUpperCase()}`,
          color: 'danger'
        })
      }
    } catch (error) {
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
    <Card className="h-full border border-default-200 shadow-sm rounded-lg">
      <CardBody className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>

        <div
          className={`w-64 h-64 bg-white flex items-center justify-center rounded-lg overflow-hidden
            ${isValid === true ? 'border border-success-500' : isValid === false ? 'border border-danger-500' : 'border border-default-200'}`}
        >
          {isLoading ? (
            <Spinner color="primary" />
          ) : (
            <div
              ref={qrContainerRef}
              className="w-full h-full flex items-center justify-center"
            >
              {/* QR code will be appended here */}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-default-500">
          <p>Template: {selectedTemplateId || 'Default'}</p>
          <p>Style: {selectedStyleId || 'Default'}</p>
          <p>Image: {selectedImageId === 'none' ? 'None' : selectedImageId}</p>
          <p>Text: {selectedTextTemplateId || 'Default'}</p>
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
              onPress={() => handleDownload('svg')}
              startContent={<Icon icon="lucide:download" />}
            >
              SVG
            </Button>
          </Tooltip>

          <Tooltip content="Download as PNG">
            <Button
              onPress={() => handleDownload('png')}
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
