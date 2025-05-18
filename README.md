# QRCode.js - Simple, Beautiful, Reliable

[![npm version](https://badge.fury.io/js/%40qr-platform%2Fqr-code.js.svg)](https://badge.fury.io/js/%40qr-platform%2Fqr-code.js)

<!-- Add other badges like build status, coverage, etc. if available -->

## Create Beautiful, Reliable QR Codes with Ease

QRCode.js is a professional JavaScript/TypeScript library for creating customized QR codes, offering a blend of simplicity and sophistication. With versatile styling options—dot shapes, colors, gradients, embedded images, borders, and text—it enables you to design unique, visually appealing QR codes that work flawlessly with standard scanners. QRCode.js is part of [QR-Platform](https://www.qr-platform.com): All-in-One QR Codes Management Solution.

<!-- ![QR Code Styling Example](https://raw.githubusercontent.com/qr-platform/qr-code.js/main/src/assets/qr-styling.png) Placeholder: Replace with an actual representative image URL if available -->

## ✨ Features
*   **Core QR Code Generation**: Encode any text, URL, or data.
*   **Highly Customizable:** Control dot shapes, colors, sizes, corner styles, and background.
*   **Gradients:** Apply linear or radial gradients to dots, corners, and backgrounds.
*   **Image Embedding:** Embed logos or other images in the center, as an overlay, or as a background. Control image precedence with global `QRCodeJs.setImage()` or builder `useImage()`, both supporting an `override` option.
*   **Borders (Free & Premium):** Add basic borders (with branding in free version) or advanced, customizable borders with text/images (Premium). Control text precedence with `QRCodeJs.setText()` or builder `useText()`, both supporting an `override` option.
*   **Flexible Border Configuration:** Set global border defaults (`setBorder`/`setBorderId`) or use the builder pattern (`useBorder`/`useBorderId`) for instance-specific borders.
*   **Templates & Styles**: Use predefined templates and styles, or create your own for consistent branding. Apply them globally with `QRCodeJs.setTemplate()` / `QRCodeJs.setStyle()` or per-instance with the builder's `useTemplate()` / `useStyle()`.
*   **Comprehensive Configuration:**
    *   Use `QRCodeJs.setData()`, `QRCodeJs.setOptions()`, and `QRCodeJs.setSettings()` for powerful global default configurations, with `override` options for strong precedence.
    *   Employ the builder pattern's `useData()`, `useOptions()`, and `useSettings()` for instance-specific comprehensive setups, also with `override` capabilities. `useSettings()` resets prior builder steps to establish a new baseline.
*   **Flexible Output:** Generate QR codes as SVG elements in the browser or SVG strings in Node.js.
*   **Download Options:** Download QR codes as SVG, PNG, JPEG, or WEBP.
*   **TypeScript Support:** Fully typed for a better development experience.
*   **Node.js Compatible:** Works seamlessly in server-side environments.
*   **Responsive:** Option to make SVG output responsive to container size.
*   **Scan Validation (Premium):** Verify the scannability of generated QR codes.

## 🚀 Installation


#### NPM ⤵️

```bash
npm install @qr-platform/qr-code.js
```

#### YARN ⤵️
```bash
yarn add @qr-platform/qr-code.js
```
#### PNPM ⤵️
```bash
pnpm add @qr-platform/qr-code.js
```

## 💡 Basic Usage

```typescript
import { QRCodeJs } from '@qr-platform/qr-code.js';

const qrCode = new QRCodeJs({ data: 'https://example.com' });
qrCode.append(document.getElementById('qr-container'));

```
#### or

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
  // Remove any existing content before appending the QR code
  qrCode.append(container, { clearContainer: true });
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
| `SettingsOptions`      | Comprehensive object for `setSettings`/`useSettings`. | `{ templateId: '...', data: '...', ...}` |

#### For a full list of options and detailed explanations of `SettingsOptions`, `setData`, `setOptions`, and their builder counterparts, see the [API Reference Guide](https://qr-platform.github.io/qr-code.js/docs/api-reference-guide.html) and [Usage Guide](https://qr-platform.github.io/qr-code.js/docs/usage-guide.html).

## 🎨 Examples

Explore various configurations:

* #### [Basic Examples](https://qr-platform.github.io/qr-code.js/docs/examples.html) Get started with common use cases.
* #### [Advanced Examples](https://qr-platform.github.io/qr-code.js/docs/advanced-examples.html) Dive deep into customization possibilities. 

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
*   License activation (if needed) persists only in memory per session. See [License Management](https://qr-platform.github.io/qr-code.js/docs/license-management.html) for details.
*   **Peer Dependencies:** You must install the required `peerDependencies` for Node.js functionality. 
  
    Install automatically using npx:
     ```bash 
     npx i-peers
    ```
    Install manually using npm:
    ````bash
     npm i @xmldom/xmldom @undecaf/zbar-wasm image-size jose jimp @resvg/resvg-js file-type
     ````

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

##### For full details on activation, persistence, configuration, and backend implementation, see the [License Management Guide](https://qr-platform.github.io/qr-code.js/docs/license-management.html).

## 📚 Documentation

*   **[Full Documentation](./docs/documentation.md#start)**: The main guide covering all features, options, and concepts.
*   **[API Reference](./docs/api-reference-guide.md#start)**: Detailed reference for all classes, methods, and types.
*   **[Usage Guide](./docs/usage-guide.md#start)**: Practical examples and explanations for common use cases.
*   **[Basic Examples](./docs/examples.md#start)**: Simple examples to get started quickly.
*   **[Advanced Examples](./docs/advanced-examples.md#start)**: Demonstrations of complex configurations and feature combinations, including `setSettings` and `useSettings`.
*   **[License Management](./docs/license-management.md#start)**: Information on activating and managing premium features.

## 🌐 Demo

An interactive demo located in [`packages/demo`](./packages/demo) is automatically built with `npm run build` and deployed to GitHub Pages from the `packages/demo/dist` directory.

## 📜 License

This Software is licensed, not sold, by QR-Platform ("Licensor") for use only under the terms of this license. The source code for the Software is proprietary, confidential, and is **not** provided or licensed under this agreement. Licensor reserves all rights not expressly granted to User - see the [LICENSE](https://qr-platform.github.io/qr-code.js/LICENSE.md) file for details. Premium features require a separate commercial license from [QR-Platform](https://www.qr-platform.com).
