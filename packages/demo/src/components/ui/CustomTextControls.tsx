import React from 'react'
import { Button, Input, Select, SelectItem, Switch, Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import type { Selection } from '@react-types/shared' // Removed AriaKey
// Icons - RotateCcw removed as it's no longer used

import { useQrConfigStore } from '../../store/qrConfigStore' // Adjusted path
import { Box, Flex } from './boxes'
import { GradientEditor } from './GradientEditor'

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
    setIsCustomTextOverrideEnabled,
    setCustomTextOverridePosition,
    setCustomTextOverride,
    resetCustomTextOverrides,
    // New store items for text styling
    getCustomTextStyle,
    setFontSize,
    setFontColor,
    setOffset
  } = useQrConfigStore()

  // Get current style for the selected position
  const currentStyle = getCustomTextStyle(customTextOverridePosition);

  const handleTextChange = (value: string) => {
    setCustomTextOverride(customTextOverridePosition, value)
  }

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  const getLabelForPosition = (position: 'all' | 'top' | 'bottom' | 'left' | 'right') => {
    const option = positionOptions.find(opt => opt.key === position)
    return option ? `Text for ${option.label}` : 'Custom Text'
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
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              onPress={() => console.log('Adjust Text Style clicked')}
              disabled={!isCustomTextOverrideEnabled}
            >
              Adjust Text Style
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <Flex className="items-center space-x-2">
              <span className="text-sm mr-2">Font Size: {currentStyle.fontSize}px</span>
              <Button
                size="sm"
                variant="flat"
                onPress={() => setFontSize(customTextOverridePosition, (currentStyle.fontSize || 0) - 1)}
              >
                A-
              </Button>
              <Button
                size="sm"
                variant="flat"
                onPress={() => setFontSize(customTextOverridePosition, (currentStyle.fontSize || 0) + 1)}
              >
                A+
              </Button>
            </Flex>
            <Box className="mt-4">
              <GradientEditor
                value={currentStyle.fontColor as string | object} // Cast to make TS happy, store returns object for gradient
                onChange={(newColor) => setFontColor(customTextOverridePosition, newColor)}
                label="Text Color"
              />
            </Box>
            <Flex className="mt-4 items-center space-x-2">
              <span className="text-sm mr-2">Offset: {currentStyle.offset}</span>
              <Button
                size="sm"
                variant="flat"
                onPress={() => setOffset(customTextOverridePosition, (currentStyle.offset || 0) - 1)}
              >
                - Offset
              </Button>
              <Button
                size="sm"
                variant="flat"
                onPress={() => setOffset(customTextOverridePosition, (currentStyle.offset || 0) + 1)}
              >
                + Offset
              </Button>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}
