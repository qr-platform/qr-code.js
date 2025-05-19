import React from 'react'
import { Button, Input, Select, SelectItem, Switch } from '@heroui/react'
import type { Selection } from '@react-types/shared' // Removed AriaKey
import { RotateCcw } from 'lucide-react' // Icons

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
          isDisabled={!isCustomTextOverrideEnabled}
          classNames={{ inputWrapper: 'border-default-300' }}
          className="w-full"
        />
        <Button
          isIconOnly
          variant="flat"
          onPress={resetCustomTextOverrides}
          aria-label="Random"
          title="Random"
          isDisabled={!isCustomTextOverrideEnabled}
        >
          <RotateCcw size={18} />
        </Button>
      </Flex>
    </Box>
  )
}
