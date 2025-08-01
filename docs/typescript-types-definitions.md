---
title: 'QRCode.js TypeScript Types'
description: 'Complete TypeScript type definitions for QRCode.js'
---

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

  /** 
   * QR code width in pixels or CSS units (e.g., '300px', '100%').
   * When isResponsive is false: This value overrides the auto-calculated width and sets the SVG width attribute.
   * When isResponsive is true: This value is ignored and the SVG uses 100% width.
   * If not specified, the library calculates the optimal width based on QR code size and options.
   */
  width?: number | string;

  /** 
   * QR code height in pixels or CSS units (e.g., '300px', '100%').
   * When isResponsive is false: This value overrides the auto-calculated height and sets the SVG height attribute.
   * When isResponsive is true: This value is ignored and the SVG uses 100% height.
   * If not specified, the library calculates the optimal height based on QR code size and options.
   */
  height?: number | string;

  /** The quiet zone (empty space) around the QR code in pixels. */
  margin: number;

  /** 
   * Controls whether the QR code SVG should be responsive to its container.
   * When true: SVG uses 100% width/height, ignoring any specified width/height values.
   * When false (default): SVG uses specified width/height values or auto-calculated dimensions.
   */
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

  /** Options for adding decorative borders. */
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

### BorderOptions

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
  /** Optional unique identifier for this settings configuration. */
  id?: string;

  /** Optional descriptive name for this settings configuration. */
  name?: string;

  /** Optional detailed description of this settings configuration. */
  description?: string;

  /**
   * The primary data to be encoded in the QR code (e.g., URL, text).
   * This will be applied as the main `data` option for the QR code.
   */
  data?: string;

  /**
   * Image to be embedded in the QR code. Can be a URL, DataURL, Buffer, or Blob.
   * This will be applied as the main `image` option for the QR code.
   */
  image?: string | DataURL | Buffer | Blob;

  /**
   * Specifies a template to apply. Can be a predefined template name (string) or a
   * custom `RecursivePartial<Options>` object.
   * When `QRCodeJs.setSettings()` is used, this influences the global template default (similar to `QRCodeJs.setTemplate()`).
   * When `QRCodeBuilder.useSettings()` is used, this forms part of the builder's baseline.
   */
  template?: string | RecursivePartial<Options>;
  /** Specifies a template by its ID to apply (similar to `QRCodeJs.setTemplateId()`). */
  templateId?: string;

  /**
   * Specifies a style to apply. Can be a predefined style name (string) or a `StyleOptions` object.
   * When `QRCodeJs.setSettings()` is used, this influences the global style default (similar to `QRCodeJs.setStyle()`).
   * When `QRCodeBuilder.useSettings()` is used, this forms part of the builder's baseline.
   */
  style?: string | StyleOptions;
  /** Specifies a style by its ID to apply (similar to `QRCodeJs.setStyleId()`). */
  styleId?: string;

  /**
   * Specifies text configuration for borders. Can be a predefined text template name (string) or a `TextOptions` object.
   * When `QRCodeJs.setSettings()` is used, this influences the global text default (similar to `QRCodeJs.setText()`).
   * When `QRCodeBuilder.useSettings()` is used, this forms part of the builder's baseline.
   */
  text?: string | TextOptions;
  /** Specifies a text configuration by its ID to apply (similar to `QRCodeJs.setTextId()`). */
  textId?: string;

  /**
   * Specifies border configuration. Can be a predefined border template name (string) or a
   * `RecursivePartial<BorderOptions>` object.
   * When `QRCodeJs.setSettings()` is used, this influences the global border default (similar to `QRCodeJs.setBorder()`).
   * When `QRCodeBuilder.useSettings()` is used, this forms part of the builder's baseline.
   */
  border?: string | RecursivePartial<BorderOptions>;
  /** Specifies a border configuration by its ID to apply (similar to `QRCodeJs.setBorderId()`). */
  borderId?: string;

  /**
   * A `RecursivePartial<Options>` object that will be deeply merged into
   * the QR code's final options, allowing for direct overrides of any specific
   * properties within the main `Options` interface.
   */
  options?: RecursivePartial<Options>;
}
```

### MethodOverrideOptions

Options for methods that support overriding behavior, typically used to ensure a specific setting takes precedence.

```typescript
/**
 * Options for methods that support overriding behavior.
 */
interface MethodOverrideOptions {
  /**
   * If true, the setting applied by the method using these options
   * will take precedence over other configurations for the same property,
   * potentially overriding values from templates, styles, or even subsequent
   * non-overriding option calls.
   */
  override?: boolean;
}
```

### QRCodeBuilder

Interface for the fluent builder pattern used by methods like `QRCodeJs.useTemplate()`, `QRCodeJs.useStyle()`, etc.

```typescript
interface QRCodeBuilder {
  /** Applies a template by name or options object. */
  useTemplate(templateNameOrOptions: string | RecursivePartial<Options>): this;
  
  /** Applies a template by its ID. */
  useTemplateId(templateId: string): this;
  
  /** Applies a style by name or options object. */
  useStyle(styleNameOrOptions: string | StyleOptions): this;
  
  /** Applies a style by its ID. */
  useStyleId(styleId: string): this;
  
  /** Applies border configuration by name or options object. */
  useBorder(borderNameOrOptions: string | RecursivePartial<BorderOptions>): this;
  
  /** Applies border configuration by its ID. */
  useBorderId(borderId: string): this;
  
  /** Sets text for border decorations. */
  useText(textNameOrOptions: string | TextOptions, overrideOpts?: MethodOverrideOptions): this;
  
  /** Sets text for border decorations by ID. */
  useTextId(textId: string, overrideOpts?: MethodOverrideOptions): this;
  
  /** Sets the image URL for the QR code. */
  useImage(imageUrl: string, overrideOpts?: MethodOverrideOptions): this;
  
  /** Sets the data string for the QR code. */
  useData(data: string, overrideOpts?: MethodOverrideOptions): this;
  
  /** Applies general options to the configuration. */
  useOptions(options: RecursivePartial<Options>, overrideOpts?: MethodOverrideOptions): this;
  
  /** Applies comprehensive settings, resetting previous builder configurations. */
  useSettings(settings: SettingsOptions): this;
  
  /** Assigns an identifier to the QR code instance. */
  useId(id: string): this;
  
  /** Assigns a name to the QR code instance. */
  useName(name: string): this;
  
  /** Assigns a description to the QR code instance. */
  useDescription(description: string): this;
  
  /** Attaches custom metadata to the QR code instance. */
  useMetadata(metadata: Record<string, any>): this;
  
  /** Merges options and creates the final QRCodeJs instance. */
  options(options: RecursivePartial<Options>): QRCodeJs;
  
  /** Creates the final QRCodeJs instance with accumulated configuration. */
  build(): QRCodeJs;
}
```

### ScanValidatorResponse

Response interface for QR code validation methods.

```typescript
interface ScanValidatorResponse {
  /** Whether the QR code is valid and scannable. */
  isValid: boolean;
  
  /** Decoded data from the QR code (if isValid is true). */
  data?: string;
  
  /** Error message (if isValid is false). */
  message?: string;
  
  /** The validator used for scanning (e.g., 'ZBAR', 'ZXING'). */
  validator?: 'ZBAR' | 'ZXING';
  
  /** Barcode format (e.g., 'QR-Code') if successfully decoded. */
  format?: string;
  
  /** Number of decoding attempts made. */
  attempts?: number;
  
  /** Whether an inverted image was needed for scanning. */
  isInverted?: boolean;
  
  /** Error code for failed validation (e.g., 'NO_BARCODE_DETECTED'). */
  errorCode?: string;
}
```

### QRInstanceMetadata

Interface for metadata that can be attached to QR code instances.

```typescript
interface QRInstanceMetadata {
  /** Unique identifier for the QR code instance. */
  id?: string;
  
  /** Human-readable name for the QR code. */
  name?: string;
  
  /** Description of the QR code's purpose or content. */
  description?: string;
  
  /** Custom metadata as key-value pairs. */
  metadata?: Record<string, any>;
}
```

### StyleOptions and TextOptions

Additional type definitions for style and text configurations.

```typescript
/** Style options for configuring QR code appearance. */
interface StyleOptions {
  /** Options for styling the dots. */
  dotsOptions?: DotsOptions;
  
  /** Options for styling corner squares. */
  cornersSquareOptions?: CornersSquareOptions;
  
  /** Options for styling corner dots. */
  cornersDotOptions?: CornersDotOptions;
  
  /** Options for styling the background. */
  backgroundOptions?: BackgroundOptions | false;
}

/** Text options for border decorations. */
interface TextOptions {
  /** Text for the top border. */
  topValue?: string;
  
  /** Text for the right border. */
  rightValue?: string;
  
  /** Text for the bottom border. */
  bottomValue?: string;
  
  /** Text for the left border. */
  leftValue?: string;
  
  /** Style configuration for the text. */
  style?: {
    fontFace?: string;
    fontSize?: number;
    fontColor?: string;
    letterSpacing?: number;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
    fontWeight?: 'normal' | 'bold';
  };
}
```

### Utility Types

Helper types used throughout the library.

```typescript
/** Makes all properties optional recursively. */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

/** Data URL string type. */
type DataURL = string;

/** Image data types supported by validation methods. */
type ImageDataLike = Buffer | Uint8Array | ArrayBuffer;
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
