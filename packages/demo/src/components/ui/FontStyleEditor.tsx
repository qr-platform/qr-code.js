import React from 'react'
import { Input, Select, SelectItem } from '@heroui/react'

import { FontStyle } from '../../types/qr-options' // Removed unused Gradient import
import GradientEditor from './GradientEditor' // Assuming GradientEditor is in the same directory

interface FontStyleEditorProps {
  fontStyle: FontStyle
  onFontStyleChange: <K extends keyof FontStyle>(key: K, value: FontStyle[K]) => void
  prefix?: string // Optional prefix for labels if used in multiple contexts
}

const FontStyleEditor: React.FC<FontStyleEditorProps> = ({
  fontStyle,
  onFontStyleChange,
  prefix = ''
}) => {
  const fontFaces = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Comic Sans MS',
    'Impact',
    'Tahoma',
    'Trebuchet MS'
  ]

  const fontWeights = ['normal', 'bold']
  const textTransforms = ['none', 'uppercase', 'lowercase', 'capitalize']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-default-200 rounded-lg">
      <h3 className="md:col-span-2 text-md font-semibold text-default-700 mb-2">
        {prefix} Font Styling
      </h3>
      <Select
        label={`${prefix}Font Face`}
        selectedKeys={fontStyle.fontFace ? [fontStyle.fontFace] : []}
        onSelectionChange={keys =>
          onFontStyleChange('fontFace', Array.from(keys)[0]?.toString() || 'Helvetica')
        }
        variant="bordered"
        size="sm"
      >
        {fontFaces.map(face => (
          <SelectItem key={face} textValue={face}>
            {face}
          </SelectItem>
        ))}
      </Select>

      <Input
        type="number"
        label={`${prefix}Font Size (px)`}
        value={fontStyle.fontSize?.toString() || '20'}
        onValueChange={val => onFontStyleChange('fontSize', parseInt(val, 10) || 20)}
        variant="bordered"
        size="sm"
        min="1"
      />

      <GradientEditor
        label={`${prefix}Font Color`}
        value={fontStyle.fontColor || '#000000'}
        onChange={color => {
          // Ensure only string is passed for fontColor as FontStyle expects string
          if (typeof color === 'string') {
            onFontStyleChange('fontColor', color)
          } else {
            // If it's a Gradient object, take the first color stop or a default
            onFontStyleChange('fontColor', color.colorStops[0]?.color || '#000000')
          }
        }}
      />

      <Input
        type="number"
        label={`${prefix}Letter Spacing (px)`}
        value={fontStyle.letterSpacing?.toString() || '0'}
        onValueChange={val => onFontStyleChange('letterSpacing', parseFloat(val) || 0)}
        variant="bordered"
        size="sm"
        step="0.1"
      />

      <Select
        label={`${prefix}Font Weight`}
        selectedKeys={fontStyle.fontWeight ? [fontStyle.fontWeight] : []}
        onSelectionChange={keys =>
          onFontStyleChange(
            'fontWeight',
            (Array.from(keys)[0]?.toString() || 'normal') as 'normal' | 'bold'
          )
        }
        variant="bordered"
        size="sm"
      >
        {fontWeights.map(weight => (
          <SelectItem key={weight} textValue={weight}>
            {weight}
          </SelectItem>
        ))}
      </Select>

      <Select
        label={`${prefix}Text Transform`}
        selectedKeys={fontStyle.textTransform ? [fontStyle.textTransform] : []}
        onSelectionChange={keys =>
          onFontStyleChange(
            'textTransform',
            (Array.from(keys)[0]?.toString() || 'none') as
              | 'uppercase'
              | 'lowercase'
              | 'capitalize'
              | 'none'
          )
        }
        variant="bordered"
        size="sm"
      >
        {textTransforms.map(transform => (
          <SelectItem key={transform} textValue={transform}>
            {transform}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default FontStyleEditor
