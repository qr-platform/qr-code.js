import React, { useEffect, useState } from 'react'
import { Card, CardBody, Input, Select, SelectItem, Switch } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useAtomValue } from 'jotai'
import { useDebounceCallback } from 'usehooks-ts'

import {
  imageOptions,
  qrBorderTemplates, // Added
  qrStyleDefinitions,
  qrTemplates,
  qrTextTemplates
} from '../data/qr-data'
import { qrConfigAtom } from '../store'
import { AdvancedCustomization } from './advanced-customization'
import { QRCodePreview } from './qr-code-preview'

export const QRCodeBuilder: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom) // Removed unused setQrConfig
  const {
    selectedTemplateId,
    selectedStyleId,
    selectedImageId,
    selectedTextTemplateId,
    selectedBorderId,
    qrData,
    setIsAdvancedMode,
    setQrData,
    isAdvancedMode
  } = qrConfig

  const [qrCodeData, setQrCodeData] = useState(qrData)
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
                <span className="text-sm text-default-600">Advanced Mode</span>
                <Switch
                  size="sm"
                  isSelected={isAdvancedMode}
                  onValueChange={checked => {
                    setIsAdvancedMode(checked)
                  }}
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
                    value={qrCodeData}
                    onValueChange={value => {
                      setQrCodeData(value)
                    }}
                    classNames={{
                      inputWrapper: 'border-blue-200',
                      label: 'mb-1'
                    }}
                    variant="faded"
                    startContent={
                      <Icon icon="lucide:link" className="text-default-400" />
                    }
                  />
                </div>

                <Select
                  label="Base Template"
                  placeholder="Select a base template"
                  classNames={{
                    label: 'mb-1'
                  }}
                  itemHeight={40}
                  selectedKeys={selectedTemplateId ? [selectedTemplateId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    if (qrConfig.setSelectedTemplateId) {
                      qrConfig.setSelectedTemplateId(selected)
                    }
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
                  itemHeight={40}
                  selectedKeys={selectedStyleId ? [selectedStyleId] : []}
                  classNames={{
                    label: 'mb-1'
                  }}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    if (qrConfig.setSelectedStyleId) qrConfig.setSelectedStyleId(selected)
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
                  itemHeight={40}
                  selectedKeys={selectedImageId ? [selectedImageId] : []}
                  classNames={{
                    label: 'mb-1'
                  }}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || 'none'
                    if (qrConfig.setSelectedImageId) qrConfig.setSelectedImageId(selected)
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
                  label="Text Template"
                  placeholder="Select a text template"
                  classNames={{
                    label: 'mb-1'
                  }}
                  itemHeight={40}
                  selectedKeys={selectedTextTemplateId ? [selectedTextTemplateId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    if (qrConfig.setSelectedTextTemplateId) {
                      qrConfig.setSelectedTextTemplateId(selected)
                    }
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

                <Select
                  label="Border Template"
                  placeholder="Select a border template"
                  classNames={{
                    label: 'mb-1'
                  }}
                  selectedKeys={selectedBorderId ? [selectedBorderId] : []}
                  onSelectionChange={keys => {
                    const selected = Array.from(keys)[0]?.toString() || ''
                    if (qrConfig.setSelectedBorderId) {
                      qrConfig.setSelectedBorderId(selected)
                    }
                  }}
                  itemHeight={40}
                  variant="bordered"
                  startContent={
                    <Icon icon="lucide:square" className="text-default-400" />
                  }
                >
                  {[
                    <SelectItem key="" textValue="-- No Border --">
                      -- No Border --
                    </SelectItem>,
                    ...qrBorderTemplates.map(border => (
                      <SelectItem key={border.id} textValue={border.name}>
                        {border.name} ({border.id})
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
