# Advanced Examples for QR-Code.js
<a id="start"></a>

This document provides advanced examples demonstrating the customization capabilities of QRCode.js. Each section focuses on specific options to help you create unique and visually appealing QR codes.

---

## Detailed Examples by Options

### Core Options

These examples focus on the fundamental QR code generation settings.

**Example 1: High Error Correction & Specific Type Number**

```typescript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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

---

### Border Options and Decorations (Premium Feature)

Uses premium border features for advanced styling and text. Requires a license.

**Example 1: Elaborate Border with Multiple Decorations**

```typescript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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

### Scan Validation (Premium Feature)

Validate if the generated QR code is scannable using the built-in validator. This requires a premium license.

```typescript
// filepath: /Users/kurdin/projects/qr-platform/qr-code-js/docs/advanced-examples.md
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

### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Basic Examples](./examples.md#start)
