import React from 'react'
import { Button, Input, Select, SelectItem, Switch } from '@heroui/react'
import type { Selection } from '@react-types/shared' // Removed AriaKey
import { RotateCcw, Settings2 } from 'lucide-react' // Icons

import { useQrConfigStore } from '../../store/qrConfigStore' // Adjusted path
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

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  const getLabelForPosition = (position: 'all' | 'top' | 'bottom' | 'left' | 'right') => {
    const option = positionOptions.find(opt => opt.key === position)
    return option ? `Text for ${option.label}` : 'Custom Text'
  }

  return (
    <Box className="mb-4 space-y-2 p-2 border border-default-200 rounded-md">
      <Flex className="justify-between items-center gap-2">
        <label
          htmlFor="custom-text-override-toggle"
          className="flex items-center gap-2 text-md font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
        >
          <Settings2 size={18} className="text-default-500" />
          Custom Text Override
        </label>
        <Switch
          id="custom-text-override-toggle"
          isSelected={isCustomTextOverrideEnabled}
          onValueChange={setIsCustomTextOverrideEnabled}
          aria-label="Enable Custom Text Override"
          size="sm"
        />
      </Flex>

      <Flex className="space-x-2 justify-start">
        <Box className="w-full lg:max-w-[160px]">
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
          isDisabled={!isCustomTextOverrideEnabled}
          classNames={{ inputWrapper: 'border-default-300' }}
          className="w-full"
        />
      </Flex>

      <Flex className="justify-end gap-2 pt-1">
        <Button
          size="sm"
          variant="light"
          color="danger"
          onPress={() => setCustomTextOverride(customTextOverridePosition, '')}
          isDisabled={!isCustomTextOverrideEnabled || !currentTextValue}
        >
          Clear
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="warning"
          onPress={resetCustomTextOverrides}
          isDisabled={!isCustomTextOverrideEnabled}
          startContent={<RotateCcw size={14} />}
        >
          Reset All
        </Button>
      </Flex>
    </Box>
  )
}
