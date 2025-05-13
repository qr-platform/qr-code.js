import React from 'react'
import { Input, Select, SelectItem, Slider, Switch, Tab, Tabs } from '@heroui/react'
import { Icon } from '@iconify/react'

interface BorderCustomizationProps {
  borderOptions: any
  updateBorderOption: (path: string, value: any) => void
}

export const BorderCustomization: React.FC<BorderCustomizationProps> = ({
  borderOptions,
  updateBorderOption
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <Switch
        size="sm"
        isSelected={borderOptions.hasBorder}
        onValueChange={value => updateBorderOption('hasBorder', value)}
      />
      <span className="text-sm">Enable Border</span>
    </div>

    {borderOptions.hasBorder && (
      <Tabs aria-label="Border Options">
        <Tab
          key="general"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:box" />
              <span>General</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div>
              <p className="text-sm text-default-600 mb-2">
                Border Thickness: {borderOptions.thickness}px
              </p>
              <Slider
                size="sm"
                step={1}
                minValue={10}
                maxValue={100}
                value={borderOptions.thickness}
                onChange={value => updateBorderOption('thickness', value)}
                className="max-w-md"
              />
            </div>

            <Input
              type="color"
              label="Border Color"
              value={borderOptions.color}
              onChange={e => updateBorderOption('color', e.target.value)}
              className="w-full"
            />

            <Input
              label="Border Radius"
              placeholder="e.g., 10%, 20px"
              value={borderOptions.radius}
              onValueChange={value => updateBorderOption('radius', value)}
            />

            <Input
              type="color"
              label="Background Color"
              value={borderOptions.background || '#FFFFFF'}
              onChange={e => updateBorderOption('background', e.target.value)}
              className="w-full"
            />
          </div>
        </Tab>

        <Tab
          key="inner"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:move-inward" />
              <span>Inner Content</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <Input
              label="Inner Radius"
              placeholder="e.g., 5%, 10px"
              value={borderOptions.inner?.radius || '0%'}
              onValueChange={value => updateBorderOption('inner.radius', value)}
            />

            <div>
              <p className="text-sm text-default-600 mb-2">
                Inner Scale: {borderOptions.inner?.scale || 1}
              </p>
              <Slider
                size="sm"
                step={0.1}
                minValue={0.5}
                maxValue={1.5}
                value={borderOptions.inner?.scale || 1}
                onChange={value => updateBorderOption('inner.scale', value)}
                className="max-w-md"
              />
            </div>

            <div>
              <p className="text-sm text-default-600 mb-2">
                Horizontal Offset: {borderOptions.inner?.horizontalOffset || 0}px
              </p>
              <Slider
                size="sm"
                step={1}
                minValue={-50}
                maxValue={50}
                value={borderOptions.inner?.horizontalOffset || 0}
                onChange={value => updateBorderOption('inner.horizontalOffset', value)}
                className="max-w-md"
              />
            </div>

            <div>
              <p className="text-sm text-default-600 mb-2">
                Vertical Offset: {borderOptions.inner?.verticalOffset || 0}px
              </p>
              <Slider
                size="sm"
                step={1}
                minValue={-50}
                maxValue={50}
                value={borderOptions.inner?.verticalOffset || 0}
                onChange={value => updateBorderOption('inner.verticalOffset', value)}
                className="max-w-md"
              />
            </div>
          </div>
        </Tab>

        <Tab
          key="decorations"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:text" />
              <span>Text Decorations</span>
            </div>
          }
        >
          <Tabs aria-label="Border Sides">
            {['top', 'right', 'bottom', 'left'].map(side => (
              <Tab key={side} title={side.charAt(0).toUpperCase() + side.slice(1)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      size="sm"
                      isSelected={!borderOptions.decorations?.[side]?.disabled}
                      onValueChange={value =>
                        updateBorderOption(`decorations.${side}.disabled`, !value)
                      }
                    />
                    <span className="text-sm">Enable {side} decoration</span>
                  </div>

                  {!borderOptions.decorations?.[side]?.disabled && (
                    <>
                      <div className="flex items-center gap-2">
                        <Switch
                          size="sm"
                          isSelected={borderOptions.decorations?.[side]?.enableText}
                          onValueChange={value =>
                            updateBorderOption(`decorations.${side}.enableText`, value)
                          }
                        />
                        <span className="text-sm">Enable text</span>
                      </div>

                      {borderOptions.decorations?.[side]?.enableText && (
                        <>
                          <Input
                            label="Text Content"
                            placeholder={`Enter text for ${side} side`}
                            value={borderOptions.decorations?.[side]?.value || ''}
                            onValueChange={value =>
                              updateBorderOption(`decorations.${side}.value`, value)
                            }
                            className="md:col-span-2"
                          />

                          <Input
                            type="color"
                            label="Text Color"
                            value={
                              borderOptions.decorations?.[side]?.style?.fontColor ||
                              '#FFFFFF'
                            }
                            onChange={e =>
                              updateBorderOption(
                                `decorations.${side}.style.fontColor`,
                                e.target.value
                              )
                            }
                          />

                          <div>
                            <p className="text-sm text-default-600 mb-2">
                              Font Size:{' '}
                              {borderOptions.decorations?.[side]?.style?.fontSize || 28}px
                            </p>
                            <Slider
                              size="sm"
                              step={1}
                              minValue={12}
                              maxValue={48}
                              value={
                                borderOptions.decorations?.[side]?.style?.fontSize || 28
                              }
                              onChange={value =>
                                updateBorderOption(
                                  `decorations.${side}.style.fontSize`,
                                  value
                                )
                              }
                              className="max-w-md"
                            />
                          </div>

                          <Select
                            label="Text Transform"
                            selectedKeys={[
                              borderOptions.decorations?.[side]?.style?.textTransform ||
                                'uppercase'
                            ]}
                            onSelectionChange={keys => {
                              const selected =
                                Array.from(keys)[0]?.toString() || 'uppercase'
                              updateBorderOption(
                                `decorations.${side}.style.textTransform`,
                                selected
                              )
                            }}
                          >
                            <SelectItem key="uppercase" value="uppercase">
                              Uppercase
                            </SelectItem>
                            <SelectItem key="lowercase" value="lowercase">
                              Lowercase
                            </SelectItem>
                            <SelectItem key="capitalize" value="capitalize">
                              Capitalize
                            </SelectItem>
                          </Select>

                          <Select
                            label="Font Weight"
                            selectedKeys={[
                              borderOptions.decorations?.[side]?.style?.fontWeight ||
                                'bold'
                            ]}
                            onSelectionChange={keys => {
                              const selected = Array.from(keys)[0]?.toString() || 'bold'
                              updateBorderOption(
                                `decorations.${side}.style.fontWeight`,
                                selected
                              )
                            }}
                          >
                            <SelectItem key="normal" value="normal">
                              Normal
                            </SelectItem>
                            <SelectItem key="bold" value="bold">
                              Bold
                            </SelectItem>
                          </Select>
                        </>
                      )}
                    </>
                  )}
                </div>
              </Tab>
            ))}
          </Tabs>
        </Tab>
      </Tabs>
    )}
  </div>
)
