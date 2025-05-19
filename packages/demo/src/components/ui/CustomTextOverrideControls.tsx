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
    <Box className="space-y-3 p-1 border border-dashed border-default-300 rounded-md">
      <Flex className="justify-between items-center">
        <label
          htmlFor="custom-text-override-toggle"
          className="text-md font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
        >
          <Settings2 size={18} className="text-default-500" />
          Custom Text Override
        </label>
        <Switch
          id="custom-text-override-toggle"
          isSelected={isCustomTextOverrideEnabled}
          onValueChange={setIsCustomTextOverrideEnabled}
          aria-label="Enable Custom Text Override"
        />
      </Flex>

      {isCustomTextOverrideEnabled && (
        <Box className="space-y-3 animate-in fade-in duration-300">
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
          >
            {positionOptions.map(option => (
              <SelectItem key={option.key} textValue={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

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
          />
          <Button
            size="sm"
            variant="light"
            color="danger"
            onPress={() => {
              // Reset only the current position's text or all if 'all' is selected?
              // For now, let's make it reset all custom texts if the toggle is on.
              // Or perhaps a more granular reset for the current field?
              // The plan mentions resetCustomTextOverrides for the whole feature.
              // Let's add a button to clear the current field.
              setCustomTextOverride(customTextOverridePosition, '')
            }}
            disabled={!isCustomTextOverrideEnabled || !currentTextValue}
            className="mt-1"
          >
            Clear Current Text
          </Button>
          <Button
            size="sm"
            variant="ghost"
            color="warning"
            onPress={resetCustomTextOverrides}
            disabled={!isCustomTextOverrideEnabled}
            startContent={<RotateCcw size={14} />}
            className="mt-1"
          >
            Reset All Custom Text Settings
          </Button>
        </Box>
      )}
    </Box>
  )
}
