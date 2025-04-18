# QRCode.js Examples
<a id="start"></a>

This document provides basic examples to help you get started with QRCode.js and understand its core features. For more complex scenarios, refer to the [Advanced Examples](./advanced-examples.md#start).

---

## Basic Usage

Here's a minimal example to generate a QR code and append it to the document:

```javascript
// Import the library
import { QRCodeJs, Options } from '@qr-platform/qr-code.js';
// In Node.js: import { QRCodeJs } from '@qr-platform/qr-code.js/node';

// Basic options - 'data' is required
const options: Options = {
  data: 'https://example.com'
};

// Create the QR code instance
const qrCode = new QRCodeJs(options);

// Append the generated SVG to your document (in browser)
const container = document.getElementById('qr-container');
if (container && qrCode.svgElement) {
  container.appendChild(qrCode.svgElement);
} else if (!container) {
  console.error("Container element not found.");
} else {
  console.error("SVG element not generated.");
  // Handle SVG generation for Node.js if needed (e.g., serialize to string)
  // qrCode.serialize().then(svgString => { /* save string */ });
}
```

## Using Templates

Templates provide convenient ways to apply predefined sets of options. QRCode.js offers two main approaches: setting a global template default with `setTemplate` and using a builder pattern with `useTemplate`.

### Setting Global Defaults with `setTemplate`

The `QRCodeJs.setTemplate()` static method allows you to define default options that will apply to all subsequently created `QRCodeJs` instances until the template is changed or cleared.

**Example 1: Setting a Predefined Global Template ('rounded')**

```javascript
// Import the library (adjust path as needed)
import { QRCodeJs, Options } from '@qr-platform/qr-code.js';

// Set the 'rounded' template globally
QRCodeJs.setTemplate('rounded');

// This instance will use the 'rounded' template defaults
const qrGlobalRounded = new QRCodeJs({
  data: 'Uses the global rounded template'
});
qrGlobalRounded.append(document.getElementById('global-template-rounded-container'));

// This instance will also use 'rounded'
const qrAnotherRounded = new QRCodeJs({
  data: 'Also uses rounded template'
});
qrAnotherRounded.append(document.getElementById('another-rounded-container'));

// Note: The global template remains active until changed or cleared.
// To clear: QRCodeJs.setTemplate(null); or QRCodeJs.setTemplate('basic');
```

**Example 2: Setting a Custom Global Template Object**

```javascript
const myGlobalTemplate = {
  dotsOptions: { type: 'classy', color: '#8A2BE2' }, // BlueViolet classy dots
  backgroundOptions: { color: '#FAFAFA' }, // Off-white background
  cornersSquareOptions: { type: 'dot', color: '#8A2BE2' }
};

// Set the custom template globally
QRCodeJs.setTemplate(myGlobalTemplate);

const qrCustomGlobal = new QRCodeJs({
  data: 'Uses a custom global template'
});
qrCustomGlobal.append(document.getElementById('custom-global-container'));
```

**Example 3: Overriding Global Template Options**

```javascript
// Assume 'dots' template is set globally
QRCodeJs.setTemplate('dots');

const qrOverrideGlobal = new QRCodeJs({
  data: 'Overrides global template color',
  // This color overrides the black color from the 'dots' template
  dotsOptions: { color: '#FF4500' } // OrangeRed dots
});
qrOverrideGlobal.append(document.getElementById('override-global-container'));
```

### Using the Builder Pattern with `useTemplate`

The `QRCodeJs.useTemplate()` static method provides a flexible builder pattern. It returns a builder instance pre-configured with a template (by name or by providing options directly). You *must* then call the `.options()` method on the builder to provide the required `data` and any final overrides. This approach does *not* affect the global template setting.

**Example 4: Using `useTemplate` with a Predefined Name ('dots')**

```javascript
// Import the library (adjust path as needed)
import { QRCodeJs, Options } from '@qr-platform/qr-code.js';

// Start with the 'dots' template, then provide data and overrides
const qrBuilderDots = QRCodeJs.useTemplate('dots').options({
  data: 'Built with dots template',
  dotsOptions: { color: '#20C997' } // Override color to Teal
});
qrBuilderDots.append(document.getElementById('builder-dots-container'));

// This instance is unaffected by the useTemplate call above
const qrBasicAfterBuilder = new QRCodeJs({ data: 'Basic QR' });
qrBasicAfterBuilder.append(document.getElementById('basic-after-builder-container'));
```

**Example 5: Using `useTemplate` with Custom Options**

```javascript
const myInlineTemplate = {
  dotsOptions: { type: 'star', color: '#DC3545' }, // Red stars
  shape: 'circle'
};

// Start with custom options, then provide data
const qrBuilderCustom = QRCodeJs.useTemplate(myInlineTemplate).options({
  data: 'Built with inline custom template (stars)'
});
qrBuilderCustom.append(document.getElementById('builder-custom-container'));
```

**Example 6: Overriding `useTemplate` Options in `.options()`**

```javascript
// Start with the 'classy' template
const qrBuilderOverride = QRCodeJs.useTemplate('classy').options({
  data: 'Overrides classy template color',
  // This color overrides the black from the 'classy' template
  dotsOptions: { color: '#6f42c1' } // Indigo
});
qrBuilderOverride.append(document.getElementById('builder-override-container'));
```
---

## Using the Builder Pattern (`useTemplate`, `useStyle`, `build`)

The builder pattern provides a fluent way to configure QR codes, often starting with a template or style.

**Example 1: Using `useTemplate` with a Predefined Template ('rounded')**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md

const qrFromTemplate = QRCodeJs.useTemplate('rounded') // Start builder with 'rounded' template
  .options({ data: 'Uses the rounded template via builder' }) // Add data

qrFromTemplate.append(document.getElementById('template-rounded-container'));
```

**Example 2: Using `useTemplate` with a Custom Template Object**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md

const myCustomTemplate = {
  dotsOptions: { type: 'classy', color: '#8A2BE2' }, // BlueViolet classy dots
  backgroundOptions: { color: '#FAFAFA' }, // Off-white background
  cornersSquareOptions: { type: 'dot', color: '#8A2BE2' }
};

const qrCustomTemplate = QRCodeJs.useTemplate(myCustomTemplate) // Start builder with custom template
  .build();

// update the data
qrCustomTemplate.update({ data: 'Uses a custom template object' });
qrCustomTemplate.append(document.getElementById('template-custom-container'));
```

**Example 3: Using `useStyle`**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md

const myStyle = {
  dotsOptions: { type: 'dots', color: '#FF4500' }, // OrangeRed dots
  backgroundOptions: { color: '#FFF0E1' } // SeaShell background
};

const qrFromStyle = QRCodeJs.useStyle(myStyle) // Start builder with style
  .options({ data: 'Uses a style via builder' })
  .build();

qrFromStyle.append(document.getElementById('style-container'));
```

**Example 4: Chaining `useTemplate` and `useStyle`**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md

// Start with 'dots' template (black dots), then apply a style to change color
const qrChained = QRCodeJs.useTemplate('dots')
  .useStyle({ dotsOptions: { color: '#20B2AA' } }) // LightSeaGreen dots
  .options({ data: 'Template overridden by Style' })
  .build();

qrChained.append(document.getElementById('template-style-chain-container'));
```

---

## Examples by Option Group

### Core Options

Demonstrating fundamental settings like data, shape, and error correction.

**Example 1: Minimal QR Code**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrMinimal = new QRCodeJs({
  data: 'Just the data!'
});
qrMinimal.append(document.getElementById('minimal-qr-container'));
```

**Example 2: Circle Shape**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrCircle = new QRCodeJs({
  data: 'https://example.com/circle',
  shape: 'circle' // Make the QR code boundary circular
});
qrCircle.append(document.getElementById('circle-qr-container'));
```

**Example 3: High Error Correction**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrHighEC = new QRCodeJs({
  data: 'Important Data',
  qrOptions: {
    errorCorrectionLevel: 'H' // Use 'H' for highest redundancy
  }
});
qrHighEC.append(document.getElementById('high-ec-qr-container'));
```

---

### Layout Options

Controlling margin, scale, and offsets.

**Example 1: Adding Margin**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrMargin = new QRCodeJs({
  data: 'With Margin',
  margin: 20 // Add a 20px quiet zone around the QR code
});
qrMargin.append(document.getElementById('margin-qr-container'));
```

**Example 2: Scaling Down**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrScaled = new QRCodeJs({
  data: 'Scaled Down',
  scale: 0.8 // Make the QR code 80% of its container/border size
});
qrScaled.append(document.getElementById('scaled-qr-container'));
```

---

### Styling Options - Dots

Changing the appearance of the data dots.

**Example 1: Rounded Dots**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrRoundedDots = new QRCodeJs({
  data: 'Rounded Dots',
  dotsOptions: {
    type: 'rounded',
    color: '#007BFF' // Blue rounded dots
  }
});
qrRoundedDots.append(document.getElementById('rounded-dots-container'));
```

**Example 2: Dot Style Dots**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrDotDots = new QRCodeJs({
  data: 'Dot Style Dots',
  dotsOptions: {
    type: 'dot',
    color: '#DC3545' // Red circular dots
  }
});
qrDotDots.append(document.getElementById('dot-dots-container'));
```

---

### Styling Options - Corner Squares

Customizing the large corner squares.

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrStyledCorners = new QRCodeJs({
  data: 'Styled Corners',
  dotsOptions: { color: '#333' }, // Standard dots
  cornersSquareOptions: {
    type: 'dot', // Use 'dot' shape for the large squares
    color: '#FFC107' // Amber color for corners
  }
});
qrStyledCorners.append(document.getElementById('styled-corners-container'));
```

---

### Styling Options - Corner Dots

Customizing the small dots inside the corner squares.

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrStyledCornerDots = new QRCodeJs({
  data: 'Styled Corner Dots',
  dotsOptions: { color: '#4CAF50' }, // Green dots
  cornersSquareOptions: { type: 'square', color: '#4CAF50' }, // Green squares
  cornersDotOptions: {
    type: 'dot', // Use 'dot' shape for the inner dots
    color: '#FFFFFF' // White inner dots
  }
});
qrStyledCornerDots.append(document.getElementById('styled-corner-dots-container'));
```

---

### Background Options

Modifying the background color and shape.

**Example 1: Colored Background**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrColoredBg = new QRCodeJs({
  data: 'Colored Background',
  dotsOptions: { color: '#FFFFFF' }, // White dots for contrast
  backgroundOptions: {
    color: '#673AB7' // Deep Purple background
  }
});
qrColoredBg.append(document.getElementById('colored-bg-container'));
```

**Example 2: Rounded Background**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrRoundedBg = new QRCodeJs({
  data: 'Rounded Background',
  backgroundOptions: {
    color: '#E0E0E0', // Light grey background
    round: 0.5 // 50% corner rounding
  }
});
qrRoundedBg.append(document.getElementById('rounded-bg-container'));
```

**Example 3: Transparent Background**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrTransparentBg = new QRCodeJs({
  data: 'Transparent Background',
  backgroundOptions: false // Disable the background element
});
qrTransparentBg.append(document.getElementById('transparent-bg-container'));
```

---

### Gradient Usage

Applying simple gradients.

**Example 1: Linear Gradient on Dots**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrGradientDots = new QRCodeJs({
  data: 'Gradient Dots',
  dotsOptions: {
    type: 'rounded',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 4, // 45 degrees
      colorStops: [
        { offset: 0, color: '#28A745' }, // Green start
        { offset: 1, color: '#20C997' }  // Teal end
      ]
    }
  }
});
qrGradientDots.append(document.getElementById('gradient-dots-container'));
```

**Example 2: Radial Gradient on Background**

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrGradientBg = new QRCodeJs({
  data: 'Gradient Background',
  backgroundOptions: {
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#FFFFFF' }, // White center
        { offset: 1, color: '#F8F9FA' }  // Light grey edge
      ]
    }
  }
});
qrGradientBg.append(document.getElementById('gradient-bg-container'));
```

---

### Image Embedding

Adding a simple logo.

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrWithLogo = new QRCodeJs({
  data: 'QR with Logo',
  qrOptions: { errorCorrectionLevel: 'Q' }, // Use Q or H with images
  image: 'https://via.placeholder.com/50', // Placeholder image URL
  imageOptions: {
    imageSize: 0.3, // 30% size relative to QR code
    margin: 1 // 1 dot margin around logo
  }
});
qrWithLogo.append(document.getElementById('logo-qr-container'));
```

---

### Border Options (Free Version)

Adding a basic border (includes "QR-Platform" branding).

```javascript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/examples.md
const qrFreeBorder = new QRCodeJs({
  data: 'Free Border Example',
  borderOptions: {
    hasBorder: true,
    thickness: 30, // Border thickness in pixels
    color: '#6C757D', // Grey border color
    radius: '10%' // Slightly rounded corners
    // Note: Bottom border will show "QR-Platform" branding automatically
  }
});
qrFreeBorder.append(document.getElementById('free-border-container'));
```
*For custom border text and advanced features like inner/outer borders, a [Premium License](./license-management.md#start) is required.*

---

### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [Usage Guide](./usage-guide.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Advanced Examples](./advanced-examples.md#start)
