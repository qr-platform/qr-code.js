# QRCode.js Usage Guide
<a id="start"></a>

## Introduction

QRCode.js is a powerful JavaScript library for creating highly customizable QR codes in both browser and Node.js environments. It allows you to control aspects like shape, colors, dot styles, corner styles, embedded images, borders, gradients, text, and more. This guide provides a complete overview of all available options to help you create the perfect QR code for your needs. QRCode.js is part of QR-Platform: All-in-One QR Codes Management Solution.

---

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

## QRCode.js Options

The following sections detail all configuration options for generating QR codes with QRCode.js, grouped by functionality.

### Core Options

These options define the essential properties for generating a QR code, including the data to encode and the algorithm settings.

| Option                 | Type                                   | Default        | Description                                                                 |
| :--------------------- | :------------------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `data`                 | `string`                               | -              | Specifies the text, URL, or other data to encode into the QR code. **Required option** |
| `shape`                | `'square' \| 'circle'`                 | `'square'`     | The overall shape of the QR code's boundary. |
| `qrOptions`            | `object`                               | `{...}`        | Options related to the underlying QR code generation algorithm.             |
| `qrOptions.typeNumber` | `number` (0-40)                        | `0`            | Specifies the QR code version (size/capacity). `0` means automatic detection. |
| `qrOptions.mode`       | `Mode` enum                            | Auto-detected  | The encoding mode (e.g., `Byte`, `Numeric`, `Kanji`). Usually auto-detected. |
| `qrOptions.errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'Q'`          | The error correction level, determining redundancy. |

##### Example: Core Options

```javascript
const qrCode = new QRCodeJs({
  data: 'This QR code uses High error correction',
  shape: 'circle',
  qrOptions: {
    errorCorrectionLevel: 'H' // L, M, Q, H
  }
});
```
---

### Layout Options

These options control the positioning, scaling, and responsiveness of the QR code within its container or border.

| Option             | Type     | Default | Description                                                                 |
| :----------------- | :------- | :------ | :-------------------------------------------------------------------------- |
| `margin`           | `number` | `0`     | The quiet zone (empty space) around the QR code in pixels.                  |
| `isResponsive`     | `boolean`| `false` | When `true`, the QR code SVG resizes dynamically to fill the width or height of the parent container, with no internal size dimensions applied. |
| `scale`            | `number` | `1`     | Scales the QR code size relative to its container or border (0 to 1.5).     |
| `offset`           | `number` | `0`     | Applies a vertical offset (positive moves down, negative moves up) relative to the center. |
| `verticalOffset`   | `number` | `0`     | Applies an absolute vertical offset in pixels.                              |
| `horizontalOffset` | `number` | `0`     | Applies an absolute horizontal offset in pixels.                            |

##### Example: Layout Options

```javascript
const qrCode = new QRCodeJs({
  data: 'Scaled and Offset QR Code',
  scale: 0.8,           // 80% of the available space
  offset: -10,          // Move QR code 10px up relative to center
  verticalOffset: 5,    // Absolute 5px down
  horizontalOffset: -5  // Absolute 5px left
});
```
---

### Styling Options

These options allow customization of the QR code’s visual appearance, covering dots, corner squares, corner dots, background, gradients, and image embedding. Each option is an `object` with properties that define the appearance of specific elements within the QR code.

#### Dots

`dotsOptions` is an `object` that defines the appearance of individual data modules (dots) within the QR code.

| Option              | Type          | Default        | Description                                                                                                |
| :------------------ | :------------ | :------------- | :--------------------------------------------------------------------------------------------------------- |
| `dotsOptions.type`  | `DotType` enum | `'square'`     | The shape of the dots.   |
| `dotsOptions.color` | `string`      | `'#000000'`    | The color of the dots. Accepts any valid CSS color string (e.g., `'#FF0000'`, `'red'`, `'rgba(255, 0, 0, 0.5)'`). |
| `dotsOptions.size`  | `number`      | `10`           | The size of each dot in pixels.                                                                            |
| `dotsOptions.gradient` | `Gradient` object | `undefined`    | Apply a gradient fill to the dots. See [Gradients](#gradients) for configuration details.                  |

**`DotType` Enum Values:** `dot`, `randomDot`, `rounded`, `extraRounded`, `verticalLine`, `horizontalLine`, `classy`, `classyRounded`, `square`, `smallSquare`, `tinySquare`, `star`, `plus`, `diamond`.

##### Example: Dot Styling

```javascript
const qrCode = new QRCodeJs({
  data: 'Styled Dots Example',
  dotsOptions: {
    type: 'rounded', // Use rounded dots
    color: '#ff0000', // Red dots
    size: 12         // Slightly larger dots
  }
});
```
---

#### Corner Squares

`cornersSquareOptions` is an `object` that defines the appearance of the three large corner squares. 

| Option                         | Type                 | Default        | Description                                                                                                      |
| :----------------------------- | :------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| `cornersSquareOptions.type`  | `CornerSquareType` enum | Inherits       | The shape of the corner squares. |
| `cornersSquareOptions.color` | `string`             | Inherits       | The color of the corner squares. Accepts any valid CSS color string.                                              |
| `cornersSquareOptions.gradient` | `Gradient` object    | `undefined`    | Apply a gradient fill to the corner squares. See [Gradients](#gradients) for configuration details.               |

**`CornerSquareType` Enum Values:** `dot`, `square`, `rounded`, `classy`, `outpoint`, `inpoint`.

##### Example: Corner Square Styling

```javascript
const qrCode = new QRCodeJs({
  data: 'Styled Corners Example',
  dotsOptions: {
    type: 'square',
    color: '#0000ff' // Blue dots
  },
  cornersSquareOptions: {
    type: 'dot',      // Use dot shape for corners
    color: '#00ff00'  // Green corners
  }
});
```
---

#### Corner Dots

`cornersDotOptions` is an `object` that defines the appearance of the smaller dots inside the corner squares.

| Option                      | Type              | Default        | Description                                                                                                      |
| :-------------------------- | :---------------- | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| `cornersDotOptions.type`  | `CornerDotType` enum | Inherits       | The shape of the corner dots. |
| `cornersDotOptions.color` | `string`          | Inherits       | The color of the corner dots. Accepts any valid CSS color string.                                                |
| `cornersDotOptions.gradient` | `Gradient` object | `undefined`    | Apply a gradient fill to the corner dots. See [Gradients](#gradients) for configuration details.                 |

**`CornerDotType` Enum Values:** `dot`, `square`, `heart`, `rounded`, `classy`, `outpoint`, `inpoint`.

*\*Note: Defaults inherit from `cornersSquareOptions` first, then `dotsOptions`. Templates might set explicit defaults.*

#### Example: Corner Dot Styling

```javascript
const qrCode = new QRCodeJs({
  data: 'Styled Corner Dots Example',
  dotsOptions: {
    type: 'square',
    color: '#333333' // Dark grey dots
  },
  cornersSquareOptions: {
    type: 'square',
    color: '#aaaaaa' // Light grey corner squares
  },
  cornersDotOptions: {
    type: 'dot',      // Dot shape for inner corner dots
    color: '#ff00ff'  // Magenta inner corner dots
  }
});
```

---

#### Background

`backgroundOptions` is an `object` or `false` that defines the appearance of the background layer of the QR code.

| Option                        | Type                 | Default        | Description                                                                                             |
| :---------------------------- | :------------------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| `backgroundOptions.color`   | `string`             | `'#FFFFFF'`    | The background color. Accepts any valid CSS color string.                                                |
| `backgroundOptions.round`   | `number \| string`   | `0`            | Rounds the corners of the background (0-1 or percentage).                                               |
| `backgroundOptions.gradient`| `Gradient` object    | `undefined`    | Apply a gradient fill to the background. See [Gradients](#gradients) for configuration details.         |

##### Example: Background Styling

```javascript
const qrCode = new QRCodeJs({
  data: 'Styled Background Example',
  dotsOptions: {
    color: '#ffffff' // White dots to contrast
  },
  backgroundOptions: {
    color: '#000080', // Navy blue background
    round: 0.5        // Rounded background corners
  }
});
// Example: Transparent Background
const qrCodeTransparent = new QRCodeJs({
  data: 'Transparent Background',
  backgroundOptions: false // Disable background
});
```

---

#### Gradients

Options for applying gradient fills to various QR code elements (dots, corner squares, corner dots, background, image fill).

| Option      | Type                                   | Default | Description                                                                 |
| :---------- | :------------------------------------- | :------ | :-------------------------------------------------------------------------- |
| `type`      | `'linear' \| 'radial'`                 | -       | Specifies the gradient type: `'linear'` or `'radial'`.                      |
| `rotation`  | `number`                               | -       | Rotation angle in radians for linear gradients.                            |
| `colorStops`| `Array<{ offset: number, color: string }>` | -   | Array of color stops defining the gradient (offset: 0-1, color: CSS string). At least two stops recommended. |

**Where to Apply Gradients:**
Add a `gradient` property to: `dotsOptions`, `cornersSquareOptions`, `cornersDotOptions`, `backgroundOptions`, and `imageOptions.fill`.

*Note: If both `color` and `gradient` are set, `gradient` takes precedence.*

##### Example: Gradient Usage

```javascript
const qrCodeWithGradient = new QRCodeJs({
  data: 'QR Code with Gradient Dots',
  dotsOptions: {
    type: 'rounded',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 4, // 45°
      colorStops: [
        { offset: 0, color: '#0000ff' }, // Blue
        { offset: 1, color: '#00ff00' }  // Green
      ]
    }
  },
  backgroundOptions: {
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#ffffff' }, // White center
        { offset: 1, color: '#dddddd' }  // Grey edge
      ]
    }
  }
});
```

---

#### Image Embedding

`imageOptions` is an `object` that defines the appearance of an image (e.g., a logo) within the QR code. `imageOptions` is only applicable when `image` is set.

| Option                    | Type                           | Default        | Description                                                                                                                               |
| :------------------------ | :----------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `image`                   | `string \| Buffer \| Blob`     | `undefined`    | URL, Buffer, or Blob of an image to embed in the QR code.                                                                                 |
| `imageOptions.mode`       | `ImageMode` enum               | `'center'`     | How the image is embedded.                         |
| `imageOptions.imageSize`  | `number`                       | `0.4`          | Relative size of the image (0-1).                                                                                                         |
| `imageOptions.margin`     | `number`                       | `0`            | Margin around the image in dot units.                                                                                                     |
| `imageOptions.crossOrigin`| `string`                       | `undefined`    | CORS setting for the image (e.g., `'anonymous'`, `'use-credentials'`).                                                                    |
| `imageOptions.fill`       | `object`                       | `{...}`        | Fill options for transparent areas (used in `'center'` mode).                                                                             |
| `imageOptions.fill.color` | `string`                       | `'rgba(255,255,255,1)'` | Fill color for transparent areas.                                                                                |
| `imageOptions.fill.gradient`| `Gradient` object            | `undefined`    | Apply a gradient fill to transparent areas. See [Gradients](#gradients) for configuration details.                                        |

**`ImageMode` Enum Values:** `center`, `overlay`, `background`.

**Important Considerations:**
- Embedding an image reduces scannability. Use higher error correction levels (`Q` or `H`).
- Keep `imageSize` small (e.g., < 0.5) to maintain readability.
- Ensure contrast between dots and the image, especially in `'overlay'` mode.

##### Example: Image Embedding

```javascript
const qrCodeWithLogo = new QRCodeJs({
  data: 'https://mybrand.com',
  qrOptions: {
    errorCorrectionLevel: 'H' // High error correction
  },
  image: 'https://mybrand.com/logo.png', // URL or data URI
  imageOptions: {
    imageSize: 0.3, // 30% size
    margin: 2       // 2 block margin
  }
});
```
---

#### Borders (Premium Feature, Requires License)

`borderOptions` is an `object` that defines the appearance of decorative borders around the QR code.

**Note:** This is a premium feature requiring a license. See [License Management](#license-management) for details.

| Option                        | Type                 | Default        | Description                                                                                                                               |
| :---------------------------- | :------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `borderOptions.hasBorder`     | `boolean`            | `false`        | Enables/disables all border features. Must be `true` to use other options.                                                                |
| `borderOptions.thickness`     | `number`             | `0`            | Thickness of the main border frame in pixels.                                                                                             |
| `borderOptions.color`         | `string`             | `'#000000'`    | Color of the main border frame. Accepts any valid CSS color string.                                                                       |
| `borderOptions.radius`        | `string`             | `'0%'`         | Corner radius of the main border (e.g., `'10px'`, `'50%'`).                                                                               |
| `borderOptions.noBorderThickness` | `number`         | `thickness / 4`| Thickness for border sides with disabled decorations.                                                                                     |
| `borderOptions.background`    | `string`             | `undefined`    | Background color for the border area. Accepts any valid CSS color string.                                                                 |
| `borderOptions.inner`         | `object`             | `undefined`    | Adjusts the inner content area relative to the border.                                                                                    |
| `borderOptions.inner.radius`  | `string`             | `'0%'`         | Corner radius for the inner content area.                                                                                                 |
| `borderOptions.inner.scale`   | `number`             | `1`            | Scales the inner content area (0 to 1.5).                                                                                                 |
| `borderOptions.inner.horizontalOffset` | `number`    | `0`            | Shifts the inner content horizontally within the border.                                                                                  |
| `borderOptions.inner.verticalOffset` | `number`      | `0`            | Shifts the inner content vertically within the border.                                                                                    |
| `borderOptions.borderOuter`   | `object`             | `undefined`    | Adds an outer border outside the main border.                                                                                             |
| `borderOptions.borderOuter.color` | `string`         | `'#000000'`    | Color of the outer border.                                                                                                                |
| `borderOptions.borderOuter.thickness` | `number`     | `10`           | Thickness of the outer border in pixels.                                                                                                  |
| `borderOptions.borderInner`   | `object`             | `undefined`    | Adds an inner border inside the main border.                                                                                              |
| `borderOptions.borderInner.color` | `string`         | `'#000000'`    | Color of the inner border.                                                                                                                |
| `borderOptions.borderInner.thickness` | `number`     | `5`            | Thickness of the inner border in pixels.                                                                                                  |
| `borderOptions.decorations`   | `object`             | `undefined`    | Adds text or images to border sides (`top`, `right`, `bottom`, `left`). See **Border Decorations**.                     | 

#### Border Decorations

`decorations` is an `object` that defines the appearance of text or images to specific border sides (`top`, `right`, `bottom`, `left`).

| Option                 | Type                 | Default        | Description                                                                                                                            |
| :--------------------- | :------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                 | `'text' \| 'image'`  | `'text'`       | Specifies text or image decoration.                                                                                                    |
| `value`                | `string`             | `''`           | The text content or image URL/data URI.                                                                                                |
| `enableText`           | `boolean`            | `false`        | Enables the decoration for this side.                                                                                                  |
| `disabled`             | `boolean`            | `false`        | Disables the decoration for this side.                                                                                                 |
| `style`                | `object`             | `{}`           | Text styling options (`fontFace`, `fontSize`, `fontColor`, `letterSpacing`, `fontWeight`).                                              |
| `style.fontFace`       | `string`             | `'Helvetica'`  | The font face for the text.                                                                                                            |
| `style.fontSize`       | `number`             | `28`           | The font size for the text in pixels.                                                                                                  |
| `style.fontColor`      | `string`             | `'#ffffff'`    | The color of the text.                                                                                                                 |
| `style.letterSpacing`  | `number`             | `0`            | The letter spacing for the text in pixels.                                                                                             |
| `style.fontWeight`     | `'normal' \| 'bold'` | `'normal'`     | The font weight for the text.                                                                                                          |
| `offset`               | `number`             | `0`            | Vertical (top/bottom) or horizontal (left/right) offset from the border center.                                                        |
| `curveDisabled`        | `boolean`            | `false`        | If `true`, text is drawn straight instead of curved along the border.                                                                  |
| `curveRadius`          | `string`             | `'50%'`        | Overrides the curve radius for text (e.g., `'50%'`). Defaults to `borderOptions.radius`.                                               |
| `curveAdjustment`      | `number`             | `0`            | Fine-tunes text curve positioning.                                                                                                     |

---

#### Notes
- **Required Option**: The `data` option is the only mandatory option, marked as **Required option** in its description.
- **Premium Feature**: The `borderOptions` and its sub-options (including decorations) require a license, as indicated by **Premium option**.
- **Links to Enums and Sections**: References like `[ShapeType](#enums-shapetype)` and `[Gradients](#gradients)` assume corresponding documentation sections exist. Adjust these to match your actual document structure.
- **Default Values**: Some defaults (e.g., `borderOptions.decorations.style`) are inferred from typical usage; verify with the library’s behavior if needed.

##### Example: Borders with Decorations

```javascript
// Ensure license is activated first!
// await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrCodeWithBorder = new QRCodeJs({
  data: 'QR Code with Fancy Border',
  borderOptions: {
    hasBorder: true,
    thickness: 20,
    color: '#663399', // Rebeccapurple
    radius: '20%',
    borderOuter: { color: '#FFD700', thickness: 2 }, // Gold outer line
    decorations: {
      top: {
        type: 'text',
        value: 'SCAN ME',
        style: { fontColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
        offset: -2 // Slightly up
      },
      bottom: {
        type: 'text',
        value: 'My Website',
        style: { fontColor: '#FFFFFF', fontSize: 14 },
        curveDisabled: false // Follow curve
      }
    }
  }
});
```

### Node.js Usage

To use QRCode.js in a Node.js environment:

- **Import the library**:
  ```javascript
  import { QRCodeJs } from '@qr-platform/qr-code.js/node'; // Use the Node.js-specific entry
  ```

- **Generate and serialize the QR code**:
  Since Node.js lacks a DOM, serialize the QR code to an SVG string and save it to a file:
  ```javascript
  const qrCode = new QRCodeJs({ data: 'https://example.com' });
  const svgString = await qrCode.serialize();
  require('fs').writeFileSync('qrcode.svg', svgString);
  ```

- **Key considerations**:
  - Use `serialize()` to obtain the SVG as a string for further processing.

---
<a id="license-management"></a>
### License Management

Premium features like Borders and Scan Validation require a valid license. To activate:

- **Using a License Key**:
  ```javascript
  await QRCodeJs.license('YOUR-LICENSE-KEY');
  ```

- **Using a JWT Token**:
  ```javascript
  await QRCodeJs.token('YOUR-JWT');
  ```

For detailed instructions, refer to the [License Management Documentation](./license-management.md#introduction).

---

## Scan Validation (Premium Feature, Requires License)

Validate that a QR code is scannable and decodes correctly.

**Note:** Requires a license. See [License Management](#license-management).

**Usage:**

```javascript
// Ensure license is activated
// await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrCode = new QRCodeJs({
  data: 'Data to validate'
});

const validationResult = await qrCode.validateScanning();

if (validationResult.isValid) {
  console.log('QR Code is valid! Decoded:', validationResult.data);
  // document.body.appendChild(qrCode.svgElement);
} else {
  console.error('Validation failed:', validationResult.error, validationResult.errorCode);
}
```

**Return Value (`validationResult`):**

| Property     | Type      | Description                                                                 |
| :----------- | :-------- | :-------------------------------------------------------------------------- |
| `isValid`    | `boolean` | `true` if scannable and correct, `false` otherwise.                         |
| `data`       | `string`  | Decoded data (if `isValid` is `true`).                                      |
| `format`     | `string`  | Barcode format (e.g., `'QR-Code'`) (if `isValid` is `true`).                |
| `attempts`   | `number`  | Number of decoding attempts.                                                |
| `isInverted` | `boolean` | Whether an inverted image was needed for scanning.                          |
| `error`      | `string`  | Error message (if `isValid` is `false`).                                    |
| `errorCode`  | `string`  | Error code (e.g., `NO_BARCODE_DETECTED`, `MAX_RETRIES_EXCEEDED`).           |

---

#### Methods

- **`append(container: HTMLElement): void`**
  Appends the QR code to a specified container element.

- **`serialize(): Promise<string | undefined>`**
  Converts the QR code to an SVG string.

- **`download(options?: { name?: string; extension: 'svg' | 'png' | 'jpeg' | 'webp' }, canvasOptions?: CanvasOptions): Promise<void>`**
  Downloads the QR code as a file.

- **`update(options: Partial<QRCodeJsOptions>): void`**
  Updates the QR code with new options.

- **`validateScanning(): Promise<{ isValid: boolean; decodedText?: string; message?: string }>`**
  Validates that the QR code is scannable (Premium feature).

#### Static Methods

- **`QRCodeJs.license(licenseKey: string): Promise<ValidationResult>`**
  Activates a license using a license key.

- **`QRCodeJs.token(token: string | null): Promise<ValidationResult>`**
  Activates a license using a pre-fetched JWT token.

- **`QRCodeJs.getLicenseDetails(): DecodedLicenseToken | null`**
  Retrieves current license information.

- **`QRCodeJs.setLicenseUrl(url: string): void`**
  Sets the URL endpoint for license key validation.

- **`QRCodeJs.configureLicenseFetcher(fetcher: (licenseKey: string) => Promise<string>): void`**
  Configures a custom function for fetching license tokens.


## FAQ

### How do I handle CORS issues with embedded images?

Set `crossOrigin` in `imageOptions`:
```javascript
imageOptions: {
  crossOrigin: 'anonymous'
}
```
Ensure the image server allows cross-origin requests.

### What are best practices for scannability?

- Keep `imageSize` below 0.5.
- Maintain high contrast between dots and background/image.

---

### Examples

##### Example 1: Classy Style with Gradient and Logo

```javascript
const qrCodeClassy = new QRCodeJs({
  data: 'https://stylish-qr.codes',
  qrOptions: { errorCorrectionLevel: 'H' },
  dotsOptions: {
    type: 'classyRounded',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 3,
      colorStops: [{ offset: 0, color: '#3366FF' }, { offset: 1, color: '#66CCFF' }]
    }
  },
  cornersSquareOptions: {
    type: 'classy',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 3,
      colorStops: [{ offset: 0, color: '#3366FF' }, { offset: 1, color: '#66CCFF' }]
    }
  },
  cornersDotOptions: {
    type: 'classy',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 3,
      colorStops: [{ offset: 0, color: '#3366FF' }, { offset: 1, color: '#66CCFF' }]
    }
  },
  backgroundOptions: { color: '#FFFFFF' },
  image: 'logo.svg',
  imageOptions: { imageSize: 0.25, margin: 1 }
});
```

##### Example 2: Circle Shape with Star Dots and Transparent Background

```javascript
const qrCodeCircleStar = new QRCodeJs({
  data: 'Circle with Stars',
  shape: 'circle',
  dotsOptions: {
    type: 'star',
    color: '#FF6600' // Orange stars
  },
  cornersSquareOptions: { type: 'rounded', color: '#FF6600' },
  cornersDotOptions: { type: 'dot', color: '#FF6600' },
  backgroundOptions: false // Transparent
});
```

##### Example 3: Premium Border with Text and Inner/Outer Borders

```javascript
// Ensure license is activated
// await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrCodePremium = new QRCodeJs({
  data: 'Premium Features Showcase',
  qrOptions: { errorCorrectionLevel: 'Q' },
  dotsOptions: { type: 'square', color: '#006400' }, // Dark green
  cornersSquareOptions: { type: 'square', color: '#006400' },
  cornersDotOptions: { type: 'square', color: '#006400' },
  backgroundOptions: { color: '#F0FFF0' }, // Honeydew
  borderOptions: {
    hasBorder: true,
    thickness: 25,
    color: '#556B2F', // Dark Olive Green
    radius: '10px',
    borderOuter: { color: '#BDB76B', thickness: 3 }, // Dark Khaki
    borderInner: { color: '#9ACD32', thickness: 1 }, // Yellow Green
    decorations: {
      bottom: {
        type: 'text',
        value: 'LICENSED FEATURE',
        style: { fontColor: '#FFFFFF', fontSize: 18, fontWeight: '500' },
        curveDisabled: true // Straight text
      }
    }
  }
});
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
