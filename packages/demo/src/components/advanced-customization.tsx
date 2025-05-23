import React, { useEffect, useRef, useState } from 'react'
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Slider,
  Tab,
  Tabs,
  useDisclosure
} from '@heroui/react'
import { Icon } from '@iconify/react'
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  ImageMode,
  Mode,
  ShapeType
} from '@qr-platform/qr-code.js'
import { useAtomValue } from 'jotai'
import { LinkIcon } from 'lucide-react'

import { qrConfigAtom } from '../store'
import GradientEditor from './ui/GradientEditor'

export const AdvancedCustomization: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)

  // Safety check - ensure qrConfig and advancedOptions are available
  if (!qrConfig || !qrConfig.advancedOptions) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-default-500">Loading advanced options...</p>
      </div>
    )
  }

  const { advancedOptions } = qrConfig

  // Ensure advancedOptions has the required structure
  const safeAdvancedOptions = {
    ...advancedOptions,
    qrOptions: advancedOptions.qrOptions || {},
    dotsOptions: advancedOptions.dotsOptions || {},
    cornersSquareOptions: advancedOptions.cornersSquareOptions || {},
    cornersDotOptions: advancedOptions.cornersDotOptions || {},
    backgroundOptions: advancedOptions.backgroundOptions || {},
    imageOptions: advancedOptions.imageOptions || {},
    borderOptions: advancedOptions.borderOptions || {}
  }

  const [presetName, setPresetName] = useState('')
  const [savedPresets, setSavedPresets] = useState<Array<{ name: string }>>([])
  const [selectedPresetToLoad, setSelectedPresetToLoad] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    isOpen: isDeleteConfirmOpen,
    onOpen: onDeleteConfirmOpen,
    onClose: onDeleteConfirmClose
  } = useDisclosure()
  const [presetToDelete, setPresetToDelete] = useState<string | null>(null)

  const refreshSavedPresets = () => {
    if (qrConfig.listSavedPresets) {
      setSavedPresets(qrConfig.listSavedPresets())
    }
  }

  useEffect(() => {
    refreshSavedPresets()
  }, [qrConfig.listSavedPresets])

  const handleAdvancedOptionChange = <K extends keyof typeof qrConfig.advancedOptions>(
    key: K,
    value: (typeof qrConfig.advancedOptions)[K]
  ) => {
    try {
      if (qrConfig.setAdvancedOption) {
        qrConfig.setAdvancedOption(key, value)
      }
    } catch (error) {
      console.error('Error setting advanced option:', error)
    }
  }

  const handleDotsOptionChange = <
    K extends keyof NonNullable<(typeof qrConfig.advancedOptions)['dotsOptions']>
  >(
    key: K,
    value: NonNullable<(typeof qrConfig.advancedOptions)['dotsOptions']>[K]
  ) => {
    if (qrConfig.setAdvancedDotsOption) {
      qrConfig.setAdvancedDotsOption(key, value)
    }
  }

  const handleCornersSquareOptionChange = <
    K extends keyof NonNullable<(typeof qrConfig.advancedOptions)['cornersSquareOptions']>
  >(
    key: K,
    value: NonNullable<(typeof qrConfig.advancedOptions)['cornersSquareOptions']>[K]
  ) => {
    if (qrConfig.setAdvancedCornersSquareOption) {
      qrConfig.setAdvancedCornersSquareOption(key, value)
    }
  }

  const handleCornersDotOptionChange = <
    K extends keyof NonNullable<(typeof qrConfig.advancedOptions)['cornersDotOptions']>
  >(
    key: K,
    value: NonNullable<(typeof qrConfig.advancedOptions)['cornersDotOptions']>[K]
  ) => {
    if (qrConfig.setAdvancedCornersDotOption) {
      qrConfig.setAdvancedCornersDotOption(key, value)
    }
  }

  const handleBackgroundOptionChange = <
    K extends keyof NonNullable<(typeof qrConfig.advancedOptions)['backgroundOptions']>
  >(
    key: K,
    value: NonNullable<(typeof qrConfig.advancedOptions)['backgroundOptions']>[K]
  ) => {
    if (qrConfig.setAdvancedBackgroundOption) {
      qrConfig.setAdvancedBackgroundOption(key, value)
    }
  }

  const handleQrOptionChange = <
    K extends keyof NonNullable<(typeof qrConfig.advancedOptions)['qrOptions']>
  >(
    key: K,
    value: NonNullable<(typeof qrConfig.advancedOptions)['qrOptions']>[K]
  ) => {
    try {
      if (qrConfig.setAdvancedQrOption) {
        qrConfig.setAdvancedQrOption(key, value)
      }
    } catch (error) {
      console.error('Error setting QR option:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Input
        label="QR Code Link or Data"
        placeholder="Enter URL or text"
        value={safeAdvancedOptions.data}
        classNames={{
          inputWrapper: 'border-blue-200',
          label: 'mb-1'
        }}
        onValueChange={value => handleAdvancedOptionChange('data', value)}
        variant="faded"
        startContent={<LinkIcon className="text-default-400 w-5 h-5" />}
      />
      <Tabs aria-label="QR Code Advanced Options" color="primary" variant="underlined">
        <Tab key="general" title="General">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Select
              label="Shape Type"
              placeholder="Select shape (default: square)"
              selectedKeys={safeAdvancedOptions.shape ? [safeAdvancedOptions.shape] : []}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as ShapeType | undefined
                if (selected) {
                  handleAdvancedOptionChange('shape', selected)
                } else {
                  // Remove the option if deselected
                  const newOptions = { ...safeAdvancedOptions }
                  delete newOptions.shape
                  if (qrConfig.setAdvancedOptions) {
                    qrConfig.setAdvancedOptions(newOptions)
                  }
                }
              }}
              variant="bordered"
            >
              {Object.values(ShapeType).map(s => (
                <SelectItem key={s} textValue={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Error Correction Level"
              selectedKeys={
                safeAdvancedOptions.qrOptions?.errorCorrectionLevel
                  ? [safeAdvancedOptions.qrOptions.errorCorrectionLevel]
                  : []
              }
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as ErrorCorrectionLevel | undefined
                if (selected) handleQrOptionChange('errorCorrectionLevel', selected)
              }}
              variant="bordered"
              description="Higher levels allow more damage to QR code"
            >
              {Object.values(ErrorCorrectionLevel).map(level => (
                <SelectItem key={level} textValue={level}>
                  {level} ({level === ErrorCorrectionLevel.L && 'Low 7%'}
                  {level === ErrorCorrectionLevel.M && 'Medium 15%'}
                  {level === ErrorCorrectionLevel.Q && 'Quartile 25%'}
                  {level === ErrorCorrectionLevel.H && 'High 30%'})
                </SelectItem>
              ))}
            </Select>

            <div>
              <p className="text-sm mb-2">Margin Size</p>
              <Slider
                size="sm"
                step={1}
                minValue={0}
                maxValue={20} // Increased max for better control
                value={safeAdvancedOptions.margin || 0}
                onChange={value =>
                  handleAdvancedOptionChange(
                    'margin',
                    typeof value === 'number' ? value : 0
                  )
                }
                className="max-w-md"
                marks={[
                  { value: 0, label: '0' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' }
                ]}
              />
            </div>
            <Input
              type="number"
              label="QR Type Number (0 for auto)"
              value={
                safeAdvancedOptions.qrOptions?.typeNumber !== undefined
                  ? safeAdvancedOptions.qrOptions.typeNumber.toString()
                  : '0'
              }
              onValueChange={val =>
                handleQrOptionChange('typeNumber', parseInt(val, 10) || 0)
              }
              variant="bordered"
              min="0"
              max="40"
              description="Higher numbers allow more data but create larger QR codes"
            />
            <Select
              label="QR Code Mode"
              placeholder="Auto-detect"
              selectedKeys={
                safeAdvancedOptions.qrOptions?.mode !== undefined
                  ? [safeAdvancedOptions.qrOptions.mode.toString()]
                  : []
              }
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as string
                if (selected && selected !== '') {
                  const modeValue = parseInt(selected, 10) as Mode
                  handleQrOptionChange('mode', modeValue)
                } else {
                  // Remove mode from qrOptions if deselected
                  const currentQrOptions = { ...safeAdvancedOptions.qrOptions }
                  delete currentQrOptions.mode
                  if (qrConfig.setAdvancedQrOption) {
                    Object.keys(currentQrOptions).forEach(key => {
                      qrConfig.setAdvancedQrOption(
                        key as any,
                        (currentQrOptions as any)[key]
                      )
                    })
                  }
                }
              }}
              variant="bordered"
              description="Encoding mode (auto-detect if not specified)"
            >
              <SelectItem key="" textValue="Auto-detect">
                Auto-detect
              </SelectItem>
              <SelectItem key="1" textValue="Numeric">
                Numeric (0-9)
              </SelectItem>
              <SelectItem key="2" textValue="Alphanumeric">
                Alphanumeric (A-Z, 0-9, space, $%*+-./:)
              </SelectItem>
              <SelectItem key="4" textValue="Byte">
                Byte (any character)
              </SelectItem>
              <SelectItem key="8" textValue="Kanji">
                Kanji (Japanese characters)
              </SelectItem>
            </Select>
          </div>
        </Tab>

        <Tab key="dotsCorners" title="Dots & Corners">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Dots Options */}
            <div className="space-y-4 p-4 border border-default-200 rounded-lg">
              <h4 className="text-md font-semibold text-default-700">Dots</h4>
              <Select
                label="Dots Type"
                selectedKeys={
                  advancedOptions.dotsOptions?.type
                    ? [advancedOptions.dotsOptions.type]
                    : []
                }
                onSelectionChange={keys => {
                  const selected = Array.from(keys)[0] as DotType | undefined
                  if (selected) handleDotsOptionChange('type', selected)
                }}
                variant="bordered"
              >
                {Object.values(DotType).map(type => (
                  <SelectItem key={type} textValue={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </Select>

              <GradientEditor
                label="Dots Color/Gradient"
                value={
                  advancedOptions.dotsOptions?.gradient ||
                  advancedOptions.dotsOptions?.color ||
                  '#000000'
                }
                onChange={value => {
                  if (typeof value === 'string') {
                    handleDotsOptionChange('color', value)
                    handleDotsOptionChange('gradient', undefined)
                  } else {
                    handleDotsOptionChange('gradient', value)
                    handleDotsOptionChange('color', undefined)
                  }
                }}
              />

              <div>
                <p className="text-sm mb-2">Dots Size Factor</p>
                <Slider
                  size="sm"
                  step={0.05}
                  minValue={0.1}
                  maxValue={1.5}
                  value={
                    advancedOptions.dotsOptions?.size !== undefined
                      ? advancedOptions.dotsOptions.size
                      : 1
                  }
                  onChange={value =>
                    handleDotsOptionChange('size', typeof value === 'number' ? value : 1)
                  }
                  className="max-w-md"
                  marks={[
                    { value: 0.1, label: '0.1' },
                    { value: 0.75, label: '0.75' },
                    { value: 1.5, label: '1.5' }
                  ]}
                />
              </div>
            </div>

            {/* Corners Options */}
            <div className="space-y-4 p-4 border border-default-200 rounded-lg">
              <h4 className="text-md font-semibold text-default-700">Corners</h4>
              <Select
                label="Corner Square Type"
                selectedKeys={
                  advancedOptions.cornersSquareOptions?.type
                    ? [advancedOptions.cornersSquareOptions.type]
                    : []
                }
                onSelectionChange={keys => {
                  const selected = Array.from(keys)[0] as CornerSquareType | undefined
                  if (selected) handleCornersSquareOptionChange('type', selected)
                }}
                variant="bordered"
              >
                {Object.values(CornerSquareType).map(type => (
                  <SelectItem key={type} textValue={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              <GradientEditor
                label="Corner Square Color/Gradient"
                value={
                  advancedOptions.cornersSquareOptions?.gradient ||
                  advancedOptions.cornersSquareOptions?.color ||
                  '#000000'
                }
                onChange={value => {
                  if (typeof value === 'string') {
                    handleCornersSquareOptionChange('color', value)
                    handleCornersSquareOptionChange('gradient', undefined)
                  } else {
                    handleCornersSquareOptionChange('gradient', value)
                    handleCornersSquareOptionChange('color', undefined)
                  }
                }}
              />

              <Select
                label="Corner Dot Type"
                selectedKeys={
                  advancedOptions.cornersDotOptions?.type
                    ? [advancedOptions.cornersDotOptions.type]
                    : []
                }
                onSelectionChange={keys => {
                  const selected = Array.from(keys)[0] as CornerDotType | undefined
                  if (selected) handleCornersDotOptionChange('type', selected)
                }}
                variant="bordered"
              >
                {Object.values(CornerDotType).map(type => (
                  <SelectItem key={type} textValue={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              <GradientEditor
                label="Corner Dot Color/Gradient"
                value={
                  advancedOptions.cornersDotOptions?.gradient ||
                  advancedOptions.cornersDotOptions?.color ||
                  '#000000'
                }
                onChange={value => {
                  if (typeof value === 'string') {
                    handleCornersDotOptionChange('color', value)
                    handleCornersDotOptionChange('gradient', undefined)
                  } else {
                    handleCornersDotOptionChange('gradient', value)
                    handleCornersDotOptionChange('color', undefined)
                  }
                }}
              />
            </div>
          </div>
        </Tab>

        <Tab key="backgroundAndImage" title="Background & Image">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <GradientEditor
              label="Background Color/Gradient"
              value={
                advancedOptions.backgroundOptions?.gradient ||
                advancedOptions.backgroundOptions?.color ||
                '#FFFFFF'
              }
              onChange={value => {
                if (typeof value === 'string') {
                  handleBackgroundOptionChange('color', value)
                  handleBackgroundOptionChange('gradient', undefined)
                } else {
                  handleBackgroundOptionChange('gradient', value)
                  handleBackgroundOptionChange('color', undefined)
                }
              }}
            />
            <div>
              <p className="text-sm mb-2">Background Roundness</p>
              <Slider
                size="sm"
                step={0.05}
                minValue={0}
                maxValue={1.0}
                value={
                  typeof advancedOptions.backgroundOptions?.round === 'number'
                    ? advancedOptions.backgroundOptions.round
                    : parseFloat(advancedOptions.backgroundOptions?.round || '0')
                }
                onChange={value =>
                  handleBackgroundOptionChange(
                    'round',
                    typeof value === 'number' ? value : 0
                  )
                }
                className="max-w-md"
                marks={[
                  { value: 0, label: '0%' },
                  { value: 0.5, label: '50%' },
                  { value: 1.0, label: '100%' }
                ]}
              />
            </div>
            {/* Image Options Section */}
            <div className="md:col-span-2 space-y-4 p-4 border border-default-200 rounded-lg mt-4">
              <h4 className="text-md font-semibold text-default-700">Image</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Image URL"
                  placeholder="https://example.com/logo.png"
                  value={advancedOptions.imageOptions?.image || ''}
                  onValueChange={val =>
                    qrConfig.setAdvancedImageOption &&
                    qrConfig.setAdvancedImageOption('image', val)
                  }
                  variant="bordered"
                />
                <Select
                  label="Image Mode"
                  selectedKeys={
                    advancedOptions.imageOptions?.mode
                      ? [advancedOptions.imageOptions.mode]
                      : []
                  }
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0] as ImageMode | undefined
                    if (selected && qrConfig.setAdvancedImageOption) {
                      qrConfig.setAdvancedImageOption('mode', selected)
                    }
                  }}
                  variant="bordered"
                  description="How the image is positioned in the QR code"
                >
                  {Object.values(ImageMode).map(mode => (
                    <SelectItem key={mode} textValue={mode}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
                <div>
                  <p className="text-sm mb-2">Image Size</p>
                  <Slider
                    size="sm"
                    step={0.05}
                    minValue={0.1}
                    maxValue={1.0}
                    value={
                      advancedOptions.imageOptions?.imageSize !== undefined
                        ? advancedOptions.imageOptions.imageSize
                        : 0.4
                    }
                    onChange={value =>
                      qrConfig.setAdvancedImageOption &&
                      qrConfig.setAdvancedImageOption(
                        'imageSize',
                        typeof value === 'number' ? value : 0.4
                      )
                    }
                    className="max-w-md"
                    marks={[
                      { value: 0.1, label: '10%' },
                      { value: 0.4, label: '40%' },
                      { value: 1.0, label: '100%' }
                    ]}
                  />
                </div>
                <div>
                  <p className="text-sm mb-2">Image Margin</p>
                  <Slider
                    size="sm"
                    step={1}
                    minValue={0}
                    maxValue={10}
                    value={
                      advancedOptions.imageOptions?.margin !== undefined
                        ? advancedOptions.imageOptions.margin
                        : 4
                    }
                    onChange={value =>
                      qrConfig.setAdvancedImageOption &&
                      qrConfig.setAdvancedImageOption(
                        'margin',
                        typeof value === 'number' ? value : 4
                      )
                    }
                    className="max-w-md"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 4, label: '4' },
                      { value: 10, label: '10' }
                    ]}
                  />
                </div>
                <Input
                  label="Cross Origin"
                  placeholder="anonymous, use-credentials"
                  value={advancedOptions.imageOptions?.crossOrigin || ''}
                  onValueChange={val =>
                    qrConfig.setAdvancedImageOption &&
                    qrConfig.setAdvancedImageOption('crossOrigin', val)
                  }
                  variant="bordered"
                  description="CORS setting for loading the image"
                />
                <GradientEditor
                  label="Image Fill Color/Gradient"
                  value={
                    advancedOptions.imageOptions?.fill?.gradient ||
                    advancedOptions.imageOptions?.fill?.color ||
                    'rgba(255,255,255,1)'
                  }
                  onChange={value => {
                    if (typeof value === 'string') {
                      qrConfig.setAdvancedImageOption &&
                        qrConfig.setAdvancedImageOption('fill', {
                          ...advancedOptions.imageOptions?.fill,
                          color: value,
                          gradient: undefined
                        })
                    } else {
                      qrConfig.setAdvancedImageOption &&
                        qrConfig.setAdvancedImageOption('fill', {
                          ...advancedOptions.imageOptions?.fill,
                          gradient: value,
                          color: undefined
                        })
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Tab>
        <Tab key="borders" title="Borders">
          <div className="pt-4 space-y-6">
            {/* Border Enable/Disable */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={advancedOptions.borderOptions?.hasBorder || false}
                  onChange={e =>
                    handleAdvancedBorderOption('hasBorder', e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Enable Border</span>
              </label>
            </div>

            {/* Border Configuration */}
            {advancedOptions.borderOptions?.hasBorder && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Border Options */}
                <div className="space-y-4 p-4 border border-default-200 rounded-lg">
                  <h4 className="text-md font-semibold text-default-700">Basic Border</h4>

                  <div>
                    <p className="text-sm mb-2">Border Thickness</p>
                    <Slider
                      size="sm"
                      step={5}
                      minValue={10}
                      maxValue={100}
                      value={advancedOptions.borderOptions?.thickness || 50}
                      onChange={value =>
                        handleAdvancedBorderOption(
                          'thickness',
                          typeof value === 'number' ? value : 50
                        )
                      }
                      className="max-w-md"
                      marks={[
                        { value: 10, label: '10px' },
                        { value: 50, label: '50px' },
                        { value: 100, label: '100px' }
                      ]}
                    />
                  </div>

                  <Input
                    label="Border Color"
                    value={advancedOptions.borderOptions?.color || '#000000'}
                    onValueChange={value => handleAdvancedBorderOption('color', value)}
                    variant="bordered"
                    type="color"
                  />

                  <Input
                    label="Border Radius"
                    placeholder="e.g., 10%, 20px"
                    value={advancedOptions.borderOptions?.radius || '0%'}
                    onValueChange={value => handleAdvancedBorderOption('radius', value)}
                    variant="bordered"
                    description="Border corner rounding (percentage or pixels)"
                  />

                  <Input
                    label="Background Color"
                    value={advancedOptions.borderOptions?.background || ''}
                    onValueChange={value =>
                      handleAdvancedBorderOption('background', value)
                    }
                    variant="bordered"
                    type="color"
                    description="Background color for the border area"
                  />
                </div>

                {/* Inner Content Positioning */}
                <div className="space-y-4 p-4 border border-default-200 rounded-lg">
                  <h4 className="text-md font-semibold text-default-700">
                    Inner Content
                  </h4>

                  <div>
                    <p className="text-sm mb-2">Inner Scale</p>
                    <Slider
                      size="sm"
                      step={0.05}
                      minValue={0.5}
                      maxValue={1.5}
                      value={advancedOptions.borderOptions?.inner?.scale || 1}
                      onChange={value => {
                        const currentInner = advancedOptions.borderOptions?.inner || {}
                        handleAdvancedBorderOption('inner', {
                          ...currentInner,
                          scale: typeof value === 'number' ? value : 1
                        })
                      }}
                      className="max-w-md"
                      marks={[
                        { value: 0.5, label: '50%' },
                        { value: 1, label: '100%' },
                        { value: 1.5, label: '150%' }
                      ]}
                    />
                  </div>

                  <div>
                    <p className="text-sm mb-2">Horizontal Offset</p>
                    <Slider
                      size="sm"
                      step={5}
                      minValue={-50}
                      maxValue={50}
                      value={advancedOptions.borderOptions?.inner?.horizontalOffset || 0}
                      onChange={value => {
                        const currentInner = advancedOptions.borderOptions?.inner || {}
                        handleAdvancedBorderOption('inner', {
                          ...currentInner,
                          horizontalOffset: typeof value === 'number' ? value : 0
                        })
                      }}
                      className="max-w-md"
                      marks={[
                        { value: -50, label: '-50px' },
                        { value: 0, label: '0px' },
                        { value: 50, label: '+50px' }
                      ]}
                    />
                  </div>

                  <div>
                    <p className="text-sm mb-2">Vertical Offset</p>
                    <Slider
                      size="sm"
                      step={5}
                      minValue={-50}
                      maxValue={50}
                      value={advancedOptions.borderOptions?.inner?.verticalOffset || 0}
                      onChange={value => {
                        const currentInner = advancedOptions.borderOptions?.inner || {}
                        handleAdvancedBorderOption('inner', {
                          ...currentInner,
                          verticalOffset: typeof value === 'number' ? value : 0
                        })
                      }}
                      className="max-w-md"
                      marks={[
                        { value: -50, label: '-50px' },
                        { value: 0, label: '0px' },
                        { value: 50, label: '+50px' }
                      ]}
                    />
                  </div>

                  <Input
                    label="Inner Border Radius"
                    placeholder="e.g., 5%, 10px"
                    value={advancedOptions.borderOptions?.inner?.radius || '0%'}
                    onValueChange={value => {
                      const currentInner = advancedOptions.borderOptions?.inner || {}
                      handleAdvancedBorderOption('inner', {
                        ...currentInner,
                        radius: value
                      })
                    }}
                    variant="bordered"
                    description="Corner rounding for inner content area"
                  />
                </div>
              </div>
            )}
          </div>
        </Tab>
        <Tab key="presets" title="Presets Management">
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-semibold text-default-700">
              Manage Configurations
            </h3>

            {/* Save Preset */}
            <div className="flex items-end gap-2">
              <Input
                label="Preset Name"
                placeholder="My Awesome QR Config"
                value={presetName}
                onValueChange={setPresetName}
                variant="bordered"
                className="flex-grow"
              />
              <Button
                color="primary"
                onPress={() => {
                  if (!presetName.trim()) {
                    addToast({
                      title: 'Error',
                      description: 'Preset name cannot be empty.',
                      color: 'danger'
                    })
                    return
                  }
                  if (qrConfig.savePreset) {
                    qrConfig.savePreset(presetName.trim())
                    addToast({
                      title: 'Success',
                      description: `Preset "${presetName.trim()}" saved.`,
                      color: 'success'
                    })
                    refreshSavedPresets()
                    setPresetName('')
                  }
                }}
                startContent={<Icon icon="lucide:save" />}
              >
                Save Current
              </Button>
            </div>

            {/* Load Preset */}
            {savedPresets.length > 0 && (
              <div className="flex items-end gap-2">
                <Select
                  label="Load Preset"
                  placeholder="Select a preset to load"
                  selectedKeys={selectedPresetToLoad ? [selectedPresetToLoad] : []}
                  onSelectionChange={keys =>
                    setSelectedPresetToLoad(Array.from(keys)[0]?.toString() || null)
                  }
                  variant="bordered"
                  className="flex-grow"
                >
                  {savedPresets.map(p => (
                    <SelectItem key={p.name} textValue={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  onPress={() => {
                    if (selectedPresetToLoad && qrConfig.loadPreset) {
                      qrConfig.loadPreset(selectedPresetToLoad)
                      addToast({
                        title: 'Success',
                        description: `Preset "${selectedPresetToLoad}" loaded.`,
                        color: 'success'
                      })
                    }
                  }}
                  disabled={!selectedPresetToLoad}
                  startContent={<Icon icon="lucide:upload" />}
                >
                  Load Selected
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    if (selectedPresetToLoad) {
                      setPresetToDelete(selectedPresetToLoad)
                      onDeleteConfirmOpen()
                    }
                  }}
                  disabled={!selectedPresetToLoad}
                  startContent={<Icon icon="lucide:trash-2" />}
                >
                  Delete
                </Button>
              </div>
            )}

            {/* Import/Export and Reset */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onPress={() => {
                  if (qrConfig.exportPresetToJSON) {
                    qrConfig.exportPresetToJSON()
                  }
                }}
                startContent={<Icon icon="lucide:file-export" />}
                variant="ghost"
              >
                Export to JSON
              </Button>
              <Button
                onPress={() => fileInputRef.current?.click()}
                startContent={<Icon icon="lucide:file-import" />}
                variant="ghost"
              >
                Import from JSON
              </Button>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={async e => {
                  const file = e.target.files?.[0]
                  if (file && qrConfig.importPresetFromJSON) {
                    try {
                      await qrConfig.importPresetFromJSON(file)
                      refreshSavedPresets()
                    } catch (_err) {
                      // Error already toasted by store
                    }
                  }
                  if (e.target) e.target.value = ''
                }}
              />
              <Button
                color="warning"
                variant="flat"
                onPress={() => {
                  if (qrConfig.resetToDefaults) {
                    qrConfig.resetToDefaults()
                    addToast({
                      title: 'Reset',
                      description: 'Configuration reset to defaults.',
                      color: 'default'
                    })
                  }
                }}
                startContent={<Icon icon="lucide:rotate-ccw" />}
              >
                Reset All to Defaults
              </Button>
            </div>
          </div>
        </Tab>
      </Tabs>
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteConfirmOpen} onClose={onDeleteConfirmClose}>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete the preset "<strong>{presetToDelete}</strong>
            "? This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onDeleteConfirmClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={() => {
              if (presetToDelete && qrConfig.deletePreset) {
                qrConfig.deletePreset(presetToDelete)
                addToast({
                  title: 'Deleted',
                  description: `Preset "${presetToDelete}" has been deleted.`,
                  color: 'success'
                })
                refreshSavedPresets()
                setSelectedPresetToLoad(null)
              }
              onDeleteConfirmClose()
            }}
          >
            Delete Preset
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
