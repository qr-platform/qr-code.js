import React from 'react'
import { Button, Input, Select, SelectItem, Switch } from '@heroui/react'
import type { Selection } from '@react-types/shared'
import { ChevronLeft, ChevronRight, RotateCcw, Settings2, X } from 'lucide-react'

import { useQrConfigStore } from '../../store/qrConfigStore'
import { Box, Flex } from './boxes'

const positionOptions: Array<{
  key: 'all' | 'top' | 'bottom' | 'left' | 'right'
  label: string
}> = [
  { key: 'all', label: 'All Sides' },
  { key: 'top', label: 'Top Side' },
  { key: 'bottom', label: 'Bottom Side' },
  { key: 'left', label: 'Left Side' },
  { key: 'right', label: 'Right Side' }
]

export const CustomTextOverrideControls: React.FC = () => {
  const {
    isCustomTextOverrideEnabled,
    customTextOverridePosition,
    customTextOverrides,
    setIsCustomTextOverrideEnabled,
    setCustomTextOverridePosition,
    setCustomTextOverride,
    resetCustomTextOverrides
  } = useQrConfigStore()

  const handleTextChange = (value: string) => {
    setCustomTextOverride(customTextOverridePosition, value)
  }

  const handleNextPosition = () => {
    const currentIndex = positionOptions.findIndex(
      opt => opt.key === customTextOverridePosition
    )
    const nextIndex = (currentIndex + 1) % positionOptions.length
    setCustomTextOverridePosition(positionOptions[nextIndex].key)
  }

  const handlePrevPosition = () => {
    const currentIndex = positionOptions.findIndex(
      opt => opt.key === customTextOverridePosition
    )
    const prevIndex = (currentIndex - 1 + positionOptions.length) % positionOptions.length
    setCustomTextOverridePosition(positionOptions[prevIndex].key)
  }

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  const getLabelForPosition = (position: 'all' | 'top' | 'bottom' | 'left' | 'right') => {
    const option = positionOptions.find(opt => opt.key === position)
    return option ? `Text for ${option.label}` : 'Custom Text'
  }

  return (
    <Box className="mb-4 space-y-2 group">
      {/* Header */}
      <Flex className="justify-between items-center">
        <Flex className="justify-start gap-2">
          <Box
            className="text-md font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:underline flex items-center gap-2"
            onClick={() => setIsCustomTextOverrideEnabled(!isCustomTextOverrideEnabled)}
            title="Toggle custom text override"
          >
            <Settings2 size={18} className="text-default-500" />
            <span>Custom Text Override</span>
          </Box>
          {isCustomTextOverrideEnabled && (
            <Flex className="animate-in opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <Button
                isIconOnly
                size="sm"
                className="border-none shadow-none w-4 h-6"
                variant="ghost"
                onPress={handlePrevPosition}
                aria-label="Previous position"
                title="Previous position"
                isDisabled={!isCustomTextOverrideEnabled}
              >
                <ChevronLeft size={16} />
              </Button>

              <Button
                isIconOnly
                size="sm"
                className="border-none shadow-none w-4 h-6"
                variant="ghost"
                onPress={handleNextPosition}
                aria-label="Next position"
                title="Next position"
                isDisabled={!isCustomTextOverrideEnabled}
              >
                <ChevronRight size={16} />
              </Button>
            </Flex>
          )}
        </Flex>
        <Switch
          id="custom-text-override-toggle"
          isSelected={isCustomTextOverrideEnabled}
          onValueChange={setIsCustomTextOverrideEnabled}
          aria-label="Enable Custom Text Override"
          size="sm"
        />
      </Flex>

      {isCustomTextOverrideEnabled && (
        <Box className="animate-in fade-in duration-300">
          <Flex className="space-x-2 justify-start">
            <Box className="w-full lg:max-w-[380px]">
              <div className="relative flex items-center mb-2">
                <Select
                  label="Text Position"
                  aria-label="Text Position"
                  placeholder="Select text position"
                  selectedKeys={
                    customTextOverridePosition
                      ? new Set([customTextOverridePosition])
                      : new Set()
                  }
                  onSelectionChange={(keys: Selection) => {
                    if (keys instanceof Set) {
                      const firstKey = keys.values().next().value as
                        | 'all'
                        | 'top'
                        | 'bottom'
                        | 'left'
                        | 'right'
                      if (firstKey) {
                        setCustomTextOverridePosition(firstKey)
                      }
                    }
                  }}
                  disabled={!isCustomTextOverrideEnabled}
                  className="w-full group"
                >
                  {positionOptions.map(option => (
                    <SelectItem key={option.key} textValue={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={resetCustomTextOverrides}
                  disableAnimation
                  aria-label="Reset all custom text settings"
                  title="Reset all custom text settings"
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 bg-gray-100/80 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800/10 dark:hover:text-gray-200"
                  isDisabled={!isCustomTextOverrideEnabled}
                >
                  <RotateCcw size={14} />
                </Button>
              </div>

              <div className="relative flex items-center">
                <Input
                  label={getLabelForPosition(customTextOverridePosition)}
                  aria-label={getLabelForPosition(customTextOverridePosition)}
                  placeholder={`Enter text for ${customTextOverridePosition}...`}
                  value={currentTextValue}
                  onValueChange={handleTextChange}
                  disabled={!isCustomTextOverrideEnabled}
                  classNames={{
                    inputWrapper: 'border-default-300'
                  }}
                  className="w-full group"
                />
                {currentTextValue && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setCustomTextOverride(customTextOverridePosition, '')}
                    disableAnimation
                    aria-label="Clear current text"
                    title="Clear current text"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 bg-gray-100/80 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800/10 dark:hover:text-gray-200"
                    isDisabled={!isCustomTextOverrideEnabled || !currentTextValue}
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
