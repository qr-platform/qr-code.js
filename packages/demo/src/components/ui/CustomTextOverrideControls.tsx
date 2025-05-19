import React from 'react'
import { Button, Input, Select, SelectItem, Switch } from '@heroui/react'
import type { Selection } from '@react-types/shared'
import { Settings2, X } from 'lucide-react'

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

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  return (
    <Box className="mb-4 space-y-2">
      <Flex className="gap-2">
        <Box className="flex-1">
          <Flex className="font-medium text-default-700 dark:text-default-500 mb-1 pl-1 justify-between items-center">
            <Box>Custom Text</Box>
            <Switch
              id="custom-text-override-toggle"
              isSelected={isCustomTextOverrideEnabled}
              onValueChange={setIsCustomTextOverrideEnabled}
              aria-label="Enable Custom Text Override"
              size="sm"
              classNames={{
                base: 'scale-75 origin-left',
                wrapper: 'group-data-[selected=true]:bg-primary-500'
              }}
            />
          </Flex>

          <div className="relative">
            <Input
              placeholder="Enter custom text..."
              value={currentTextValue}
              onValueChange={handleTextChange}
              disabled={!isCustomTextOverrideEnabled}
              startContent={
                <Settings2 size={16} className="text-default-400 flex-shrink-0" />
              }
              className="w-full"
              classNames={{
                inputWrapper: 'border-default-300'
              }}
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 bg-gray-100/80 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800/10 dark:hover:text-gray-200"
                isDisabled={!isCustomTextOverrideEnabled || !currentTextValue}
              >
                <X size={14} />
              </Button>
            )}
          </div>
        </Box>

        <Box className="flex-1">
          <Box className="font-medium text-default-700 dark:text-default-500 mb-1 pl-1">
            Text Position
          </Box>
          <div className="relative">
            <Select
              aria-label="Text Position"
              placeholder="Select position"
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
              className="w-full"
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-500 bg-gray-100/80 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800/10 dark:hover:text-gray-200"
              isDisabled={!isCustomTextOverrideEnabled}
            >
              <X size={14} />
            </Button>
          </div>
        </Box>
      </Flex>
    </Box>
  )
}
