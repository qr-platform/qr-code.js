# QRCode.js TypeScript Types and Definitions
<a id="start"></a>

Below is a complete TypeScript Types and Definitions section for all options available in the QRCode.js library. This section is designed as a standalone reference, defining the structure of the options object with interfaces and enums to ensure type safety and clarity for users configuring a QR code.

## Main Options Interface

The `Options` interface is the top-level configuration object for generating a QR code. It includes properties for the data to encode, shape, layout, and various styling options.

```typescript
import { QRCodeJs, Options } from '@qr-platform/qr-code.js'; // Import from '@qr-platform/qr-code.js' for browser
or
import { QRCodeJs, Options } from '@qr-platform/qr-code.js/node'; // Import from '@qr-platform/qr-code.js/node' for Node.js

```

```typescript
interface Options {
  /** The text, URL, or other data to encode into the QR code. This is the only required option. */
  data: string;

  /** The overall shape of the QR code's boundary. */
  shape: ShapeType;

  /** The quiet zone (empty space) around the QR code in pixels. */
  margin: number;

  /** When true, the QR code SVG resizes dynamically to fill the width or height of the parent container, with no internal size dimensions applied. */
  isResponsive: boolean;

  /** Scales the QR code size relative to its container or border. */
  scale: number;

  /** Applies a vertical offset (positive moves down, negative moves up) relative to the center. */
  offset: number;

  /** Applies an absolute vertical offset in pixels. */
  verticalOffset: number;

  /** Applies an absolute horizontal offset in pixels. */
  horizontalOffset: number;

  /** Options related to the underlying QR code generation algorithm. */
  qrOptions: QrOptions;

  /** Options for styling the dots in the QR code. */
  dotsOptions: DotsOptions;

  /** Options for styling the corner squares. Overrides dotsOptions. */
  cornersSquareOptions?: CornersSquareOptions;

  /** Options for styling the corner dots. Overrides cornersSquareOptions. */
  cornersDotOptions?: CornersDotOptions;

  /** Options for styling the background. Set to false to disable. */
  backgroundOptions?: BackgroundOptions | false;

  /** URL, Buffer, or Blob of an image to embed in the QR code. Can be influenced by `QRCodeJs.setImage()` or `QRCodeJs.useImage()`. */
  image?: string | DataURL | Buffer | Blob;

  /** Options for the embedded image. */
  imageOptions: ImageOptions;

  /** Options for adding decorative borders (premium feature). */
  borderOptions?: BorderOptions;
}
```

### QrOptions

Options for the QR code generation algorithm.

```typescript
interface QrOptions {
  /** Specifies the QR code version (size/capacity). 0 means automatic detection. */
  typeNumber: number;

  /** The encoding mode (e.g., Byte, Numeric, Kanji). Usually auto-detected. */
  mode?: Mode;

  /** The error correction level, determining redundancy. */
  errorCorrectionLevel: ErrorCorrectionLevel;
}
```

### DotsOptions

Options for styling the dots in the QR code.

```typescript
interface DotsOptions {
  /** The shape of the dots. */
  type: DotType;

  /** The color of the dots. */
  color: string;

  /** The size of the dots in pixels. */
  size: number;

  /** Apply a gradient fill to the dots. */
  gradient?: Gradient;
}
```

### CornersSquareOptions

Options for styling the corner squares.

```typescript
interface CornersSquareOptions {
  /** The shape of the corner squares. Inherits from dotsOptions.type if not specified. */
  type?: CornerSquareType;

  /** The color of the corner squares. Inherits from dotsOptions.color if not specified. */
  color?: string;

  /** Apply a gradient fill to the corner squares. */
  gradient?: Gradient;
}
```

### CornersDotOptions

Options for styling the corner dots.

```typescript
interface CornersDotOptions {
  /** The shape of the corner dots. Inherits from cornersSquareOptions.type if not specified. */
  type?: CornerDotType;

  /** The color of the corner dots. Inherits from cornersSquareOptions.color if not specified. */
  color?: string;

  /** Apply a gradient fill to the corner dots. */
  gradient?: Gradient;
}
```

### BackgroundOptions

Options for styling the background.

```typescript
interface BackgroundOptions {
  /** The background color. */
  color?: string;

  /** Rounds the corners of the background (0-1 or percentage). */
  round?: number | string;

  /** Apply a gradient fill to the background. */
  gradient?: Gradient;
}
```

### ImageOptions

Options for the embedded image.

```typescript
interface ImageOptions {
  /** How the image is embedded. */
  mode?: ImageMode;

  /** Relative size of the image (0-1). */
  imageSize: number;

  /** Margin around the image in dot units. */
  margin: number;

  /** CORS setting for the image. */
  crossOrigin?: string;

  /** Fill color or gradient for transparent areas. */
  fill?: {
    color: string;
    gradient?: Gradient;
  };
}
```

### BorderOptions (Premium Feature)

Options for adding decorative borders.

```typescript
interface BorderOptions {
  /** Master switch to enable/disable borders. */
  hasBorder: boolean;

  /** Thickness of the main border in pixels. */
  thickness: number;

  /** Color of the main border. */
  color: string;

  /** Corner rounding of the border (e.g., '10%', '20px'). */
  radius: string;

  /** Thickness for border sides with disabled decorations. */
  noBorderThickness: number;

  /** Background color for the border area. */
  background?: string;

  /** Options for scaling/offsetting the inner content area. */
  inner?: {
    radius: string;
    scale: number;
    horizontalOffset: number;
    verticalOffset: number;
  };

  /** Options for an additional outer border. */
  borderOuter?: {
    color: string;
    thickness: number;
  };

  /** Options for an additional inner border. */
  borderInner?: {
    color: string;
    thickness: number;
  };

  /** Add text or images to specific sides of the border. */
  decorations?: {
    top?: DecorationOptions;
    right?: DecorationOptions;
    bottom?: DecorationOptions;
    left?: DecorationOptions;
  };
}
```

### DecorationOptions (for Border Decorations)

Options for customizing decorations on border sides.

```typescript
interface DecorationOptions {
  /** Whether the decoration for this side is disabled. */
  disabled: boolean;

  /** Whether to enable text on this side of the border. */
  enableText: boolean;

  /** Positioning offset for the decoration. */
  offset: number;

  /** Adjustment for the text curve. */
  curveAdjustment: number;

  /** Whether to disable curved text. */
  curveDisabled: boolean;

  /** Radius of the text curve (e.g., '50%', '100px'). */
  curveRadius: string;

  /** The type of decoration to use ('text' or 'image'). */
  type: 'text' | 'image';

  /** The text content or image URL for the decoration. */
  value: string;

  /** Style options for text decorations. */
  style?: {
    fontFace: string;
    fontSize: number;
    fontColor: string;
    letterSpacing: number;
    textTransform: 'uppercase' | 'lowercase' | 'capitalize';
    fontWeight: 'normal' | 'bold';
  };
}
```

### Gradient

Options for applying gradient fills.

```typescript
interface Gradient {
  /** Specifies the type of gradient: 'linear' or 'radial'. */
  type: 'linear' | 'radial';

  /** Rotation angle in radians for linear gradients. */
  rotation?: number;

  /** Array of color stops defining the gradient (offset: 0-1, color: CSS string). */
  colorStops: Array<{ offset: number; color: string }>;
}
```

### SettingsOptions

Options for configuring multiple aspects of the QR code in a centralized way via `QRCodeJs.settings()` (static) or `instance.setSettings()` (instance).

```typescript
interface SettingsOptions {
  /** Optional ID for the settings preset. */
  id?: string;

  /** Optional name for the settings preset. */
  name?: string;

  /** Optional description for the settings preset. */
  description?: string;

  /**
   * Template to apply. Can be a template name (string) or a
   * `RecursivePartial<Options>` object.
   * This will be applied via `QRCodeJs.setTemplate()` or `QRCodeJs.setTemplateId()`.
   */
  template?: string | RecursivePartial<Options>;
  templateId?: string;

  /**
   * Style to apply. Can be a style name (string) or a `StyleOptions` object.
   * This will be applied via `QRCodeJs.setStyle()` or `QRCodeJs.setStyleId()`.
   */
  style?: string | StyleOptions;
  styleId?: string;

  /**
   * Text configuration to apply. Can be a text template name (string) or a `TextOptions` object.
   * This will be applied via `QRCodeJs.setText()` or `QRCodeJs.setTextId()`.
   */
  text?: string | TextOptions;
  textId?: string;

  /**
   * Border configuration to apply. Can be a border template name (string) or a
   * `RecursivePartial<BorderOptions>` object.
   * This will be applied via `QRCodeJs.setBorder()` or `QRCodeJs.setBorderId()`.
   */
  border?: string | RecursivePartial<BorderOptions>;
  borderId?: string;

  /**
   * A `RecursivePartial<Options>` object that will be deeply merged into
   * the QR code's main options. This allows for direct overrides of any specific
   * properties within the `Options` interface.
   */
  options?: RecursivePartial<Options>;
}
```

## Enums

These enums provide predefined values for certain properties, ensuring type safety.

```typescript
enum ShapeType {
  square = 'square',
  circle = 'circle'
}

enum Mode {
  numeric = 'numeric',
  alphanumeric = 'alphanumeric',
  byte = 'byte',
  kanji = 'kanji',
  unicode = 'unicode'
}

enum ErrorCorrectionLevel {
  L = 'L', // 7% error recovery
  M = 'M', // 15% error recovery
  Q = 'Q', // 25% error recovery
  H = 'H'  // 30% error recovery
}

enum DotType {
  dot = 'dot',
  square = 'square',
  rounded = 'rounded',
  extraRounded = 'extra-rounded',
  classy = 'classy',
  classyRounded = 'classy-rounded',
  verticalLine = 'vertical-line',
  horizontalLine = 'horizontal-line',
  randomDot = 'random-dot',
  smallSquare = 'small-square',
  tinySquare = 'tiny-square',
  star = 'star',
  plus = 'plus',
  diamond = 'diamond'
}

enum CornerSquareType {
  dot = 'dot',
  square = 'square',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}

enum CornerDotType {
  dot = 'dot',
  square = 'square',
  heart = 'heart',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}

enum ImageMode {
  center = 'center',
  overlay = 'overlay',
  background = 'background'
}
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
