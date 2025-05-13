import React from 'react'
import { Input, Select, SelectItem, Slider, Tab, Tabs } from '@heroui/react'

import { useQRCode } from '../context/qr-code-context'

export const AdvancedCustomization: React.FC = () => {
  const { advancedOptions, setAdvancedOptions } = useQRCode()

  const updateOptions = (category: string, property: string, value: any) => {
    setAdvancedOptions({
      ...advancedOptions,
      [category]: {
        ...advancedOptions[category],
        [property]: value
      }
    })
  }

  const updateNestedOptions = (
    category: string,
    subCategory: string,
    property: string,
    value: any
  ) => {
    setAdvancedOptions({
      ...advancedOptions,
      [category]: {
        ...advancedOptions[category],
        [subCategory]: {
          ...advancedOptions[category][subCategory],
          [property]: value
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      <Tabs aria-label="QR Code Advanced Options" color="primary" variant="underlined">
        <Tab key="shape" title="Shape & Error Correction">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Select
              label="Shape Type"
              selectedKeys={[advancedOptions.shape.type]}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0]?.toString() || 'square'
                updateOptions('shape', 'type', selected)
              }}
              variant="bordered"
            >
              <SelectItem key="square" value="square">
                Square
              </SelectItem>
              <SelectItem key="rounded" value="rounded">
                Rounded
              </SelectItem>
              <SelectItem key="circle" value="circle">
                Circle
              </SelectItem>
            </Select>

            <Select
              label="Error Correction Level"
              selectedKeys={[advancedOptions.errorCorrection]}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0]?.toString() || 'H'
                setAdvancedOptions({
                  ...advancedOptions,
                  errorCorrection: selected
                })
              }}
              variant="bordered"
              description="Higher levels allow more damage to QR code"
            >
              <SelectItem key="L" value="L">
                Low (7%)
              </SelectItem>
              <SelectItem key="M" value="M">
                Medium (15%)
              </SelectItem>
              <SelectItem key="Q" value="Q">
                Quartile (25%)
              </SelectItem>
              <SelectItem key="H" value="H">
                High (30%)
              </SelectItem>
            </Select>

            <div>
              <p className="text-sm mb-2">Margin Size</p>
              <Slider
                size="sm"
                step={1}
                minValue={0}
                maxValue={10}
                value={advancedOptions.shape.margin}
                onChange={value => updateOptions('shape', 'margin', value)}
                className="max-w-md"
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' }
                ]}
              />
            </div>
          </div>
        </Tab>

        <Tab key="dots" title="Dots">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Select
              label="Dots Type"
              selectedKeys={[advancedOptions.dots.type]}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0]?.toString() || 'square'
                updateOptions('dots', 'type', selected)
              }}
              variant="bordered"
            >
              <SelectItem key="square" value="square">
                Square
              </SelectItem>
              <SelectItem key="dots" value="dots">
                Dots
              </SelectItem>
              <SelectItem key="rounded" value="rounded">
                Rounded
              </SelectItem>
              <SelectItem key="classy" value="classy">
                Classy
              </SelectItem>
              <SelectItem key="classy-rounded" value="classy-rounded">
                Classy Rounded
              </SelectItem>
            </Select>

            <Input
              type="color"
              label="Dots Color"
              value={advancedOptions.dots.color}
              onChange={e => updateOptions('dots', 'color', e.target.value)}
              variant="bordered"
            />

            <div>
              <p className="text-sm mb-2">Dots Size</p>
              <Slider
                size="sm"
                step={0.1}
                minValue={0.1}
                maxValue={1.0}
                value={advancedOptions.dots.size}
                onChange={value => updateOptions('dots', 'size', value)}
                className="max-w-md"
                marks={[
                  { value: 0.1, label: '0.1' },
                  { value: 0.5, label: '0.5' },
                  { value: 1.0, label: '1.0' }
                ]}
              />
            </div>
          </div>
        </Tab>

        <Tab key="corners" title="Corners">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Select
              label="Corner Square Type"
              selectedKeys={[advancedOptions.corners.squareType]}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0]?.toString() || 'square'
                updateOptions('corners', 'squareType', selected)
              }}
              variant="bordered"
            >
              <SelectItem key="square" value="square">
                Square
              </SelectItem>
              <SelectItem key="dot" value="dot">
                Dot
              </SelectItem>
              <SelectItem key="extra-rounded" value="extra-rounded">
                Extra Rounded
              </SelectItem>
            </Select>

            <Input
              type="color"
              label="Corner Square Color"
              value={advancedOptions.corners.squareColor}
              onChange={e => updateOptions('corners', 'squareColor', e.target.value)}
              variant="bordered"
            />

            <Select
              label="Corner Dot Type"
              selectedKeys={[advancedOptions.corners.dotType]}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0]?.toString() || 'square'
                updateOptions('corners', 'dotType', selected)
              }}
              variant="bordered"
            >
              <SelectItem key="square" value="square">
                Square
              </SelectItem>
              <SelectItem key="dot" value="dot">
                Dot
              </SelectItem>
            </Select>

            <Input
              type="color"
              label="Corner Dot Color"
              value={advancedOptions.corners.dotColor}
              onChange={e => updateOptions('corners', 'dotColor', e.target.value)}
              variant="bordered"
            />
          </div>
        </Tab>

        <Tab key="background" title="Background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Input
              type="color"
              label="Background Color"
              value={advancedOptions.background.color}
              onChange={e => updateOptions('background', 'color', e.target.value)}
              variant="bordered"
            />

            <div>
              <p className="text-sm mb-2">Background Roundness</p>
              <Slider
                size="sm"
                step={0.1}
                minValue={0}
                maxValue={1.0}
                value={advancedOptions.background.round}
                onChange={value => updateOptions('background', 'round', value)}
                className="max-w-md"
                marks={[
                  { value: 0, label: '0' },
                  { value: 0.5, label: '0.5' },
                  { value: 1.0, label: '1.0' }
                ]}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
