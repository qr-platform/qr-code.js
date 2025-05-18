import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, CardBody, Input, Tab, Tabs } from '@heroui/react'
import { useAtomValue } from 'jotai'
import {
  Code,
  Image,
  LayoutTemplate,
  Link as LinkIcon,
  Palette,
  RotateCcw,
  Settings,
  Shuffle,
  Square,
  Text
} from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'

import { imageOptions } from '../data/qr-data'
import { qrConfigAtom, templatesData } from '../store'
import { AdvancedCustomization } from './advanced-customization'
import { QRCodePreview } from './qr-code-preview'
import { Flex } from './ui/boxes'
import TemplateControls from './ui/TemplateControls' // Changed to default import

export const QRCodeBuilder: React.FC = () => {
  const qrConfig = useAtomValue(qrConfigAtom)
  const { qrData, editMode, setEditMode, setQrData } = qrConfig

  const [qrCodeData, setQrCodeData] = useState(qrData)
  // const [editMode, setEditMode] = useState('Templates')
  const debouncedSetQrData = useDebounceCallback(setQrData, 500)

  const handleCopyLink = useCallback(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('templateId', qrConfig.selectedTemplateId)
    url.searchParams.set('styleId', qrConfig.selectedStyleId)
    url.searchParams.set('borderId', qrConfig.selectedBorderId)
    if (qrConfig.selectedImageId && qrConfig.selectedImageId !== 'none') {
      url.searchParams.set('image', qrConfig.selectedImageId)
    } else {
      url.searchParams.delete('image')
    }
    url.searchParams.set('textTemplateId', qrConfig.selectedTextTemplateId)
    void navigator.clipboard.writeText(url.toString())
  }, [qrConfig])

  useEffect(() => {
    debouncedSetQrData(qrCodeData)
  }, [qrCodeData, debouncedSetQrData])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-default-200 shadow-sm rounded-lg h-full">
          <CardBody className="gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">QR Code Configuration</h2>
              <div className="flex items-center gap-2">
                <Tabs
                  key="solid"
                  aria-label="Tabs variants"
                  size="lg"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="w-full">
                    <TemplateControls
                      label="Base Template"
                      placeholder="Select a base template"
                      options={templatesData.baseTemplates}
                      selectedKey={qrConfig.selectedTemplateId || ''}
                      isDefaultSelected={
                        qrConfig.selectedTemplateId ===
                        qrConfig.initialDefaultSelectedTemplateId
                      }
                      onSelectionChange={(key: React.Key | null) =>
                        qrConfig.setSelectedTemplateId(key?.toString() || '')
                      }
                      onRandom={qrConfig.setRandomBaseTemplate}
                      onNext={qrConfig.setNextBaseTemplate}
                      onPrev={qrConfig.setPrevBaseTemplate}
                      onReset={qrConfig.resetBaseTemplate}
                      startContentIcon={
                        <LayoutTemplate className="text-default-400 w-5 h-5" />
                      }
                      galleryTabId="base"
                    />
                  </div>
                  <div className="w-full">
                    <TemplateControls
                      label="Border Template"
                      placeholder="Select a border template"
                      options={templatesData.borderTemplates}
                      selectedKey={qrConfig.selectedBorderId || ''}
                      isDefaultSelected={
                        qrConfig.selectedBorderId ===
                        qrConfig.initialDefaultSelectedBorderId
                      }
                      onSelectionChange={(key: React.Key | null) =>
                        qrConfig.setSelectedBorderId(key?.toString() || '')
                      }
                      onRandom={qrConfig.setRandomBorderTemplate}
                      onNext={qrConfig.setNextBorderTemplate}
                      onPrev={qrConfig.setPrevBorderTemplate}
                      onReset={qrConfig.resetBorderTemplate}
                      startContentIcon={<Square className="text-default-400 w-5 h-5" />}
                      noSelectionItem={{ key: '--', textValue: '-- No Border --' }}
                      galleryTabId="borders"
                    />
                  </div>
                  <div className="w-full">
                    <TemplateControls
                      label="Base Style"
                      placeholder="Select a base style"
                      isDefaultSelected={
                        qrConfig.selectedStyleId ===
                        qrConfig.initialDefaultSelectedStyleId
                      }
                      options={templatesData.styleTemplates}
                      selectedKey={qrConfig.selectedStyleId || ''}
                      onSelectionChange={(key: React.Key | null) =>
                        qrConfig.setSelectedStyleId(key?.toString() || '')
                      }
                      onRandom={qrConfig.setRandomStyleTemplate}
                      onNext={qrConfig.setNextStyleTemplate}
                      onPrev={qrConfig.setPrevStyleTemplate}
                      onReset={qrConfig.resetStyleTemplate}
                      startContentIcon={<Palette className="text-default-400 w-5 h-5" />}
                      noSelectionItem={{
                        key: '',
                        textValue: "-- Use Template's Style --"
                      }}
                      galleryTabId="styles"
                    />
                  </div>
                  <div className="w-full">
                    <TemplateControls
                      label="Logo Image"
                      placeholder="Select a logo image"
                      options={imageOptions}
                      isDefaultSelected={
                        qrConfig.selectedImageId ===
                        qrConfig.initialDefaultSelectedImageId
                      }
                      selectedKey={qrConfig.selectedImageId || ''}
                      onSelectionChange={(key: React.Key | null) =>
                        qrConfig.setSelectedImageId(key?.toString() || '')
                      }
                      onRandom={qrConfig.setRandomImage}
                      onNext={qrConfig.setNextImage}
                      onPrev={qrConfig.setPrevImage}
                      onReset={qrConfig.resetImage}
                      startContentIcon={<Image className="text-default-400 w-5 h-5" />}
                      galleryTabId="images"
                    />
                  </div>
                  <div className="w-full">
                    <TemplateControls
                      label="Text Template"
                      placeholder="Select a text template"
                      options={templatesData.textTemplates}
                      isDefaultSelected={
                        qrConfig.selectedTextTemplateId ===
                        qrConfig.initialDefaultSelectedTextTemplateId
                      }
                      selectedKey={qrConfig.selectedTextTemplateId || ''}
                      onSelectionChange={(key: React.Key | null) =>
                        qrConfig.setSelectedTextTemplateId(key?.toString() || '')
                      }
                      onRandom={qrConfig.setRandomTextTemplate}
                      onNext={qrConfig.setNextTextTemplate}
                      onPrev={qrConfig.setPrevTextTemplate}
                      onReset={qrConfig.resetTextTemplate}
                      startContentIcon={<Text className="text-default-400 w-5 h-5" />}
                      noSelectionItem={{ key: '', textValue: '-- No Text Override --' }}
                      galleryTabId="text"
                    />
                  </div>
                </div>
                <Flex className="gap-4 mt-6">
                  {/* Increased top margin slightly */}
                  <Button
                    onPress={qrConfig.setRandomAllTemplates}
                    startContent={<Shuffle className="w-4 h-4" />}
                    variant="ghost"
                    color="primary"
                  >
                    Random All
                  </Button>
                  <Button
                    onPress={handleCopyLink}
                    startContent={<LinkIcon className="w-4 h-4" />}
                    variant="ghost"
                    color="primary"
                  >
                    Copy Link
                  </Button>
                  <Button
                    onPress={qrConfig.resetAllTemplates}
                    startContent={<RotateCcw className="w-4 h-4" />}
                    className="text-default-600"
                    variant="light"
                    color="warning"
                  >
                    Reset All
                  </Button>
                </Flex>
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

      <div id="qr-preview-panel">
        <QRCodePreview />
      </div>
    </div>
  )
}
