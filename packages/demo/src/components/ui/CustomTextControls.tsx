import React from 'react'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Switch
} from '@heroui/react'
import type { Selection } from '@react-types/shared'
import { Minus, Plus, Sliders } from 'lucide-react'

import { useQrConfigStore } from '../../store/qrConfigStore' // Adjusted path
import { Box, Flex } from './boxes'
import GradientEditor from './GradientEditor'

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
    customTextDecorationOptions,
    setIsCustomTextOverrideEnabled,
    setCustomTextOverridePosition,
    setCustomTextOverride,
    setCustomTextDecorationOption
  } = useQrConfigStore()

  const handleTextChange = (value: string) => {
    setCustomTextOverride(customTextOverridePosition, value)
  }

  const currentTextValue = customTextOverrides[customTextOverridePosition] || ''

  const currentDecoration = customTextDecorationOptions[customTextOverridePosition] || {}
  const currentFontSize = currentDecoration.style?.fontSize || 28
  const currentFontColor = currentDecoration.style?.fontColor || '#ffffff'
  const currentOffset = currentDecoration.offset || 0

  const adjustFontSize = (delta: number) => {
    setCustomTextDecorationOption(customTextOverridePosition, {
      style: { fontSize: currentFontSize + delta }
    })
  }

  const adjustOffset = (delta: number) => {
    setCustomTextDecorationOption(customTextOverridePosition, {
      offset: currentOffset + delta
    })
  }

  const handleColorChange = (value: string | any) => {
    const color =
      typeof value === 'string' ? value : value?.colorStops?.[0]?.color || '#000000'
    setCustomTextDecorationOption(customTextOverridePosition, {
      style: { fontColor: color }
    })
  }

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
          isClearable
          isDisabled={!isCustomTextOverrideEnabled}
          classNames={{ inputWrapper: 'border-default-300' }}
          className="w-full"
        />
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              isIconOnly
              variant="flat"
              title="Adjust Text"
              isDisabled={!isCustomTextOverrideEnabled}
            >
              <Sliders size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 space-y-3 w-56">
            <div className="flex items-center justify-between">
              <span className="text-sm">Font Size: {currentFontSize}px</span>
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => adjustFontSize(-1)}
                >
                  <Minus size={14} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => adjustFontSize(1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <GradientEditor
              value={currentFontColor}
              onChange={handleColorChange}
              label="Font Color"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">Offset: {currentOffset}</span>
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => adjustOffset(-1)}
                >
                  <Minus size={14} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={() => adjustOffset(1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}
