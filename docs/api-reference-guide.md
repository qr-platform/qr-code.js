## API Reference Guide for QRCode.js Library
<a id="start"></a>

### Basic Usage

```typescript
import { QRCodeJs, Options } from '@qr-platform/qr-code.js';

// Create a basic QR code
const qrCode = new QRCodeJs({
  data: 'https://example.com',
} as Options);

// Render the QR code to a container
qrCode.append(document.getElementById('qr-container'));
```

### QRCode.js Options Table

| Option                 | Type                                   | Default        | Description                                                                 |
| :--------------------- | :------------------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `data`                 | `string`                               | -              | Specifies the text, URL, or other data to encode into the QR code. **Required option**  | 
| `shape`                | `'square' \| 'circle'`                 | `'square'`     | The overall shape of the QR code's boundary. See [ShapeType](#enums-shapetype) enum.
| `margin`               | `number`                               | `0`            | The quiet zone (empty space) around the QR code in pixels.                  |
| `isResponsive`         | `boolean`                              | `false`        | When `true`, the QR code SVG resizes dynamically to fill the width or height of the parent container, with no internal size dimensions applied. |
| `scale`                | `number` (0 to 1.5)                    | `1`            | Scales the QR code size relative to its container or border.                |
| `offset`               | `number`                               | `0`            | Applies a vertical offset (positive moves down, negative moves up) relative to the center. |
| `verticalOffset`       | `number`                               | `0`            | Applies an absolute vertical offset in pixels.                              |
| `horizontalOffset`     | `number`                               | `0`            | Applies an absolute horizontal offset in pixels.                            |
| `qrOptions`            | `object`                               | `{...}`        | Options related to the underlying QR code generation algorithm.             |
| `qrOptions.typeNumber` | `number` (0-40)                        | `0`            | Specifies the QR code version (size/capacity). `0` means automatic detection. |
| `qrOptions.mode`       | `Mode` enum                            | Auto-detected  | The encoding mode (e.g., `Byte`, `Numeric`, `Kanji`). Usually auto-detected. |
| `qrOptions.errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'Q'`          | The error correction level, determining redundancy. See [ErrorCorrectionLevel](#enums-errorcorrectionlevel) enum.
| `dotsOptions`          | `object`                               | `{...}`        | Options for styling the dots in the QR code.                                |
| `dotsOptions.type`     | `DotType` enum                         | `'square'`     | The shape of the dots. See [DotType](#enums-dottype) enum.
| `dotsOptions.color`    | `string`                               | `'#000000'`    | The color of the dots. Accepts any valid CSS color string (e.g., `'#FF0000'`, `'red'`, `'rgba(255, 0, 0, 0.5)'`).
| `dotsOptions.size`     | `number`                               | `10`           | The size of the dots in pixels.                                             |
| `dotsOptions.gradient` | `Gradient` object                      | `undefined`    | Apply a gradient fill to the dots. See [`Gradient options`](#gradientoptions) for configuration details.
| `type`      | `'linear' \| 'radial'`                 | -       | Specifies the type of gradient: 'linear' for a linear gradient or 'radial' for a radial gradient. |
| `rotation`  | `number`                               | -       | The rotation angle in radians for the gradient. Only applicable when `type` is 'linear'. |
| `colorStops`| `Array<{ offset: number, color: string }>` | -   | An array of color stops that define the gradient. Each stop must have an `offset` (a number between 0 and 1) and a `color` (a valid CSS color string). At least two color stops are recommended to create a visible gradient.
| `cornersSquareOptions` | `object`                               | `{...}`        | Options for styling the corner squares. Overrides `dotsOptions`.            |
| `cornersSquareOptions.type` | `CornerSquareType` enum           | Inherits       | The shape of the corner squares. See [CornerSquareType](#enums-cornersquaretype) enum for options (e.g., square, rounded).
| `cornersSquareOptions.color` | `string`                         | Inherits       | The color of the corner squares.                                            |
| `cornersSquareOptions.gradient` | `Gradient` object             | `undefined`    | Apply a gradient fill to the corner squares.                                |
| `cornersDotOptions`    | `object`                               | `{...}`        | Options for styling the corner dots. Overrides `cornersSquareOptions`.      |
| `backgroundOptions`    | `object \| false`                      | `{...}`        | Options for styling the background. Set to `false` to disable.              |
| `backgroundOptions.color` | `string`                            | `'#FFFFFF'`    | The background color.                                                       |
| `backgroundOptions.round` | `number \| string`                  | `0`            | Rounds the corners of the background (0-1 or percentage).                   |
| `backgroundOptions.gradient` | `Gradient` object                | `undefined`    | Apply a gradient fill to the background. See [Gradient options](#gradientoptions) for configuration details.
| `image`                | `string \| Buffer \| Blob`             | `undefined`    | URL, Buffer, or Blob of an image to embed in the QR code. Can be set globally via `QRCodeJs.setImage()` or per-instance via `QRCodeJs.useImage()` or direct options. |
| `imageOptions`         | `object`                               | `{...}`        | Options for the embedded image.                                             |
| `imageOptions.mode`    | `ImageMode` enum                       | `'center'`     | How the image is embedded. See `ImageMode` enum.                            |
| `imageOptions.imageSize` | `number`                             | `0.4`          | Relative size of the image (0-1).                                           |
| `imageOptions.margin`  | `number`                               | `0`            | Margin around the image in dot units.                                       |
| `imageOptions.crossOrigin` | `string`                           | `undefined`    | CORS setting for the image.                                                 |
| `imageOptions.fill`    | `object`                               | `{...}`           | Fill `color` or `gradient`.                               |
| `imageOptions.fill.color` | `string`                            | `'rgba(255,255,255,1)'`    | Fill color.
| `imageOptions.fill.gradient` | `Gradient` object | `undefined`    | Apply a gradient fill to the QR code. See [Gradient options](#gradientoptions) for configuration details.
| `borderOptions`        | `BorderOptions` object                 | `undefined`    | Options for adding decorative borders. Can be configured globally via `QRCodeJs.setBorder()`/`setBorderId()` or per-instance via the builder pattern (`useBorder()`/`useBorderId()`). See below for sub-options. **Premium option** |

---

<a id="gradientoptions"></a>
### Gradient options
**Note**: If both `color` and `gradient` are specified, the `gradient` property takes precedence, allowing you to create dynamic linear or radial gradient effects.


| Option                   | Type                | Default    | Description                                                                 |
|--------------------------|---------------------|------------|-----------------------------------------------------------------------------|
| `cornersDotOptions.type` | `CornerDotType` enum| `Inherits` | Specifies the shape of the corner dots. Refer to the `CornerDotType` enum for available options (e.g., square, rounded). |
| `cornersDotOptions.color`| `string`            | `Inherits` | Defines the solid color of the corner dots. Accepts any valid CSS color string (e.g., `'#FF0000'`, `'red'`, `'rgba(255, 0, 0, 0.5)'`). |
| `cornersDotOptions.gradient` | `Gradient` object | `undefined`| Applies a gradient fill to the corner dots, overriding the `color` property if both are set. See [Gradient Sub-options](#gradient-sub-options) for configuration details. |
  
### Additional Notes
- The `data` option is the only required option for generating a QR code.
- Premium features like `borderOptions` and `validateScanning` require a valid license to use.

---

### QRCode.js Methods Table

| Method              | Parameters                                                                 | Description                                                                 |
| :------------------ | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `append`            | `container: HTMLElement, options?: { clearContainer?: boolean }`                                                   | Appends the QR code to a container element. Returns `QRCodeJs \| undefined`. |
| `serialize`         | `inverted?: boolean`                                                       | Converts the QR code to an SVG string. Returns `Promise<string \| undefined>`. |
| `download`          | `downloadOptions?: { name?: string; extension: 'svg' \| 'png' \| 'jpeg' \| 'webp' }, canvasOptions?: CanvasOptions` | Downloads the QR code as a file. Returns `Promise<void>`.                   |
| `update`            | `options?: RecursivePartial<Options>`                                      | Updates the QR code with new options. Returns `void`.                       |
| `setTemplate`       | `templateNameOrOptions: string \| RecursivePartial<Options>` | Sets a global default template (by name or options object) for subsequent instances. Returns `void`. |
| `setTemplateId`     | `templateId: string`                                                       | Sets a global default template by its ID. Returns `void`. |
| `setStyle`          | `styleNameOrOptions: string \| StyleOptions`                               | Sets a global default style (by name or options object) for subsequent instances. Returns `void`. |
| `setStyleId`        | `styleId: string`                                                          | Sets a global default style by its ID. Returns `void`. |
| `setText`           | `textNameOrOptions: string \| TextOptions \| null, overrideOpts?: MethodOverrideOptions` | Sets a global default text configuration for border text. With `{ override: true }`, the text will take precedence over any instance-specific border text. Returns `void`. |
| `setTextId`         | `textId: string \| null, overrideOpts?: MethodOverrideOptions`                 | Sets a global default text configuration by its ID. With `{ override: true }`, the text will take precedence over any instance-specific border text. Returns `void`. |
| `setBorder`         | `borderNameOrOptions: string \| RecursivePartial<BorderOptions>`           | Sets a global default border configuration (by name or options object) for subsequent instances. Returns `void`. |
| `setBorderId`       | `borderId: string`                                                         | Sets a global default border configuration by its ID. Returns `void`. |
| `setImage`          | `imageUrl: string \| DataURL \| null, overrideOpts?: MethodOverrideOptions`    | Sets a global default image URL for subsequent instances. With `{ override: true }`, the image will take precedence over any instance-specific images. Returns `typeof QRCodeJs`. |
| `setData`           | `data: string \| null, overrideOpts?: MethodOverrideOptions`                   | **(Static)** Sets a global default data string for subsequent `QRCodeJs` instances. If `overrideOpts.override` is `true`, this data will take precedence over data set by other means (e.g., in constructor options or through `useData` without override). Returns `typeof QRCodeJs`. |
| `setOptions`        | `options: RecursivePartial<Options> \| null, overrideOpts?: MethodOverrideOptions` | **(Static)** Sets global default options for subsequent `QRCodeJs` instances. These are merged deeply with other defaults and instance-specific options. If `overrideOpts.override` is `true`, these options take higher precedence over options set by other means for the properties they cover. Returns `typeof QRCodeJs`. |
| `setSettings`       | `settings: SettingsOptions \| null`                                        | **(Static)** Sets multiple global defaults at once using a comprehensive `SettingsOptions` object. This acts as a macro, internally calling other static setters (like `setTemplate`, `setStyle`, `setData`, `setImage`, `setOptions`, etc.) based on the properties provided in the `settings` object. It will override/reset any previously set static configurations for the aspects it covers. Passing `null` clears all static configurations. Returns `typeof QRCodeJs`. |
| `useTemplate`       | `templateNameOrOptions: string \| RecursivePartial<Options>`             | Initiates a builder pattern pre-configured with a template (by name or options object). Returns `QRCodeBuilder`. |
| `useTemplateId`     | `templateId: string`                                                       | Initiates a builder pattern pre-configured with a template by its ID. Returns `QRCodeBuilder`. |
| `useStyle`          | `styleNameOrOptions: string \| StyleOptions`                               | Initiates a builder pattern pre-configured with a style (by name or options object). Returns `QRCodeBuilder`. |
| `useStyleId`        | `styleId: string`                                                          | Initiates a builder pattern pre-configured with a style by its ID. Returns `QRCodeBuilder`. |
| `useText`           | `textNameOrOptions: string \| TextOptions, overrideOpts?: MethodOverrideOptions` | Initiates a builder pattern pre-configured with text for border sides. With `{ override: true }`, the text will take precedence over any text set in final options. Returns `QRCodeBuilder`. |
| `useTextId`         | `textId: string, overrideOpts?: MethodOverrideOptions`                         | Initiates a builder pattern pre-configured with text by its ID. With `{ override: true }`, the text will take precedence over any text set in final options. Returns `QRCodeBuilder`. |
| `useBorder`         | `borderNameOrOptions: string \| BorderOptions`                             | Initiates a builder pattern pre-configured with a border configuration (by name or options object). Returns `QRCodeBuilder`. |
| `useBorderId`       | `borderId: string`                                                         | Initiates a builder pattern pre-configured with a border configuration by its ID. Returns `QRCodeBuilder`. |
| `useImage`          | `imageUrl: string \| DataURL, overrideOpts?: MethodOverrideOptions`            | Initiates a builder pattern pre-configured with an image URL. If `overrideOpts.override` is `true`, this image will take precedence over any image set in the final `.options()` call or by other non-overriding builder methods. Returns `QRCodeBuilder`. |
| `useData`           | `data: string, overrideOpts?: MethodOverrideOptions`                           | Applies a data string to the current builder configuration. If `overrideOpts.override` is `true`, this data will take precedence over data provided in the final `.options()` call or by other non-overriding builder methods. Returns `QRCodeBuilder`. |
| `useOptions`        | `options: RecursivePartial<Options>, overrideOpts?: MethodOverrideOptions`     | Applies a partial options object to the current builder configuration. If `overrideOpts.override` is `true`, these options take higher precedence over options provided in the final `.options()` call or by other non-overriding builder methods for the properties they cover. Returns `QRCodeBuilder`. |
| `useSettings`       | `settings: SettingsOptions` | Applies a comprehensive `SettingsOptions` object as a new baseline for the builder chain. This will **reset** any configurations previously applied to *that builder instance* via methods like `useTemplate()`, `useStyle()`, `useData()`, `useOptions()`, etc. Subsequent builder methods will modify this new baseline. Returns `QRCodeBuilder`. |
| `useId`             | `id: string` | Assigns an identifier to the QR code instance within the builder chain. Returns `QRCodeBuilder`. |
| `useName`           | `name: string` | Assigns a name to the QR code instance within the builder chain. Returns `QRCodeBuilder`. |
| `useDescription`    | `description: string` | Assigns a description to the QR code instance within the builder chain. Returns `QRCodeBuilder`. |
| `useMetadata`       | `metadata: Record<string, any>` | Attaches custom metadata to the QR code instance within the builder chain. Returns `QRCodeBuilder`. |
| `validateScanning`  | `validatorId?: string, debug?: boolean` | **(Premium method)** Validates that the QR code is scannable. Returns `Promise<ScanValidatorResponse>`. |
| `getTemplates`      |  | Returns helper functions for looking up predefined templates, styles, text, and borders. |
| `initializeIfNeeded` |  | Initializes the license manager if needed (usually called automatically by `.license()`). Returns `Promise<boolean>`. |
| `getLicenseDetails` |  | Returns decoded license information if a license is active. |
| `license`           | `licenseKey: string` | Activates a license using a license key. Returns `Promise<ValidationResult>`. |
| `token`             | `token: string | null` | Activates a license using a pre-fetched token. Returns `Promise<ValidationResult>`. |
| `configureLicenseFetcher` | `fetcher: (licenseKey: string) => Promise<string>` | Sets a custom function for fetching license tokens. |
| `setLicenseUrl`     | `url: string` | Sets the URL endpoint for license validation. Returns `typeof QRCodeJs`. |
| `validateImageData` | `imageData: ImageDataLike` | **(Node.js)** Validate scannability from raw image data. Returns `Promise<ScanValidatorResponse>`. |

---

<a id="borderoptions"></a>
### borderOptions Options 

The `borderOptions` object is a premium feature that allows you to add decorative borders around the QR code. This options can be used to customize the borders, including the color, thickness, text and corner rounding. If used without a license, the library will automatically add "QR-Platform" branding text in the bottom border.

| Sub-option            | Type                                   | Default        | Description                                                                 |
| :-------------------- | :------------------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `hasBorder`           | `boolean`                              | `false`        | Master switch to enable/disable borders.                                    |
| `thickness`           | `number`                               | `50`           | Thickness of the main border in pixels.                                     |
| `color`               | `string`                               | `'#000000'`    | Color of the main border.                                                   |
| `radius`              | `string`                               | `'0%'`         | Corner rounding of the border (e.g., `'10%'`, `'20px'`).                    |
| `noBorderThickness`   | `number`                               | `thickness / 4`| Thickness for border sides with disabled decorations.                       |
| `background`          | `string`                               | `undefined`    | Background color for the border area.                                       |
| `inner`               | `object`                               | `{}`           | Options for scaling/offsetting the inner content area.                      |
| `inner.radius`        | `string`                               | `'0%'`         | Corner rounding of the inner border.                                        |
| `inner.scale`         | `number` (0 to 1.5)                    | `1`            | Scale factor for the inner content.                                         |
| `inner.horizontalOffset` | `number`                            | `0`            | Horizontal offset of the inner content.                                     |
| `inner.verticalOffset` | `number`                            | `0`            | Vertical offset of the inner content.                                       |
| `borderOuter`         | `object`                               | `{}`           | Options for an additional outer border.                                     |
| `borderOuter.color`   | `string`                               | `'#000000'`    | Color of the outer border.                                                  |
| `borderOuter.thickness` | `number`                             | `10`           | Thickness of the outer border.                                              |
| `borderInner`         | `object`                               | `{}`           | Options for an additional inner border.                                     |
| `borderInner.color`   | `string`                               | `'#000000'`    | Color of the inner border.                                                  |
| `borderInner.thickness` | `number`                             | `5`            | Thickness of the inner border.                                              |
| `decorations`         | `object`                               | `{}`           | Add text or images to specific sides of the border.                         |
| `decorations.top`     | `DecorationOptions` object             | `{}`           | Decoration options for the top side. See [DecorationOptions](#decorationoptions) for details.
| `decorations.right`   | `DecorationOptions` object             | `{}`           | Decoration options for the right side. See [DecorationOptions](#decorationoptions) for details.                                      |
| `decorations.bottom`  | `DecorationOptions` object             | `{}`           | Decoration options for the bottom side. See [DecorationOptions](#decorationoptions) for details.                                     |
| `decorations.left`    | `DecorationOptions` object             | `{}`           | Decoration options for the left side. See [DecorationOptions](#decorationoptions) for details.                                       | 

**Note**: Each `DecorationOptions` object can include properties such as `disabled`, `enableText`, `offset`, `curveAdjustment`, `curveDisabled`, `curveRadius`, `type` (`'text'` or `'image'`), `value`, and `style` for text styling.

<a id="decorationoptions"></a>
### DecorationOptions Options

| Option             | Type                                   | Default        | Description                                                                 |
|--------------------|----------------------------------------|----------------|-----------------------------------------------------------------------------|
| `disabled`         | `boolean`                              | `false`        | Whether the decoration for this side is disabled.                           |
| `enableText`       | `boolean`                              | `false`        | Whether to enable text on this side of the border.                          |
| `offset`           | `number`                               | `0`            | Positioning offset for the decoration.                                      |
| `curveAdjustment`  | `number`                               | `0`            | Adjustment for the text curve.                                              |
| `curveDisabled`    | `boolean`                              | `false`        | Whether to disable curved text.                                             |
| `curveRadius`      | `string`                               | `'50%'`        | Radius of the text curve (e.g., `'50%'`, `'100px'`).                        |
| `type`             | `'text' \| 'image'`                    | `'text'`       | The type of decoration to use (`'text'` or `'image'`).                      |
| `value`            | `string`                               | `''`           | The text content or image URL for the decoration.                           |
| `style`            | `object`                               | `{}`           | Style options for text decorations.                                         |
| `style.fontFace`   | `string`                               | `'Helvetica'`  | The font face for the text.                                                 |
| `style.fontSize`   | `number`                               | `28`           | The font size for the text in pixels.                                       |
| `style.fontColor`  | `string`                               | `'#ffffff'`    | The color of the text.                                                      |
| `style.letterSpacing` | `number`                            | `0`            | The letter spacing for the text in pixels.                                  |
| `style.textTransform` | `'uppercase' \| 'lowercase' \| 'capitalize'` | `uppercase` | The text transformation style.                                             |
| `style.fontWeight` | `'normal' \| 'bold'`                   | `'bold'`     | The font weight for the text.                                               |

### Enums

These enums provide predefined values for certain properties, ensuring type safety.

<a id="enums-shapetype"></a>
##### ShapeType

```typescript
enum ShapeType {
  square = 'square',
  circle = 'circle'
}
```

<a id="enums-mode"></a>
##### Mode

```typescript
enum Mode {
  numeric = 'numeric',
  alphanumeric = 'alphanumeric',
  byte = 'byte',
  kanji = 'kanji',
  unicode = 'unicode'
}
```

<a id="enums-errorcorrectionlevel"></a>
##### ErrorCorrectionLevel

```typescript
enum ErrorCorrectionLevel {
  L = 'L', // 7% error recovery
  M = 'M', // 15% error recovery
  Q = 'Q', // 25% error recovery
  H = 'H'  // 30% error recovery
}
```

<a id="enums-dottype"></a>
##### DotType

```typescript
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
```

<a id="enums-cornersquaretype"></a>
##### CornerSquareType

```typescript
enum CornerSquareType {
  dot = 'dot',
  square = 'square',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}
```

<a id="enums-cornerdottype"></a>
##### CornerDotType

```typescript
enum CornerDotType {
  dot = 'dot',
  square = 'square',
  heart = 'heart',
  rounded = 'rounded',
  classy = 'classy',
  outpoint = 'outpoint',
  inpoint = 'inpoint'
}
```

<a id="enums-imagemode"></a>
##### ImageMode

```typescript
enum ImageMode {
  center = 'center',
  overlay = 'overlay',
  background = 'background'
}
```

---



---

### QRCodeBuilder Class

The `QRCodeBuilder` provides a fluent interface for configuring and creating `QRCodeJs` instances, often starting with a template or style.

**Usage:**

```typescript
// Start with a template
const qr1 = QRCodeJs.useTemplate('rounded')
  .options({ data: 'Data for rounded template' })
  .build();

// Start with a style
const qr2 = QRCodeJs.useStyle({ dotsOptions: { type: 'dots', color: 'blue' } })
  .options({ data: 'Data for blue dots style' })
  .build();

// Chain template and style
const qr3 = QRCodeJs.useTemplate('basic')
  .useStyle({ backgroundOptions: { color: '#eee' } })
  .options({ data: 'Data with template and style' })
  .build();
```

| Method        | Parameters                                                                 | Description                                                                                                |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `useTemplate` | `templateNameOrOptions: string \| RecursivePartial<Options>`             | Applies a template's options to the current configuration. Options from subsequent calls take precedence. Returns `this`. |
| `useStyle`    | `styleNameOrOptions: string \| StyleOptions`                               | Applies style options (mapping them to `Options`) to the current configuration. Returns `this`.            |
| `useText`     | `textNameOrOptions: string \| TextOptions, overrideOpts?: MethodOverrideOptions` | Applies text configuration for border sides. With `{ override: true}`, text will take precedence over any text set in final options. Returns `this`. |
| `useTextId`   | `textId: string, overrideOpts?: MethodOverrideOptions`                         | Applies text configuration by its ID. With `{ override: true}`, text will take precedence over any text set in final options. Returns `this`. |
| `useBorder`   | `borderNameOrOptions: string \| BorderOptions`                             | Applies border configuration (by name or options object) to the current configuration. Returns `this`.     |
| `useBorderId` | `borderId: string`                                                         | Applies border configuration by its ID to the current configuration. Returns `this`.                       |
| `useImage`    | `imageUrl: string, overrideOpts?: MethodOverrideOptions`                       | Sets the image URL for the current configuration. If `overrideOpts.override` is `true`, this image will take precedence over any image set in the final `.options()` call. Returns `this`. |
| `useData`     | `data: string, overrideOpts?: MethodOverrideOptions`                           | Applies a data string to the current builder configuration. If `overrideOpts.override` is `true`, this data will take precedence over data provided in the final `.options()` call. Returns `this`. |
| `useOptions`  | `options: RecursivePartial<Options>, overrideOpts?: MethodOverrideOptions`     | Applies a partial options object to the current builder configuration. If `overrideOpts.override` is `true`, these options take higher precedence over options provided in the final `.options()` call for the properties they cover. Returns `this`. |
| `useSettings` | `settings: SettingsOptions`                                                | Applies a comprehensive `SettingsOptions` object as a new baseline for the builder chain. This will **reset** any configurations previously applied to *that builder instance* via other `use` methods. Subsequent builder methods modify this new baseline. Returns `this`. |
| `options`     | `options: RecursivePartial<Options>`                                       | Merges the provided `Options` into the current configuration and creates and returns the final `QRCodeJs` instance.    |
| `build`       | -                                                                          | Creates and returns the final `QRCodeJs` instance based on the accumulated configuration.                  |
### See Also
- [QRCode.js Documentation](./documentation.md#start)
- [Quick References Guide](./quick-references-guide.md#start)
- [API Reference Guide](./api-reference-guide.md#start)
- [TypeScript Types and Definitions](./typescript-types-definitions.md#start)
- [License Management](./license-management.md#start)
- [Basic Examples](./examples.md#start)
- [Advanced Examples](./advanced-examples.md#start)
