# Advanced Examples for QR-Code.js
<a id="start"></a>

This document provides advanced examples demonstrating the customization capabilities of QRCode.js. Each section focuses on specific options to help you create unique and visually appealing QR codes.

---

## Detailed Examples by Options

### Core Options

These examples focus on the fundamental QR code generation settings.

**Example 1: High Error Correction & Specific Type Number**

```typescriptconst qrCoreHighEC = new QRCodeJs({
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

```typescriptconst qrCoreAutoEC = new QRCodeJs({
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

```typescriptconst qrLayoutScaledOffset = new QRCodeJs({
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

```typescriptconst qrLayoutResponsive = new QRCodeJs({
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

```typescriptconst qrDotsClassy = new QRCodeJs({
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

```typescriptconst qrDotsStar = new QRCodeJs({
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

```typescriptconst qrDotsDiamond = new QRCodeJs({
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

```typescriptconst qrCornerSquareOutpoint = new QRCodeJs({
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

```typescriptconst qrCornerSquareRounded = new QRCodeJs({
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

```typescriptconst qrCornerDotHeart = new QRCodeJs({
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

```typescriptconst qrCornerDotSquare = new QRCodeJs({
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

```typescriptconst qrBackgroundStyled = new QRCodeJs({
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

```typescriptconst qrBackgroundGradient = new QRCodeJs({
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

```typescriptconst qrGradientDotsLinear = new QRCodeJs({
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

```typescriptconst qrGradientMultiple = new QRCodeJs({
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

```typescriptconst qrImageCenter = new QRCodeJs({
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

```typescriptconst qrImageBackground = new QRCodeJs({
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

### Border Options and Decorations (Premium Feature)

Uses premium border features for advanced styling and text. Requires a license.

**Example 1: Using Text Override Option**

```typescript
// Ensure license is activated first
// await QRCodeJs.license('YOUR-LICENSE-KEY');

// Setting global text with override that will take precedence 
// even over text specified in instance options
QRCodeJs.setText({
  topValue: 'GLOBAL OVERRIDE TEXT',
  bottomValue: 'PRIORITY FOOTER TEXT'
}, { override: true });

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
const qrBuilderTextOverride = QRCodeJs.useText({
  leftValue: 'LEFT OVERRIDE TEXT',
  rightValue: 'RIGHT OVERRIDE TEXT'
}, { override: true })
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

```typescript// Ensure license is activated first
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

```typescript// Ensure license is activated first
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

### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Basic Examples](./examples.md#start)
