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
  QRCodeJs.setTextId('visit-website-bottom');
  
  // With override option
  QRCodeJs.setTextId('lost-found-all-sides', { override: true });
  
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
  const qrCode = QRCodeJs.useTextId('visit-website-bottom')
    .options({ data: 'https://example.com' });
    
  // With override option
  const qrWithOverride = QRCodeJs.useTextId('scan-me-top', { override: true })
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
- **Behavior**: Initializes automatically when you first attempt activation or check the status
- **Manual Method**: `QRCodeJs.initializeIfNeeded()`
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


## Using Templates

Templates offer a convenient way to apply a consistent set of styling and configuration options across multiple QR codes. QRCode.js provides two primary methods for working with templates:

### Setting Global Defaults (`setTemplate`)

The static method `QRCodeJs.setTemplate(templateNameOrOptions)` allows you to define a default template that will be automatically applied to all `QRCodeJs` instances created *after* the template is set. This is useful for establishing a baseline style for your application.

- You can provide the name of a predefined template (e.g., `'rounded'`, `'dots'`, `'classy'`).
- You can provide a custom partial options object (`RecursivePartial<Options>`).
- Any options provided during the instantiation of `new QRCodeJs({...})` will override the global template defaults for that specific instance.
- Call `QRCodeJs.setTemplate(null)` or `QRCodeJs.setTemplate('basic')` to reset to the default behavior.

```typescript
// Set a global template
QRCodeJs.setTemplate('dots');

// This QR code will use the 'dots' template
const qr1 = new QRCodeJs({ data: 'Uses global dots template' });

// Override the global template's color for this instance
const qr2 = new QRCodeJs({
  data: 'Overrides global dots color',
  dotsOptions: { color: '#FF4500' } // OrangeRed
});

// Reset to basic template
QRCodeJs.setTemplate('basic');
```

### Using the Builder Pattern (`useTemplate`)

The static method `QRCodeJs.useTemplate(templateNameOrOptions)` initiates a builder pattern. It returns a builder object pre-configured with the specified template (either by name or by providing a partial options object directly). 

- This method **does not** set a global default.
- You **must** chain this call with the `.options({...})` method on the returned builder.
- The `.options()` method takes the final configuration, including the required `data` property and any overrides specific to this instance.

```typescript
// Start with the 'rounded' template, provide data and override color
const qrBuilder1 = QRCodeJs.useTemplate('rounded').options({
  data: 'Built with rounded template',
  dotsOptions: { color: '#007BFF' } // Blue override
});

// Start with inline custom options, then provide data
const qrBuilder2 = QRCodeJs.useTemplate({
  shape: 'circle',
  dotsOptions: { type: 'star', color: '#DC3545' } // Red stars
}).options({
  data: 'Built with inline circle/star template'
});
```

Choosing between `setTemplate` and `useTemplate` depends on whether you need a persistent global default or a one-off configuration based on a template.

## Using Styles and Borders (Global Defaults vs. Builder)

Similar to templates, styles and border configurations can be applied globally or using the builder pattern.

### Setting Global Defaults (`setStyle`, `setBorder`)

- **`QRCodeJs.setStyle(styleNameOrOptions)`**: Sets a default style (by name or object) that applies to subsequent instances. Options provided during instantiation override the global style.
- **`QRCodeJs.setBorder(borderNameOrOptions)`**: Sets a default border configuration (by name or object) that applies to subsequent instances. Options provided during instantiation override the global border settings.
- **`QRCodeJs.setStyleId(styleId)` / `QRCodeJs.setBorderId(borderId)`**: Similar to the above, but uses the predefined ID of the style or border.

These methods are useful for establishing a consistent look and feel across multiple QR codes in your application.

### Using the Builder Pattern (`useStyle`, `useBorder`)

- **`QRCodeJs.useStyle(styleNameOrOptions)`**: Initiates a builder pre-configured with the specified style.
- **`QRCodeJs.useBorder(borderNameOrOptions)`**: Initiates a builder pre-configured with the specified border configuration.
- **`QRCodeJs.useStyleId(styleId)` / `QRCodeJs.useBorderId(borderId)`**: Similar, but uses the predefined ID.

These methods return a `QRCodeBuilder` instance, allowing you to chain configurations and finalize with `.options({...})` or `.build()`. This approach is ideal for creating specific QR code instances with unique combinations of templates, styles, and borders without affecting global defaults.


**Combining Methods:** You can combine global defaults with builder methods. For example, you could set a global template and then use the builder to apply a specific style, border, and image to an individual instance. Options are merged, with later steps in the configuration process (e.g., builder methods, final `.options()` call) overriding earlier ones (e.g., global defaults). The general precedence for the image source is: Builder's `useImage()` > Static `setImage()` > Template's image > Direct `options.image` in constructor.

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
qrCode.append(container: HTMLElement): QRCodeJs | undefined
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

### Static Methods (License Management)



#### `useTemplate()`

Creates a `QRCodeBuilder` instance initialized with a specific template.

```typescript
QRCodeJs.useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): QRCodeBuilder
```

#### `useStyle()`

Creates a `QRCodeBuilder` instance initialized with a specific style.

```typescript
QRCodeJs.useStyle(styleNameOrOptions: string | StyleOptions): QRCodeBuilder
```
These methods are called directly on the `QRCodeJs` class (or `QRCodeJs` imported from `qrcode-js/node`).

#### `initializeIfNeeded()`

Initializes the license manager if needed.

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

#### `setTemplate()`

Sets a global default template for subsequent `QRCodeJs` instances.

```typescript
QRCodeJs.setTemplate(templateNameOrOptions: string | RecursivePartial<Options>): void
```

#### `useTemplate()`

Initiates a builder pattern pre-configured with a template.

```typescript
QRCodeJs.useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): QRCodeBuilder
```

#### `setStyle()`

Sets a global default style for subsequent `QRCodeJs` instances.

```typescript
QRCodeJs.setStyle(styleNameOrOptions: string | RecursivePartial<StyleOptions>): void
```

#### `useStyle()`

Initiates a builder pattern pre-configured with a style.

```typescript
QRCodeJs.useStyle(styleNameOrOptions: string | StyleOptions): QRCodeBuilder
```

#### `setBorder()`

Sets a global default border configuration for subsequent `QRCodeJs` instances.

```typescript
QRCodeJs.setBorder(borderNameOrOptions: string | RecursivePartial<BorderOptions>): void
```

#### `setBorderId()`

Sets a global default border configuration by its ID for subsequent `QRCodeJs` instances.

```typescript
QRCodeJs.setBorderId(borderId: string): void
```

#### `useBorder()`

Initiates a builder pattern pre-configured with a border configuration.

```typescript
QRCodeJs.useBorder(borderNameOrOptions: string | BorderOptions): QRCodeBuilder
```

#### `useBorderId()`

Initiates a builder pattern pre-configured with a border configuration by its ID.

```typescript
QRCodeJs.useBorderId(borderId: string): QRCodeBuilder
```

## Fluent Builder Pattern (`useTemplate`, `useStyle`, `build`)

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
