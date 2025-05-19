import React from 'react'
import { Button, Select, SelectItem } from '@heroui/react'
import type { Key as AriaKey, Selection } from '@react-types/shared'
import { ChevronLeft, ChevronRight, Shuffle, X } from 'lucide-react'

import { useQrConfigStore } from '../../store/qrConfigStore' // Corrected path
import { Box, Flex } from './boxes'

interface TemplateOption {
  id: string
  name: string
  [key: string]: any
}

interface NoSelectionItem {
  key: string
  textValue: string
}

interface TemplateControlsProps {
  label: string
  placeholder: string
  options: TemplateOption[]
  selectedKey: AriaKey | null
  onSelectionChange: (key: AriaKey | null) => void
  onRandom: () => void
  onNext: () => void
  onPrev: () => void
  onReset: () => void
  isDefaultSelected: boolean
  startContentIcon?: React.ReactNode
  noSelectionItem?: NoSelectionItem
  galleryTabId: string
  isDisabled?: boolean // Added isDisabled prop
}

const TemplateControls: React.FC<TemplateControlsProps> = ({
  label,
  placeholder,
  options,
  selectedKey,
  onSelectionChange,
  onRandom,
  onReset,
  onNext,
  onPrev,
  isDefaultSelected,
  startContentIcon,
  noSelectionItem,
  galleryTabId,
  isDisabled // Destructure isDisabled
}) => {
  const { browseAndScrollToGalleryTab } = useQrConfigStore()

  return (
    <Box className="mb-4 space-y-2 group">
      <Flex className="justify-start gap-2">
        <Box
          className="block text-md font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:underline"
          title={`Browse ${label} Templates`}
          onClick={() => browseAndScrollToGalleryTab(galleryTabId)}
        >
          {label}
        </Box>
        <Flex className="animate-in opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <Button
            isIconOnly
            size="sm"
            className="border-none shadow-none w-4 h-6"
            variant="ghost"
            onPress={onPrev}
            aria-label="Previous"
            title="Next"
            isDisabled={isDisabled} // Disable button
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            isIconOnly
            size="sm"
            className="border-none shadow-none w-4 h-6"
            variant="ghost"
            onPress={onNext}
            aria-label="Next"
            title="Next"
            isDisabled={isDisabled} // Disable button
          >
            <ChevronRight size={16} />
          </Button>
        </Flex>
      </Flex>

      <Flex className="space-x-2 justify-start">
        <Box className="w-full lg:max-w-[380px]">
          <div className="relative flex items-center">
            <Select
              aria-label={label}
              placeholder={placeholder}
              selectedKeys={selectedKey !== null ? new Set([selectedKey]) : new Set()}
              onSelectionChange={(keys: Selection) => {
                if (keys === 'all') {
                  onSelectionChange(null)
                } else if (keys instanceof Set) {
                  const firstKey = keys.values().next().value
                  onSelectionChange(firstKey !== undefined ? firstKey : null)
                }
              }}
              startContent={startContentIcon}
              className={`w-full group ${!isDefaultSelected ? 'select-hides-default-arrow' : ''}`}
              isDisabled={isDisabled} // Disable select
            >
              {(noSelectionItem
                ? [
                    <SelectItem
                      key={noSelectionItem.key}
                      textValue={noSelectionItem.textValue}
                    >
                      {noSelectionItem.textValue}
                    </SelectItem>
                  ]
                : []
              ).concat(
                options.map(option => (
                  <SelectItem key={option.id} textValue={option.name}>
                    {option.name}
                  </SelectItem>
                ))
              )}
            </Select>
            {!isDefaultSelected && (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onReset}
                disableAnimation
                aria-label="Reset to default template"
                title="Reset to default template"
                className="absolute group-hover:bg-transparent right-8 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 bg-gray-100/80 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800/10 dark:hover:text-gray-200"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        </Box>
        <Button
          isIconOnly
          variant="flat"
          onPress={onRandom}
          aria-label="Random"
          title="Random"
          isDisabled={isDisabled} // Disable button
        >
          <Shuffle size={18} />
        </Button>
      </Flex>
    </Box>
  )
}

export default TemplateControls
