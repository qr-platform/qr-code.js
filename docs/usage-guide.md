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

**Note on Image Source:** The `image` can be specified directly in the options, set globally for subsequent instances using `QRCodeJs.setImage('your_image_url')`, or set for a specific builder chain using `QRCodeJs.useImage('your_image_url').options(...)`. The builder's `useImage` typically overrides the global `setImage`, which in turn overrides an image set by a template. Direct options in the constructor or `.options()` call provide the final override.

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
| `style`                | `object`             | `{}`           | Text styling options (`fontFace`, `fontSize`, `fontColor`, `letterSpacing`, `fontWeight`).                                             |
| `style.fontFace`       | `string`             | `'Helvetica'`  | The font face for the text.                                                                                                            |
| `style.fontSize`       | `number`             | `28`           | The font size for the text in pixels.                                                                                                  |
| `style.fontColor`      | `string`             | `'#ffffff'`    | The color of the text.                                                                                                                 |
| `style.letterSpacing`  | `number`             | `0`            | The letter spacing for the text in pixels.                                                                                             |
| `style.fontWeight`     | `'normal' \| 'bold'` | `'bold'`       | The font weight for the text.                                                                                                          |
| `style.textTransform`  | `'uppercase' \| 'lowercase' \| 'capitalize'` | `'uppercase'` | The text transformation style.                                                                                  |
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

  - **Peer Dependencies:** You must install the required `peerDependencies` for Node.js functionality.
    
    Install automatically using npx:
    ```bash
    npx i-peers @qr-platform/qr-code.js
    ```
    Install manually using npm:
    ```bash
    npm i @xmldom/xmldom @undecaf/zbar-wasm image-size jose jimp @resvg/resvg-js file-type
    ```

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

- **`QRCodeJs.setTemplate(templateNameOrOptions: string | RecursivePartial<Options>): void`**
  Sets a global default template (by name or options object) for subsequent instances.

- **`QRCodeJs.setTemplateId(templateId: string): void`**
  Sets a global default template by its ID.

- **`QRCodeJs.setStyle(styleNameOrOptions: string | StyleOptions): void`**
  Sets a global default style (by name or options object) for subsequent instances.

- **`QRCodeJs.setStyleId(styleId: string): void`**
  Sets a global default style by its ID.

- **`QRCodeJs.setBorder(borderNameOrOptions: string | RecursivePartial<BorderOptions>): void`**
  Sets a global default border configuration (by name or options object) for subsequent instances.

- **`QRCodeJs.setBorderId(borderId: string): void`**
  Sets a global default border configuration by its ID.

- **`QRCodeJs.useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a template (by name or options object).

- **`QRCodeJs.useTemplateId(templateId: string): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a template by its ID.

- **`QRCodeJs.useStyle(styleNameOrOptions: string | StyleOptions): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a style (by name or options object).

- **`QRCodeJs.useStyleId(styleId: string): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a style by its ID.

- **`QRCodeJs.useBorder(borderNameOrOptions: string | BorderOptions): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a border configuration (by name or options object).

- **`QRCodeJs.useBorderId(borderId: string): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with a border configuration by its ID.

- **`QRCodeJs.setImage(imageUrl: string | DataURL | null): void`**
  Sets a global default image URL for subsequent `QRCodeJs` instances.

- **`QRCodeJs.useImage(imageUrl: string | DataURL): QRCodeBuilder`**
  Initiates the builder pattern pre-configured with an image URL.

### Setting Global Defaults for Styles, Borders, and Images (`setStyle`, `setBorder`, `setImage`)

Similar to `setTemplate`, you can set global defaults for styles, border configurations, and images that will apply to subsequently created instances:

- **`QRCodeJs.setStyle(styleNameOrOptions)` / `QRCodeJs.setStyleId(styleId)`**: Sets a default style by name, object, or ID.
- **`QRCodeJs.setBorder(borderNameOrOptions)` / `QRCodeJs.setBorderId(borderId)`**: Sets a default border configuration by name, object, or ID.
- **`QRCodeJs.setImage(imageUrl)`**: Sets a default image URL.

Options provided directly to the `new QRCodeJs(...)` constructor or via builder methods will override these global defaults for that specific instance.
```javascript
// Example of setting global image
QRCodeJs.setImage('https://example.com/default-logo.png');
const qrWithGlobalImage = new QRCodeJs({ data: 'Uses global image' });
// qrWithGlobalImage will use 'default-logo.png' unless overridden.
```

## Fluent Builder Pattern (`useTemplate`, `useStyle`, `useBorder`, `useImage`, `build`)

For a more structured and readable configuration process, especially when combining predefined settings with custom overrides, QRCode.js offers a fluent builder pattern.


**How it Works:**

1.  **Start:** Begin by calling `QRCodeJs.useTemplate()`, `QRCodeJs.useStyle()`, `QRCodeJs.useBorder()`, or `QRCodeJs.useImage()` with either a predefined name/ID or a custom options/style/border/image URL object. This returns a `QRCodeBuilder` instance.
2.  **Chain (Optional):** Call `.useTemplate()`, `.useStyle()`, `.useBorder()`, or `.useImage()` again on the builder instance to layer additional configurations. Options are merged, with later calls overriding earlier ones for the same properties.
3.  **Finalize:**
    *   Call `.options(yourOptions)` to merge any final, specific options.
    *   Or call `.build()` to create the `QRCodeJs` instance with the accumulated configuration. This is optional if `.options(yourOptions)` is NOT called. If `.options(yourOptions)` is called, calling `.build()` is not necessary. You can use `.update()` after `.build()` to update the data.

**Combining Builder Methods:**

When you chain multiple `use...` methods, their options are merged. If different methods define the same property (e.g., `image` from `useImage()` and an image defined in a template via `useTemplate()`), the value from the method called *later* in the chain for that specific property generally takes precedence. The final `.options()` call provides the ultimate override.

**Example:**

```typescript
// Start with 'dots' template, override color with a style, add an image, then final data
const qrCode = QRCodeJs.useTemplate('dots')       // Base: dots template (e.g., black square dots)
  .useStyle({ dotsOptions: { color: 'navy' } }) // Style: Change dot color to navy
  .useImage('https://example.com/my-logo.png') // Image: Set a logo
  .options({ data: 'Built with Template, Style, and Image' }) // Final data

qrCode.append(document.getElementById('builder-example-container'));

### Builder Pattern for Styles, Borders, and Images (`useStyle`, `useBorder`, `useImage`)

The builder pattern fully supports styles, borders, and images:

- **`QRCodeJs.useStyle(styleNameOrOptions)` / `QRCodeJs.useStyleId(styleId)`**: Starts the builder pre-configured with a style.
- **`QRCodeJs.useBorder(borderNameOrOptions)` / `QRCodeJs.useBorderId(borderId)`**: Starts the builder pre-configured with a border configuration.
- **`QRCodeJs.useImage(imageUrl)`**: Starts the builder pre-configured with an image.

You can chain these methods (e.g., `QRCodeJs.useTemplate(...).useStyle(...).useBorder(...).useImage(...)`) before finalizing with `.options(...)` or `.build()`. Options are merged progressively, with later calls overriding earlier ones.
```

---

## Centralized Settings Configuration (`settings` and `setSettings`)

For a comprehensive way to define or apply a complete QR code configuration in one go, QRCode.js provides a static `settings()` method for the builder pattern and an instance `setSettings()` method. These methods use a `SettingsOptions` object which can specify a template, style, text, border, and direct option overrides.

### `SettingsOptions` Object

The `SettingsOptions` interface allows you to define:
- `id`, `name`, `description`: Metadata for the settings preset.
- `template`, `templateId`: To apply a base template.
- `style`, `styleId`: To apply styling.
- `text`, `textId`: To configure border text.
- `border`, `borderId`: To apply border configurations.
- `options`: A `RecursivePartial<Options>` object for direct, fine-grained overrides of any core QR code options.

Refer to the [TypeScript Types and Definitions](./typescript-types-definitions.md#settingsoptions) for the full structure.

### Static `QRCodeJs.settings(settings: SettingsOptions | null)`

This static method is used to set a global default configuration that will be used by subsequently created `QRCodeJs` instances or as a starting point for the builder pattern.

- **Behavior**: Calling `QRCodeJs.settings()` will **completely replace** any configurations previously set by other static methods like `QRCodeJs.setTemplate()`, `QRCodeJs.setStyle()`, `QRCodeJs.setText()`, or `QRCodeJs.setBorder()`. The new `SettingsOptions` object becomes the sole source for these static defaults.
- If `null` is passed, all static configurations (template, style, text, border, and settings) are cleared.

**Example: Using Static `settings()`**

```typescript
const myPreset: SettingsOptions = {
  name: 'BrandStandard',
  description: 'Standard QR code style for our brand',
  templateId: 'modern-rounded', // Assuming this template exists
  style: { dotsOptions: { color: '#AA0000' } }, // Dark red dots
  border: { hasBorder: true, thickness: 5, color: '#333333' },
  options: {
    qrOptions: { errorCorrectionLevel: 'H' },
    margin: 10
  }
};

QRCodeJs.settings(myPreset);

// This instance will use the 'BrandStandard' preset
const qrFromPreset = new QRCodeJs({ data: 'Data for preset' });
qrFromPreset.append(document.getElementById('qr-preset-container'));

// You can still override parts of the preset or add data via the constructor
const qrModifiedPreset = new QRCodeJs({
  data: 'Data with slight modification',
  // Overriding margin from the preset
  margin: 20
});
qrModifiedPreset.append(document.getElementById('qr-modified-preset-container'));

// Clearing static settings
QRCodeJs.settings(null);
const qrAfterClear = new QRCodeJs({ data: 'Defaults after clear' }); // Uses base defaults
qrAfterClear.append(document.getElementById('qr-cleared-container'));
```

### Instance `instance.setSettings(settings: SettingsOptions)`

This instance method allows you to apply a `SettingsOptions` object to an existing `QRCodeJs` instance.

- **Behavior**: Calling `instance.setSettings()` will **completely replace** the instance's current entire options configuration with a new one derived from the provided `SettingsOptions`. It does not merge with the existing instance options but rather rebuilds them from `baseQRTemplateOptions` and then applies the `SettingsOptions` layers.

**Example: Using Instance `setSettings()`**

```typescript
const qrInstance = new QRCodeJs({ data: 'Initial Data', dotsOptions: { color: 'blue'} });
qrInstance.append(document.getElementById('qr-initial-container'));

const newLookSettings: SettingsOptions = {
  name: 'NewLook',
  styleId: 'dark-contrast', // Assuming this style exists
  options: {
    dotsOptions: { type: 'classy' }, // Overrides dot type from 'dark-contrast' style if any
    backgroundOptions: { color: '#111111' }
  }
};

// Apply the new look, completely replacing previous options
await qrInstance.setSettings(newLookSettings);
// The QR code will re-render with 'dark-contrast' style, classy dots, and dark background.
// The original blue dots are gone because options were replaced, not merged.
// The data 'Initial Data' will be preserved if not specified in newLookSettings.options.data
```

---

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
        style: { fontColor: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
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

</file_content>

Now that you have the latest state of the file, try the operation again with fewer, more precise SEARCH blocks. For large files especially, it may be prudent to try to limit yourself to <5 SEARCH/REPLACE blocks at a time, then wait for the user to respond with the result of the operation before following up with another replace_in_file call to make additional edits.
(If you run into this error 3 times in a row, you may use the write_to_file tool as a fallback.)
</error><environment_details>
# VSCode Visible Files
docs/usage-guide.md

# VSCode Open Tabs
src/types/text-options.ts
src/core/templates/qr-templates.ts
src/core/qr-code-js.ts
src/index.ts
src/node.ts
docs/ft009-settings-option-continuation-plan.md
tests/node/node.settings.test.ts
docs/api-reference-guide.md
docs/usage-guide.md
src/types/settings-options.ts
src/index.html
src/node-pdf-demo.js
src/options-demo.ts
src/templates/borders-templates.html
docs/documentation.md
tests/node/node.text-image.test.ts
docs/ft009-settings-option-plan.md
../../../../../Untitled-2
../../../../../Untitled-1
docs/typescript-types-definitions.md
src/license/LicenseManager.ts
rollup.config.ts
package.json
node_modules/rollup-plugin-minify-template-literals/dist/index.d.ts
src/config/runtime-config.js
src/core/templates/qr-styles-dark.ts
src/core/qr-svg.ts
src/templates/borders-inner-outter.ts
src/demo.ts
src/core/templates/qr-template-borders.ts
src/core/templates/qr-styles.ts
docs/border-text-implementation-plan.md

# Current Time
5/11/2025, 5:15:20 PM (America/New_York, UTC-4:00)

# Context Window Usage
258,040 / 1,048.576K tokens used (25%)

# Current Mode
ACT MODE
</environment_details>
