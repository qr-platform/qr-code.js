# QRCode.js - @qr-platform/qr-code.js

[![npm version](https://badge.fury.io/js/%40qr-platform%2Fqr-code.js.svg)](https://badge.fury.io/js/%40qr-platform%2Fqr-code.js)

<!-- Add other badges like build status, coverage, etc. if available -->

**Generate beautiful, customizable QR codes with ease.**

QRCode.js is a professional JavaScript/TypeScript library for creating customized QR codes, offering a blend of simplicity and sophistication. With versatile styling options—dot shapes, colors, gradients, embedded images, borders, and text—it enables you to design unique, visually appealing QR codes that work flawlessly with standard scanners. QRCode.js is part of [QR-Platform](https://qr-platform.com): All-in-One QR Codes Management Solution.

![QR Code Styling Example](https://raw.githubusercontent.com/qr-platform/qr-code.js/main/src/assets/qr-styling.png) <!-- Placeholder: Replace with an actual representative image URL if available -->

## ✨ Features

*   **Highly Customizable:** Control dot shapes, colors, sizes, corner styles, and background.
*   **Gradients:** Apply linear or radial gradients to dots, corners, and backgrounds.
*   **Image Embedding:** Embed logos or other images in the center, as an overlay, or as a background.
*   **Borders (Free & Premium):** Add basic borders (with branding in free version) or advanced, customizable borders with text/images (Premium).
*   **Flexible Output:** Generate QR codes as SVG elements in the browser or SVG strings in Node.js.
*   **Download Options:** Download QR codes as SVG, PNG, JPEG, or WEBP.
*   **TypeScript Support:** Fully typed for a better development experience.
*   **Node.js Compatible:** Works seamlessly in server-side environments.
*   **Responsive:** Option to make SVG output responsive to container size.
*   **Scan Validation (Premium):** Verify the scannability of generated QR codes.

## 🚀 Installation

```bash
# Using npm
npm install @qr-platform/qr-code.js

# Using yarn
yarn add @qr-platform/qr-code.js

# Using pnpm
pnpm add @qr-platform/qr-code.js
```

## 💡 Basic Usage

```typescript
import { QRCodeJs, Options } from '@qr-platform/qr-code.js';

// 1. Define options (only 'data' is required)
const options: Options = {
  data: 'https://example.com',
  dotsOptions: {
    color: '#007bff', // Blue dots
    type: 'rounded'   // Use rounded dots
  },
  backgroundOptions: {
    color: '#ffffff' // White background
  }
};

// 2. Create QR Code instance
const qrCode = new QRCodeJs(options);

// 3. Append to a container element (in browser)
const container = document.getElementById('qr-container');
if (container) {
  qrCode.append(container);
}

// Or get SVG string (Browser or Node.js)
qrCode.serialize().then(svgString => {
  if (svgString) {
    console.log('QR Code SVG:', svgString);
    // In Node.js, you might save this string to a file
    // require('fs').writeFileSync('qrcode.svg', svgString);
  }
});
```

## ⚙️ Key Options Overview

| Option                 | Description                                      | Example Value        |
| :--------------------- | :----------------------------------------------- | :------------------- |
| `data`                 | **Required.** The content to encode.             | `'Your URL here'`    |
| `shape`                | Overall shape (`'square'` or `'circle'`).        | `'circle'`           |
| `margin`               | Quiet zone around the QR code (pixels).          | `10`                 |
| `qrOptions.errorCorrectionLevel` | Error correction (`'L'`, `'M'`, `'Q'`, `'H'`). | `'H'`                |
| `dotsOptions.type`     | Shape of the data dots (e.g., `rounded`, `dot`). | `'rounded'`          |
| `dotsOptions.color`    | Color of the data dots.                          | `'#ff5733'`          |
| `dotsOptions.gradient` | Gradient for dots (see [Gradients](#gradients)). | `{ type: 'linear', ... }` |
| `cornersSquareOptions` | Style for the large corner squares.              | `{ type: 'dot', color: '#00ff00' }` |
| `cornersDotOptions`    | Style for the small dots inside corners.         | `{ type: 'square', color: '#ffffff' }` |
| `backgroundOptions`    | Background style (color, roundness, gradient).   | `{ color: '#f0f0f0', round: 0.2 }` |
| `image`                | URL/Buffer/Blob of image to embed.               | `'logo.png'`         |
| `imageOptions`         | Options for the embedded image (size, margin).   | `{ imageSize: 0.3, margin: 2 }` |
| `borderOptions`        | **Premium.** Options for decorative borders.     | `{ hasBorder: true, thickness: 20, ... }` |

*For a full list of options, see the [API Reference Guide](./docs/api-reference-guide.md#start).*

## 🎨 Examples

Explore various configurations:

*   **[Basic Examples](./docs/examples.md#start):** Get started with common use cases.
*   **[Advanced Examples](./docs/advanced-examples.md#start):** Dive deep into customization possibilities.

## 🖥️ Node.js Usage

QRCode.js works in Node.js for server-side generation.

```typescript
import { QRCodeJs, Options } from '@qr-platform/qr-code.js/node'; // Note the '/node' import
import fs from 'fs';

const options: Options = {
  data: 'https://example.com/from-node',
  dotsOptions: {
    color: '#8A2BE2' // BlueViolet
  }
};

const qrCode = new QRCodeJs(options);

qrCode.serialize().then(svgString => {
  if (svgString) {
    fs.writeFileSync('qrcode-node.svg', svgString);
    console.log('QR Code saved to qrcode-node.svg');
  }
});
```

**Key Differences:**
*   Import from `@qr-platform/qr-code.js/node`.
*   Methods requiring a DOM like `append()` or `download()` are not available. Use `serialize()` to get the SVG string.
*   License activation (if needed) persists only in memory per session. See [License Management](./docs/license-management.md#start).

## 🔑 License Management (Free vs. Premium)

QRCode.js offers both free and premium features.

*   **Free Version:**
    *   All core generation and styling features (dots, corners, background, gradients, image embedding).
    *   Basic border styling (`borderOptions.hasBorder`, `thickness`, `color`, `radius`).
    *   **Limitation:** Borders created in the free version will automatically display "QR-Platform" branding text in the bottom border. This cannot be removed or customized without a license.

*   **Premium Version (Requires License):**
    *   **Advanced Borders:** No branding, custom text/images on any side, inner/outer borders, full styling control.
    *   **Scan Validation:** Access to the `validateScanning()` method.

**Activating a License:**

```typescript
// Activate BEFORE creating QRCodeJs instances
// Using a license key (fetches token from backend)
await QRCodeJs.license('YOUR-LICENSE-KEY');

// Or using a pre-fetched JWT token
await QRCodeJs.token('YOUR-JWT-TOKEN');

// Check license status
const licenseDetails = QRCodeJs.getLicenseDetails();
if (licenseDetails) {
  console.log('License active. Plan:', licenseDetails.plan);
}

// Now create instances with premium features enabled
const qrPremium = new QRCodeJs({
  data: 'Premium QR Code',
  borderOptions: {
    hasBorder: true,
    thickness: 30,
    decorations: {
      bottom: { enableText: true, value: 'My Custom Text' } // No branding!
    }
  }
});
```

*For full details on activation, persistence, configuration, and backend implementation, see the [License Management Guide](./docs/license-management.md#start).*

## 📚 Documentation

*   **[Usage Guide](./docs/usage-guide.md#start):** Comprehensive guide covering all options.
*   **[API Reference](./docs/api-reference-guide.md#start):** Detailed reference for all options, methods, and enums.
*   **[TypeScript Definitions](./docs/typescript-types-definitions.md#start):** Full TypeScript type definitions.
*   **[Basic Examples](./docs/examples.md#start):** Simple examples to get started.
*   **[Advanced Examples](./docs/advanced-examples.md#start):** Complex customization examples.
*   **[License Management](./docs/license-management.md#start):** Details on free vs. premium features and activation.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. Premium features require a separate commercial license from [QR-Platform](https://qr-platform.com).