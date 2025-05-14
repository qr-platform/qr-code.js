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
  ShapeType
} from '@qr-platform/qr-code.js'
import { useAtomValue } from 'jotai'

import { qrConfigAtom } from '../store'
import GradientEditor from './GradientEditor'

export const AdvancedCustomization: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)
  const { advancedOptions } = qrConfig

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
    if (qrConfig.setAdvancedOption) {
      qrConfig.setAdvancedOption(key, value)
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
    if (qrConfig.setAdvancedQrOption) {
      qrConfig.setAdvancedQrOption(key, value)
    }
  }

  return (
    <div className="space-y-6">
      <Input
        label="QR Code Data (Advanced)"
        placeholder="Enter URL or text for advanced QR"
        value={advancedOptions.data}
        onValueChange={value => handleAdvancedOptionChange('data', value)}
        variant="bordered"
        className="mb-4"
      />
      <Tabs aria-label="QR Code Advanced Options" color="primary" variant="underlined">
        <Tab key="general" title="General">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Select
              label="Shape Type"
              selectedKeys={advancedOptions.shape ? [advancedOptions.shape] : []}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as ShapeType | undefined
                if (selected) handleAdvancedOptionChange('shape', selected)
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
                advancedOptions.qrOptions?.errorCorrectionLevel
                  ? [advancedOptions.qrOptions.errorCorrectionLevel]
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
                value={advancedOptions.margin || 0}
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
            {/* TODO: Add controls for qrOptions.typeNumber and qrOptions.mode */}
            <Input
              type="number"
              label="QR Type Number (0 for auto)"
              value={advancedOptions.qrOptions?.typeNumber?.toString() || '0'}
              onValueChange={val =>
                handleQrOptionChange('typeNumber', parseInt(val, 10) || 0)
              }
              variant="bordered"
              min="0"
              max="40"
            />
            {/* Consider Select for qrOptions.mode if it's an enum */}
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
              {/* TODO: Add more image options: mode, imageSize, margin, crossOrigin, fill */}
              <p className="text-sm text-default-500">
                More image options (size, margin, etc.) coming soon.
              </p>
            </div>
          </div>
        </Tab>
        <Tab key="borders" title="Borders">
          <div className="pt-4">
            {/* TODO: Implement Border Options UI here from BorderCustomization.tsx or similar */}
            <p className="text-default-500">
              Full border customization options will be implemented here.
            </p>
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
