import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Spinner } from '@heroui/react'
import { QRCodeJs } from '@qr-platform/qr-code.js' // Added
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'

import { imageOptions } from '../data/qr-data'
import qrCodeService from '../services/qr-code-service' // Kept for initialize and potentially validate
import { qrConfigAtom, templatesData } from '../store'

export const TemplateGallery: React.FC = () => {
  const qrConfigStore = useAtomValue(qrConfigAtom)
  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    qrData,
    isAdvancedMode,
    advancedOptions
  } = qrConfigStore
  const [loading, setLoading] = React.useState(true)
  const [validationStatus, setValidationStatus] = React.useState<Record<string, boolean>>(
    {}
  )
  const templateRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  // Initialize QR code service and generate templates
  React.useEffect(() => {
    const generateTemplates = async () => {
      setLoading(true)

      try {
        // Initialize QR code service
        const initialized = await qrCodeService.initialize()
        if (!initialized) {
          console.error('Failed to initialize QR code service')
          setLoading(false)
          return
        }

        // Generate QR codes for each template with a small delay between each
        const newValidationStatus: Record<string, boolean> = {}

        for (const template of templatesData.baseTemplates) {
          const templateElement = templateRefs.current[template.id]
          if (templateElement) {
            templateElement.innerHTML = '' // Clear previous QR code
            try {
              const imageUrl =
                selectedImageId === 'none'
                  ? null
                  : imageOptions.find(img => img.id === selectedImageId)?.value || null

              // Set global simple mode options via static setters
              // QRCodeJs.setTemplateId(selectedTemplateId)
              // QRCodeJs.setStyleId(selectedStyleId)
              // QRCodeJs.setImage(imageUrl) // Handles null internally
              // QRCodeJs.setTextId(selectedTextTemplateId)
              // QRCodeJs.setBorderId(template.id) // Set the specific border for this card

              // Advanced mode options are not applied here for the gallery of border templates
              // The gallery should reflect simple mode selections + each border.
              const qr = new QRCodeJs({ data: qrData })
              qr.append(templateElement)

              // Validate the QR code using the instance method if available
              if (qr.validateScanning) {
                const validationResult = await qr.validateScanning('zbar', false) // Assuming zbar, no debug
                newValidationStatus[template.id] = validationResult.isValid
              } else {
                // Fallback: If validateScanning is not on the instance (e.g. free version or license issue)
                // Try using the old service method, though its reliability is now uncertain.
                // This part might need further adjustment based on how qrCodeService.validateQRCode() behaves
                // without qrCodeService.generateQRCode() being its direct predecessor.
                console.warn(
                  `qr.validateScanning() not available for template ${template.id}. Falling back to service validation if possible, or marking as unvalidated.`
                )
                // For now, let's assume we can't validate reliably without the premium feature or a refactored service.
                // Mark as undetermined or false. Let's mark as false to indicate an issue.
                // newValidationStatus[template.id] = false;
                // OR, try the old service method if it's meant to be kept for some scenarios
                try {
                  const serviceValidationResult = await qrCodeService.validateQRCode()
                  newValidationStatus[template.id] = serviceValidationResult.isValid
                } catch (serviceValidationError) {
                  console.error(
                    `Fallback qrCodeService.validateQRCode() failed for ${template.id}:`,
                    serviceValidationError
                  )
                  newValidationStatus[template.id] = false // Mark as invalid if fallback also fails
                }
              }
            } catch (error) {
              console.error(
                `Error generating or validating QR code for template ${template.id}:`,
                error
              )
              newValidationStatus[template.id] = false
            }

            // Add a small delay to prevent overwhelming the browser
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }

        setValidationStatus(newValidationStatus)
      } catch (error) {
        console.error('Error generating templates:', error)
      } finally {
        setLoading(false)
      }
    }
    void generateTemplates()
  }, [
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    qrData,
    isAdvancedMode,
    advancedOptions
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Border Templates Gallery</h2>
        <div className="text-default-500 text-sm flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-success-500"></span> Valid
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-danger-500"></span> Invalid
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Spinner size="lg" color="primary" label="Generating templates..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {templatesData.baseTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={`h-full border ${
                  validationStatus[template.id] !== undefined
                    ? validationStatus[template.id]
                      ? 'border-success-200'
                      : 'border-danger-200'
                    : 'border-default-200'
                } rounded-lg shadow-sm`}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start bg-transparent">
                  <p className="text-tiny text-default-500">ID: {template.id}</p>
                  <h4 className="font-medium text-medium">{template.name}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex justify-center items-center">
                  <div
                    ref={el => {
                      templateRefs.current[template.id] = el
                    }}
                    className="bg-white w-32 h-32 rounded-md flex items-center justify-center"
                  >
                    {/* QR code will be appended here */}
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <div className="flex items-center gap-1">
                    {validationStatus[template.id] !== undefined ? (
                      <>
                        <span
                          className={`w-3 h-3 rounded-full ${
                            validationStatus[template.id]
                              ? 'bg-success-500'
                              : 'bg-danger-500'
                          }`}
                        ></span>
                        <span className="text-xs">
                          {validationStatus[template.id] ? 'Valid' : 'Invalid'}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-default-400">Pending validation</span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
