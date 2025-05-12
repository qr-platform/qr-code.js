# Feature Task FT009 - Settings Option - Continuation Plan

## 1. Original Task Description (FT009)

**Feature:** Settings Option
**Task Description:** Add a mechanism to configure QR code instances using a comprehensive `SettingsOptions` object. This was initially planned as an instance method `setSettings()` and a static builder-style method `QRCodeJs.settings()`. The requirements evolved to include a `useSettings()` method for the `QRCodeBuilder` and to make the instance-level application a static utility method.

**Core Requirements:**
*   Provide a centralized way to configure multiple QR code properties: `id`, `name`, `description`, `data`, `image`, `template`, `templateId`, `style`, `styleId`, `text`, `textId`, `border`, `borderId`, and a general `options` override.
*   Ensure this new configuration method interacts correctly with existing setup methods, generally by overriding previous settings.

## 2. Current Implementation Status

### 2.1. Core Class Changes ([`src/core/qr-code-js.ts`](src/core/qr-code-js.ts))
*   **`SettingsOptions` Type:** Defined in [`src/types/settings-options.ts`](src/types/settings-options.ts). It includes:
    ```typescript
    export interface SettingsOptions {
      id?: string;
      name?: string;
      description?: string;
      data?: string;
      image?: string | Buffer | Blob;
      template?: string | RecursivePartial<Options>;
      templateId?: string;
      style?: string | StyleOptions;
      styleId?: string;
      text?: string | TextOptions;
      textId?: string;
      border?: string | RecursivePartial<BorderOptions>;
      borderId?: string;
      options?: RecursivePartial<Options>;
    }
    ```
*   **Static `setSettings` Method:**
    *   A `public static async setSettings(instance: QRCodeJs, settings: SettingsOptions): Promise<void>` method has been added to `QRCodeJs`.
    *   This method applies the provided `SettingsOptions` to a given `QRCodeJs` instance.
    *   It completely replaces the instance's current options by:
        1.  Starting with `baseQRTemplateOptions`.
        2.  Applying `template`, `style`, `text`, `border` from the `settings` object.
        3.  Setting `newOptions.image = settings.image` if `settings.image` is provided.
        4.  Setting `newOptions.data = settings.data` if `settings.data` is provided. If not, it attempts to use `settings.options.data`. If still not present, it retains `instance.options.data`.
        5.  Merging `settings.options` for any other direct overrides.
        6.  Validating and sanitizing the resulting options.
        7.  Calling `await instance.update()`.
*   **Removed Static Configuration:** The previously planned static `QRCodeJs.settings()` method (that would set static defaults like `_selectedSettings`) and related static properties (`_selectedSettings`, `_selectedData`) have been removed from `QRCodeJs` as per user feedback.

### 2.2. Documentation
*   [`docs/typescript-types-definitions.md`](docs/typescript-types-definitions.md): Updated with the `SettingsOptions` interface.
*   [`docs/api-reference-guide.md`](docs/api-reference-guide.md): Updated to reflect the new static `QRCodeJs.setSettings(instance, settings)` method and remove the old static `QRCodeJs.settings()` method.
*   [`docs/usage-guide.md`](docs/usage-guide.md): Updated with examples for the new static `QRCodeJs.setSettings(instance, settings)` method.

### 2.3. Unit Tests
*   [`tests/node/node.settings.test.ts`](tests/node/node.settings.test.ts): Initial tests for the static `setSettings(instance, settings)` method have been created and partially debugged. Import paths and type assertions have been refined.

## 3. Remaining Tasks

### 3.1. Implement `useSettings` in `QRCodeBuilder`
This is the primary remaining coding task. The `useSettings` method needs to be added to the `QRCodeBuilder` class in both:
*   [`src/index.ts`](src/index.ts) (for browser environment)
*   [`src/node.ts`](src/node.ts) (for Node.js environment)

**`QRCodeBuilder.useSettings(settings: SettingsOptions): this` Method Details:**
*   **Store Settings:**
    *   Add a new protected property to `QRCodeBuilder`: `protected _settingsSource: SettingsOptions | null = null;`
    *   The `useSettings` method will set `this._settingsSource = settings;`.
*   **Override Behavior:**
    *   Calling `useSettings` must reset/nullify all other builder-specific configuration sources to ensure it takes precedence over any prior `useTemplate()`, `useStyle()`, `useBorder()`, `useText()`, `useImage()` calls, and `_initialOptions`. This includes:
        *   `this._templateSource = null;`
        *   `this._isTemplateById = false;`
        *   `this._borderSource = null;`
        *   `this._isBorderById = false;`
        *   `this._styleSource = null;`
        *   `this._isStyleById = false;`
        *   `this._imageSource = null;`
        *   `this._imageOverride = false;`
        *   `this._textSource = null;`
        *   `this._isTextById = false;`
        *   `this._textOverride = false;`
        *   `this._initialOptions = null;`
*   **Modify `_resolveAndMergeConfig(finalOptions: RecursivePartial<Options> = {})` in `QRCodeBuilder`:**
    *   **Priority for `_settingsSource`:**
        1.  If `this._settingsSource` is set:
            *   Initialize `resolvedConfig = mergeDeep({}, baseQRTemplateOptions)`.
            *   Apply `template/templateId` from `this._settingsSource` to `resolvedConfig`.
            *   Apply `style/styleId` from `this._settingsSource` (mapping style options) to `resolvedConfig`.
            *   Apply `border/borderId` from `this._settingsSource` to `resolvedConfig`.
            *   Apply `text/textId` from `this._settingsSource` (mapping to `borderOptions.decorations`) to `resolvedConfig`.
            *   If `this._settingsSource.image` is defined, set `resolvedConfig.image = this._settingsSource.image;`.
            *   If `this._settingsSource.data` is defined, set `resolvedConfig.data = this._settingsSource.data;`.
            *   Merge `this._settingsSource.options` into `resolvedConfig`.
    *   **Else (no `_settingsSource`):**
        *   Follow the existing logic: apply `_initialOptions`, then `_templateSource`, `_borderSource`, `_styleSource`, `_imageSource` (non-override), `_textSource` (non-override).
    *   **Final Merge & Overrides:**
        *   Merge `finalOptions` (from a subsequent `.options()` call) into `resolvedConfig`. This allows `.options()` to override settings from `useSettings`.
        *   The existing `_imageOverride` and `_textOverride` logic should apply last. If `useImage(..., {override:true})` or `useText(..., {override:true})` is called *after* `useSettings()`, it effectively clears `_settingsSource` (because `useSettings` resets those specific sources) and these specific overrides would then apply as intended.

### 3.2. Unit Testing
*   Add comprehensive unit tests for `QRCodeBuilder.useSettings` in both [`tests/node/node.settings.test.ts`](tests/node/node.settings.test.ts) and potentially a new browser-specific test file if behavior differs or requires DOM.
*   Tests should cover:
    *   `useSettings` correctly applying all properties from `SettingsOptions`.
    *   `useSettings` overriding configurations from previous `useTemplate`, `useStyle`, `useBorder`, `useText`, `useImage` calls.
    *   A subsequent `.options()` call overriding configurations set by `useSettings`.
    *   `.build()` using the correct configuration when `useSettings` is involved.
    *   Interaction with `useImage(..., {override:true})` and `useText(..., {override:true})` when called after `useSettings`.

### 3.3. Documentation Updates
*   **[`docs/api-reference-guide.md`](docs/api-reference-guide.md):** Add `useSettings` to the `QRCodeBuilder` methods table.
*   **[`docs/usage-guide.md`](docs/usage-guide.md):** Add a new subsection explaining `QRCodeBuilder.useSettings` with clear examples, emphasizing its override behavior and interaction with `.options()`.

## 4. Files to be Modified for Remaining Tasks
*   [`src/index.ts`](src/index.ts) (for `QRCodeBuilder`)
*   [`src/node.ts`](src/node.ts) (for `QRCodeBuilder`)
*   [`tests/node/node.settings.test.ts`](tests/node/node.settings.test.ts) (and potentially new test files)
*   [`docs/api-reference-guide.md`](docs/api-reference-guide.md)
*   [`docs/usage-guide.md`](docs/usage-guide.md)

## 5. Key Considerations for `_resolveAndMergeConfig`
The logic for merging needs to be precise:
1.  If `_settingsSource` is present, it forms the new "base" by applying its constituent parts (template, style, border, text, image, data, options) sequentially on top of `baseQRTemplateOptions`.
2.  If `_settingsSource` is NOT present, the old logic of applying `_initialOptions`, `_templateSource`, etc., applies.
3.  `finalOptions` (from `.options()`) are merged *after* the above, allowing them to override anything set by `useSettings` or other builder methods.
4.  Specific `override: true` calls for `useImage` or `useText` should still function as the ultimate override for those specific properties if they are called *after* `useSettings` (which would have nulled out `_settingsSource` and re-activated `_imageSource`/`_textSource`).

This structured plan should allow for a smooth continuation of the task.