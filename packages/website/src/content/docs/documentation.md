---
title: QRCode.js Documentation
---

## QRCode.js Documentation
<a id="start"></a>

## Introduction

QRCode.js is a professional JavaScript/TypeScript library for creating customized QR codes, offering a blend of simplicity and sophistication. With versatile styling options—dot shapes, colors, gradients, embedded images, borders, and text—it enables you to design unique, visually appealing QR codes that work flawlessly with standard scanners. QRCode.js is part of QR-Platform: All-in-One QR Codes Management Solution. 


This documentation provides a comprehensive overview of all available options to help you create the perfect QR code for your needs.

## Installation

```bash
# Using npm
npm install @qr-platform/qr-code.js

# Using yarn
yarn add @qr-platform/qr-code.js

# Using pnpm
pnpm add @qr-platform/qr-code.js
```

## Basic Usage

```typescript
import { QRCodeJs } from '@qr-platform/qr-code.js';

// Create a basic QR code
const qrCode = new QRCodeJs({
  data: 'https://example.com',
});

// Render the QR code to a container
qrCode.append(document.getElementById('qr-container'));
```

## Core Options

### `data`

- **Purpose**: The content to be encoded in the QR code
- **Type**: `string`
- **Required**: Yes
- **Example**: `'https://example.com'`

### `shape`

- **Purpose**: Overall shape of the QR code
- **Type**: `ShapeType` enum
- **Default**: `'square'`
- **Possible values**: `'square'`, `'circle'`
- **Example**: 
  ```typescript
  shape: 'circle'
  ```

### `margin`

- **Purpose**: Empty space around the QR code (in pixels)
- **Type**: `number`
- **Default**: `0`
- **Example**:
  ```typescript
  margin: 20
  ```

### `isResponsive`

- **Purpose**: Allows the QR code SVG to resize dynamically based on its container size. If `false`, fixed `width` and `height` attributes are set on the SVG.
- **Type**: `boolean`
- **Default**: `false`
- **Example**:
  ```typescript
  isResponsive: true
  ```

### `qrOptions`

Options that affect the QR code generation algorithm.

#### `typeNumber`

- **Purpose**: Specifies the QR code version (size and capacity)
- **Type**: `TypeNumber` (0-40)
- **Default**: `0` (auto-determine based on content)
- **Example**:
  ```typescript
  qrOptions: {
    typeNumber: 4
  }
  ```

#### `mode`

- **Purpose**: Encoding mode for the QR data
- **Type**: `Mode` enum
- **Default**: Auto-detected based on content
- **Possible values**: `'numeric'`, `'alphanumeric'`, `'byte'`, `'kanji'`, `'unicode'`
- **Example**:
  ```typescript
  qrOptions: {
    mode: 'alphanumeric'
  }
  ```

#### `errorCorrectionLevel`

- **Purpose**: Determines error correction capability
- **Type**: `ErrorCorrectionLevel` enum
- **Default**: `'Q'`
- **Possible values**: 
  - `'L'`: Low - 7% error recovery
  - `'M'`: Medium - 15% error recovery
  - `'Q'`: Quality - 25% error recovery
  - `'H'`: High - 30% error recovery

- **Example**:
  ```typescript
  qrOptions: {
    errorCorrectionLevel: 'H'
  }
  ```

## Layout Options

Options controlling the positioning and scaling of the QR code within its container.

### `scale`

- **Purpose**: Scales the QR code size relative to its container or border. Useful for adjusting size within borders.
- **Type**: `number` (0 to 1.5)
- **Default**: `1`
- **Example**:
  ```typescript
  scale: 0.8 // Make QR code 80% of available space
  ```

### `offset`

- **Purpose**: Applies a vertical offset (positive moves down, negative moves up) to the QR code relative to the center. Useful for fine-tuning position, especially with borders.
- **Type**: `number`
- **Default**: `0`
- **Example**:
  ```typescript
  offset: -10 // Move QR code 10px up
  ```

### `verticalOffset`

- **Purpose**: Applies a vertical offset (positive moves down, negative moves up) to the QR code, independent of other calculations.
- **Type**: `number`
- **Default**: `0`
- **Example**:
  ```typescript
  verticalOffset: 5 // Move QR code 5px down
  ```

### `horizontalOffset`

- **Purpose**: Applies a horizontal offset (positive moves right, negative moves left) to the QR code, independent of other calculations.
- **Type**: `number`
- **Default**: `0`
- **Example**:
  ```typescript
  horizontalOffset: -5 // Move QR code 5px left
  ```

## Styling Options

### Dots (`dotsOptions`)

Controls the appearance of individual QR code dots.

#### `type`

- **Purpose**: Shape of the dots in the QR code
- **Type**: `DotType` enum
- **Default**: `'square'`
- **Possible values**: 
  - `'dot'`: Round dots
  - `'square'`: Square dots
  - `'rounded'`: Slightly rounded squares
  - `'extraRounded'`: More rounded squares
  - `'classy'`: Dots with a distinctive classy pattern
  - `'classyRounded'`: Classy dots with rounded corners
  - `'verticalLine'`: Vertical line pattern
  - `'horizontalLine'`: Horizontal line pattern
  - `'randomDot'`: Randomized dot pattern
  - `'smallSquare'`: Smaller square dots
  - `'tinySquare'`: Very small square dots
  - `'star'`: Star-shaped dots
  - `'plus'`: Plus-shaped dots
  - `'diamond'`: Diamond-shaped dots
- **Example**:
  ```typescript
  dotsOptions: {
    type: 'rounded'
  }
  ```

#### `color`

- **Purpose**: Color of the dots
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: `'#000000'`
- **Example**:
  ```typescript
  dotsOptions: {
    color: '#FF5733'
  }
  ```

#### `size`

- **Purpose**: Size of the dots in pixels
- **Type**: `number`
- **Default**: `10`
- **Example**:
  ```typescript
  dotsOptions: {
    size: 12
  }
  ```

#### `gradient`

- **Purpose**: Apply a gradient fill to the dots
- **Type**: `Gradient` object (see [Gradients](#gradients))
- **Default**: `undefined`
- **Example**:
  ```typescript
  dotsOptions: {
    gradient: {
      type: 'linear',
      rotation: Math.PI / 4,
      colorStops: [{ offset: 0, color: 'blue' }, { offset: 1, color: 'red' }]
    }
  }
  ```

### Corner Squares (`cornersSquareOptions`)

These options override `dotsOptions` for the three large corner squares of the QR code.

#### `type`

- **Purpose**: Shape of the corner squares
- **Type**: `CornerSquareType` enum
- **Default**: Inherits from `dotsOptions.type` or uses `'dot'`
- **Possible values**: 
  - `'dot'`: Round corner squares
  - `'square'`: Square corner squares
  - `'rounded'`: Rounded corner squares
  - `'classy'`: Classy corner squares
  - `'outpoint'`: Corner squares with outward points
  - `'inpoint'`: Corner squares with inward points
- **Example**:
  ```typescript
  cornersSquareOptions: {
    type: 'outpoint'
  }
  ```

#### `color`

- **Purpose**: Color of the corner squares
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: Inherits from `dotsOptions.color` or uses `'#000000'`
- **Example**:
  ```typescript
  cornersSquareOptions: {
    color: '#0000FF'
  }
  ```

#### `gradient`

- **Purpose**: Apply a gradient fill to the corner squares (overrides `dotsOptions.gradient`)
- **Type**: `Gradient` object (see [Gradients](#gradients))
- **Default**: `undefined`
- **Example**:
  ```typescript
  cornersSquareOptions: {
    gradient: {
      type: 'radial',
      colorStops: [{ offset: 0, color: 'green' }, { offset: 1, color: 'yellow' }]
    }
  }
  ```

### Corner Dots (`cornersDotOptions`)

These options override `cornersSquareOptions` for the smaller dots within the corner squares.

#### `type`

- **Purpose**: Shape of the corner dots
- **Type**: `CornerDotType` enum
- **Default**: Inherits from `cornersSquareOptions.type` or uses `'dot'`
- **Possible values**: 
  - `'dot'`: Round corner dots
  - `'square'`: Square corner dots
  - `'heart'`: Heart-shaped corner dots
  - `'rounded'`: Rounded corner dots
  - `'classy'`: Classy corner dots
  - `'outpoint'`: Corner dots with outward points
  - `'inpoint'`: Corner dots with inward points
- **Example**:
  ```typescript
  cornersDotOptions: {
    type: 'heart'
  }
  ```

#### `color`

- **Purpose**: Color of the corner dots
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: Inherits from `cornersSquareOptions.color` or uses `'#000000'`
- **Example**:
  ```typescript
  cornersDotOptions: {
    color: '#FF0000'
  }
  ```

#### `gradient`

- **Purpose**: Apply a gradient fill to the corner dots (overrides `cornersSquareOptions.gradient`)
- **Type**: `Gradient` object (see [Gradients](#gradients))
- **Default**: `undefined`
- **Example**:
  ```typescript
  cornersDotOptions: {
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [{ offset: 0, color: 'orange' }, { offset: 1, color: 'purple' }]
    }
  }
  ```

### Background (`backgroundOptions`)

Controls the QR code background.

- **Purpose**: Configures the background of the QR code
- **Type**: `object` or `false` to disable the background
- **Default**: `{ color: '#FFFFFF' }`

#### `color`

- **Purpose**: Background color
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: `'#FFFFFF'`
- **Example**:
  ```typescript
  backgroundOptions: {
    color: '#F5F5F5'
  }
  ```

#### `round`

- **Purpose**: Rounds the corners of the background (0-1 value or percentage)
- **Type**: `number` or `string`
- **Default**: `0`
- **Example**:
  ```typescript
  backgroundOptions: {
    round: 0.5
  }
  ```

#### `gradient`

- **Purpose**: Apply a gradient fill to the background
- **Type**: `Gradient` object (see [Gradients](#gradients))
- **Default**: `undefined`
- **Example**:
  ```typescript
  backgroundOptions: {
    gradient: {
      type: 'linear',
      rotation: Math.PI / 2,
      colorStops: [{ offset: 0, color: '#eee' }, { offset: 1, color: '#ccc' }]
    }
  }
  ```

## Image Embedding

### `image`

- **Purpose**: URL, Buffer, or Blob of an image to embed in the QR code. This can be set directly in the options, or via `QRCodeJs.setImage()` for a global default, or `QRCodeJs.useImage()` for a builder-specific image.
- **Type**: `string | Buffer | Blob`
- **Example**:
  ```typescript
  image: 'https://example.com/logo.png'
  ```

#### Override Behavior with `setImage` and `useImage`

- Both `setImage` and `useImage` methods can accept an optional second parameter with `{ override: true }` to ensure the image takes precedence over any image set elsewhere.
- **Example with Override**:
  ```typescript
  // Global image that will override any instance-specific images
  QRCodeJs.setImage('https://example.com/global-logo.png', { override: true });
  
  // Builder pattern with image that will override final options
  const qr = QRCodeJs.useImage('https://example.com/important-logo.png', { override: true })
    .options({
      data: 'https://example.com',
      image: 'https://example.com/this-will-be-ignored.png' // Will be ignored due to override
    });
  ```

### `imageOptions`

Options for the embedded image.

#### `mode`

- **Purpose**: How the image is embedded in the QR code
- **Type**: `ImageMode` enum
- **Default**: `'center'`
- **Possible values**: 
  - `'center'`: Image placed in the center, QR code dots reflow around it
  - `'overlay'`: Image placed on top of the QR code
  - `'background'`: Image used as a background with dots drawn over it
- **Example**:
  ```typescript
  imageOptions: {
    mode: 'center'
  }
  ```

#### `imageSize`

- **Purpose**: Relative size of the image (0-1)
- **Type**: `number`
- **Default**: `0.4`
- **Example**:
  ```typescript
  imageOptions: {
    imageSize: 0.5
  }
  ```

#### `margin`

- **Purpose**: Margin around the image in dot units
- **Type**: `number`
- **Default**: `0`
- **Example**:
  ```typescript
  imageOptions: {
    margin: 2
  }
  ```

#### `crossOrigin`

- **Purpose**: CORS setting for the image
- **Type**: `string`
- **Default**: `undefined`
- **Example**:
  ```typescript
  imageOptions: {
    crossOrigin: 'anonymous'
  }
  ```

#### `fill`

- **Purpose**: Fill color for transparent areas in the image
- **Type**: `object`
- **Default**: `{ color: 'rgba(255,255,255,1)' }`
- **Properties**:
  - `color`: A solid color fill (`string`)
  - `gradient`: A gradient fill (`Gradient` object, see [Gradients](#gradients))
- **Example (Solid Color)**:
  ```typescript
  imageOptions: {
    fill: {
      color: 'rgba(255,255,255,0.75)'
    }
  }
  ```
- **Example (Gradient Fill)**:
  ```typescript
  imageOptions: {
    fill: {
      gradient: {
        type: 'radial',
        colorStops: [{ offset: 0, color: 'rgba(255,255,255,1)' }, { offset: 1, color: 'rgba(255,255,255,0)' }]
      }
    }
  }
  ```

## Gradients

Gradients can be applied to multiple elements: `dotsOptions`, `cornersSquareOptions`, `cornersDotOptions`, `backgroundOptions`, and `imageOptions.fill`.

### Gradient Structure

- **Type**: `object`
- **Properties**:
  - `type`: Type of gradient (`'linear'` or `'radial'`)
  - `rotation`: Rotation of gradient in radians (for linear gradients)
  - `colorStops`: Array of color stop objects with `offset` (0-1) and `color` properties

### Example

```typescript
{
  dotsOptions: {
    gradient: {
      type: 'linear',
      rotation: Math.PI / 4, // 45 degrees
      colorStops: [
        { offset: 0, color: '#8F00FF' }, // Start color
        { offset: 1, color: '#0080FF' }  // End color
      ]
    }
  }
}
```

## Borders

### Free vs. Premium Features

QRCode.js provides border features in both the free and premium versions, with some important differences:

- **Free Version Borders**: 
  - Basic border features are available but will automatically include "QR-Platform" branding text in the bottom border
  - This branding cannot be removed or customized without a license
  - Basic border styling like color and thickness is supported

- **Premium Version Borders** (requires license):
  - No QR-Platform branding (can use custom text or no text)
  - Full control over all sides of the border
  - Advanced border features (inner borders, outer borders, custom text)
  - Fine-grained control over border appearance

### `borderOptions`

Options for adding decorative borders around the QR code. Borders can be configured globally using `QRCodeJs.setBorder()` / `QRCodeJs.setBorderId()` or on a per-instance basis using the builder pattern initiated with `QRCodeJs.useBorder()` / `QRCodeJs.useBorderId()`.

#### `hasBorder`

- **Purpose**: Master switch to enable/disable borders
- **Type**: `boolean`
- **Example**:
  ```typescript
  borderOptions: {
    hasBorder: true
  }
  ```

#### `thickness`

- **Purpose**: Thickness of the main border in pixels
- **Type**: `number`
- **Example**:
  ```typescript
  borderOptions: {
    thickness: 50
  }
  ```

#### `color`

- **Purpose**: Color of the main border
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: `'#000000'`
- **Example**:
  ```typescript
  borderOptions: {
    color: 'blue'
  }
  ```

#### `radius`

- **Purpose**: Corner rounding of the border
- **Type**: `string` (px or %)
- **Default**: `'0%'`
- **Example**:
  ```typescript
  borderOptions: {
    radius: '40%'
  }
  ```

#### `noBorderThickness` (Premium)

- **Purpose**: Thickness to use for a border side if its decoration is disabled (e.g., text is not shown). Useful for maintaining alignment.
- **Type**: `number`
- **Default**: `borderOptions.thickness / 4`
- **Example**:
  ```typescript
  borderOptions: {
    noBorderThickness: 5
  }
  ```

#### `background` (Premium)

- **Purpose**: Background color specifically for the border area itself.
- **Type**: `string` (CSS color, hex, rgb, rgba)
- **Default**: `undefined`
- **Example**:
  ```typescript
  borderOptions: {
    background: '#DDDDDD'
  }
  ```

#### `inner` (Premium)

- **Purpose**: Options for scaling/offsetting the inner content area
- **Type**: `object`
- **Properties**:
  - `radius`: Corner rounding of the inner border (string)
  - `scale`: Scale factor for the inner content (number, 0-1.5)
  - `horizontalOffset`: Horizontal offset of the inner content (number)
  - `verticalOffset`: Vertical offset of the inner content (number)
- **Example**:
  ```typescript
  borderOptions: {
    inner: {
      radius: '10%',
      scale: 0.8,
      horizontalOffset: -15,
      verticalOffset: 10
    }
  }
  ```

#### `borderOuter` (Premium)

- **Purpose**: Options for an additional border outside the main one
- **Type**: `object`
- **Properties**:
  - `color`: Color of the outer border (string)
  - `thickness`: Thickness of the outer border (number)
- **Example**:
  ```typescript
  borderOptions: {
    borderOuter: {
      color: '#002683',
      thickness: 10
    }
  }
  ```

#### `borderInner` (Premium)

- **Purpose**: Options for an additional border inside the main one
- **Type**: `object`
- **Properties**:
  - `color`: Color of the inner border (string)
  - `thickness`: Thickness of the inner border (number)
- **Example**:
  ```typescript
  borderOptions: {
    borderInner: {
      color: 'yellow',
      thickness: 5
    }
  }
  ```

#### `decorations` (Premium)

- **Purpose**: Add text or images to specific sides of the border
- **Type**: `object`
- **Properties**: Configuration for each side (`top`, `right`, `bottom`, `left`)
- **Note**: In the free version, the bottom border will always display "QR-Platform" branding regardless of your settings
- **Example**:
  ```typescript
  borderOptions: {
    decorations: {
      top: {
        disabled: false,
        enableText: true,
        offset: 0,
        curveAdjustment: 0,
        curveDisabled: false,
        curveRadius: '50%',
        type: 'text',
        value: 'SCAN ME',
        style: {
          fontFace: 'Helvetica',
          fontSize: 28,
          fontColor: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontWeight: 'bold'
        }
      }
    }
  }
  ```

Each decoration object can have these properties:
- `disabled`: Whether this side's decoration is disabled
- `enableText`: Whether to enable text on this side
- `offset`: Positioning offset for the decoration
- `curveAdjustment`: Adjustment for text curve
- `curveDisabled`: Whether to disable curved text
- `curveRadius`: Radius of the text curve
- `type`: Type of decoration (`'text'` or `'image'`)
- `value`: Text content or image URL
- `style`: Style options for text (font, size, color, etc.)

### Free vs. Premium Border Examples

#### Free Version (with QR-Platform branding)

```typescript
// Free version border - will show "QR-Platform" in bottom border
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  borderOptions: {
    hasBorder: true,
    thickness: 40,
    color: '#0033CC',
    radius: '10%'
  }
});
```

#### Premium Version (license required)

```typescript
// First activate license
await QRCodeJs.license('YOUR-LICENSE-KEY');

// Then create QR code with custom border text
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  borderOptions: {
    hasBorder: true,
    thickness: 40,
    color: '#0033CC',
    radius: '10%',
    decorations: {
      bottom: {
        enableText: true,
        type: 'text',
        value: 'YOUR CUSTOM TEXT', // This only works with a license
        style: {
          fontFace: 'Arial',
          fontSize: 24,
          fontColor: '#FFFFFF'
        }
      }
    }
  }
});
```

### Error Handling for Borders

When attempting to use premium border features without a license, the library will:

1. Not throw errors, but gracefully fall back to the free version behavior
2. Display "QR-Platform" branding in the bottom border regardless of your `decorations` settings
3. Ignore certain premium-only properties like `inner`, `borderOuter`, and `borderInner`

To check if your license is active and premium features are available:

```typescript
// Check detailed license information
const licenseDetails = QRCodeJs.getLicenseDetails();
if (licenseDetails) {
  console.log('License plan:', licenseDetails.plan);
  console.log('License expires:', new Date(licenseDetails.exp * 1000));
}
```

## Border Text Methods (Premium Feature)

QRCode.js provides dedicated methods for managing text on QR code borders, allowing for convenient text configuration across all sides.

### Static Methods for Global Text Settings

#### `setText()`

- **Purpose**: Sets global default text for QR code borders that will apply to all subsequently created instances.
- **Type**: `function(textNameOrOptions: string | TextOptions | null, options?: { override?: boolean }): typeof QRCodeJs`
- **Parameters**:
  - `textNameOrOptions`: A predefined text template name (e.g., 'Scan Me (Top)'), a custom `TextOptions` object, or `null` to clear
  - `options`: Optional configuration with `override` property to ensure text takes precedence
- **Returns**: The QRCodeJs class for chaining
- **Example**:
  ```typescript
  // Set global text on top and bottom border sides
  QRCodeJs.setText({
    topValue: 'SCAN ME',
    bottomValue: 'www.example.com'
  });
  
  // Use a predefined text template
  QRCodeJs.setText('Scan Me (Top)');
  
  // With override option to ensure it takes precedence
  QRCodeJs.setText({ topValue: 'MUST DISPLAY THIS TEXT' }, { override: true });
  
  // Clear global text
  QRCodeJs.setText(null);
  ```

#### `setTextId()`

- **Purpose**: Sets global default text for QR code borders by referencing a predefined template ID.
- **Type**: `function(textId: string | null, options?: { override?: boolean }): typeof QRCodeJs`
- **Parameters**:
  - `textId`: ID of a predefined text template (e.g., 'visit-website-bottom') or `null` to clear
  - `options`: Optional configuration with `override` property to ensure text takes precedence
- **Returns**: The QRCodeJs class for chaining
- **Example**:
  ```typescript
  // Set global text using a predefined template ID
  QRCodeJs.setTextId('scan-to-visit-website');
  
  // With override option
  QRCodeJs.setTextId('lost-found', { override: true });
  
  // Clear global text
  QRCodeJs.setTextId(null);
  ```

### Builder Methods for Instance-Specific Text

#### `useText()`

- **Purpose**: Initiates a builder pattern pre-configured with border text from a template name or custom options.
- **Type**: `function(textNameOrOptions: string | TextOptions, options?: { override?: boolean }): QRCodeBuilder`
- **Parameters**:
  - `textNameOrOptions`: A predefined text template name or a custom `TextOptions` object
  - `options`: Optional configuration with `override` property to ensure text takes precedence
- **Returns**: A `QRCodeBuilder` instance for chaining
- **Example**:
  ```typescript
  // Start builder with custom text options
  const qrCode = QRCodeJs.useText({
    topValue: 'VISIT OUR WEBSITE',
    bottomValue: 'www.example.com'
  }).options({
    data: 'https://example.com'
  });
  
  // Start builder with a predefined text template
  const qrWithTemplate = QRCodeJs.useText('Scan Me (Bottom)')
    .options({ data: 'https://example.com/scan-me' });
    
  // With override option to ensure text takes precedence over final options
  const qrWithOverride = QRCodeJs.useText(
    { leftValue: 'IMPORTANT TEXT' }, 
    { override: true }
  ).options({
    data: 'https://example.com',
    borderOptions: {
      decorations: {
        left: { value: 'This will be ignored', enableText: true }
      }
    }
  });
  ```

#### `useTextId()`

- **Purpose**: Initiates a builder pattern pre-configured with border text from a predefined template ID.
- **Type**: `function(textId: string, options?: { override?: boolean }): QRCodeBuilder`
- **Parameters**:
  - `textId`: ID of a predefined text template (e.g., 'visit-website-bottom')
  - `options`: Optional configuration with `override` property to ensure text takes precedence
- **Returns**: A `QRCodeBuilder` instance for chaining
- **Example**:
  ```typescript
  // Start builder with a predefined text template by ID
  const qrCode = QRCodeJs.useTextId('scan-to-visit-website')
    .options({ data: 'https://example.com' });
    
  // With override option
  const qrWithOverride = QRCodeJs.useTextId('scan-me', { override: true })
    .options({ data: 'https://example.com' });
  ```

### TextOptions Structure

The `TextOptions` object allows you to specify text for each side of the QR code border:

```typescript
interface TextOptions {
  topValue?: string | null;    // Text for top border (null explicitly disables)
  rightValue?: string | null;  // Text for right border
  bottomValue?: string | null; // Text for bottom border
  leftValue?: string | null;   // Text for left border
}
```

- Setting a value to `null` explicitly disables text on that side
- Omitting a property (undefined) leaves any existing text on that side unchanged
- Empty string (`''`) will be treated as no text but with `enableText: true`

### Override Behavior

All text methods accept an optional `{ override: true }` parameter to ensure the text values take precedence over any text settings applied at a later stage:

- `setText()` with override will override text from instance options
- `setTextId()` with override will override text from instance options
- `useText()` with override will override text from final `.options()` call
- `useTextId()` with override will override text from final `.options()` call

This is particularly useful when you need to ensure specific text appears regardless of other configuration.

### Example: Combining Text Methods with Border Options

```typescript
// First activate license (required for custom border text)
await QRCodeJs.license('YOUR-LICENSE-KEY');

// Set global default for all QR codes
QRCodeJs.setText({ 
  topValue: 'SCAN ME',
  bottomValue: 'www.example.com'
});

// Create QR code with custom border that uses the global text
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  borderOptions: {
    hasBorder: true,
    thickness: 40,
    color: '#0033CC',
    radius: '10%'
    // No decoration settings needed - will use the global text
  }
});

// Chain builder methods for more complex setup
const qrChained = QRCodeJs.useBorder('Rounded Border (Large)')
  .useText({ 
    topValue: 'POWERED BY',
    bottomValue: 'QR-PLATFORM'
  })
  .options({ data: 'https://example.com/chained' });
```

### Clearing Text Settings

To remove text from borders:

```typescript
// Clear global text settings
QRCodeJs.setText(null);

// Clear text on specific sides
QRCodeJs.setText({ 
  topValue: null,     // Explicitly remove top text
  bottomValue: null,  // Explicitly remove bottom text
});

// Use a predefined "empty" template to clear all sides
QRCodeJs.useText('empty-text-options').options({
  data: 'https://example.com'
});
```

## Scan Validation (Premium Feature)

> **Note**: This is a Premium Feature requiring a license.

The QRCode.js library offers functionality to validate that generated QR codes are scannable.

### `validateScanning()`

- **Purpose**: Verify the generated QR code is scannable
- **Returns**: `Promise<ScanValidatorResponse>` resolving to a validation result object (`{ isValid: boolean, decodedText?: string, message?: string }`)
- **Parameters**:
  - `validatorId` (`string`, optional, default: `'zbar'`): The ID of the validator engine to use. Currently only `'zbar'` is supported in the public release.
  - `debug` (`boolean`, optional, default: `false`): Enables debug logging for the validation process.
- **Example**:
  ```typescript
  const qrCode = new QRCodeJs({
    data: 'https://example.com'
  });
  
  qrCode.validateScanning()
    .then(result => {
      if (result.isValid) {
        console.log('QR code is valid and scannable!');
        console.log('Decoded text:', result.decodedText);
      } else {
        console.log('QR code validation failed:', result.message);
      }
    });
  ```

## Node.js Usage

QRCode.js can also be used in Node.js environments.

### Installation

Follow the standard installation steps using npm or yarn.

### Basic Usage

```typescript
import { QRCodeJs, Options } from '@qr-platform/qr-code.js/node'; // Import from '@qr-platform/qr-code.js/node'
import fs from 'fs';

const options: Options = {
  data: 'https://example.com',
};

const qrCode = new QRCodeJs(options);

qrCode.serialize().then(svgString => {
  if (svgString) {
    fs.writeFileSync('qrcode.svg', svgString);
    console.log('QR Code saved to qrcode.svg');
  }
});
```

### Key Differences & Considerations

- **Import Path**: Use `import { QRCodeJs } from '@qr-platform/qr-code.js/node';`.

- **Peer Dependencies:** You must install the required `peerDependencies` for Node.js functionality.
  
  Install automatically using npx:
  ```bash
  npx i-peers @qr-platform/qr-code.js
  ```
  Install manually using npm:
  ```bash
  npm i @xmldom/xmldom @undecaf/zbar-wasm image-size jose jimp @resvg/resvg-js file-type
  ```
- **No Canvas/Download**: Methods relying on browser APIs like `append()`, `download()`, or internal canvas generation are not available or behave differently in the Node.js version.
- **License Management**: Use the static methods described in the [License Management](#license-management) section.
- **Border Branding**: Similar to the browser version, Node.js will add "QR-Platform" branding to borders in the free version. To remove this, you'll need to activate a license.

## License Management

QRCode.js provides a comprehensive licensing system for premium features like advanced border controls and scan validation.

### Free vs. Premium Features

- **Free Features**: Basic QR code generation, styling options (colors, shapes, dot types), image embedding, basic borders (with QR-Platform branding)
- **Premium Features**: 
  - Advanced border customization (without branding)
  - Custom border text
  - Inner and outer borders
  - Scan validation tools
  - Full control over border sides and styling

### Border Limitations in Free Version

When using the basic border features in the free version, the library will automatically add "QR-Platform" branding text in the bottom border. This branded text cannot be removed or modified without a valid license. With a premium license, you gain full control over border text and can use borders without any branding.

### Activation Timing

- **Purpose**: Determines when license activation should occur
- **Important**: License activation must be completed *before* you create any `QRCodeJs` instances
- **Reason**: The constructor checks the license status at the time of creation
- **Rule**: Activate first, then instantiate

### Initialization

- **Purpose**: Sets up the license manager
- **Behavior**: Initializes automatically when you call `.license()` (or otherwise attempt activation) or check the status
- **Manual Method**: `QRCodeJs.initializeIfNeeded()` (rarely needed because `.license()` runs it automatically)
- **Example**:
  ```typescript
  async function initializeOnLoad() {
    const isActive = await QRCodeJs.initializeIfNeeded();
    console.log('License active after init:', isActive);
  }
  ```

### Persistence

#### Browser Environment
- **Storage**: `localStorage` under the key `QRCodeJsLicense`
- **Persistence**: License persists across page loads and sessions until token expiration
- **Content Stored**: Both JWT and license key (if used for activation)

#### Node.js Environment
- **Storage**: In-memory only (no persistent storage)
- **Persistence**: Requires reactivation when the application restarts
- **Alternative**: Manage token storage externally

### Activation Methods

#### Using a License Key (`QRCodeJs.license()`)

- **Purpose**: Activate license using a license key
- **Type**: `function(licenseKey: string): Promise<ValidationResult>`
- **Process**:
  1. Calls `QRCodeJs.license('YOUR-LICENSE-KEY')`
  2. Library sends key to backend endpoint (default: `POST /api/get-token`)
  3. Backend validates key and returns signed JWT
  4. Library validates JWT signature and expiration date
  5. If valid, token and key are stored
- **Example** (async/await):
  ```typescript
  await QRCodeJs.license('YOUR-LICENSE-KEY');
  const qrInstance = new QRCodeJs({
    data: 'https://example.com',
    borderOptions: { 
      hasBorder: true,
      decorations: {
        bottom: {
          enableText: true,
          value: 'CUSTOM TEXT' // Works because license is active
        }
      }
    }
  });
  ```

#### Using a Pre-fetched Token (`QRCodeJs.token()`)

- **Purpose**: Activate license using a pre-fetched JWT token
- **Type**: `function(jwtToken: string | null): Promise<ValidationResult>`
- **Process**:
  1. Calls `QRCodeJs.token('YOUR-JWT-STRING')`
  2. Library validates JWT signature and expiration date
  3. If valid, token is stored
- **Example** (async/await):
  ```typescript
  await QRCodeJs.token(token);
  const qrInstance = new QRCodeJs({
    data: 'https://example.com',
    borderOptions: { 
      hasBorder: true,
      borderOuter: { // Premium feature works with license
        color: '#002683',
        thickness: 10
      }
    }
  });
  ```

### Checking License Status

#### Getting License Details

- **Purpose**: Retrieve current license information
- **Type**: `function(): DecodedLicenseToken | null`
- **Returns**: Decoded token object if license is active, otherwise `null`
- **Example**:
  ```typescript
  const licenseDetails = QRCodeJs.getLicenseDetails();
  if (licenseDetails) {
    console.log('License active. Plan:', licenseDetails.plan);
    console.log('Domains:', licenseDetails.domains);
    console.log('Expires:', new Date(licenseDetails.exp * 1000));
  } else {
    console.log('License not active or expired.');
  }
  ```

### Configuration

#### Setting License URL

- **Purpose**: Configure the endpoint for license key validation
- **Type**: `function(url: string): typeof QRCodeJs`
- **Default**: `/api/get-token`
- **Important**: Must be called before `QRCodeJs.license()`
- **Example**:
  ```typescript
  QRCodeJs.setLicenseUrl('https://my-api.com/licenses/get-token');
  await QRCodeJs.license('YOUR-LICENSE-KEY');
  ```

#### Custom License Fetcher

- **Purpose**: Implement custom token fetching logic
- **Type**: `function(fetcherFn: (licenseKey: string) => Promise<string>): void`
- **Use Cases**: Custom headers, authentication, or request format
- **Example**:
  ```typescript
  QRCodeJs.configureLicenseFetcher(async (key) => {
    const response = await fetch('/my/custom/endpoint', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getAuthToken() },
      body: JSON.stringify({ licKey: key })
    });
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    return data.token;
  });
  ```

## Centralized Configuration with Settings (`SettingsOptions`, `setSettings`, `useSettings`)

For a comprehensive way to define or apply a complete QR code configuration in one go, QRCode.js provides:
- A `SettingsOptions` interface to structure a full configuration.
- A static `QRCodeJs.setSettings()` method for establishing global defaults using a `SettingsOptions` object.
- A `useSettings()` method for the `QRCodeBuilder` to apply a `SettingsOptions` object as a baseline for a specific builder chain.

### `SettingsOptions` Object

The `SettingsOptions` object allows you to define multiple aspects of a QR code configuration simultaneously:

- `id?: string`: Optional unique identifier for the settings preset.
- `name?: string`: Optional descriptive name for the settings preset.
- `description?: string`: Optional detailed description of the settings preset.
- `data?: string`: The primary data to encode. This will be applied as the main `data` option.
- `image?: string | Buffer | Blob`: Image to embed. This will be applied as the main `image` option.
- `template?: string | RecursivePartial<Options>`: Template by name or options object. Maps to `QRCodeJs.setTemplate()` when used with `QRCodeJs.setSettings()`.
- `templateId?: string`: Template by ID. Maps to `QRCodeJs.setTemplateId()`.
- `style?: string | StyleOptions`: Style by name or `StyleOptions` object. Maps to `QRCodeJs.setStyle()`.
- `styleId?: string`: Style by ID. Maps to `QRCodeJs.setStyleId()`.
- `text?: string | TextOptions`: Text configuration by name or `TextOptions` object. Maps to `QRCodeJs.setText()`.
- `textId?: string`: Text configuration by ID. Maps to `QRCodeJs.setTextId()`.
- `border?: string | RecursivePartial<BorderOptions>`: Border configuration by name or options object. Maps to `QRCodeJs.setBorder()`.
- `borderId?: string`: Border configuration by ID. Maps to `QRCodeJs.setBorderId()`.
- `options?: RecursivePartial<Options>`: Direct overrides for any main `Options` properties. These are deeply merged. Maps to `QRCodeJs.setOptions()`.

Refer to the [TypeScript Types and Definitions](./typescript-types-definitions.md#settingsoptions) for the full structure.

### Static `QRCodeJs.setSettings()`

The `QRCodeJs.setSettings(settings: SettingsOptions | null)` static method sets multiple global defaults at once.

- **Behavior**: It acts as a macro, internally calling other static setters (like `QRCodeJs.setTemplate()`, `QRCodeJs.setStyle()`, `QRCodeJs.setData()`, `QRCodeJs.setImage()`, `QRCodeJs.setOptions()`, etc.) based on the properties provided in the `settings` object.
- It will **override/reset** any previously set static configurations for the aspects it covers. For example, if `settings` includes a `templateId`, any previous global template set by `QRCodeJs.setTemplate()` will be replaced. Similarly, if `settings.data` is provided, it calls `QRCodeJs.setData(settings.data)`, and if `settings.options` is provided, it calls `QRCodeJs.setOptions(settings.options)`.
- Passing `null` will clear all static configurations (template, style, text, border, image, data, and options).

**Example:**
```typescript
const myGlobalPreset: SettingsOptions = {
  name: 'CompanyStandard',
  data: 'https://company.com/default-link', // Will call QRCodeJs.setData()
  image: 'https://company.com/assets/logo.png', // Will call QRCodeJs.setImage()
  templateId: 'company-wide-template', // Assumes this template ID exists, will call QRCodeJs.setTemplateId()
  options: { // Will call QRCodeJs.setOptions()
    qrOptions: { errorCorrectionLevel: 'H' },
    margin: 5
  }
};

QRCodeJs.setSettings(myGlobalPreset);

// Subsequent QRCodeJs instances will use these global defaults
const qr1 = new QRCodeJs({ /* data will be 'https://company.com/default-link' */ });
const qr2 = new QRCodeJs({ data: 'https://company.com/specific-page' }); // Overrides data from preset

// To clear all global settings:
// QRCodeJs.setSettings(null);
```

### Builder `useSettings()`

The `QRCodeBuilder.useSettings(settings: SettingsOptions)` method applies a `SettingsOptions` object as a new baseline for a specific builder chain.

- **Behavior**: Calling `useSettings()` on a builder instance will **reset** any configurations previously applied to *that builder instance* via methods like `useTemplate()`, `useStyle()`, `useBorder()`, `useText()`, `useImage()`, `useData()`, or `useOptions()`. The provided `settings` object then establishes the new comprehensive baseline for that builder.
- Subsequent builder methods chained *after* `useSettings()` (e.g., `.useStyle()`, `.options()`) will then modify this new baseline.

**Example:**
```typescript
const eventSpecificSettings: SettingsOptions = {
  name: 'ConferenceQR',
  data: 'https://conference-event.com/details', // Baseline data for this builder
  image: 'event-logo.png', // Baseline image
  style: { dotsOptions: { type: 'classy', color: '#005FAB' } }, // Baseline style
  borderId: 'event-frame' // Baseline border
};

const qrEvent = QRCodeJs.useTemplate('basic') // Initial template (will be reset by useSettings)
  .useStyle({ dotsOptions: { color: 'red'} }) // This style will also be reset
  .useSettings(eventSpecificSettings) // Resets builder and applies eventSpecificSettings as baseline
  .useOptions({ margin: 20 }) // Further customizes the baseline from eventSpecificSettings
  .options({ data: 'https://conference-event.com/live-updates' }) // Final data override
  .build();

qrEvent.append(document.getElementById('event-qr-container'));
```

## Using Templates, Styles, Borders, Data, Options, and Settings

QRCode.js offers flexible ways to manage configurations, from setting global defaults that apply to all new instances to using a fluent builder pattern for specific instances.

### Setting Global Defaults

Static methods on the `QRCodeJs` class allow you to define default configurations that will be automatically applied to all `QRCodeJs` instances created *after* these defaults are set. This is useful for establishing a baseline style or configuration for your application.

- **`QRCodeJs.setTemplate(templateNameOrOptions | null)` / `QRCodeJs.setTemplateId(id | null)`**: Sets a global default template.
- **`QRCodeJs.setStyle(styleNameOrOptions | null)` / `QRCodeJs.setStyleId(id | null)`**: Sets a global default style.
- **`QRCodeJs.setBorder(borderNameOrOptions | null)` / `QRCodeJs.setBorderId(id | null)`**: Sets a global default border configuration.
- **`QRCodeJs.setText(textNameOrOptions | null, overrideOpts?: MethodOverrideOptions)` / `QRCodeJs.setTextId(id | null, overrideOpts?: MethodOverrideOptions)`**: Sets global default border text. The `overrideOpts` (e.g., `{ override: true }`) ensures this text takes precedence over text set by other means (e.g., in instance options).
- **`QRCodeJs.setImage(imageUrl | null, overrideOpts?: MethodOverrideOptions)`**: Sets a global default image. `overrideOpts` ensures this image takes precedence over images set by other means.
- **`QRCodeJs.setData(data | null, overrideOpts?: MethodOverrideOptions)`**: Sets a global default data string. `overrideOpts` ensures this data takes precedence.
- **`QRCodeJs.setOptions(options | null, overrideOpts?: MethodOverrideOptions)`**: Sets global default options that are merged deeply. `overrideOpts` ensures higher precedence for these options over those set by other means for the properties they cover.
- **`QRCodeJs.setSettings(settings | null)`**: A powerful static method to set multiple global defaults at once using a comprehensive `SettingsOptions` object (see [Centralized Configuration with Settings](#centralized-configuration-with-settings)). This method acts as a macro, calling the other static setters (like `setTemplate`, `setStyle`, `setData`, `setImage`, `setOptions`, etc.) based on the provided `settings` object. It will override/reset any previously set static configurations for the aspects it covers.

Any options provided during the instantiation of `new QRCodeJs({...})` or through builder methods will override these global defaults for that specific instance, **unless** an `override: true` was used with a static setter for that specific property. Call any of these setters with `null` to clear the respective global default.

**Example: Setting various global defaults**
```typescript
// Set a global template and data with override
QRCodeJs.setTemplate('dots');
QRCodeJs.setData('https://example-global.com', { override: true }); // This data will be hard to override

const qr1 = new QRCodeJs({ /* data will be https://example-global.com */ });
const qrWithDifferentData = new QRCodeJs({ data: 'https://another-link.com' }); // data will still be https://example-global.com due to override

// Using setSettings to define multiple global defaults
const globalBrandSettings: SettingsOptions = {
  templateId: 'brand-template', // Assumes this ID exists
  style: { dotsOptions: { color: '#AA0000' } }, // Dark red dots
  image: 'https://brand.com/logo.svg', // Global brand logo
  data: 'https://brand-default.com', // Default data for this setting
  options: { margin: 10, qrOptions: { errorCorrectionLevel: 'M' } }
};
QRCodeJs.setSettings(globalBrandSettings);
// This will override the previous QRCodeJs.setTemplate('dots').
// However, the data 'https://example-global.com' (set with override:true) will persist.
// All other aspects from globalBrandSettings (style, image, options) will apply.

const qrBrand = new QRCodeJs({ /* data is 'https://example-global.com', other options from globalBrandSettings apply */ });

// Reset all global settings
QRCodeJs.setSettings(null); // This clears all static defaults, including the overridden data.
const qrAfterClear = new QRCodeJs({ data: 'https://new-data.com' }); // Now uses 'https://new-data.com'
```

### Using the Builder Pattern

The static `use` methods (e.g., `QRCodeJs.useTemplate()`, `QRCodeJs.useStyle()`, `QRCodeJs.useSettings()`) initiate a builder pattern. They return a `QRCodeBuilder` instance pre-configured with the specified settings. This approach does **not** set global defaults.

- **`QRCodeJs.useTemplate(templateNameOrOptions)` / `QRCodeJs.useTemplateId(id)`**: Initiates a builder with a template.
- **`QRCodeJs.useStyle(styleNameOrOptions)` / `QRCodeJs.useStyleId(id)`**: Initiates a builder with a style.
- **`QRCodeJs.useBorder(borderNameOrOptions)` / `QRCodeJs.useBorderId(id)`**: Initiates a builder with border settings.
- **`QRCodeJs.useText(textNameOrOptions, overrideOpts?: MethodOverrideOptions)` / `QRCodeJs.useTextId(id, overrideOpts?: MethodOverrideOptions)`**: Initiates a builder with border text settings. `overrideOpts` ensures precedence over text in final `.options()`.
- **`QRCodeJs.useImage(imageUrl, overrideOpts?: MethodOverrideOptions)`**: Initiates a builder with an image. `overrideOpts` ensures precedence over image in final `.options()`.
- **`QRCodeJs.useData(data, overrideOpts?: MethodOverrideOptions)`**: Applies a data string to the current builder configuration. `overrideOpts` ensures precedence over data in final `.options()`.
- **`QRCodeJs.useOptions(options, overrideOpts?: MethodOverrideOptions)`**: Applies a partial options object to the current builder configuration. `overrideOpts` ensures higher precedence for these options over those in final `.options()` for the properties they cover.
- **`QRCodeJs.useSettings(settings)`**: Applies a comprehensive `SettingsOptions` object as a new baseline for the builder chain, **resetting** any configurations previously applied to *that builder instance* via other `use` methods (see [Centralized Configuration with Settings](#centralized-configuration-with-settings)).

You **must** chain these calls with `.options(finalOptions)` (which also builds the instance) or `.build()` to get the final `QRCodeJs` instance. The `.options()` method takes the final configuration, including the required `data` property (unless provided by `useData`, `useSettings`, or a global default with override) and any ultimate overrides.

**Example: Builder Pattern Usage**
```typescript
// Start with a template, then layer styles and data
const qrBuilder1 = QRCodeJs.useTemplate('rounded')
  .useStyle({ dotsOptions: { color: '#007BFF' } }) // Blue override for dots
  .useData('Built with template and style')
  .options({ margin: 10 }); // Final options and build

// Using useSettings to establish a baseline for the builder
const eventSettings: SettingsOptions = {
  data: 'https://myevent.com',
  image: 'event-logo.png',
  styleId: 'event-style' // Assumes 'event-style' is a defined style
};
const qrEvent = QRCodeJs.useSettings(eventSettings) // Establishes baseline from eventSettings
  .useText({ topValue: 'SCAN FOR EVENT DETAILS' }) // Adds text to the baseline
  .useOptions({ qrOptions: { errorCorrectionLevel: 'H' } }, { override: true }) // These options take high precedence over final .options()
  .options({ data: 'Final Event Data Override', qrOptions: { errorCorrectionLevel: 'M' } });
  // Final data overrides eventSettings.data.
  // errorCorrectionLevel 'M' from .options() is overridden by 'H' from .useOptions() with override:true.
```

### Configuration Precedence

Understanding the order in which options are applied is key:
1.  **Base Defaults**: The library's inherent defaults (`baseQRTemplateOptions`).
2.  **Static Global Defaults**: Set by `QRCodeJs.setTemplate()`, `QRCodeJs.setStyle()`, `QRCodeJs.setData()`, `QRCodeJs.setOptions()`, `QRCodeJs.setSettings()`, etc.
    *   `QRCodeJs.setSettings()` calls individual static setters, so its components follow this rule.
    *   Static setters with `{ override: true }` (e.g., `setData('data', { override: true })`) will have their specific property take precedence over less specific global defaults or later non-overriding instance options.
3.  **Builder Methods**:
    *   If `QRCodeBuilder.useSettings(settings)` is called, it **resets** previous builder steps for that instance and establishes `settings` as the new baseline.
    *   Other builder methods (`useTemplate`, `useStyle`, `useData`, `useOptions`, etc.) are applied sequentially. If multiple methods affect the same property, later calls generally override earlier ones *within the builder chain* (either before `useSettings` or after it on the new baseline).
    *   Builder methods with `{ override: true }` (e.g., `useData('data', { override: true })`) will have their specific property take precedence within the builder's accumulated state before the final `.options()` call, overriding values from the final `.options()` for those specific properties.
4.  **Final `.options()` call on Builder / Constructor Options**: Options passed directly here (e.g., `new QRCodeJs(options)` or `builder.options(options)`) override global defaults and accumulated builder configurations, **unless** a global or builder setting for a specific property was set with `{ override: true }`.

**In summary for a single property (e.g., `data` or `image`):**
- A value set with `{ override: true }` (either static or builder) is very sticky and will generally win.
- Otherwise, instance-specific options (from constructor or `.options()`) override builder-accumulated options (that were not set with override).
- Builder-accumulated options (not set with override) override global static defaults (not set with override).
- Global static defaults (not set with override) override base library defaults.

## Complete Examples
### Basic QR Code with Custom Dots

```typescript
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  dotsOptions: {
    type: 'rounded',
    color: '#0033CC',
    size: 12
  }
});

qrCode.append(document.getElementById('qr-container'));
```

### QR Code with Custom Corners and Background

```typescript
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  shape: 'square',
  qrOptions: {
    errorCorrectionLevel: 'H'
  },
  dotsOptions: {
    type: 'classy',
    color: '#000000'
  },
  cornersSquareOptions: {
    type: 'outpoint',
    color: '#FF0000'
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#FF0000'
  },
  backgroundOptions: {
    color: '#FFECDB',
    round: 0.2
  }
});
```

### QR Code with Embedded Logo

```typescript
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  image: 'https://example.com/logo.png',
  imageOptions: {
    mode: 'center',
    imageSize: 0.3,
    margin: 1,
    crossOrigin: 'anonymous',
    fill: {
      color: 'rgba(255,255,255,1)'
    }
  },
  dotsOptions: {
    type: 'dot',
    color: '#4267B2'
  }
});
```

### QR Code with Free Border (includes QR-Platform branding)

```typescript
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  dotsOptions: {
    type: 'rounded',
    color: '#0033CC'
  },
  borderOptions: {
    hasBorder: true,
    thickness: 50,
    color: '#002683',
    radius: '5%'
    // Note: Bottom border will automatically show "QR-Platform" text
    // This cannot be changed in the free version
  }
});
```

### QR Code with Premium Border Features (requires license)

```typescript
// Must activate license before creating QR code
await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrCode = new QRCodeJs({
  data: 'https://example.com',
  dotsOptions: {
    type: 'extraRounded',
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#8F00FF' },
        { offset: 1, color: '#0080FF' }
      ]
    }
  },
  backgroundOptions: {
    color: '#FFFFFF',
    round: 0.1
  },
  borderOptions: {
    hasBorder: true,
    thickness: 50,
    color: '#002683',
    radius: '40%',
    // Premium feature: custom border text (no branding)
    decorations: {
      top: {
        enableText: true,
        type: 'text',
        value: 'SCAN ME',
        style: {
          fontFace: 'Helvetica',
          fontSize: 28,
          fontColor: '#ffffff',
          letterSpacing: 2,
          fontWeight: 'bold'
        }
      },
      bottom: {
        enableText: true,
        type: 'text',
        value: 'CUSTOM BOTTOM TEXT', // With license this replaces "QR-Platform"
        style: {
          fontFace: 'Arial',
          fontSize: 20,
          fontColor: '#ffffff'
        }
      }
    },
    // Premium feature: additional borders
    borderOuter: {
      color: '#001255',
      thickness: 10
    },
    borderInner: {
      color: '#334499',
      thickness: 5
    }
  }
});
```

### QR Code with Gradients

```typescript
const qrCode = new QRCodeJs({
  data: 'Gradient Example',
  dotsOptions: {
    type: 'rounded',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 4,
      colorStops: [
        { offset: 0, color: '#ff5733' },
        { offset: 1, color: '#c70039' }
      ]
    }
  },
  backgroundOptions: {
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#e0e0e0' }
      ]
    }
  },
  cornersSquareOptions: {
    type: 'dot',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#c70039' },
        { offset: 1, color: '#900c3f' }
      ]
    }
  }
});
```

### QR Code with Border Layout Adjustments

```typescript
const qrCode = new QRCodeJs({
  data: 'Layout within Border',
  scale: 0.75, // Scale the QR code down to 75% within the border
  offset: -15, // Move the QR code up slightly within the border
  dotsOptions: {
    type: 'square',
    color: '#333333'
  },
  borderOptions: {
    hasBorder: true,
    thickness: 60,
    color: '#CCCCCC',
    radius: '10%',
    decorations: {
      bottom: {
        enableText: true,
        type: 'text',
        value: 'SCALED & OFFSET',
        style: {
          fontFace: 'Arial',
          fontSize: 24,
          fontColor: '#555555',
          fontWeight: 'normal'
        }
      }
    }
  }
});
```

### Circular QR Code with Custom Styling

```typescript
const qrCode = new QRCodeJs({
  data: 'https://example.com',
  shape: 'circle',
  dotsOptions: {
    type: 'rounded',
    color: '#6200EA'
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#00C853'
  },
  cornersSquareOptions: {
    type: 'rounded',
    color: '#00C853'
  },
  backgroundOptions: {
    color: '#FFFFFF'
  }
});
```

## API Reference

### Constructors

```typescript
new QRCodeJs(options: QRCodeJsOptions)
```

### Methods

#### `append()`

Appends the QR code to a container element.

```typescript
qrCode.append(
  container: HTMLElement,
  options?: { clearContainer?: boolean }
): QRCodeJs | undefined
```

#### `serialize()`

Converts the QR code to an SVG string.

```typescript
qrCode.serialize(inverted?: boolean): Promise<string | undefined>
```

#### `download()`

Downloads the QR code as a file.

```typescript
qrCode.download(
  downloadOptions?: { 
    name?: string; 
    extension: 'svg' | 'png' | 'jpeg' | 'webp' 
  },
  canvasOptions?: CanvasOptions
): Promise<void>
```

#### `update()`

Updates the QR code with new options.

```typescript
qrCode.update(options?: RecursivePartial<Options>): void
```

#### `validateScanning()` (Premium)

Validates that the QR code is scannable.

```typescript
qrCode.validateScanning(
  validatorId?: string,
  debug?: boolean
): Promise<ScanValidatorResponse>
```

#### Metadata Methods

These helper methods allow attaching or retrieving metadata on a QR code instance.

```typescript
qrCode.setId(id?: string): this
qrCode.setName(name?: string): this
qrCode.setDescription(description?: string): this
qrCode.setMetadata(metadata?: Record<string, any>): this

qrCode.getId(): string | undefined
qrCode.getName(): string | undefined
qrCode.getDescription(): string | undefined
qrCode.getMetadata(): Record<string, any> | undefined
qrCode.getSettings(): SettingsOptions & { options: Options }
```

### Static Methods

These methods are called directly on the `QRCodeJs` class (e.g., `QRCodeJs.setTemplate()`).

#### License Management

#### `initializeIfNeeded()`

Initializes the license manager if needed. Typically this runs automatically when calling `.license()`, but you can call it manually in unusual scenarios.

```typescript
QRCodeJs.initializeIfNeeded(): Promise<boolean>
```

#### `getLicenseDetails()`

Returns the decoded token object if a valid license is active.

```typescript
QRCodeJs.getLicenseDetails(): DecodedLicenseToken | null
```

#### `license()`

Activates a license using a license key.

```typescript
QRCodeJs.license(licenseKey: string): Promise<ValidationResult>
```

#### `token()`

Activates a license using a pre-fetched JWT token.

```typescript
QRCodeJs.token(token: string | null): Promise<ValidationResult>
```

#### `configureLicenseFetcher()`

Configures a custom function for fetching license tokens.

```typescript
QRCodeJs.configureLicenseFetcher(fetcher: (licenseKey: string) => Promise<string>): void
```

#### `setLicenseUrl()`

Sets the URL endpoint for license key validation.

```typescript
QRCodeJs.setLicenseUrl(url: string): void
```

#### Configuration Defaults & Builder Initiators

The following static methods are available on the `QRCodeJs` class.

##### Global Defaults:
- **`setTemplate(templateNameOrOptions | null)` / `setTemplateId(id | null)`**: Sets a global default template.
- **`setStyle(styleNameOrOptions | null)` / `setStyleId(id | null)`**: Sets a global default style.
- **`setBorder(borderNameOrOptions | null)` / `setBorderId(id | null)`**: Sets a global default border configuration.
- **`setText(textNameOrOptions | null, overrideOpts?)` / `setTextId(id | null, overrideOpts?)`**: Sets global default border text. `overrideOpts` (e.g., `{ override: true }`) ensures precedence.
- **`setImage(imageUrl | null, overrideOpts?)`**: Sets a global default image. `overrideOpts` ensures precedence.
- **`setData(data | null, overrideOpts?)`**: Sets a global default data string. `overrideOpts` ensures precedence.
- **`setOptions(options | null, overrideOpts?)`**: Sets global default options (merged deeply). `overrideOpts` ensures higher precedence.
- **`setSettings(settings | null)`**: Sets multiple global defaults from a `SettingsOptions` object. Acts as a macro, calling other static setters. Clears all static defaults if `null` is passed.

*All `set...` methods return `typeof QRCodeJs` for chaining.*

##### Builder Initiators:
These methods initiate a `QRCodeBuilder` instance.

- **`useTemplate(templateNameOrOptions)` / `useTemplateId(id)`**: Starts builder with a template.
- **`useStyle(styleNameOrOptions)` / `useStyleId(id)`**: Starts builder with a style.
- **`useBorder(borderNameOrOptions)` / `useBorderId(id)`**: Starts builder with border settings.
- **`useText(textNameOrOptions, overrideOpts?)` / `useTextId(id, overrideOpts?)`**: Starts builder with border text. `overrideOpts` ensures precedence over text in final `.options()`.
- **`useImage(imageUrl, overrideOpts?)`**: Starts builder with an image. `overrideOpts` ensures precedence over image in final `.options()`.
- **`useData(data, overrideOpts?)`**: Applies data to the builder. `overrideOpts` ensures precedence over data in final `.options()`.
- **`useOptions(options, overrideOpts?)`**: Applies options to the builder. `overrideOpts` ensures precedence over options in final `.options()`.
- **`useSettings(settings)`**: Applies a `SettingsOptions` object as a new baseline for the builder, resetting prior builder configurations.

*All `use...` methods return a `QRCodeBuilder` instance for chaining.*

**Example Signatures (Illustrative):**
```typescript
// Global Defaults
static setData(data: string | null, overrideOpts?: { override?: boolean }): typeof QRCodeJs;
static setOptions(options: RecursivePartial<Options> | null, overrideOpts?: { override?: boolean }): typeof QRCodeJs;
static setSettings(settings: SettingsOptions | null): typeof QRCodeJs;

// Builder Initiators & Methods
static useData(data: string, overrideOpts?: { override?: boolean }): QRCodeBuilder;
static useOptions(options: RecursivePartial<Options>, overrideOpts?: { override?: boolean }): QRCodeBuilder;
static useSettings(settings: SettingsOptions): QRCodeBuilder;

// (Other set... and use... methods follow similar patterns)
```

## Fluent Builder Pattern (`useTemplate`, `useStyle`, `useSettings`, `build`, etc.)

QRCode.js offers a fluent builder pattern for a more readable and chainable way to configure and create QR codes, especially when combining templates, styles, and custom options.

### Overview

Instead of passing all options to the constructor, you can start with a base template, style, border, or image using `QRCodeJs.useTemplate()`, `QRCodeJs.useStyle()`, `QRCodeJs.useBorder()`, or `QRCodeJs.useImage()`. These methods return a `QRCodeBuilder` instance. You can then chain further `.useTemplate()`, `.useStyle()`, `.useBorder()`, `.useImage()`, and finally `.options()` or `.build()` to finalize the configuration.

- `QRCodeJs.useTemplate(template)`: Starts a builder with a predefined or custom template.
- `QRCodeJs.useStyle(style)`: Starts a builder and applies a predefined or custom style.
- `QRCodeJs.useBorder(border)`: Starts a builder and applies a predefined or custom border configuration.
- `QRCodeJs.useImage(imageUrl)`: Starts a builder and sets an image.
- `.useTemplate(template)` (on builder): Applies another template. Options merge.
- `.useStyle(style)` (on builder): Applies another style. Options merge.
- `.useBorder(border)` (on builder): Applies a border configuration. Options merge.
- `.useImage(imageUrl)` (on builder): Sets or overrides the image.
- `.options(options)` (on builder): Merges final specific options and returns the `QRCodeJs` instance.
- `.build()` (on builder, optional method if options(options) is NOT called): Creates the `QRCodeJs` instance with the accumulated configuration.

### How Builder Methods Work Together

You can chain `useTemplate`, `useStyle`, `useBorder`, and `useImage` calls. The options are merged progressively. If multiple methods define the same option (e.g., `dotsOptions.color` from a template and a style, or `image` from `useImage` and a template), the option from the *last* applied method in the chain for that specific property will generally take precedence. The final `.options()` call provides the ultimate override.

### Examples

**1. Start with a Template, Add Options:**

```typescript
const qrFromTemplate = QRCodeJs.useTemplate('rounded') // Start with 'rounded' template
  .options({ // Merge specific options
    data: 'Data for rounded QR',
    margin: 10
  })
  .build(); // Build the final instance

qrFromTemplate.append(document.getElementById('qr-container-1'));
```

**2. Start with a Style, Add Options:**

```typescript
const myStyle = {
  dotsOptions: { type: 'dots', color: '#FF6347' }, // Tomato dots
  backgroundOptions: { color: '#F0F8FF' } // AliceBlue background
};

const qrFromStyle = QRCodeJs.useStyle(myStyle) // Start with custom style
  .options({ // Merge specific options
    data: 'Data for styled QR',
    qrOptions: { errorCorrectionLevel: 'H' }
  })
  .build();

qrFromStyle.append(document.getElementById('qr-container-2'));
```

**3. Chain Template and Style:**


```typescript
const qrCombined = QRCodeJs.useTemplate('dots') // Start with 'dots' template (black dots)
  .useStyle({ dotsOptions: { color: '#4682B4' } }) // Apply style, overriding dot color to SteelBlue
  .useImage('https://example.com/logo.png') // Add an image
  .options({ data: 'Template + Style + Image' })
  .build();

qrCombined.append(document.getElementById('qr-container-3'));
```

**4. Build without final options:**
```typescript
// Assume 'data' is part of the template or style
const qrBuildDirectly = QRCodeJs.useTemplate({ 
    data: 'Data in template',
    dotsOptions: { type: 'square' }
  })
  .build(); // Build directly if all options are set

qrBuildDirectly.append(document.getElementById('qr-container-4'));
```

## FAQ

### General Questions

#### Can I use SVG output?
Yes, set `type: 'svg'` and use the `.svg` property.

#### Can I use QRCode.js for free without a license?

Yes, QRCode.js can be used for free without a license key. This allows you to create full-featured, styled QR codes with all the basic features including custom dot styles, colors, shapes, and image embedding. The only limitations are on advanced border features and scan validation. 

#### Can I use border features in the free version?

Yes, you can use basic border features in the free version, but the library will automatically add "QR-Platform" branding text in the bottom border of your QR code. This branding cannot be removed or customized in the free version.

#### Does the QR-Platform branding affect the scannability of the QR code?

No, the QR-Platform branding only appears in the border area, which is outside the actual QR code area. It does not affect the scannability or functionality of the QR code itself. However, it does affect the visual appearance of your QR code.

### Do you provide support for licensed users?
Yes, we do provide support for licensed users. If you have any questions or need assistance, please contact us at support@qr-platform.com.

### What is QR-Platform?
QR-Platform is a powerful and comprehensive solution for managing and deploying QR codes, it enables businesses to effortlessly Create, Store, Manage, and Deploy Beautiful, Stylish, and Fully Customizable QR codes. QRCode.js library license is included free of charge with all paid QR-Platform plans, offering seamless integration and powerful customization capabilities for businesses of any size.

#### Can I modify or remove the QR-Platform branding in the free version?

No, the QR-Platform branding in the bottom border is automatically added when using border features in the free version and cannot be modified or removed. This is a limitation of the free version. Purchasing a license allows you to remove the branding and fully customize your border text.

#### Can I make the QR-Platform branding less noticeable without a license?

While you cannot remove the branding, you can somewhat reduce its visual impact by:
- Using colors that create less contrast with the text
- Using thinner borders
- Using a small border radius to make the overall design less attention-grabbing

However, the branding will still be present, and these approaches might reduce the aesthetic appeal of your QR code.

#### What happens if I try to use premium border features without a license?

The library will not throw errors but will instead gracefully fall back to the free version behavior. It will ignore premium-only properties like `inner`, `borderOuter`, and `borderInner`, and will still display the QR-Platform branding in the bottom border.

#### Do I need to activate the license on every page load?

- **Browser**: No, license persists in `localStorage` until expiration
- **Node.js**: Yes, unless token is managed externally

#### What happens if the license expires?

`getLicenseDetails()` returns `null`; you'll need to renew with `license()` or `token()`.

## TypeScript Types

### Main Options Interface

```typescript
interface Options {
  // Core Data & QR Algorithm
  data: string; // Required: Content to encode
  qrOptions: {
    typeNumber: number; // Default 0 (auto)
    mode?: Mode; // Default: auto-detected
    errorCorrectionLevel: ErrorCorrectionLevel; // Default 'Q'
  };

  // Overall Shape & Layout
  shape: ShapeType; // Default 'square'
  margin?: number; // Default 0: Space around QR code (pixels)
  isResponsive?: boolean; // Default false: Allow SVG resizing
  scale?: number; // Default 1: Scale QR code within container/border (0-1.5)
  offset?: number; // Default 0: Vertical offset relative to center
  verticalOffset?: number; // Default 0: Absolute vertical offset
  horizontalOffset?: number; // Default 0: Absolute horizontal offset

  // Dot Styling
  dotsOptions: {
    type: DotType; // Default 'square'
    color: string; // Default '#000000'
    gradient?: Gradient;
    size: number; // Default 10 (pixels)
  };

  // Corner Square Styling (Overrides dotsOptions)
  cornersSquareOptions?: {
    type?: CornerSquareType; // Default: inherits dotsOptions.type or 'dot'
    color?: string; // Default: inherits dotsOptions.color or '#000000'
    gradient?: Gradient;
  };

  // Corner Dot Styling (Overrides cornersSquareOptions)
  cornersDotOptions?: {
    type?: CornerDotType; // Default: inherits cornersSquareOptions.type or 'dot'
    color?: string; // Default: inherits cornersSquareOptions.color or '#000000'
    gradient?: Gradient;
  };

  // Background Styling
  backgroundOptions?: {
    color?: string; // Default '#FFFFFF'
    gradient?: Gradient;
    round?: number | string; // Default 0: Corner rounding (0-1 or %)
  } | false; // Set to false to disable background

  // Image Embedding
  image?: string | Buffer | Blob; // Image source (URL, Buffer, Blob)
  imageOptions: {
    mode?: ImageMode; // Default 'center'
    imageSize: number; // Default 0.4: Relative image size (0-1)
    margin: number; // Default 0: Margin around image (dot units)
    crossOrigin?: string; // Default undefined: CORS setting
    fill?: {
      color: string; // Default 'rgba(255,255,255,1)'
      gradient?: Gradient;
    };
  };

  // Borders (Basic features in free version, advanced in premium)
  borderOptions?: {
    hasBorder: boolean; // Master switch to enable/disable borders
    thickness: number; // Thickness of the main border in pixels
    color: string; // Color of the main border
    radius: string; // Corner rounding of the border (e.g., '10%', '20px')
    noBorderThickness: number; // Thickness for border sides with disabled decorations
    background?: string; // Background color for the border area
    inner?: {
      radius: string;
      scale: number;
      horizontalOffset: number;
      verticalOffset: number;
    };
    borderOuter?: {
      color: string;
      thickness: number;
    };
    borderInner?: {
      color: string;
      thickness: number;
    };
    decorations?: {
      top?: DecorationOptions;
      right?: DecorationOptions;
      bottom?: DecorationOptions;
      left?: DecorationOptions;
    };
  };
}

// Supporting Interfaces
interface Gradient {
  type: 'linear' | 'radial';
  rotation?: number;
  colorStops: Array<{ offset: number; color: string }>;
}

interface DecorationOptions {
  disabled: boolean;
  enableText: boolean;
  offset: number;
  curveAdjustment: number;
  curveDisabled: boolean;
  curveRadius: string;
  type: 'text' | 'image';
  value: string;
  style?: {
    fontFace: string;
    fontSize: number;
    fontColor: string;
    letterSpacing: number;
    fontWeight: 'normal' | 'bold';
  };
}

// Enums
enum ShapeType {
  square = 'square',
  circle = 'circle'
}

enum Mode {
  numeric = 'numeric',
  alphanumeric = 'alphanumeric',
  byte = 'byte',
  kanji = 'kanji',
  unicode = 'unicode'
}

enum ErrorCorrectionLevel {
  L = 'L', // 7% error recovery
  M = 'M', // 15% error recovery
  Q = 'Q', // 25% error recovery
  H = 'H'  // 30% error recovery
}

enum DotType {
  dot = 'dot',
  square = 'square',
  rounded = 'rounded',
  extraRounded = 'extra-rounded',
  classy = 'classy',
  classyRounded = 'classy-rounded',
  verticalLine = 'vertical-line',
  horizontalLine = 'horizontal-line',
  randomDot = 'random-dot',
  smallSquare = 'small-square',
  tinySquare = 'tiny-square',
  star = 'star',
  plus = 'plus',
  diamond = 'diamond'
}

enum CornerSquareType {
  dot = 'dot',
  square = 'square',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}

enum CornerDotType {
  dot = 'dot',
  square = 'square',
  heart = 'heart',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}

enum ImageMode {
  center = 'center',
  overlay = 'overlay',
  background = 'background'
}
```

---

### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [Quick References Guide](./quick-references-guide.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Basic Examples](./examples.md#start)
- [Advanced Examples](./advanced-examples.md#start)
