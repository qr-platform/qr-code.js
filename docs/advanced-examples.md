---
title: 'Advanced Examples for QR-Code.js'
description: 'Advanced examples demonstrating the customization capabilities of QRCode.js'
---

This document provides advanced examples demonstrating the customization capabilities of QRCode.js. Each section focuses on specific options to help you create unique and visually appealing QR codes.

---

## Detailed Examples by Options

### Core Options

These examples focus on the fundamental QR code generation settings.

**Example 1: High Error Correction & Specific Type Number**

```typescript
const qrCoreHighEC = new QRCodeJs({
  data: 'https://example.com/high-ec',
  qrOptions: {
    typeNumber: 10, // Larger QR code version
    errorCorrectionLevel: 'H' // Highest error correction
  },
  dotsOptions: {
    color: '#4A00E0' // Deep purple dots
  }
});
qrCoreHighEC.append(document.getElementById('core-high-ec-container'));
```

**Example 2: Auto Type Number & Medium Error Correction**

```typescript
const qrCoreAutoEC = new QRCodeJs({
  data: 'https://example.com/auto-ec-medium',
  qrOptions: {
    typeNumber: 0, // Auto-detect size
    errorCorrectionLevel: 'M' // Medium error correction
  },
  dotsOptions: {
    color: '#006400' // Dark green dots
  }
});
qrCoreAutoEC.append(document.getElementById('core-auto-ec-container'));
```

---

### Layout Options

Demonstrates how to control the positioning and scaling within the container or border.

**Example 1: Scaled Down with Offsets**

```typescript
const qrLayoutScaledOffset = new QRCodeJs({
  data: 'https://example.com/layout-scaled-offset',
  scale: 0.75, // QR code occupies 75% of the space
  offset: -15, // Moves QR code 15px up relative to center
  verticalOffset: 5, // Additional 5px absolute downward shift
  horizontalOffset: -5, // Additional 5px absolute leftward shift
  dotsOptions: {
    color: '#D32F2F' // Red dots
  },
  backgroundOptions: {
    color: '#FFEBEE' // Light red background
  }
});
qrLayoutScaledOffset.append(document.getElementById('layout-scaled-offset-container'));
```

**Example 2: Responsive QR Code**

```typescript
const qrLayoutResponsive = new QRCodeJs({
  data: 'https://example.com/layout-responsive',
  isResponsive: true, // SVG will resize with container
  margin: 10, // Add a 10px quiet zone
  dotsOptions: {
    color: '#0277BD' // Blue dots
  }
});
// Ensure the container has a defined size or resizes
const responsiveContainer = document.getElementById('layout-responsive-container');
if (responsiveContainer) {
  responsiveContainer.style.width = '80%'; // Example: container takes 80% width
  responsiveContainer.style.height = 'auto';
  qrLayoutResponsive.append(responsiveContainer);
}
```

---

### Dot Styling

Showcases different shapes and colors for the main data dots.

**Example 1: Classy Rounded Dots**

```typescript
const qrDotsClassy = new QRCodeJs({
  data: 'https://example.com/dots-classy',
  dotsOptions: {
    type: 'classyRounded',
    color: '#388E3C', // Green classy dots
    size: 11
  }
});
qrDotsClassy.append(document.getElementById('dots-classy-container'));
```

**Example 2: Star Dots**

```typescript
const qrDotsStar = new QRCodeJs({
  data: 'https://example.com/dots-star',
  dotsOptions: {
    type: 'star',
    color: '#FFA000', // Amber star dots
    size: 13
  }
});
qrDotsStar.append(document.getElementById('dots-star-container'));
```

**Example 3: Diamond Dots**

```typescript
const qrDotsDiamond = new QRCodeJs({
  data: 'https://example.com/dots-diamond',
  dotsOptions: {
    type: 'diamond',
    color: '#5E35B1', // Deep Purple diamond dots
    size: 10
  }
});
qrDotsDiamond.append(document.getElementById('dots-diamond-container'));
```

---

### Corner Squares Styling

Customizes the three large corner squares.

**Example 1: Outpoint Corner Squares**

```typescript
const qrCornerSquareOutpoint = new QRCodeJs({
  data: 'https://example.com/corner-square-outpoint',
  dotsOptions: { color: '#444' },
  cornersSquareOptions: {
    type: 'outpoint',
    color: '#C2185B' // Pink outpoint corners
  }
});
qrCornerSquareOutpoint.append(document.getElementById('corner-square-outpoint-container'));
```

**Example 2: Rounded Corner Squares**

```typescript
const qrCornerSquareRounded = new QRCodeJs({
  data: 'https://example.com/corner-square-rounded',
  dotsOptions: { type: 'dot', color: '#7B1FA2' }, // Purple dots
  cornersSquareOptions: {
    type: 'rounded',
    color: '#00796B' // Teal rounded corners
  }
});
qrCornerSquareRounded.append(document.getElementById('corner-square-rounded-container'));
```

---

### Corner Dots Styling

Customizes the smaller dots within the corner squares.

**Example 1: Heart Corner Dots**

```typescript
const qrCornerDotHeart = new QRCodeJs({
  data: 'https://example.com/corner-dot-heart',
  dotsOptions: { color: '#555' },
  cornersSquareOptions: { type: 'square', color: '#E64A19' }, // Orange square corners
  cornersDotOptions: {
    type: 'heart',
    color: '#FFFFFF' // White heart dots inside corners
  }
});
qrCornerDotHeart.append(document.getElementById('corner-dot-heart-container'));
```

**Example 2: Square Corner Dots with Different Color**

```typescript
const qrCornerDotSquare = new QRCodeJs({
  data: 'https://example.com/corner-dot-square',
  dotsOptions: { type: 'rounded', color: '#004D40' }, // Dark Teal dots
  cornersSquareOptions: { type: 'rounded', color: '#FBC02D' }, // Yellow rounded corners
  cornersDotOptions: {
    type: 'square',
    color: '#004D40' // Dark Teal square dots inside corners
  }
});
qrCornerDotSquare.append(document.getElementById('corner-dot-square-container'));
```

---

### Background Styling

Applies color, rounding, and gradients to the background.

**Example 1: Colored and Rounded Background**

```typescript
const qrBackgroundStyled = new QRCodeJs({
  data: 'https://example.com/background-styled',
  dotsOptions: { color: '#FFFFFF' }, // White dots for contrast
  backgroundOptions: {
    color: '#1A237E', // Indigo background
    round: 0.3 // 30% rounding
  }
});
qrBackgroundStyled.append(document.getElementById('background-styled-container'));
```

**Example 2: Background with Subtle Radial Gradient**

```typescript
const qrBackgroundGradient = new QRCodeJs({
  data: 'https://example.com/background-gradient',
  dotsOptions: { color: '#333' },
  backgroundOptions: {
    round: '10%',
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#E3F2FD' }, // Light blue center
        { offset: 1, color: '#BBDEFB' }  // Darker blue edge
      ]
    }
  }
});
qrBackgroundGradient.append(document.getElementById('background-gradient-container'));
```

---

### Gradients Usage

Applies linear and radial gradients to various elements.

**Example 1: Linear Gradient on Dots**

```typescript
const qrGradientDotsLinear = new QRCodeJs({
  data: 'https://example.com/gradient-dots-linear',
  dotsOptions: {
    type: 'rounded',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 2, // Vertical gradient
      colorStops: [
        { offset: 0, color: '#FDD835' }, // Yellow start
        { offset: 1, color: '#F57F17' }  // Orange end
      ]
    }
  },
  backgroundOptions: { color: '#FFFDE7' } // Light yellow background
});
qrGradientDotsLinear.append(document.getElementById('gradient-dots-linear-container'));
```

**Example 2: Radial Gradient on Corner Squares & Linear on Dots**

```typescript
const qrGradientMultiple = new QRCodeJs({
  data: 'https://example.com/gradient-multiple',
  dotsOptions: {
    type: 'square',
    gradient: {
      type: 'linear',
      rotation: 0, // Horizontal
      colorStops: [
        { offset: 0, color: '#8E24AA' }, // Purple
        { offset: 1, color: '#D81B60' }  // Pink
      ]
    }
  },
  cornersSquareOptions: {
    type: 'dot',
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#D81B60' }, // Pink center
        { offset: 1, color: '#8E24AA' }  // Purple edge
      ]
    }
  },
   cornersDotOptions: { // Keep inner dots consistent with square gradient
    type: 'dot',
    gradient: {
      type: 'radial',
      colorStops: [
        { offset: 0, color: '#D81B60' },
        { offset: 1, color: '#8E24AA' }
      ]
    }
  },
  backgroundOptions: { color: '#F3E5F5' } // Light purple background
});
qrGradientMultiple.append(document.getElementById('gradient-multiple-container'));
```

---

### Image Embedding

Embeds logos or images within the QR code.

**Example 1: Centered Logo with Fill**

```typescript
const qrImageCenter = new QRCodeJs({
  data: 'https://example.com/image-center',
  qrOptions: { errorCorrectionLevel: 'Q' }, // Higher EC recommended
  image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', // Example: Instagram logo
  imageOptions: {
    mode: 'center',
    imageSize: 0.35,
    margin: 3,
    crossOrigin: 'anonymous',
    fill: { color: 'rgba(255,255,255,0.8)' } // Semi-transparent white fill behind logo
  },
  dotsOptions: { color: '#C13584' } // Instagram-like color
});
qrImageCenter.append(document.getElementById('image-center-container'));
```

**Example 2: Image as Background**

```typescript
const qrImageBackground = new QRCodeJs({
  data: 'https://example.com/image-background',
  qrOptions: { errorCorrectionLevel: 'M' },
  image: 'https://source.unsplash.com/random/300x300?nature,water', // Example: Random nature image
  imageOptions: {
    mode: 'background', // Use image as background
    imageSize: 1, // Image covers the whole area
    crossOrigin: 'anonymous'
  },
  dotsOptions: {
    type: 'rounded',
    color: 'rgba(0, 0, 0, 0.7)' // Semi-transparent dark dots for contrast
  },
  cornersSquareOptions: { color: 'rgba(0, 0, 0, 0.7)' },
  cornersDotOptions: { color: 'rgba(0, 0, 0, 0.7)' },
  backgroundOptions: false // Disable default background color
});
qrImageBackground.append(document.getElementById('image-background-container'));
```

**Example 3: Using the Override Option with Images**

```typescript

// Setting a global image with override that will take precedence
// even over images specified in instance options
QRCodeJs.setImage('https://example.com/global-priority-logo.png', { override: true });

// Even when an instance specifies an image, the global one with override will be used
const qrImageOverride = new QRCodeJs({
  data: 'https://example.com/image-override-example',
  image: 'https://example.com/this-will-be-ignored.png', // Will be ignored due to override
  dotsOptions: { color: '#333333' }
});
qrImageOverride.append(document.getElementById('image-override-container'));

// Using the builder pattern with image override
const qrBuilderImageOverride = QRCodeJs.useImage('https://example.com/builder-priority-logo.png', { override: true })
  .options({
    data: 'https://example.com/builder-image-override-example',
    image: 'https://example.com/another-ignored-image.png', // Will be ignored due to override
    dotsOptions: { type: 'rounded', color: '#555555' }
  });
qrBuilderImageOverride.append(document.getElementById('builder-image-override-container'));

// Reset the global image when done
QRCodeJs.setImage(null);
```

---

### Comprehensive Configuration with `SettingsOptions` (`setSettings` and `useSettings`)

Demonstrates using `QRCodeJs.setSettings()` for establishing global presets and `QRCodeJs.useSettings()` for applying comprehensive configurations within a builder chain. These methods utilize the `SettingsOptions` interface.

**Example 1: Defining and Applying a Global Preset with `QRCodeJs.setSettings()`**

`QRCodeJs.setSettings()` acts as a macro, calling other static setters like `setData()`, `setImage()`, `setTemplate()`, `setStyle()`, `setOptions()`, etc., based on the provided `SettingsOptions`. It overrides/resets previous static configurations for the aspects it covers.

```typescript

// Define a comprehensive global preset using SettingsOptions
const companyGlobalPreset: SettingsOptions = {
  name: 'CompanyStandardGlobalQR',
  data: 'https://company.com/global-default', // Will call QRCodeJs.setData()
  image: 'https://company.com/assets/global-logo.png', // Will call QRCodeJs.setImage()
  templateId: 'dots', // Assumes 'dots' template exists, will call QRCodeJs.setTemplateId()
  style: { // Will call QRCodeJs.setStyle()
    dotsOptions: { color: '#003366' }, // Company dark blue
    backgroundOptions: { color: '#EFEFEF' }
  },
  borderOptions: { // Will call QRCodeJs.setBorder()
    hasBorder: true,
    thickness: 12,
    color: '#003366'
  },
  options: { // Will call QRCodeJs.setOptions()
    margin: 8,
    qrOptions: { errorCorrectionLevel: 'Q' }
  }
};

// Apply the preset globally
QRCodeJs.setSettings(companyGlobalPreset);

// This QR code will inherit all settings from companyGlobalPreset
const qrFromGlobalSettings = new QRCodeJs({
  // Data is inherited from companyGlobalPreset.data
  // Image, template, style, border, margin, EC level are also inherited.
});
qrFromGlobalSettings.append(document.getElementById('global-settings-preset-container'));

// Another instance, overriding only the data from the global preset
const qrOverrideGlobalData = new QRCodeJs({
  data: 'https://company.com/specific-product-page' // Overrides companyGlobalPreset.data
});
qrOverrideGlobalData.append(document.getElementById('global-settings-override-data-container'));

// Clear all global settings when done if they are not needed for subsequent QRs
// QRCodeJs.setSettings(null);
```

**Example 2: Using `QRCodeJs.useSettings()` in a Builder Chain**

`QRCodeBuilder.useSettings()` resets any configurations previously applied to *that builder instance* and establishes the provided `SettingsOptions` as the new baseline.

```typescript

const eventSpecificBuilderConfig: SettingsOptions = {
  name: 'TechConferenceBuilderQR',
  data: 'https://techconf.example/main-schedule', // Baseline data for this builder
  image: 'https://techconf.example/assets/event-logo-qr.png', // Baseline image
  styleId: 'modern-dark', // Assumes 'modern-dark' style ID exists
  text: { // Border text configuration (will be part of the baseline)
    topValue: 'Tech Conference 2024',
    bottomValue: 'Scan for Schedule & Info'
  },
  borderOptions: { // Baseline border
    hasBorder: true,
    thickness: 20,
    color: '#2C3E50',
    radius: '8px'
  },
  options: { // Baseline general options
    qrOptions: { errorCorrectionLevel: 'H' },
    isResponsive: true,
    margin: 12
  }
};

// Start with a base template (will be reset), apply comprehensive settings, then further customize
const qrEventSpecialBuilder = QRCodeJs.useTemplate('dots') // This 'dots' template will be reset by useSettings
  .useStyle({ dotsOptions: { color: 'red' }}) // This style will also be reset
  .useSettings(eventSpecificBuilderConfig) // Applies the full eventSpecificConfig, resetting prior builder steps
  .useStyle({ // Further refine the style from the useSettings baseline
    dotsOptions: { gradient: { type: 'linear', colorStops: [{offset:0, color:'#5DADE2'}, {offset:1, color:'#2E86C1'}] } }
  })
  .options({ // Final data override and other specific options
    data: 'https://techconf.example/live-updates-feed', // Overrides data from eventSpecificBuilderConfig
    margin: 6 // Overrides margin from eventSpecificBuilderConfig.options
  });

qrEventSpecialBuilder.append(document.getElementById('builder-usesettings-container'));
```

**Example 3: Showcasing `overrideOpts` with Static `setData` and `setOptions`**

The `overrideOpts: { override: true }` parameter makes static settings "sticky", meaning they are harder to override by instance options or non-overriding builder methods.

```typescript

// Set data with override:true; it will take precedence over instance data
QRCodeJs.setData('https://permanent-global-link.com', { override: true });

// Set some options with override:true
QRCodeJs.setOptions(
    { dotsOptions: { type: 'star', color: 'gold' }, margin: 0, shape: 'circle' },
    { override: true }
);

const qrStaticOverridesDemo = new QRCodeJs({
    data: 'https://this-data-is-ignored-by-instance.com', // Will use 'https://permanent-global-link.com'
    dotsOptions: { type: 'square', color: 'black' }, // Will use star, gold (type and color overridden)
    margin: 20, // Will use 0 (overridden)
    shape: 'square' // Will use 'circle' (overridden)
});
qrStaticOverridesDemo.append(document.getElementById('static-override-example-container'));

// Clear static settings when done to avoid affecting other examples
QRCodeJs.setData(null); // This clears the override as well
QRCodeJs.setOptions(null); // This clears the override as well
```

---

### Border Options and Decorations (Premium Feature)

Uses premium border features for advanced styling and text. Requires a license.

**Example 1: Using Text Override Option**

```typescript

// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

// Setting global text with override that will take precedence 
// even over text specified in instance options
QRCodeJs.setText(
  {
    topValue: 'GLOBAL OVERRIDE TEXT',
    bottomValue: 'PRIORITY FOOTER TEXT'
  }, 
  { override: true } // MethodOverrideOptions
);

// Even when an instance specifies border text, the global one with override will be used
const qrTextOverride = new QRCodeJs({
  data: 'https://example.com/text-override-example',
  borderOptions: {
    hasBorder: true,
    thickness: 30,
    color: '#FF5722',
    decorations: {
      top: { 
        enableText: true,
        value: 'THIS TEXT WILL BE IGNORED' // Ignored due to global override
      },
      bottom: {
        enableText: true,
        value: 'THIS BOTTOM TEXT ALSO IGNORED' // Ignored due to global override
      }
    }
  }
});
qrTextOverride.append(document.getElementById('text-override-container'));

// Using the builder pattern with text override
const qrBuilderTextOverride = QRCodeJs.useText(
  {
    leftValue: 'LEFT OVERRIDE TEXT',
    rightValue: 'RIGHT OVERRIDE TEXT'
  }, 
  { override: true } // MethodOverrideOptions
)
  .options({
    data: 'https://example.com/builder-text-override-example',
    borderOptions: {
      hasBorder: true,
      thickness: 30,
      color: '#3F51B5',
      decorations: {
        left: { 
          enableText: true,
          value: 'IGNORED LEFT TEXT' // Will be ignored due to override
        },
        right: {
          enableText: true,
          value: 'IGNORED RIGHT TEXT' // Will be ignored due to override
        }
      }
    }
  });
qrBuilderTextOverride.append(document.getElementById('builder-text-override-container'));

// Reset the global text when done
QRCodeJs.setText(null);
```

**Example 2: Elaborate Border with Multiple Decorations**

```typescript
// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrBorderElaborate = new QRCodeJs({
  data: 'https://example.com/border-elaborate',
  dotsOptions: {
    type: 'extraRounded',
    color: '#0D47A1' // Dark Blue
  },
  backgroundOptions: { color: '#E3F2FD' }, // Light Blue background
  borderOptions: {
    hasBorder: true,
    thickness: 30,
    color: '#0D47A1', // Dark Blue main border
    radius: '15%',
    background: '#BBDEFB', // Lighter blue border background
    borderOuter: { // Gold outer line
      color: '#FFAB00',
      thickness: 4
    },
    borderInner: { // White inner line
      color: '#FFFFFF',
      thickness: 2
    },
    decorations: {
      top: {
        enableText: true,
        type: 'text',
        value: 'SCAN FOR DETAILS',
        style: { fontFace: 'Arial', fontSize: 16, fontColor: '#FFFFFF', fontWeight: 'bold' }
      },
      bottom: {
        enableText: true,
        type: 'text',
        value: 'Powered by QR-Platform',
        style: { fontFace: 'Arial', fontSize: 12, fontColor: '#FFFFFF' }
      },
      left: { // Example: Add small icon/text on side (adjust offset/size)
        enableText: true,
        type: 'text',
        value: '>',
        style: { fontFace: 'Arial', fontSize: 20, fontColor: '#FFFFFF', fontWeight: 'bold' },
        offset: 0 // Center vertically
      },
       right: {
        enableText: true,
        type: 'text',
        value: '<',
        style: { fontFace: 'Arial', fontSize: 20, fontColor: '#FFFFFF', fontWeight: 'bold' },
        offset: 0
      }
    }
  }
});
qrBorderElaborate.append(document.getElementById('border-elaborate-container'));
```



--- 

### Builder Pattern Example: Combining Template and Style

Demonstrates using the fluent builder pattern (`useTemplate`, `useStyle`) to combine base settings with specific styles for a complex result.

```typescript

// Define a base template (could be predefined like 'dots' or 'rounded')
const baseTemplate = {
  qrOptions: { errorCorrectionLevel: 'Q' },
  backgroundOptions: { color: '#f0f0f0' }, // Light grey background
  margin: 5
};

// Define a style for specific visual elements - a purple/blue gradient
const gradientStyle = {
  dotsOptions: {
    type: 'classy',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 6, // 30 degrees
      colorStops: [
        { offset: 0, color: '#6a11cb' }, // Purple
        { offset: 1, color: '#2575fc' }  // Blue
      ]
    }
  },
  cornersSquareOptions: { type: 'dot', color: '#6a11cb' } // Match start color of gradient
};

// Use the builder pattern to combine template and style
const qrBuilderExample = QRCodeJs.useTemplate(baseTemplate) // Start with base settings
  .useStyle(gradientStyle) // Apply the gradient style
  .options({ data: 'https://example.com/builder-pattern-advanced' }) // Add the data

qrBuilderExample.append(document.getElementById('builder-pattern-container'));

// or using the build method

const qrBuilderExampleWithBuild = QRCodeJs.useTemplate(baseTemplate)
  .useStyle(gradientStyle)
  .build();

qrBuilderExampleWithBuild.append(document.getElementById('builder-pattern-container-build'));
qrBuilderExampleWithBuild.update({ data: 'https://example.com/builder-pattern-advanced' });
```
---

### setTemplate and setStyle (Class Instance Pattern)

Demonstrates using the class instance pattern (`setTemplate`, `setStyle`) to combine base settings with specific styles for a complex result.

```typescript

// Define a base template (could be predefined like 'dots' or 'rounded')
const baseTemplate = {
  qrOptions: { errorCorrectionLevel: 'Q' },
  backgroundOptions: { color: '#f0f0f0' }, // Light grey background
  margin: 5
};

// Define a style for specific visual elements - a purple/blue gradient
const gradientStyle = {
  dotsOptions: {
    type: 'classy',
    gradient: {
      type: 'linear',
      rotation: Math.PI / 6, // 30 degrees
      colorStops: [
        { offset: 0, color: '#6a11cb' }, // Purple
        { offset: 1, color: '#2575fc' }  // Blue
      ]
    }
  },
  cornersSquareOptions: { type: 'dot', color: '#6a11cb' } // Match start color of gradient
};

// Use the builder pattern to combine template and style
const qrBuilderExample = new QRCodeJs({ data: 'https://example.com/class-instance-pattern-advanced' })
  .setTemplate(baseTemplate) // Start with 'classy' template
  .setStyle(gradientStyle) // Apply the gradient style
  .append(document.getElementById('builder-pattern-container'));
```
---

### Combining Global Defaults (`setTemplate`, `setStyle`, `setBorder`)

This example shows how to set global defaults for a template, style, and border configuration. Subsequent `QRCodeJs` instances will inherit these settings unless overridden during instantiation.

```typescript

// 1. Define and set global defaults
const globalTemplate = { backgroundOptions: { color: '#E8F5E9' } }; // Light Green background
const globalStyle = { dotsOptions: { type: 'classy', color: '#1B5E20' } }; // Dark Green classy dots
const globalBorder = { borderOptions: { hasBorder: true, thickness: 15, color: '#A5D6A7' } }; // Light Green border

QRCodeJs.setTemplate(globalTemplate);
QRCodeJs.setStyle(globalStyle);
QRCodeJs.setBorder(globalBorder); // Set the global border
QRCodeJs.setImage('https://example.com/global-default-logo.svg'); // Set a global default image or data URL

// 2. Create instance - it inherits all global defaults, including the image
const qrGlobalCombined = new QRCodeJs({
  data: 'https://example.com/global-combined-with-image'
  // No image option here, it will use the global default
});
qrGlobalCombined.append(document.getElementById('global-combined-container'));

// 3. Create another instance, overriding the global image and border color
const qrGlobalCombinedOverride = new QRCodeJs({
  data: 'https://example.com/global-combined-override-image',
  image: 'https://example.com/override-logo.png', // Override global image
  borderOptions: { color: '#FF0000' } // Override border color to Red
});
qrGlobalCombinedOverride.append(document.getElementById('global-combined-override-container'));

// Remember to clear defaults if needed for subsequent unrelated QR codes
// QRCodeJs.setTemplate('basic');
// QRCodeJs.setStyle(null);
// QRCodeJs.setBorder(null);
// QRCodeJs.setImage(null);
```

---

### Combining Builder Methods (`useTemplate`, `useStyle`, `useBorder`, `useImage`)

This example demonstrates chaining builder methods to combine a template, style, and border configuration for a single instance without affecting global defaults.

```typescript

// 1. Define components (optional, could be predefined names or IDs)
const baseTpl = { qrOptions: { errorCorrectionLevel: 'M' }, margin: 5 };
const dotsStyle = { dotsOptions: { type: 'dots', color: '#01579B' } }; // Light Blue dots
const frameBorder = { borderOptions: { hasBorder: true, thickness: 20, color: '#B3E5FC', radius: '10%' } }; // Light Blue border

// 2. Chain builder methods
const qrBuilderCombined = QRCodeJs.useTemplate(baseTpl) // Start with base template
  .useStyle(dotsStyle) // Apply dot style
  .useBorder(frameBorder) // Apply border configuration
  .useImage('https://example.com/builder-specific-logo.svg') // Add an image via builder
  .options({ data: 'https://example.com/builder-combined-with-image' }); // Add final data

qrBuilderCombined.append(document.getElementById('builder-combined-container'));

// Example using predefined names (assuming 'rounded', 'blue-gradient', 'thick-frame' exist)
// const qrBuilderNames = QRCodeJs.useTemplate('rounded')
//   .useStyle('blue-gradient')
//   .useBorder('thick-frame')
//   .useImage('another-logo.png')
//   .options({ data: 'https://example.com/builder-names-with-image' });
// qrBuilderNames.append(document.getElementById('builder-names-container'));
```
---

### Scan Validation (Premium Feature)

Validate if the generated QR code is scannable using the built-in validator. This requires a premium license.

```typescript
// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

const qrCodeToValidate = new QRCodeJs({
  data: 'Complex data string that might be hard to scan due to density or styling choices',
  qrOptions: { errorCorrectionLevel: 'L' }, // Lower error correction can make scanning harder
  dotsOptions: { type: 'tinySquare', color: '#CCCCCC' } // Light color, complex dot type
});

// Basic validation
qrCodeToValidate.validateScanning()
  .then(result => {
    console.log('Basic Validation Result:', result);
    if (!result.isValid) {
      console.warn(`QR code might not be scannable. Reason: ${result.message}`);
      // Consider adjusting options like increasing errorCorrectionLevel or changing dot style/color
    } else {
       console.log(`QR code is valid! Decoded: ${result.decodedText}`);
    }
  })
  .catch(error => {
    console.error('Validation error:', error);
  });

// Validation with debug output using zbar validator
qrCodeToValidate.validateScanning('zbar', true)
  .then(result => {
    console.log('Validation Result (zbar with debug):', result);
  })
  .catch(error => {
    console.error('Validation error (zbar with debug):', error);
  });

// Example of handling validation failure within an async function
async function createAndValidate() {
  const qr = new QRCodeJs({
      data: 'Test Data for Validation',
      dotsOptions: { type: 'star', color: '#FF00FF'} // Potentially difficult style
  });
  try {
    const validation = await qr.validateScanning();
    if (validation.isValid) {
      console.log(`QR Code is valid! Decoded: ${validation.decodedText}`);
      qr.append(document.getElementById('validation-success-container'));
    } else {
      console.error(`QR Code validation failed: ${validation.message}. Consider simplifying the design.`);
      // Optionally, try adjusting options and re-validating
      // qr.update({ dotsOptions: { type: 'square', color: '#000000' } });
      // const reValidation = await qr.validateScanning();
      // ... handle reValidation result
    }
  } catch (err) {
    console.error('An error occurred during validation:', err);
  }
}

createAndValidate();
```

---

### Node.js Static Validation Methods (Premium Feature)

QRCode.js provides static validation methods specifically for Node.js environments to validate existing QR codes from image data or SVG strings.

**Example 1: Validating Image Data (Node.js Only)**

```typescript
// Node.js import
import { QRCodeJs } from '@qr-platform/qr-code.js/node';
import fs from 'fs';

// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

async function validateQRFromImage() {
  try {
    // Read image file as buffer
    const imageBuffer = fs.readFileSync('path/to/qr-code-image.png');
    
    // Validate the QR code from image data
    const result = await QRCodeJs.validateImageData(imageBuffer);
    
    if (result.isValid) {
      console.log(`QR code is valid! Decoded text: ${result.data}`);
      console.log(`Validator used: ${result.validator}`);
    } else {
      console.warn(`QR code validation failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error validating image:', error);
  }
}

validateQRFromImage();
```

**Example 2: Validating SVG Strings (Node.js Only)**

```typescript
// Node.js import
import { QRCodeJs } from '@qr-platform/qr-code.js/node';

// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

async function validateQRFromSVG() {
  try {
    // SVG string from file or generated QR code
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <!-- SVG QR code content here -->
      </svg>
    `;
    
    // Or read from file
    // const svgString = fs.readFileSync('path/to/qr-code.svg', 'utf8');
    
    // Validate the QR code from SVG
    const result = await QRCodeJs.validateSvg(svgString);
    
    if (result.isValid) {
      console.log(`SVG QR code is valid! Decoded text: ${result.data}`);
      console.log(`Validator used: ${result.validator}`);
    } else {
      console.warn(`SVG QR code validation failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error validating SVG:', error);
  }
}

validateQRFromSVG();
```

**Example 3: Batch Validation of Multiple QR Codes**

```typescript
import { QRCodeJs } from '@qr-platform/qr-code.js/node';
import fs from 'fs';
import path from 'path';

// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

async function batchValidateQRCodes() {
  const qrDirectory = 'path/to/qr-codes/';
  const results = [];
  
  try {
    const files = fs.readdirSync(qrDirectory);
    
    for (const file of files) {
      const filePath = path.join(qrDirectory, file);
      const ext = path.extname(file).toLowerCase();
      
      let validationResult;
      
      if (['.png', '.jpg', '.jpeg', '.gif', '.bmp'].includes(ext)) {
        // Validate image files
        const imageBuffer = fs.readFileSync(filePath);
        validationResult = await QRCodeJs.validateImageData(imageBuffer);
      } else if (ext === '.svg') {
        // Validate SVG files
        const svgString = fs.readFileSync(filePath, 'utf8');
        validationResult = await QRCodeJs.validateSvg(svgString);
      } else {
        console.log(`Skipping unsupported file: ${file}`);
        continue;
      }
      
      results.push({
        file,
        isValid: validationResult.isValid,
        data: validationResult.data,
        message: validationResult.message,
        validator: validationResult.validator
      });
      
      console.log(`${file}: ${validationResult.isValid ? 'VALID' : 'INVALID'} - ${validationResult.data || validationResult.message}`);
    }
    
    // Summary
    const validCount = results.filter(r => r.isValid).length;
    const totalCount = results.length;
    console.log(`\nBatch validation complete: ${validCount}/${totalCount} QR codes are valid`);
    
    return results;
  } catch (error) {
    console.error('Error during batch validation:', error);
    return [];
  }
}

batchValidateQRCodes();
```

**Example 4: Validation with Error Handling and Retry Logic**

```typescript
import { QRCodeJs } from '@qr-platform/qr-code.js/node';

// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

async function validateWithRetry(imageData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Validation attempt ${attempt}/${maxRetries}`);
      
      const result = await QRCodeJs.validateImageData(imageData);
      
      if (result.isValid) {
        console.log(`✅ Validation successful on attempt ${attempt}`);
        return result;
      } else {
        console.warn(`❌ Validation failed on attempt ${attempt}: ${result.message}`);
        
        if (attempt === maxRetries) {
          throw new Error(`Validation failed after ${maxRetries} attempts: ${result.message}`);
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error on attempt ${attempt}:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Usage
async function validateQRWithRetry() {
  try {
    const imageBuffer = fs.readFileSync('path/to/problematic-qr.png');
    const result = await validateWithRetry(imageBuffer);
    console.log('Final result:', result);
  } catch (error) {
    console.error('All validation attempts failed:', error.message);
  }
}

validateQRWithRetry();
```

**Example 5: Integration with Express.js API**

```typescript
import express from 'express';
import multer from 'multer';
import { QRCodeJs } from '@qr-platform/qr-code.js/node';

const app = express();
const upload = multer({ memory: true });

// Ensure license is activated on server startup
// await QRCodeJs.license('YOUR-LICENSE-KEY');

// API endpoint for QR code validation
app.post('/api/validate-qr', upload.single('qrImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const imageBuffer = req.file.buffer;
    const result = await QRCodeJs.validateImageData(imageBuffer);
    
    res.json({
      success: true,
      validation: {
        isValid: result.isValid,
        data: result.data,
        message: result.message,
        validator: result.validator
      }
    });
  } catch (error) {
    console.error('Validation API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during validation'
    });
  }
});

// API endpoint for SVG validation
app.post('/api/validate-qr-svg', express.text({ type: 'image/svg+xml' }), async (req, res) => {
  try {
    const svgString = req.body;
    
    if (!svgString) {
      return res.status(400).json({ error: 'No SVG content provided' });
    }
    
    const result = await QRCodeJs.validateSvg(svgString);
    
    res.json({
      success: true,
      validation: {
        isValid: result.isValid,
        data: result.data,
        message: result.message,
        validator: result.validator
      }
    });
  } catch (error) {
    console.error('SVG validation API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during SVG validation'
    });
  }
});

app.listen(3000, () => {
  console.log('QR validation API server running on port 3000');
});
```
