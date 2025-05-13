import React from 'react'
import { Card, CardBody, Input, Select, SelectItem, Switch } from '@heroui/react'
import { Icon } from '@iconify/react'

import { useQRCode } from '../context/qr-code-context'
import {
  imageOptions,
  qrStyleDefinitions,
  qrTemplates,
  qrTextTemplates
} from '../data/qr-data'
import { AdvancedCustomization } from './advanced-customization'
import { QRCodePreview } from './qr-code-preview'

export const QRCodeBuilder: React.FC = () => {
  const {
    selectedTemplateId,
    setSelectedTemplateId,
    selectedStyleId,
    setSelectedStyleId,
    selectedImageId,
    setSelectedImageId,
    selectedTextTemplateId,
    setSelectedTextTemplateId,
    qrData,
    setQrData,
    isAdvancedMode,
    setIsAdvancedMode
  } = useQRCode()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-default-200 shadow-sm rounded-lg">
          <CardBody className="gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">QR Code Configuration</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-default-600">Advanced Mode</span>
                <Switch
                  size="sm"
                  isSelected={isAdvancedMode}
                  onValueChange={setIsAdvancedMode}
                  color="primary"
                />
              </div>
            </div>

            {!isAdvancedMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="QR Code Data"
                    placeholder="Enter URL or text"
                    value={qrData}
                    onValueChange={setQrData}
                    variant="bordered"
                    startContent={
                      <Icon icon="lucide:link" className="text-default-400" />
                    }
                  />
                </div>

                <Select
                  label="Base Template"
                  placeholder="Select a base template"
                  selectedKeys={selectedTemplateId ? [selectedTemplateId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    setSelectedTemplateId(selected)
                  }}
                  variant="bordered"
                  startContent={
                    <Icon icon="lucide:layout-template" className="text-default-400" />
                  }
                >
                  {[
                    <SelectItem key="start" textValue="-- Dynamic (Original Logic) --">
                      -- Dynamic (Original Logic) --
                    </SelectItem>,
                    ...qrTemplates.map(({ id, name }) => (
                      <SelectItem key={id} textValue={name}>
                        {name} ({id})
                      </SelectItem>
                    ))
                  ]}
                </Select>

                <Select
                  label="Base Style"
                  placeholder="Select a base style"
                  selectedKeys={selectedStyleId ? [selectedStyleId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    setSelectedStyleId(selected)
                  }}
                  variant="bordered"
                  startContent={
                    <Icon icon="lucide:palette" className="text-default-400" />
                  }
                >
                  {[
                    <SelectItem key="" textValue="-- Use Template's Style --">
                      -- Use Template's Style --
                    </SelectItem>,
                    ...qrStyleDefinitions.map(style => (
                      <SelectItem key={String(style.id)} textValue={String(style.name)}>
                        {String(style.name)} ({String(style.id)})
                      </SelectItem>
                    ))
                  ]}
                </Select>

                <Select
                  label="Logo Image"
                  placeholder="Select a logo image"
                  selectedKeys={selectedImageId ? [selectedImageId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || 'none'
                    setSelectedImageId(selected)
                  }}
                  variant="bordered"
                  startContent={<Icon icon="lucide:image" className="text-default-400" />}
                >
                  {imageOptions.map(img => (
                    <SelectItem key={img.id} textValue={img.name} title={img.name}>
                      {img.name}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Text Template (Overrides Border Text)"
                  placeholder="Select a text template"
                  selectedKeys={selectedTextTemplateId ? [selectedTextTemplateId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    setSelectedTextTemplateId(selected)
                  }}
                  variant="bordered"
                  startContent={<Icon icon="lucide:text" className="text-default-400" />}
                >
                  {[
                    <SelectItem key="" textValue="-- No Text Override --">
                      -- No Text Override --
                    </SelectItem>,
                    ...qrTextTemplates.map(textTemplate => (
                      <SelectItem key={textTemplate.id} textValue={textTemplate.name}>
                        {textTemplate.name} ({textTemplate.id})
                      </SelectItem>
                    ))
                  ]}
                </Select>
              </div>
            ) : (
              <AdvancedCustomization />
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
