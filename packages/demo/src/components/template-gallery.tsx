import React, { useEffect, useRef } from 'react' // Added useEffect and useRef
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
  Tab,
  Tabs
} from '@heroui/react'
// Corrected import order, Added Tabs, Tab
import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai' // Added useAtom

import { ImageIcon, LayoutTemplate, Palette, Square, TextIcon } from 'lucide-react'

import { imageOptions } from '../data/qr-data'
import qrCodeService from '../services/qr-code-service'
import { qrConfigAtom, templatesData, useQrConfigStore } from '../store'
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
  const qrConfigStoreState = useAtomValue(qrConfigAtom)
  const tabsContentRef = useRef<HTMLDivElement | null>(null)
  const isInternalTabClickRef = useRef(false) // Added to track internal tab clicks
  const {
    setSelectedTemplateId,
    setSelectedBorderId,
    setSelectedStyleId,
    setSelectedImageId,
    setSelectedTextTemplateId,
    activeGalleryTabId, // Added
    setActiveGalleryTabId // Added
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

  const templateRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  const activeCategory = galleryCategories.find(cat => cat.id === activeGalleryTabId)

  useEffect(() => {
    if (activeGalleryTabId && tabsContentRef.current) {
      const tabExists = galleryCategories.some(cat => cat.id === activeGalleryTabId)
      if (tabExists) {
        if (isInternalTabClickRef.current) {
          // Change was internal, reset flag and do not scroll
          isInternalTabClickRef.current = false
        } else {
          // Change was external or initial load, proceed with scroll
          tabsContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }, [activeGalleryTabId])

  React.useEffect(() => {
    // let cancelled = false

    const generateTemplates = async () => {
      if (!activeCategory) return

      try {
        const initialized = await qrCodeService.initialize()
        if (!initialized) {
          console.error('Failed to initialize QR code service')
          // setLoading(false) // Removed
          return
        }

        const itemsToRender = activeCategory.source || []
        // const newValidationStatus: Record<string, boolean> = {} // Removed

        for (const item of itemsToRender) {
          // setItemLoadingStatus(prev => ({ ...prev, [item.id]: true })) // Removed
          const el = templateRefs.current[item.id]

          if (el) {
            // el.innerHTML = ''
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

            switch (activeGalleryTabId) {
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
              if (item.id === 'neon-dark') {
                console.log('Rendering gallery item:', item.id, options)
              }

              await qrCodeService.generateQRCode(options) // Removed success assignment and validation update
              // if (!cancelled) {
              //   newValidationStatus[item.id] = success
              // }
            } catch (error) {
              console.error(
                // Corrected to remove duplicate message and validation update
                `Error generating QR code for item ${item.id} in category ${activeGalleryTabId}:`,
                error
              )
              // if (!cancelled) {
              //   newValidationStatus[item.id] = false
              // }
            } // finally { // Removed itemLoadingStatus update
            // setItemLoadingStatus(prev => ({ ...prev, [item.id]: false }))
            // }

            // if (cancelled) break

            // await new Promise(resolve => setTimeout(resolve, 50)) // Removed delay
          } // else { // Removed itemLoadingStatus update
          // setItemLoadingStatus(prev => ({ ...prev, [item.id]: false }))
          // }
        }

        // if (!cancelled) { // Removed validation update
        //   setValidationStatus(newValidationStatus)
        // }
      } catch (error) {
        console.error(
          `Error generating templates for category ${activeGalleryTabId}:`,
          error
        )
      } finally {
        // if (!cancelled) { // Removed setLoading
        //   setLoading(false)
        // }
      }
    }

    void generateTemplates()
  }, [
    activeGalleryTabId,
    qrData,
    storeSelectedTemplateId,
    storeSelectedBorderId,
    storeSelectedStyleId,
    storeSelectedImageId,
    storeSelectedTextTemplateId,
    activeCategory
  ])

  const handleTemplateSelect = (item: any) => {
    switch (activeGalleryTabId) {
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
        console.warn(`No selection logic for category: ${activeGalleryTabId}`)
    }
    const previewEl = document.getElementById('qr-preview-panel')
    previewEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const itemsToDisplay = activeCategory?.source || []

  return (
    <div ref={tabsContentRef}>
      <div className="mb-4">
        <ScrollShadow orientation="horizontal" className="w-full mb-4">
          <Tabs
            aria-label="Gallery Categories"
            selectedKey={activeGalleryTabId}
            size="lg"
            onSelectionChange={key => {
              isInternalTabClickRef.current = true
              setActiveGalleryTabId(key as string)
            }}
            // variant="underlined" // Using underlined variant for a cleaner look
            // color="primary"
            classNames={{ tab: 'text-md first:pl-3' }}
            className="mb-0 w-full"
          >
            {galleryCategories.map(category => (
              <Tab
                key={category.id}
                title={
                  <Flex className="gap-2">
                    {category.icon}
                    <span className="text-md">{category.name}</span>
                  </Flex>
                }
              />
            ))}
          </Tabs>
        </ScrollShadow>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {itemsToDisplay.map((item, index) => (
            <motion.div
              key={`${activeGalleryTabId}-${item.id}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                isPressable
                key={`${activeGalleryTabId}-${item.id}-${index}`}
                disableRipple
                onPress={() => handleTemplateSelect(item)}
                className={`
                  h-full w-full border rounded-lg shadow-sm
                  transition-all duration-200 ease-in-out transform hover:scale-105 cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 
                  border-default-200 hover:border-default-300`}
              >
                <CardHeader className="pb-0 pt-3 px-4 flex-col items-start bg-transparent">
                  <p className="text-xs text-default-500 uppercase tracking-wider">
                    {(item as { name?: string }).name || item.id}
                  </p>
                </CardHeader>
                <CardBody className="overflow-visible w-64 h-[200px] ml-2 py-3 flex justify-center items-center">
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
                </CardBody>
                <CardFooter className="pt-1 pb-3 px-4">
                  <div className="flex items-center gap-1.5">
                    {/* Removed validation status display */}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Removed closing parenthesis from loading ternary */}
      </div>
    </div>
  )
}
