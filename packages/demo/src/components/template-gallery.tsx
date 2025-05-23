import React, { useDeferredValue, useEffect, useRef } from 'react' // Added useDeferredValue
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
  // const isInternalTabClickRef = useRef(false);
  const {
    setSelectedTemplateId,
    setSelectedBorderId,
    setSelectedStyleId,
    setSelectedImageId,
    setSelectedTextTemplateId,
    activeGalleryTabId, // This comes from qrConfigAtom
    setActiveGalleryTabId,
    clearScrollToGalleryTrigger
  } = useQrConfigStore() // For actions

  const {
    // ... other properties from qrConfigStoreState
    selectedTemplateId: storeSelectedTemplateId,
    selectedBorderId: storeSelectedBorderId,
    selectedStyleId: storeSelectedStyleId, // Renamed to avoid conflict in useEffect
    selectedImageId: storeSelectedImageId, // Renamed
    selectedTextTemplateId: storeSelectedTextTemplateId, // Renamed
    qrData,
    isAdvancedMode: _isAdvancedMode, // Currently not used for gallery generation logic but kept for context
    advancedOptions: storeAdvancedOptions, // Use advanced options for gallery previews
    scrollToGalleryTabId
  } = qrConfigStoreState

  // const { set: setStore } = useQrConfigStore();

  // Defer values used for gallery generation so preview rendering has higher priority
  const deferredTemplateId = useDeferredValue(storeSelectedTemplateId)
  const deferredBorderId = useDeferredValue(storeSelectedBorderId)
  const deferredStyleId = useDeferredValue(storeSelectedStyleId)
  const deferredImageId = useDeferredValue(storeSelectedImageId)
  const deferredTextTemplateId = useDeferredValue(storeSelectedTextTemplateId)
  const deferredQrData = useDeferredValue(qrData)
  const deferredAdvancedOptions = useDeferredValue(storeAdvancedOptions)

  const templateRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  const activeCategory = galleryCategories.find(cat => cat.id === activeGalleryTabId)

  // useEffect(() => {                                  // <<< DELETE OLD EFFECT START
  //   if (activeGalleryTabId && tabsContentRef.current) {
  //     const tabExists = galleryCategories.some(cat => cat.id === activeGalleryTabId)
  //     if (tabExists) {
  //       if (isInternalTabClickRef.current) {
  //         // Change was internal, reset flag and do not scroll
  //         isInternalTabClickRef.current = false
  //       } else {
  //         // Change was external or initial load, proceed with scroll
  //         tabsContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //       }
  //     }
  //   }
  // }, [activeGalleryTabId])                           // <<< DELETE OLD EFFECT END

  useEffect(() => {
    if (
      scrollToGalleryTabId &&
      scrollToGalleryTabId === activeGalleryTabId &&
      tabsContentRef.current
    ) {
      const tabExists = galleryCategories.some(cat => cat.id === scrollToGalleryTabId)
      if (tabExists) {
        tabsContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Reset the trigger immediately after scrolling
        clearScrollToGalleryTrigger()
      }
    }
  }, [
    scrollToGalleryTabId,
    activeGalleryTabId,
    clearScrollToGalleryTrigger,
    galleryCategories
  ])

  React.useEffect(() => {
    if (!activeCategory) return

    let cancelled = false
    const queuedIds: number[] = []

    const scheduleIdle = (cb: () => void) => {
      if (typeof (window as any).requestIdleCallback === 'function') {
        const id = (window as any).requestIdleCallback(cb)
        queuedIds.push(id)
      } else {
        const id = window.setTimeout(cb, 0)
        queuedIds.push(id)
      }
    }

    const cancelIdleTasks = () => {
      queuedIds.forEach(id => {
        if (typeof (window as any).cancelIdleCallback === 'function') {
          ;(window as any).cancelIdleCallback(id)
        } else {
          clearTimeout(id)
        }
      })
      queuedIds.length = 0
    }

    const itemsToRender = activeCategory.source || []

    const renderItem = (index: number) => {
      if (cancelled || index >= itemsToRender.length) return

      scheduleIdle(async () => {
        if (cancelled) return

        const item = itemsToRender[index]
        const el = templateRefs.current[item.id]

        if (el) {
          const baseImage =
            deferredImageId === 'none'
              ? null
              : imageOptions.find(img => img.id === deferredImageId)?.value || null

          // Prepare base options with advanced overrides
          let galleryOptions = { isResponsive: false }
          
          // Apply advanced options as overrides if they exist and have meaningful content
          if (deferredAdvancedOptions && Object.keys(deferredAdvancedOptions).length > 1) {
            const advancedOverrides = { ...deferredAdvancedOptions }
            delete advancedOverrides.data // Don't override data
            
            // Clean up advanced options to remove undefined/empty values that might cause issues
            const cleanAdvancedOverrides = Object.fromEntries(
              Object.entries(advancedOverrides).filter(([_, value]) => {
                if (value === undefined || value === null) return false
                if (typeof value === 'object' && Object.keys(value).length === 0) return false
                return true
              })
            )
            
            galleryOptions = {
              ...galleryOptions,
              ...cleanAdvancedOverrides
            }
          }

          const options = {
            element: el,
            data: deferredQrData,
            templateId: deferredTemplateId,
            styleId: deferredStyleId,
            borderId: deferredBorderId,
            image: baseImage,
            textId: deferredTextTemplateId,
            options: galleryOptions
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
            await qrCodeService.generateQRCodeGallery(options)
          } catch (error) {
            console.error(
              `Error generating QR code for item ${item.id} in category ${activeGalleryTabId}:`,
              error
            )
          }
        }

        renderItem(index + 1)
      })
    }

    renderItem(0)

    return () => {
      cancelled = true
      cancelIdleTasks()
    }
  }, [
    activeGalleryTabId,
    deferredQrData,
    deferredTemplateId,
    deferredBorderId,
    deferredStyleId,
    deferredImageId,
    deferredTextTemplateId,
    deferredAdvancedOptions,
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
              // isInternalTabClickRef.current = true
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
        <div className="animate-in fade-in duration-700 ease-in-out grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                    key={`${activeGalleryTabId}-${item.id}-${index}`}
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
