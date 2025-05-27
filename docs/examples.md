---
title: 'Basic Examples'
description: 'Basic examples to get started with QRCode.js'
---

This document provides basic examples to help you get started with QRCode.js and understand its core features. For more complex scenarios, refer to the [Advanced Examples](./advanced-examples).

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
if (container) {
  qrCode.append(container);
} else {
  console.error("Container element not found.");
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


const qrFromTemplate = QRCodeJs.useTemplate('rounded') // Start builder with 'rounded' template
  .options({ data: 'Uses the rounded template via builder' }) // Add data

qrFromTemplate.append(document.getElementById('template-rounded-container'));
```

**Example 2: Using `useTemplate` with a Custom Template Object**


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

const qrMinimal = new QRCodeJs({
  data: 'Just the data!'
});
qrMinimal.append(document.getElementById('minimal-qr-container'));
```

**Example 2: Circle Shape**
```javascript

const qrCircle = new QRCodeJs({
  data: 'https://example.com/circle',
  shape: 'circle' // Make the QR code boundary circular
});
qrCircle.append(document.getElementById('circle-qr-container'));
```

**Example 3: High Error Correction**
```javascript

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

const qrMargin = new QRCodeJs({
  data: 'With Margin',
  margin: 20 // Add a 20px quiet zone around the QR code
});
qrMargin.append(document.getElementById('margin-qr-container'));
```

**Example 2: Scaling Down**
```javascript

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

**Example: Setting a Global Default Image with `setImage`**

```javascript
// Set a default logo for all subsequent QR codes use url or data url
QRCodeJs.setImage('https://example.com/default-logo.png');

const qrWithGlobalImage = new QRCodeJs({
  data: 'This QR uses the global default image'
});
qrWithGlobalImage.append(document.getElementById('global-image-container'));

// Override the global image for a specific instance
const qrOverrideGlobalImage = new QRCodeJs({
  data: 'This QR overrides the global image',
  image: 'https://example.com/another-logo.png'
});
qrOverrideGlobalImage.append(document.getElementById('override-global-image-container'));

// Clear the global image
// QRCodeJs.setImage(null);
```

**Example: Using the Builder Pattern with `useImage`**

```javascript
const qrBuiltWithImage = QRCodeJs.useImage('https://example.com/builder-logo.png')
  .options({
    data: 'This QR was built with a specific image via useImage',
    qrOptions: { errorCorrectionLevel: 'Q' }
  });
qrBuiltWithImage.append(document.getElementById('builder-image-container'));

// Combining with other builder methods
const qrCombinedBuilderImage = QRCodeJs.useTemplate('rounded')
  .useImage('https://example.com/combined-builder-logo.png')
  .useStyle({ dotsOptions: { color: 'green' } })
  .options({
    data: 'Combined builder methods with useImage'
  });
qrCombinedBuilderImage.append(document.getElementById('combined-builder-image-container'));
```

**Example: Using Override Option with Images**

```javascript
// The override option ensures this image takes precedence over any other image
// settings, even those specified in the instance options
const qrWithOverrideImage = QRCodeJs.useImage('https://example.com/priority-logo.png', { override: true })
  .options({
    data: 'Image with override',
    // This image will be ignored because of the override option
    image: 'https://example.com/ignored-image.png',
    dotsOptions: { color: '#333333' }
  });
qrWithOverrideImage.append(document.getElementById('override-image-container'));

// Global image with override
QRCodeJs.setImage('https://example.com/global-priority.png', { override: true });

// This instance will use the global priority image despite specifying another image
const qrWithGlobalOverride = new QRCodeJs({
  data: 'Global image override example',
  image: 'https://example.com/will-be-ignored.png' // Ignored due to global override
});
qrWithGlobalOverride.append(document.getElementById('global-override-container'));

// Clear the global image when done
// QRCodeJs.setImage(null);
```

---

### Static Methods for Data, Options, and Settings (`setData`, `setOptions`, `setSettings`)

These static methods allow setting global defaults for data, general options, or a comprehensive settings object. These defaults apply to all `QRCodeJs` instances created *after* the static method is called, until cleared or overridden.

**Example 1: Using `QRCodeJs.setData()`**
```javascript
// Set global default data
QRCodeJs.setData('https://global-default-link.com');

const qrGlobalData1 = new QRCodeJs({
  // Data will be 'https://global-default-link.com'
  dotsOptions: { color: 'purple' }
});
qrGlobalData1.append(document.getElementById('global-data-container-1'));

// Override global data for a specific instance
const qrOverrideGlobalData1 = new QRCodeJs({
  data: 'https://specific-instance-link.com' // This overrides the global data
});
qrOverrideGlobalData1.append(document.getElementById('override-global-data-container-1'));

// Set global data with override:true (makes it harder to override by instance options)
QRCodeJs.setData('https://forced-global-link.com', { override: true });
const qrForcedData1 = new QRCodeJs({
  data: 'https://this-link-is-ignored.com' // Ignored due to global override:true
});
qrForcedData1.append(document.getElementById('forced-data-container-1'));

QRCodeJs.setData(null); // Clear global data default
```

**Example 2: Using `QRCodeJs.setOptions()`**
```javascript
// Set global default options
QRCodeJs.setOptions({
  margin: 20,
  qrOptions: { errorCorrectionLevel: 'H' },
  dotsOptions: { type: 'rounded', color: 'navy' }
});

const qrGlobalOptions1 = new QRCodeJs({
  data: 'Uses global margin, EC level, and dots'
  // margin will be 20, errorCorrectionLevel 'H', dots 'rounded' and 'navy'
});
qrGlobalOptions1.append(document.getElementById('global-options-container-1'));

// Override specific global options for an instance
const qrOverrideGlobalOptions1 = new QRCodeJs({
  data: 'Overrides global margin and dot color',
  margin: 5, // Overrides the global margin of 20
  dotsOptions: { color: 'green' } // Overrides dot color, type 'rounded' still applies
  // errorCorrectionLevel will still be 'H' from global options
});
qrOverrideGlobalOptions1.append(document.getElementById('override-global-options-container-1'));

// Set global options with override:true
QRCodeJs.setOptions(
  { dotsOptions: { type: 'star', color: 'gold' }, backgroundOptions: { color: '#eee'} },
  { override: true }
);
const qrForcedOptions1 = new QRCodeJs({
  data: 'Uses forced star dots and background',
  dotsOptions: { type: 'square', color: 'black'}, // These dotOptions will be overridden
  backgroundOptions: { color: '#fff' } // This background will be overridden
});
qrForcedOptions1.append(document.getElementById('forced-options-container-1'));

QRCodeJs.setOptions(null); // Clear global options defaults
```

**Example 3: Using `QRCodeJs.setSettings()`**
```javascript
const myGlobalCompanySettings = {
  name: 'CompanyWideStandard',
  data: 'https://company-standard.com',
  image: 'https://company.com/assets/standard-logo.png',
  templateId: 'classy', // Assumes 'classy' template exists
  style: { backgroundOptions: { color: '#f0f0f0' } },
  options: { margin: 12, qrOptions: { errorCorrectionLevel: 'Q' } }
};

// Set comprehensive global defaults using setSettings
QRCodeJs.setSettings(myGlobalCompanySettings);

const qrFromGlobalSettings1 = new QRCodeJs({
  // data, image, template, style, and options (margin, EC) will come from myGlobalCompanySettings
});
qrFromGlobalSettings1.append(document.getElementById('global-settings-container-1'));

// Instance options can still override parts of the global settings (if not set with override by setSettings)
const qrOverrideGlobalSettings1 = new QRCodeJs({
  data: 'https://specific-campaign.company-standard.com', // Overrides data from myGlobalCompanySettings
  dotsOptions: { color: 'darkred' } // Adds/overrides dot color (style from setSettings might have other dot props)
});
qrOverrideGlobalSettings1.append(document.getElementById('override-global-settings-container-1'));

QRCodeJs.setSettings(null); // Clear all global settings established by setSettings
```

---

### Builder Methods for Data, Options, and Settings (`useData`, `useOptions`, `useSettings`)

These builder methods allow applying data, general options, or comprehensive settings to a specific builder chain. They do *not* affect global defaults.

**Example 1: Using `useData()` in Builder**
```javascript
const qrUseData1 = QRCodeJs.useData('https://data-via-builder.com')
  .options({ // Final options, including data from useData
    dotsOptions: { type: 'classyRounded', color: 'darkblue' }
  });
qrUseData1.append(document.getElementById('builder-usedata-container-1'));

// useData with override:true
const qrUseDataOverride1 = QRCodeJs.useData('https://forced-data-for-builder.com', { override: true })
  .options({
    data: 'https://this-data-is-ignored-by-builder.com', // Ignored due to useData override:true
    dotsOptions: { color: 'darkgreen' }
  });
qrUseDataOverride1.append(document.getElementById('builder-usedata-override-container-1'));
```

**Example 2: Using `useOptions()` in Builder**
```javascript
const qrUseOptions1 = QRCodeJs.useOptions({ // Apply some options via useOptions
  margin: 22,
  backgroundOptions: { color: '#fafafa' },
  shape: 'circle'
}).options({ // Final options, including data
  data: 'Built with useOptions for margin, background, and shape'
});
qrUseOptions1.append(document.getElementById('builder-useoptions-container-1'));

// useOptions with override:true
const qrUseOptionsOverride1 = QRCodeJs.useOptions(
    { qrOptions: { errorCorrectionLevel: 'L' }, dotsOptions: { type: 'diamond'} }, // These will override final .options()
    { override: true }
  )
  .options({
    data: 'Built with forced low EC and diamond dots',
    qrOptions: { errorCorrectionLevel: 'H' }, // This 'H' will be overridden by 'L'
    dotsOptions: { type: 'square' } // This 'square' will be overridden by 'diamond'
  });
qrUseOptionsOverride1.append(document.getElementById('builder-useoptions-override-container-1'));
```

**Example 3: Using `useSettings()` in Builder**
```javascript
const eventBuilderSettings = {
  name: 'EventBuilderSpecial',
  data: 'https://eventsite.com/special-event',
  image: 'https://eventsite.com/assets/event-logo.svg',
  style: { dotsOptions: { type: 'extraRounded', color: '#FF6347' } }, // Tomato color
  options: { margin: 10, isResponsive: true }
};

// useSettings resets prior builder steps (like useTemplate below) and establishes a new baseline
const qrUseSettings1 = QRCodeJs.useTemplate('dots') // This 'dots' template will be reset by useSettings
  .useSettings(eventBuilderSettings) // Applies the comprehensive settings as the new baseline
  .useStyle({ backgroundOptions: { color: '#FFF5EE' }}) // Modifies the baseline from useSettings (adds background)
  .options({ // Final options, data comes from eventBuilderSettings unless overridden here
    // data, image, most dotsOptions, margin, and isResponsive come from eventBuilderSettings
    // background color comes from the subsequent useStyle
    qrOptions: { typeNumber: 0, errorCorrectionLevel: 'M' } // Add/override specific QR options
  });
qrUseSettings1.append(document.getElementById('builder-usesettings-container-1'));
```

---

### Border Options (Free Version)

Adding a basic border (includes "QR-Platform" branding).
```javascript

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
**Example: Setting a Global Default Border**
```javascript


// Set a default border configuration by name
QRCodeJs.setBorder('basic-thin'); // Assumes 'basic-thin' is a predefined border template

// This instance will use the 'basic-thin' border
const qrWithDefaultBorder = new QRCodeJs({
  data: 'Uses default border'
});
qrWithDefaultBorder.append(document.getElementById('default-border-container'));

// You can also set by ID or with an options object:
// QRCodeJs.setBorderId('border-id-example');
// QRCodeJs.setBorder({ hasBorder: true, thickness: 10, color: 'red' });
```

**Example: Using the Builder Pattern for Borders**
```javascript


// Start the builder with a border configuration by name
const qrBuiltWithBorder = QRCodeJs.useBorder('basic-curved') // Assumes 'basic-curved' is predefined
  .options({
    data: 'Built with border'
  });
qrBuiltWithBorder.append(document.getElementById('builder-border-container'));

// Start the builder with a border configuration by ID
const qrBuiltWithBorderId = QRCodeJs.useBorderId('border-id-example') // Assumes 'border-id-example' is predefined
  .options({
    data: 'Built with border ID'
  });
qrBuiltWithBorderId.append(document.getElementById('builder-border-id-container'));
```

**Example: Using Text in Borders with Override Option (Premium Feature)**

```javascript
// Ensure license is activated first for premium border features
// await QRCodeJs.license('YOUR-LICENSE-KEY');

// Setting text that will override any text specified in borderOptions
QRCodeJs.setText({
  topValue: 'TOP PRIORITY TEXT', 
  bottomValue: 'BOTTOM PRIORITY TEXT'
}, { override: true } as MethodOverrideOptions); // Using MethodOverrideOptions type for clarity

// Even though this instance specifies different text values in the border decorations,
// the global text with override option will take precedence
const qrWithTextOverride = new QRCodeJs({
  data: 'Text Override Example',
  borderOptions: {
    hasBorder: true,
    thickness: 30,
    color: '#9C27B0',
    decorations: {
      top: {
        enableText: true,
        value: 'THIS TEXT WILL BE IGNORED' // Ignored due to override
      },
      bottom: {
        enableText: true,
        value: 'THIS WILL ALSO BE IGNORED' // Ignored due to override
      }
    }
  }
});
qrWithTextOverride.append(document.getElementById('text-override-container'));

// Using the builder pattern with text override
const qrBuilderWithTextOverride = QRCodeJs.useText(
  {
    leftValue: 'LEFT OVERRIDE',
    rightValue: 'RIGHT OVERRIDE'
  }, 
  { override: true } as MethodOverrideOptions // Using MethodOverrideOptions type for clarity
)
  .useBorder('fancy-border') // Assumes this is a predefined border
  .options({
    data: 'Builder Text Override Example',
    borderOptions: {
      decorations: {
        left: { enableText: true, value: 'IGNORED' }, // Ignored due to override
        right: { enableText: true, value: 'ALSO IGNORED' } // Ignored due to override
      }
    }
  });
qrBuilderWithTextOverride.append(document.getElementById('builder-text-override-container'));

// Reset global text when done
QRCodeJs.setText(null);
```
*For custom border text and advanced features like inner/outer borders, a [Premium License](./license-management) is required.*

---

## Metadata Management

QRCode.js supports metadata for better organization and tracking:

### Metadata Management with Builder Pattern

The builder pattern supports metadata methods for assigning identifiers, names, descriptions, and custom metadata to QR code instances.

**Example 1: Basic Metadata with Builder Pattern**
```javascript
// Create QR code with metadata using builder pattern
const qrWithMetadata = QRCodeJs.useTemplate('modern')
  .useId('customer-portal-qr-001')
  .useName('Customer Portal Access')
  .useDescription('QR code for customer portal login system')
  .useMetadata({
    campaign: 'winter2024',
    department: 'marketing',
    version: '1.2.0'
  })
  .options({
    data: 'https://customer.company.com/portal'
  });

qrWithMetadata.append(document.getElementById('metadata-container'));

// Access metadata after creation
console.log('QR ID:', qrWithMetadata.getId()); // 'customer-portal-qr-001'
console.log('QR Name:', qrWithMetadata.getName()); // 'Customer Portal Access'
console.log('QR Description:', qrWithMetadata.getDescription()); // 'QR code for customer portal login system'
console.log('QR Metadata:', qrWithMetadata.getMetadata());
// { campaign: 'winter2024', department: 'marketing', version: '1.2.0' }
```

**Example 2: Static Metadata Methods**
```javascript
// Set metadata using static methods
QRCodeJs
  .setId('product-qr-123')
  .setName('Product Landing Page')
  .setDescription('QR code linking to product details page')
  .setMetadata({
    productId: '123',
    category: 'electronics',
    createdBy: 'marketing-team',
    expires: '2024-12-31'
  });

const qrInstance = new QRCodeJs({
  data: 'https://example.com/product-123'
});

qrInstance.append(document.getElementById('instance-metadata-container'));

// Get current settings and options
const currentSettings = qrInstance.getSettings();
console.log('Current Settings:', currentSettings);
```

**Example 3: Chaining Metadata with Templates and Styles**
```javascript
// Complex builder chain with metadata
const qrComplexChain = QRCodeJs.useTemplate('rounded')
  .useStyle({ dotsOptions: { color: '#2E86AB' } })
  .useId('campaign-qr-2024')
  .useName('Summer Campaign QR')
  .useDescription('Multi-channel marketing campaign QR code')
  .useMetadata({
    campaignId: 'summer-2024',
    channels: ['email', 'social', 'print'],
    budget: 5000,
    targetAudience: 'millennials'
  })
  .useImage('https://company.com/assets/summer-logo.png')
  .options({
    data: 'https://campaign.company.com/summer-2024',
    qrOptions: { errorCorrectionLevel: 'Q' }
  });

qrComplexChain.append(document.getElementById('complex-chain-container'));
```

**Example 4: Conditional Metadata Setting**
```javascript
// Function to create QR codes with conditional metadata
function createTrackingQR(data, trackingInfo) {
  const builder = QRCodeJs.useTemplate('tracking')
    .useId(trackingInfo.id)
    .useName(trackingInfo.name);

  // Conditionally add description
  if (trackingInfo.description) {
    builder.useDescription(trackingInfo.description);
  }

  // Conditionally add metadata
  if (trackingInfo.metadata) {
    builder.useMetadata(trackingInfo.metadata);
  }

  return builder.options({ data });
}

// Usage
const trackingQR = createTrackingQR('https://track.company.com/package/ABC123', {
  id: 'package-tracker-ABC123',
  name: 'Package Tracking QR',
  description: 'Scan to track package ABC123',
  metadata: {
    packageId: 'ABC123',
    carrier: 'FedEx',
    priority: 'high',
    estimatedDelivery: '2024-03-15'
  }
});

trackingQR.append(document.getElementById('tracking-qr-container'));
```
