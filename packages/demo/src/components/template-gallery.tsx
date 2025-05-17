import React, { useEffect, useRef } from 'react' // Added useEffect and useRef
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
  Spinner,
  Tab,
  Tabs
} from '@heroui/react'
// Corrected import order, Added Tabs, Tab
import { motion } from 'framer-motion'
import { useAtom, useAtomValue } from 'jotai' // Added useAtom

import { ImageIcon, LayoutTemplate, Palette, Square, TextIcon } from 'lucide-react'

import { imageOptions } from '../data/qr-data'
import qrCodeService from '../services/qr-code-service'
import {
  qrConfigAtom,
  requestedGalleryTabIdAtom,
  templatesData,
  useQrConfigStore
} from '../store'
import { Flex } from './ui/boxes'

// Define gallery categories
const galleryCategories = [
  {
    id: 'base',
    name: 'Base Templates',
    source: templatesData.baseTemplates,
    icon: <LayoutTemplate className="text-default-400 w-4 h-4" />
  },
  {
    id: 'styles',
    name: 'Base Styles',
    source: templatesData.styleTemplates,
    icon: <Palette className="text-default-400 w-4 h-4" />
  },
  {
    id: 'borders',
    name: 'Borders Templates',
    source: templatesData.borderTemplates,
    icon: <Square className="text-default-400 w-4 h-4" />
  },
  {
    id: 'images',
    name: 'Logo Images',
    source: imageOptions,
    icon: <ImageIcon className="text-default-400 w-4 h-4" />
  },
  {
    id: 'text',
    name: 'Text Templates',
    source: templatesData.textTemplates,
    icon: <TextIcon className="text-default-400 w-4 h-4" />
  }
]

export const TemplateGallery: React.FC = () => {
  const [requestedTab, setRequestedTab] = useAtom(requestedGalleryTabIdAtom)
  const qrConfigStoreState = useAtomValue(qrConfigAtom)
  const tabsContentRef = useRef<HTMLDivElement | null>(null)
  const {
    setSelectedTemplateId,
    setSelectedBorderId,
    setSelectedStyleId,
    setSelectedImageId,
    setSelectedTextTemplateId
  } = useQrConfigStore()

  const {
    selectedTemplateId: storeSelectedTemplateId,
    selectedBorderId: storeSelectedBorderId,
    selectedStyleId: storeSelectedStyleId, // Renamed to avoid conflict in useEffect
    selectedImageId: storeSelectedImageId, // Renamed
    selectedTextTemplateId: storeSelectedTextTemplateId, // Renamed
    qrData,
    isAdvancedMode: _isAdvancedMode, // Currently not used for gallery generation logic but kept for context
    advancedOptions: _advancedOptions // Same as above
  } = qrConfigStoreState

  const [activeCategoryId, setActiveCategoryId] = React.useState<string>('borders')
  const [loading, setLoading] = React.useState(true)
  const [validationStatus, setValidationStatus] = React.useState<Record<string, boolean>>(
    {}
  )
  const [itemLoadingStatus, setItemLoadingStatus] = React.useState<
    Record<string, boolean>
  >({})
  const templateRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  const activeCategory = React.useMemo(
    () =>
      galleryCategories.find(cat => cat.id === activeCategoryId) || galleryCategories[0],
    [activeCategoryId]
  )

  useEffect(() => {
    if (requestedTab) {
      const isValidTab = galleryCategories.some(cat => cat.id === requestedTab)
      if (isValidTab) {
        setActiveCategoryId(requestedTab)
        if (tabsContentRef.current) {
          tabsContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      setRequestedTab(null) // Reset atom after processing
    }
  }, [requestedTab, setActiveCategoryId, setRequestedTab]) // galleryCategories is stable

  React.useEffect(() => {
    let cancelled = false

    const generateTemplates = async () => {
      if (!activeCategory || cancelled) return

      setLoading(true)
      setValidationStatus({})
      setItemLoadingStatus({})
      templateRefs.current = {}

      try {
        const initialized = await qrCodeService.initialize()
        if (!initialized) {
          console.error('Failed to initialize QR code service')
          setLoading(false)
          return
        }

        const itemsToRender = activeCategory.source || []
        const itemsToRender = activeCategory.source || []
        const newValidationStatus: Record<string, boolean> = {}

        for (const item of itemsToRender) {
          if (cancelled) break

          setItemLoadingStatus(prev => ({ ...prev, [item.id]: true }))
          const el = templateRefs.current[item.id]

          if (el) {
            el.innerHTML = ''
            const baseImage =
              storeSelectedImageId === 'none'
                ? null
                : imageOptions.find(img => img.id === storeSelectedImageId)?.value || null

            const options = {
              element: el,
              data: qrData,
              templateId: storeSelectedTemplateId,
              styleId: storeSelectedStyleId,
              borderId: storeSelectedBorderId,
              image: baseImage,
              textId: storeSelectedTextTemplateId,
              options: { isResponsive: false }
            }

            switch (activeCategoryId) {
              case 'base':
                options.templateId = item.id
                break
              case 'borders':
                options.borderId = item.id
                break
              case 'styles':
                options.styleId = item.id
                break
              case 'text':
                options.textId = item.id
                break
              case 'images':
                options.image = (item as (typeof imageOptions)[0]).value || null
                break
            }

            try {
              const success = await qrCodeService.generateQRCode(options)
              if (!cancelled) {
                newValidationStatus[item.id] = success
              }
            } catch (error) {
              console.error(
                `Error generating QR code for item ${item.id} in category ${activeCategoryId}:`,
                `Error generating QR code for item ${item.id} in category ${activeCategoryId}:`,
                error
              )
              if (!cancelled) {
                newValidationStatus[item.id] = false
              }
            } finally {
              setItemLoadingStatus(prev => ({ ...prev, [item.id]: false }))
            }

            if (cancelled) break

            await new Promise(resolve => setTimeout(resolve, 50))
          } else {
            setItemLoadingStatus(prev => ({ ...prev, [item.id]: false }))
          }
        }

        if (!cancelled) {
          setValidationStatus(newValidationStatus)
        }
      } catch (error) {
        console.error(
          `Error generating templates for category ${activeCategoryId}:`,
          error
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void generateTemplates()

    return () => {
      cancelled = true
    }
  }, [
    activeCategoryId,
    qrData,
    storeSelectedTemplateId,
    storeSelectedBorderId,
    storeSelectedStyleId,
    storeSelectedImageId,
    storeSelectedTextTemplateId,
    activeCategory
  ])

  const handleTemplateSelect = (item: any) => {
    switch (activeCategoryId) {
      case 'base': // Added case for base templates
        setSelectedTemplateId(item.id) // Assuming base templates also use setSelectedTemplateId
        break
      case 'borders':
        setSelectedBorderId(item.id)
        break
      case 'styles':
        setSelectedStyleId(item.id)
        break
      case 'text':
        setSelectedTextTemplateId(item.id)
        break
      case 'images':
        setSelectedImageId(item.id)
        break
      default:
        console.warn(`No selection logic for category: ${activeCategoryId}`)
    }
    const previewEl = document.getElementById('qr-preview-panel')
    previewEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const itemsToDisplay = activeCategory?.source || []

  return (
    <div ref={tabsContentRef}>
      <div className="mb-4">
        <ScrollShadow orientation="horizontal" className="w-full">
          <Tabs
            aria-label="Gallery Categories"
            selectedKey={activeCategoryId}
            size="lg"
            onSelectionChange={key => setActiveCategoryId(key as string)}
            // variant="underlined" // Using underlined variant for a cleaner look
            // color="primary"
            classNames={{ tab: 'text-md first:pl-3' }}
            className="mb-0 w-full"
          >
            {galleryCategories.map(category => (
              <Tab
                key={category.id}
                title={
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span className="text-md">{category.name}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
        </ScrollShadow>
        <Flex className="flex justify-between items-center mb-6">
          {/* <Box /> */}
          {/* <Box className="text-default-500 text-sm flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-success-500"></span> Valid
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-danger-500"></span> Invalid
            </span>
          </Box> */}
        </Flex>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner
              size="lg"
              color="primary"
              label={`Generating ${activeCategory?.name.toLowerCase()}...`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {itemsToDisplay.map((item, index) => (
              <motion.div
                key={`${activeCategoryId}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  isPressable
                  disableRipple
                  onPress={() => handleTemplateSelect(item)}
                  className={`
                  h-full w-full border rounded-lg shadow-sm
                  transition-all duration-200 ease-in-out transform hover:scale-105 cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 
                  ${
                    validationStatus[item.id] !== undefined
                      ? validationStatus[item.id]
                        ? 'border-success-300 hover:border-success-400 bg-success-50' // Enhanced visual feedback
                        : 'border-danger-300 hover:border-danger-400 bg-danger-50' // Enhanced visual feedback
                      : 'border-default-200 hover:border-default-300 bg-white' // Default state
                  }
                `}
                >
                  <CardHeader className="pb-0 pt-3 px-4 flex-col items-start bg-transparent">
                    <p className="text-xs text-default-500 uppercase tracking-wider">
                      ID: {item.id}
                    </p>
                    <h4 className="font-semibold text-lg mt-0.5">
                      {(item as { name?: string }).name || item.id}
                    </h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4 flex justify-center items-center">
                    <div
                      className="bg-content1 w-32 h-32 rounded-lg flex items-center justify-center shadow-inner" /* Consistent width/height, added shadow */
                    >
                      {itemLoadingStatus[item.id] ? (
                        <Spinner size="md" color="primary" />
                      ) : (
                        <div
                          ref={el => {
                            if (el) {
                              templateRefs.current[item.id] = el
                            }
                          }}
                          className="w-full h-full" // Ensure the ref div takes full space for QR code
                        >
                          {/* QR code will be appended here */}
                        </div>
                      )}
                    </div>
                  </CardBody>
                  <CardFooter className="pt-1 pb-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {validationStatus[item.id] !== undefined ? (
                        <>
                          <span
                            className={`
                            w-2.5 h-2.5 rounded-full /* Adjusted size */
                            ${validationStatus[item.id] ? 'bg-success-500' : 'bg-danger-500'}
                          `}
                          ></span>
                          <span className="text-sm font-medium">
                            {validationStatus[item.id] ? 'Valid' : 'Invalid'}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-default-400 font-medium">
                          Validating...
                        </span>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
