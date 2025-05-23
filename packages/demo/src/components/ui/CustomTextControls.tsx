import React from 'react'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Slider,
  Switch
} from '@heroui/react'
import type { Selection } from '@react-types/shared' // Removed AriaKey
import { Minus, Plus, Settings2 } from 'lucide-react' // Icons

import { useQrConfigStore } from '../../store/qrConfigStore' // Adjusted path
import { Box, Flex } from './boxes'
import GradientEditor from './GradientEditor'

const DEFAULT_FONT_SIZE = 28
const DEFAULT_FONT_COLOR = '#ffffff'
const DEFAULT_DECORATION_OFFSET = 0
const DEFAULT_DECORATION_STYLE = {
  fontSize: DEFAULT_FONT_SIZE,
  fontColor: DEFAULT_FONT_COLOR
}
const DEFAULT_DECORATION = {
  offset: DEFAULT_DECORATION_OFFSET,
  style: DEFAULT_DECORATION_STYLE
}
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

export const CustomTextControls: React.FC = () => {
  const {
    isCustomTextOverrideEnabled,
    customTextOverridePosition,
    customTextOverrides,
    advancedOptions,
    setIsCustomTextOverrideEnabled,
    setCustomTextOverridePosition,
    setCustomTextOverride,
    setAdvancedBorderOption
  } = useQrConfigStore()

  const handleTextChange = (value: string) => {
    setCustomTextOverride(customTextOverridePosition, value)
  }

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  const getLabelForPosition = (position: 'all' | 'top' | 'bottom' | 'left' | 'right') => {
    const option = positionOptions.find(opt => opt.key === position)
    return option ? `Text for ${option.label}` : 'Custom Text'
  }

  // Get current decoration settings for the selected position
  const getCurrentDecorationSettings = () => {
    if (customTextOverridePosition === 'all') {
      // For 'all', get settings from any available side (fallback logic)
      const sides = ['top', 'bottom', 'left', 'right'] as const
      for (const side of sides) {
        const decoration = advancedOptions.borderOptions?.decorations?.[side]
        if (decoration?.style) {
          return decoration
        }
      }
      // Return default if none found
      return DEFAULT_DECORATION
    } else {
      return (
        advancedOptions.borderOptions?.decorations?.[customTextOverridePosition] ||
        DEFAULT_DECORATION
      )
    }
  }

  const updateDecorationSetting = (key: string, value: any) => {
    const { advancedOptions: currentAdvancedOptions } = useQrConfigStore.getState()
    const currentBorderOptions = { ...currentAdvancedOptions.borderOptions }

    if (!currentBorderOptions.decorations) {
      currentBorderOptions.decorations = {}
    }

    if (customTextOverridePosition === 'all') {
      // Update all sides
      const sides = ['top', 'bottom', 'left', 'right'] as const
      sides.forEach(side => {
        if (!currentBorderOptions.decorations![side]) {
          currentBorderOptions.decorations![side] = {}
        }

        // Handle nested property updates
        if (key.includes('.')) {
          const keys = key.split('.')
          let current = currentBorderOptions.decorations![side] as any
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
              current[keys[i]] = {}
            }
            current = current[keys[i]]
          }
          current[keys[keys.length - 1]] = value
        } else {
          ;(currentBorderOptions.decorations![side] as any)[key] = value
        }
      })
    } else {
      if (!currentBorderOptions.decorations[customTextOverridePosition]) {
        currentBorderOptions.decorations[customTextOverridePosition] = {}
      }

      // Handle nested property updates
      if (key.includes('.')) {
        const keys = key.split('.')
        let current = currentBorderOptions.decorations[customTextOverridePosition] as any
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {}
          }
          current = current[keys[i]]
        }
        current[keys[keys.length - 1]] = value
      } else {
        ;(currentBorderOptions.decorations[customTextOverridePosition] as any)[key] =
          value
      }
    }

    setAdvancedBorderOption('decorations', currentBorderOptions.decorations)
    
    // Ensure border is enabled when custom text is applied
    if (!currentBorderOptions.hasBorder) {
      setAdvancedBorderOption('hasBorder', true)
    }
  }

  const currentDecoration = getCurrentDecorationSettings()
  const currentFontSize = currentDecoration?.style?.fontSize || DEFAULT_FONT_SIZE
  const currentFontColor = currentDecoration?.style?.fontColor || DEFAULT_FONT_COLOR
  const currentOffset = currentDecoration?.offset || DEFAULT_DECORATION_OFFSET

  const resetCurrentSideSettings = () => {
    const { advancedOptions: currentAdvancedOptions } = useQrConfigStore.getState()
    const currentBorderOptions = { ...currentAdvancedOptions.borderOptions }

    if (!currentBorderOptions.decorations) {
      return
    }

    if (customTextOverridePosition === 'all') {
      // Reset all sides
      const sides = ['top', 'bottom', 'left', 'right'] as const
      sides.forEach(side => {
        if (currentBorderOptions.decorations![side]) {
          currentBorderOptions.decorations![side] = DEFAULT_DECORATION
        }
      })
    } else {
      // Reset only current side
      if (currentBorderOptions.decorations[customTextOverridePosition]) {
        currentBorderOptions.decorations[customTextOverridePosition] = DEFAULT_DECORATION
      }
    }

    setAdvancedBorderOption('decorations', currentBorderOptions.decorations)
    
    // Ensure border is enabled when custom text is applied
    if (!currentBorderOptions.hasBorder) {
      setAdvancedBorderOption('hasBorder', true)
    }
  }

  return (
    <Box className="mb-4 space-y-2 p-0">
      <Flex className="justify-start items-center gap-2">
        <Box
          onClick={() => setIsCustomTextOverrideEnabled(!isCustomTextOverrideEnabled)}
          className={`${isCustomTextOverrideEnabled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-300 dark:text-gray-600'} flex items-center gap-2 text-md font-medium cursor-pointer`}
        >
          Custom Text
        </Box>
        <Switch
          id="custom-text-override-toggle"
          isSelected={isCustomTextOverrideEnabled}
          onValueChange={setIsCustomTextOverrideEnabled}
          aria-label="Enable Custom Text"
          defaultSelected
          color="default"
          size="sm"
          classNames={{
            base: 'scale-85 origin-left'
          }}
        />
      </Flex>

      <Flex className="space-x-2 justify-start">
        <Box className="w-full lg:max-w-[130px]">
          <Select
            aria-label="Text Position"
            placeholder="Text Position"
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
            isDisabled={!isCustomTextOverrideEnabled}
            className="w-full"
          >
            {positionOptions.map(option => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </Box>

        <Input
          aria-label={getLabelForPosition(customTextOverridePosition)}
          placeholder={`Enter text for ${customTextOverridePosition}...`}
          value={currentTextValue}
          onValueChange={handleTextChange}
          variant="faded"
          isClearable
          isDisabled={!isCustomTextOverrideEnabled}
          classNames={{ inputWrapper: 'border-default-200' }}
          className="w-full"
        />
        <Popover placement="top">
          <PopoverTrigger>
            <Button
              isIconOnly
              variant="flat"
              title="Adjust Text Decoration"
              isDisabled={!isCustomTextOverrideEnabled}
            >
              <Settings2 size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-medium font-medium">
                  Text Settings:{' '}
                  {getLabelForPosition(customTextOverridePosition).replace(
                    'Text for ',
                    ''
                  )}
                </h4>
              </div>

              {/* Font Size Controls */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-default-600">Font Size</span>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        updateDecorationSetting(
                          'style.fontSize',
                          Math.max(12, currentFontSize - 2)
                        )
                      }
                    >
                      <span className="text-sm font-bold">A-</span>
                    </Button>
                    <span className="text-sm min-w-[35px] text-center">
                      {currentFontSize}px
                    </span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() =>
                        updateDecorationSetting(
                          'style.fontSize',
                          Math.min(48, currentFontSize + 2)
                        )
                      }
                    >
                      <span className="text-sm font-bold">A+</span>
                    </Button>
                  </div>
                </div>
                <Slider
                  size="sm"
                  step={1}
                  minValue={12}
                  maxValue={48}
                  value={currentFontSize}
                  onChange={value => updateDecorationSetting('style.fontSize', value)}
                  className="w-full"
                />
              </div>

              {/* Color Controls */}
              <div className="space-y-1.5">
                <GradientEditor
                  label="Text Color"
                  value={currentFontColor}
                  onChange={value => {
                    // Convert gradient to string if needed, or use first color
                    const colorValue =
                      typeof value === 'string'
                        ? value
                        : value?.colorStops?.[0]?.color || '#ffffff'
                    updateDecorationSetting('style.fontColor', colorValue)
                  }}
                />
              </div>

              {/* Decoration Offset */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-default-600">Decoration Offset</span>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() => updateDecorationSetting('offset', currentOffset - 1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="text-sm min-w-[30px] text-center">
                      {currentOffset}
                    </span>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onPress={() => updateDecorationSetting('offset', currentOffset + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-1 border-t border-default-200">
                <Button
                  size="sm"
                  variant="flat"
                  onPress={resetCurrentSideSettings}
                  className="w-full"
                >
                  Reset Settings
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}
