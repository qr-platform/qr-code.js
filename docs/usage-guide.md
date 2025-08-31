---
title: 'QRCode.js Usage Guide'
description: 'Complete guide on how to use QRCode.js library'
---

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

| Option             | Type               | Default         | Description                                                                 |
| :----------------- | :----------------- | :-------------- | :-------------------------------------------------------------------------- |
| `width`            | `number \| string` | Auto-calculated | QR code width in pixels or CSS units. When `isResponsive` is false, overrides auto-calculated width. When `isResponsive` is true, this value is ignored. |
| `height`           | `number \| string` | Auto-calculated | QR code height in pixels or CSS units. When `isResponsive` is false, overrides auto-calculated height. When `isResponsive` is true, this value is ignored. |
| `margin`           | `number`           | `0`             | The quiet zone (empty space) around the QR code in pixels.                  |
| `isResponsive`     | `boolean`          | `false`         | Controls whether the QR code SVG should be responsive to its container. When true, SVG uses 100% width/height, ignoring any specified width/height values. When false, SVG uses specified width/height values or auto-calculated dimensions. |
| `scale`            | `number`           | `1`             | Scales the QR code size relative to its container or border (0 to 1.5).     |
| `offset`           | `number`           | `0`             | Applies a vertical offset (positive moves down, negative moves up) relative to the center. |
| `verticalOffset`   | `number`           | `0`             | Applies an absolute vertical offset in pixels.                              |
| `horizontalOffset` | `number`           | `0`             | Applies an absolute horizontal offset in pixels.                            |

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

##### Dimension Control Examples

**Fixed Size QR Code:**
```javascript
const qrCode = new QRCodeJs({
  data: 'Fixed size QR code',
  width: 300,           // Fixed 300px width
  height: 300,          // Fixed 300px height
  isResponsive: false   // Use fixed dimensions (default)
});
```

**Responsive QR Code:**
```javascript
const qrCode = new QRCodeJs({
  data: 'Responsive QR code',
  width: 500,           // This will be ignored
  height: 500,          // This will be ignored
  isResponsive: true    // SVG will use 100% width/height
});
```

**CSS Units:**
```javascript
const qrCode = new QRCodeJs({
  data: 'QR code with CSS units',
  width: '20rem',       // Using rem units
  height: '20rem',      // Using rem units
  isResponsive: false
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
Add a `gradient` property to: `dotsOptions`, `cornersSquareOptions`, `cornersDotOptions`, and `backgroundOptions`.

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
| `imageOptions.margin`     | `number`                       | `0`            | Margin around the image in blocks. **Warning: Keep minimal or QR code may disappear.**                                                    |
| `imageOptions.backgroundColor` | `string`                  | `undefined`    | Background color of QR code image (logo).                                                                                                 |
| `imageOptions.padding`    | `number`                       | `0`            | Padding around the image in pixels.                                                                                                       |
| `imageOptions.radius`     | `string \| number`             | `undefined`    | Border radius of the image (e.g., "10px" or 10).                                                                                          |
| `imageOptions.crossOrigin`| `string`                       | `undefined`    | CORS setting for the image (e.g., `'anonymous'`, `'use-credentials'`).                                                                    |

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


`borderOptions` is an `object` that defines the appearance of decorative borders around the QR code.


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
- **Links to Enums and Sections**: References like `[ShapeType](#enums-shapetype)` and `[Gradients](#gradients)` assume corresponding documentation sections exist. Adjust these to match your actual document structure.
- **Default Values**: Some defaults (e.g., `borderOptions.decorations.style`) are inferred from typical usage; verify with the library’s behavior if needed.

##### Example: Borders with Decorations

```javascript

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




---


Validate that a QR code is scannable and decodes correctly.


**Usage:**

```javascript

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

## Metadata Management

QRCode.js supports metadata management for organizing and tracking QR code instances. You can assign identifiers, names, descriptions, and custom metadata to both individual instances and within the builder pattern.

### Instance Metadata Methods

Once a QR code instance is created, you can manage its metadata using these methods:

```javascript
const qrCode = new QRCodeJs({
  data: 'https://example.com/product/123'
});

// Set metadata using chainable methods
qrCode
  .setId('product-qr-123')
  .setName('Product Landing Page QR')
  .setDescription('QR code linking to product details and purchase options')
  .setMetadata({
    productId: '123',
    category: 'electronics',
    campaign: 'summer-sale-2024',
    createdBy: 'marketing-team',
    expires: '2024-12-31'
  });

// Retrieve metadata
console.log('QR ID:', qrCode.getId()); // 'product-qr-123'
console.log('QR Name:', qrCode.getName()); // 'Product Landing Page QR'
console.log('QR Description:', qrCode.getDescription()); // 'QR code linking to product details...'
console.log('Custom Metadata:', qrCode.getMetadata()); 
// { productId: '123', category: 'electronics', ... }

// Get current settings and options
const currentSettings = qrCode.getSettings();
console.log('Current Settings:', currentSettings);
```

### Builder Pattern Metadata

The builder pattern provides metadata methods for assigning information during QR code construction:

```javascript
const qrWithMetadata = QRCodeJs.useTemplate('modern')
  .useId('campaign-qr-2024-winter')
  .useName('Winter Campaign Landing')
  .useDescription('QR code for winter marketing campaign landing page')
  .useMetadata({
    campaignId: 'winter-2024',
    targetAudience: 'millennials',
    channels: ['social', 'email', 'print'],
    budget: 10000,
    kpi: 'conversion-rate'
  })
  .options({
    data: 'https://campaign.company.com/winter-2024'
  });

qrWithMetadata.append(document.getElementById('campaign-container'));
```

### Metadata Management Patterns

**1. Content Management System Integration**

```javascript
function createCMSQR(contentId, contentType, options = {}) {
  return QRCodeJs.useTemplate('cms-standard')
    .useId(`cms-${contentType}-${contentId}`)
    .useName(`${contentType.toUpperCase()} Content #${contentId}`)
    .useDescription(`QR code for ${contentType} content item ${contentId}`)
    .useMetadata({
      contentId,
      contentType,
      createdAt: new Date().toISOString(),
      source: 'cms',
      ...options.metadata
    })
    .options({
      data: `https://cms.company.com/${contentType}/${contentId}`,
      ...options
    });
}

// Usage
const articleQR = createCMSQR('article-456', 'article', {
  metadata: { author: 'john-doe', publishDate: '2024-03-15' }
});
```

**2. Event Management**

```javascript
function createEventQR(eventConfig) {
  const builder = QRCodeJs.useTemplate('event')
    .useId(`event-${eventConfig.eventId}`)
    .useName(eventConfig.eventName)
    .useDescription(`QR code for ${eventConfig.eventName} event registration`)
    .useMetadata({
      eventId: eventConfig.eventId,
      eventType: eventConfig.type,
      venue: eventConfig.venue,
      date: eventConfig.date,
      capacity: eventConfig.capacity,
      organizer: eventConfig.organizer
    });

  // Conditional metadata based on event type
  if (eventConfig.type === 'conference') {
    builder.useMetadata({
      speakers: eventConfig.speakers,
      tracks: eventConfig.tracks
    });
  } else if (eventConfig.type === 'workshop') {
    builder.useMetadata({
      instructor: eventConfig.instructor,
      prerequisites: eventConfig.prerequisites
    });
  }

  return builder.options({
    data: `https://events.company.com/register/${eventConfig.eventId}`
  });
}

// Usage
const conferenceQR = createEventQR({
  eventId: 'tech-conf-2024',
  eventName: 'Annual Tech Conference 2024',
  type: 'conference',
  venue: 'Convention Center',
  date: '2024-09-15',
  capacity: 500,
  organizer: 'Tech Corp',
  speakers: ['speaker1', 'speaker2'],
  tracks: ['AI', 'Web Dev', 'Mobile']
});
```

**3. Product Tracking**

```javascript
class ProductQRManager {
  static createProductQR(productData) {
    const metadata = {
      sku: productData.sku,
      category: productData.category,
      brand: productData.brand,
      price: productData.price,
      inStock: productData.inStock,
      trackingEnabled: true,
      createdAt: new Date().toISOString()
    };

    return QRCodeJs.useTemplate('product')
      .useId(`product-${productData.sku}`)
      .useName(`${productData.brand} ${productData.name}`)
      .useDescription(`Product QR for ${productData.name}`)
      .useMetadata(metadata)
      .options({
        data: `https://store.company.com/product/${productData.sku}?ref=qr`,
        image: productData.thumbnailUrl
      });
  }

  static updateProductMetadata(qrInstance, updates) {
    const currentMetadata = qrInstance.getMetadata() || {};
    qrInstance.setMetadata({
      ...currentMetadata,
      ...updates,
      lastUpdated: new Date().toISOString()
    });
  }
}

// Usage
const productQR = ProductQRManager.createProductQR({
  sku: 'LAPTOP-001',
  name: 'Gaming Laptop Pro',
  brand: 'TechBrand',
  category: 'electronics',
  price: 1299.99,
  inStock: true,
  thumbnailUrl: 'https://store.company.com/images/laptop-001-thumb.jpg'
});

// Later update
ProductQRManager.updateProductMetadata(productQR, {
  price: 1199.99,
  inStock: false,
  lastSale: '2024-03-20'
});
```

### Metadata Best Practices

1. **Consistent Naming**: Use consistent key names across your application
2. **Structured Data**: Use nested objects for complex metadata
3. **Timestamps**: Include creation and update timestamps
4. **Validation**: Validate metadata before setting
5. **Documentation**: Document your metadata schema

```javascript
// Example metadata schema
const metadataSchema = {
  // Required fields
  id: 'string',
  name: 'string',
  description: 'string',
  
  // Tracking fields
  createdAt: 'ISO 8601 timestamp',
  updatedAt: 'ISO 8601 timestamp',
  createdBy: 'string (user id)',
  
  // Business fields
  campaign: 'string',
  channel: 'string',
  category: 'string',
  
  // Analytics
  trackingEnabled: 'boolean',
  analytics: {
    scans: 'number',
    lastScan: 'ISO 8601 timestamp',
    conversionRate: 'number'
  }
};
```

---

#### Methods

- **`append(container: HTMLElement, options?: { clearContainer?: boolean }): void`**
  Appends the QR code to a specified container element.
  If `clearContainer` is `true`, the container's existing contents are removed before appending.

- **`serialize(): Promise<string | undefined>`**
  Converts the QR code to an SVG string.

- **`download(options?: { name?: string; extension: 'svg' | 'png' | 'jpeg' | 'webp' }, canvasOptions?: CanvasOptions): Promise<void>`**
  Downloads the QR code as a file.

- **`update(options: Partial<QRCodeJsOptions>): void`**
  Updates the QR code with new options.

- **`validateScanning(): Promise<{ isValid: boolean; decodedText?: string; message?: string }>`**
  Validates that the QR code is scannable.


#### Static Methods

These methods are called directly on the `QRCodeJs` class (e.g., `QRCodeJs.setTemplate(...)`).


- **Global Configuration Defaults:**
  - `QRCodeJs.setTemplate(templateNameOrOptions: string | RecursivePartial<Options> | null): typeof QRCodeJs`: Sets a global default template.
  - `QRCodeJs.setTemplateId(templateId: string | null): typeof QRCodeJs`: Sets a global default template by its ID.
  - `QRCodeJs.setStyle(styleNameOrOptions: string | StyleOptions | null): typeof QRCodeJs`: Sets a global default style.
  - `QRCodeJs.setStyleId(styleId: string | null): typeof QRCodeJs`: Sets a global default style by its ID.
  - `QRCodeJs.setBorder(borderNameOrOptions: string | RecursivePartial<BorderOptions> | null): typeof QRCodeJs`: Sets a global default border configuration.
  - `QRCodeJs.setBorderId(borderId: string | null): typeof QRCodeJs`: Sets a global default border configuration by its ID.
  - `QRCodeJs.setText(textNameOrOptions: string | TextOptions | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs`: Sets global default border text. `overrideOpts` (e.g., `{ override: true }`) ensures precedence.
  - `QRCodeJs.setTextId(textId: string | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs`: Sets global default border text by ID. `overrideOpts` ensures precedence.
  - `QRCodeJs.setImage(imageUrl: string | DataURL | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs`: Sets a global default image. `overrideOpts` ensures precedence.
  - `QRCodeJs.setData(data: string | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs`: Sets a global default data string. `overrideOpts` ensures precedence.
  - `QRCodeJs.setOptions(options: RecursivePartial<Options> | null, overrideOpts?: MethodOverrideOptions): typeof QRCodeJs`: Sets global default options (merged deeply). `overrideOpts` ensures higher precedence.
  - `QRCodeJs.setSettings(settings: SettingsOptions | null): typeof QRCodeJs`: Sets multiple global defaults from a `SettingsOptions` object. Acts as a macro, calling other static setters. Clears all static defaults if `null` is passed. See [Centralized Settings Configuration](#centralized-settings-configuration-settingsoptions-setsettings-and-usesettings) for more details.

**Example: Setting Global Data and Options**
```typescript
// Set global data that will be used if no data is provided at instantiation
QRCodeJs.setData('https://www.default-link.com');

// Set global options for margin and error correction
QRCodeJs.setOptions({
  margin: 15,
  qrOptions: { errorCorrectionLevel: 'M' }
});

// This QR code will use the global data, margin, and error correction level
const qrWithGlobalSettings = new QRCodeJs({}); // Data is optional now
qrWithGlobalSettings.append(document.getElementById('qr-global-container'));

// Override global data with an instance-specific value
const qrOverrideData = new QRCodeJs({ data: 'https://specific-link.com' });
// qrOverrideData will use 'https://specific-link.com', but still use global margin and EC level.

// Using override to make global data sticky
QRCodeJs.setData('https://sticky-link.com', { override: true });
const qrStickyData = new QRCodeJs({ data: 'https://ignored-link.com' });
// qrStickyData will use 'https://sticky-link.com' due to the override.

// Clear global settings when no longer needed
QRCodeJs.setData(null);
QRCodeJs.setOptions(null);
```

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


### Builder Pattern Methods (`useTemplate`, `useStyle`, `useBorder`, `useImage`, `useData`, `useOptions`, `useSettings`)

These methods are called on `QRCodeJs` to initiate a builder chain (e.g., `QRCodeJs.useTemplate(...)`) or on an existing `QRCodeBuilder` instance (e.g., `builder.useStyle(...)`).

- **`useTemplate(templateNameOrOptions)` / `useTemplateId(templateId)`**: Start the builder with a predefined template or template ID.
- **`useStyle(styleNameOrOptions)` / `useStyleId(styleId)`**: Applies a style.
- **`useBorder(borderNameOrOptions)` / `useBorderId(borderId)`**: Applies a border configuration.
- **`useText(textNameOrOptions, overrideOpts?)` / `useTextId(textId, overrideOpts?)`**: Sets border text with optional override precedence.
- **`useImage(imageUrl, overrideOpts?)`**: Sets an image. `overrideOpts` ensures precedence over image in final `.options()`.
- **`useData(data, overrideOpts?)`**: Sets the data. `overrideOpts` ensures precedence over data in final `.options()`.
- **`useOptions(options, overrideOpts?)`**: Merges general options. `overrideOpts` ensures precedence for these specific options over final `.options()`.
- **`useId(id)`**, **`useName(name)`**, **`useDescription(description)`**, **`useMetadata(metadata)`**: Attach metadata to the QR code instance when the builder finalizes.
- **`useSettings(settings)`**: Applies a comprehensive `SettingsOptions` object as a new baseline for the builder chain, **resetting** any configurations previously applied to *that builder instance* via other `use...` methods.

You can chain these methods (e.g., `QRCodeJs.useTemplate(...).useStyle(...).useBorder(...).useImage(...)`) before finalizing with `.options(...)` or `.build()`. Options are merged progressively, with later calls overriding earlier ones for the same properties, unless an `override: true` was used.

**Example: Using Builder Methods**
```typescript
// Start with a template, layer on a style, then specific data and options
const qrBuilt = QRCodeJs.useTemplate('dots') // Start with 'dots' template
  .useStyle({ dotsOptions: { color: 'green' } }) // Override dot color to green
  .useData('https://example.com/builder-path') // Set data via builder
  .useOptions({ margin: 5 }) // Set margin via builder
  .options({ qrOptions: { errorCorrectionLevel: 'Q' } }); // Final options, builds the instance

qrBuilt.append(document.getElementById('qr-builder-container'));

// Using useData with override
const qrBuilderDataOverride = QRCodeJs.useTemplate('rounded')
  .useData('https://forced-builder-link.com', { override: true })
  .options({ data: 'https://this-data-is-ignored.com' }); // Data from useData takes precedence

qrBuilderDataOverride.append(document.getElementById('qr-builder-data-override'));
```

---

## Centralized Settings Configuration (`SettingsOptions`, `setSettings`, and `useSettings`)

For a comprehensive way to define or apply a complete QR code configuration in one go, QRCode.js provides:
- A `SettingsOptions` interface to structure a full configuration.
- A static `QRCodeJs.setSettings()` method for establishing global defaults using a `SettingsOptions` object.
- A `useSettings()` method for the `QRCodeBuilder` to apply a `SettingsOptions` object as a baseline for a specific builder chain.

### `SettingsOptions` Object

The `SettingsOptions` interface allows you to define multiple aspects of a QR code configuration simultaneously, including `id`, `name`, `description`, `data`, `image`, `template`/`templateId`, `style`/`styleId`, `text`/`textId`, `border`/`borderId`, and a general `options` field for direct overrides.

Refer to the [TypeScript Types and Definitions](./typescript-types-definitions.md#settingsoptions) for the full structure.

### Static `QRCodeJs.setSettings(settings: SettingsOptions | null)`

This static method is used to set multiple global defaults at once using a comprehensive `SettingsOptions` object.

- **Behavior**: It acts as a macro, internally calling other static setters (like `QRCodeJs.setTemplate()`, `QRCodeJs.setStyle()`, `QRCodeJs.setData()`, `QRCodeJs.setImage()`, `QRCodeJs.setOptions()`, etc.) based on the properties provided in the `settings` object. It will **override/reset** any previously set static configurations for the aspects it covers.
- If `null` is passed, all static configurations (template, style, text, border, image, data, and options) are cleared.

**Example: Using Static `setSettings()`**

```typescript
const myCompanyPreset: SettingsOptions = {
  name: 'CompanyStandardQR',
  description: 'Standard QR code style for company communications.',
  data: 'https://company.website.com', // Default data
  image: 'https://company.website.com/assets/logo.png', // Default image
  templateId: 'modern-dark', // Assumes this template ID exists
  style: { dotsOptions: { color: '#00447C' } }, // Company blue dots
  borderOptions: { hasBorder: true, thickness: 10, color: '#00447C' },
  options: { // General options
    margin: 10,
    qrOptions: { errorCorrectionLevel: 'Q' }
  }
};

QRCodeJs.setSettings(myCompanyPreset);

// This instance will use the 'CompanyStandardQR' preset
const qrFromPreset = new QRCodeJs({ /* Data can be omitted if in preset */ });
qrFromPreset.append(document.getElementById('qr-preset-container'));

// Override specific parts of the preset for another instance
const qrModifiedPreset = new QRCodeJs({
  data: 'https://company.website.com/specific-campaign', // Override data
  image: 'https://company.website.com/assets/campaign-logo.png' // Override image
  // Other settings like template, style, border, margin, EC level from preset still apply
});
qrModifiedPreset.append(document.getElementById('qr-modified-preset-container'));

// Clearing all static settings
QRCodeJs.setSettings(null);
const qrAfterClear = new QRCodeJs({ data: 'https://another.link.com/after-clear' }); // Uses base defaults, requires data
qrAfterClear.append(document.getElementById('qr-cleared-container'));
```

### Builder `useSettings(settings: SettingsOptions)`

The `QRCodeBuilder.useSettings(settings: SettingsOptions)` method applies a `SettingsOptions` object as a new baseline for a specific builder chain.

- **Behavior**: Calling `useSettings()` on a builder instance will **reset** any configurations previously applied to *that builder instance* via methods like `useTemplate()`, `useStyle()`, `useBorder()`, `useText()`, `useImage()`, `useData()`, or `useOptions()`. The provided `settings` object then establishes the new comprehensive baseline for that builder.
- Subsequent builder methods chained *after* `useSettings()` (e.g., `.useStyle()`, `.options()`) will then modify this new baseline.

**Example: Using Builder `useSettings()`**
```typescript
const eventSpecificConfig: SettingsOptions = {
  name: 'TechConference2024',
  data: 'https://techconf.example/schedule', // Baseline data for this builder
  image: 'https://techconf.example/assets/event-banner-qr.png', // Baseline image
  styleId: 'modern-dark', // Assumes 'modern-dark' style ID exists
  text: { // Border text configuration
    topValue: 'Tech Conference 2024',
    bottomValue: 'Scan for Schedule & Info'
  },
  borderOptions: {
    hasBorder: true,
    thickness: 25,
    color: '#333333',
    radius: '5px'
  },
  options: { // Baseline general options
    qrOptions: { errorCorrectionLevel: 'H' },
    isResponsive: true
  }
};

const qrEvent = QRCodeJs.useTemplate('basic') // Initial template (will be reset by useSettings)
  .useStyle({ dotsOptions: { color: 'red'} }) // This style will also be reset
  .useSettings(eventSpecificConfig) // Resets builder and applies eventSpecificConfig as baseline
  .useStyle({ // Further refine the style from useSettings
    dotsOptions: { gradient: { type: 'linear', colorStops: [{offset:0, color:'blue'}, {offset:1, color:'green'}] } }
  })
  .options({ // Final data override and other specific options
    data: 'https://techconf.example/live-updates', // Overrides data from eventSpecificConfig
    margin: 5 // Overrides margin if it was part of eventSpecificConfig.options
  })
  .build();

qrEvent.append(document.getElementById('event-qr-container'));
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

##### Example 3: Border with Text and Inner/Outer Borders

```javascript

const qrCode = new QRCodeJs({
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
        value: 'SCAN ME',
        style: { fontColor: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
        curveDisabled: true // Straight text
      }
    }
  }
});
```