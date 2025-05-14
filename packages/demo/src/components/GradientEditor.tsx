import React from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { GradientType } from '@qr-platform/qr-code.js' // Import directly from library
import ColorPicker from 'react-best-gradient-color-picker' // Corrected import

import { tailwindColors } from '../data/tailwind-colors'
import { Gradient } from '../types/qr-options'

interface GradientEditorProps {
  value: string | Gradient // Can be a hex/rgba string or a Gradient object
  onChange: (value: string | Gradient) => void
  label?: string
}

const GradientEditor: React.FC<GradientEditorProps> = ({
  value,
  onChange,
  label = 'Color/Gradient'
}) => {
  const internalPickerValue = React.useMemo(() => {
    if (typeof value === 'object' && value?.type && value?.colorStops) {
      if (value.type === GradientType.linear) {
        const stops = value.colorStops
          .map(stop => `${stop.color} ${stop.offset * 100}%`)
          .join(', ')
        return `linear-gradient(${value.rotation || 0}deg, ${stops})`
      } else if (value.type === GradientType.radial) {
        const stops = value.colorStops
          .map(stop => `${stop.color} ${stop.offset * 100}%`)
          .join(', ')
        return `radial-gradient(circle, ${stops})`
      }
      return value.colorStops[0]?.color || '#000000'
    }
    return typeof value === 'string' ? value : '#000000'
  }, [value])

  const handlePickerChange = (newColorString: string) => {
    if (
      typeof newColorString === 'string' &&
      (newColorString.startsWith('#') ||
        newColorString.startsWith('rgb') ||
        newColorString.startsWith('rgba'))
    ) {
      onChange(newColorString)
      return
    }

    if (typeof newColorString === 'string' && newColorString.includes('gradient')) {
      if (newColorString.startsWith('linear-gradient')) {
        const rotationMatch = newColorString.match(/linear-gradient\(([\d.-]+)deg/)
        const rotation = rotationMatch ? parseFloat(rotationMatch[1]) : 0
        const colorStopMatches = [
          ...newColorString.matchAll(/([#\w\(\),.%]+)\s+([\d.]+)%/g)
        ]
        const colorStops = colorStopMatches
          .map(match => ({
            color: match[1].trim(),
            offset: parseFloat(match[2]) / 100
          }))
          .filter(cs => cs.color && !isNaN(cs.offset))

        if (colorStops.length >= 2) {
          onChange({ type: GradientType.linear, rotation, colorStops })
          return
        }
      } else if (newColorString.startsWith('radial-gradient')) {
        const colorStopMatches = [
          ...newColorString.matchAll(/([#\w\(\),.%]+)\s+([\d.]+)%/g)
        ]
        const colorStops = colorStopMatches
          .map(match => ({
            color: match[1].trim(),
            offset: parseFloat(match[2]) / 100
          }))
          .filter(cs => cs.color && !isNaN(cs.offset))

        if (colorStops.length >= 2) {
          onChange({ type: GradientType.radial, colorStops })
          return
        }
      }
      onChange(newColorString) // Pass the raw gradient string as a fallback
    } else {
      onChange(newColorString) // Assume solid color if not a recognized gradient string
    }
  }

  const displayColor =
    typeof value === 'string' ? value : value?.colorStops?.[0]?.color || '#000000'

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm text-default-600">{label}</span>}
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button
            variant="bordered"
            className="w-full justify-start"
            startContent={
              <div
                className="w-5 h-5 rounded-sm border border-default-300"
                style={{ background: displayColor }}
              />
            }
          >
            {typeof value === 'string' ? value : 'Gradient'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <ColorPicker
            value={internalPickerValue}
            onChange={handlePickerChange}
            hideControls={false}
            hideInputs={false}
            hidePresets={false}
            presets={tailwindColors}
            width={260}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default GradientEditor
