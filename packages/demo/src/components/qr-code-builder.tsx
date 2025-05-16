import React, { useEffect, useState } from 'react'
import {
  AutocompleteItem,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs
} from '@heroui/react'
import { QRCodeJs } from '@qr-platform/qr-code.js' // Corrected import name
import { useAtomValue } from 'jotai'
import {
  Code,
  Image,
  LayoutTemplate,
  Link as LinkIcon,
  Palette,
  Settings,
  Square,
  Text
} from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'

import {
  imageOptions
  // qrBorderTemplates, // Removed
  // qrStyleDefinitions, // Removed
  // qrTemplates, // Removed
  // qrTextTemplates // Removed
} from '../data/qr-data'
import { qrConfigAtom } from '../store'
import { AdvancedCustomization } from './advanced-customization'
import { QRCodePreview } from './qr-code-preview'
import { Autocomplete } from './ui/autocomplete'

export const QRCodeBuilder: React.FC = () => {
  const templatesData = QRCodeJs.getTemplates() // Use corrected import name
  const qrConfig = useAtomValue(qrConfigAtom) // Removed unused setQrConfig
  const {
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    selectedBorderId,
    qrData,
    editMode,
    setEditMode,
    setQrData
  } = qrConfig

  const [qrCodeData, setQrCodeData] = useState(qrData)
  // const [editMode, setEditMode] = useState('Templates')
  const debouncedSetQrData = useDebounceCallback(setQrData, 500)

  useEffect(() => {
    debouncedSetQrData(qrCodeData)
  }, [qrCodeData, debouncedSetQrData])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-default-200 shadow-sm rounded-lg">
          <CardBody className="gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">QR Code Configuration</h2>
              <div className="flex items-center gap-2">
                <Tabs
                  key="solid"
                  aria-label="Tabs variants"
                  variant="solid"
                  onSelectionChange={selectedMode => {
                    setEditMode(selectedMode as string)
                  }}
                >
                  <Tab
                    key="Templates"
                    title={
                      <div className="flex items-center space-x-2">
                        <LayoutTemplate className="text-default-400 w-4 h-4" />
                        <span>Templates</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Advanced"
                    title={
                      <div className="flex items-center space-x-2">
                        <Settings className="text-default-400 w-4 h-4" />
                        <span>Advanced</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Code"
                    title={
                      <div className="flex items-center space-x-2">
                        <Code className="text-default-400 w-4 h-4" />
                        <span>Code</span>
                      </div>
                    }
                  />
                </Tabs>
              </div>
            </div>

            {editMode === 'Templates' ? (
              <div>
                <Input
                  label="QR Code Link or Data"
                  placeholder="Enter URL or text"
                  className="mb-4"
                  value={qrCodeData}
                  classNames={{
                    inputWrapper: 'border-blue-200',
                    label: 'mb-1'
                  }}
                  onValueChange={value => {
                    setQrCodeData(value)
                  }}
                  variant="faded"
                  startContent={<LinkIcon className="text-default-400 w-5 h-5" />}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Autocomplete
                    label="Base Template"
                    placeholder="Select a base template"
                    classNames={{
                      label: 'mb-1'
                    }}
                    itemHeight={40}
                    selectedKey={qrConfig.selectedTemplateId || ''}
                    onSelectionChange={key => {
                      const selected = key?.toString() || ''
                      if (qrConfig.setSelectedTemplateId) {
                        qrConfig.setSelectedTemplateId(selected)
                      }
                    }}
                    variant="bordered"
                    startContent={<LayoutTemplate className="text-default-400 w-5 h-5" />}
                  >
                    {[
                      ...templatesData.baseTemplates.map(
                        ({ id, name }: { id: string; name: string }) => (
                          <AutocompleteItem key={id} textValue={name}>
                            {name}
                          </AutocompleteItem>
                        )
                      )
                    ]}
                  </Autocomplete>

                  <Autocomplete
                    label="Border Template"
                    placeholder="Select a border template"
                    classNames={{
                      label: 'mb-1'
                    }}
                    selectedKey={selectedBorderId || ''}
                    onSelectionChange={key => {
                      const selected = key?.toString() || ''
                      if (qrConfig.setSelectedBorderId) {
                        qrConfig.setSelectedBorderId(selected)
                      }
                    }}
                    itemHeight={40}
                    variant="bordered"
                    startContent={<Square className="text-default-400 w-5 h-5" />}
                  >
                    {[
                      <AutocompleteItem key="--" textValue="-- No Border --">
                        -- No Border --
                      </AutocompleteItem>,
                      ...templatesData.borderTemplates.map(
                        (border: { id: string; name: string }) => (
                          <AutocompleteItem key={border.id} textValue={border.name}>
                            {border.name}
                          </AutocompleteItem>
                        )
                      )
                    ]}
                  </Autocomplete>

                  <Autocomplete
                    label="Base Style"
                    placeholder="Select a base style"
                    itemHeight={40}
                    selectedKey={selectedStyleId || ''}
                    classNames={{
                      label: 'mb-1'
                    }}
                    onSelectionChange={key => {
                      const selected = key?.toString() || ''
                      if (qrConfig.setSelectedStyleId)
                        qrConfig.setSelectedStyleId(selected)
                    }}
                    variant="bordered"
                    startContent={<Palette className="text-default-400 w-5 h-5" />}
                  >
                    {[
                      <AutocompleteItem key="" textValue="-- Use Template's Style --">
                        -- Use Template's Style --
                      </AutocompleteItem>,
                      ...templatesData.styleTemplates.map(
                        (style: { id: string; name: string }) => (
                          <AutocompleteItem
                            key={String(style.id)}
                            textValue={String(style.name)}
                          >
                            {String(style.name)}
                          </AutocompleteItem>
                        )
                      )
                    ]}
                  </Autocomplete>

                  <Select
                    label="Logo Image"
                    placeholder="Select a logo image"
                    itemHeight={40}
                    selectedKeys={selectedImageId ? [selectedImageId] : []}
                    classNames={{
                      label: 'mb-1'
                    }}
                    onSelectionChange={keys => {
                      const selected = Array.from(keys)[0]?.toString() || 'none'
                      if (qrConfig.setSelectedImageId)
                        qrConfig.setSelectedImageId(selected)
                    }}
                    variant="bordered"
                    startContent={<Image className="text-default-400 w-5 h-5" />}
                  >
                    {imageOptions.map(img => (
                      <SelectItem key={img.id} textValue={img.name} title={img.name}>
                        {img.name}
                      </SelectItem>
                    ))}
                  </Select>

                  <Autocomplete
                    label="Text Template"
                    placeholder="Select a text template"
                    classNames={{
                      label: 'mb-1'
                    }}
                    itemHeight={40}
                    selectedKey={selectedTextTemplateId || ''}
                    onSelectionChange={key => {
                      const selected = key?.toString() || ''
                      if (qrConfig.setSelectedTextTemplateId) {
                        qrConfig.setSelectedTextTemplateId(selected)
                      }
                    }}
                    variant="bordered"
                    startContent={<Text className="text-default-400 w-5 h-5" />}
                  >
                    {[
                      <AutocompleteItem key="" textValue="-- No Text Override --">
                        -- No Text Override --
                      </AutocompleteItem>,
                      ...templatesData.textTemplates.map(
                        (textTemplate: { id: string; name: string }) => (
                          <AutocompleteItem
                            key={textTemplate.id}
                            textValue={textTemplate.name}
                          >
                            {textTemplate.name} ({textTemplate.id})
                          </AutocompleteItem>
                        )
                      )
                    ]}
                  </Autocomplete>
                </div>
              </div>
            ) : editMode === 'Advanced' ? (
              <AdvancedCustomization />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="QR Code Link or Data"
                  placeholder="Enter URL or text"
                  value={qrCodeData}
                  classNames={{
                    inputWrapper: 'border-blue-200',
                    label: 'mb-1'
                  }}
                  onValueChange={value => {
                    setQrCodeData(value)
                  }}
                  variant="faded"
                  startContent={<LinkIcon className="text-default-400 w-5 h-5" />}
                />
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <div>
        <QRCodePreview />
      </div>
    </div>
  )
}
