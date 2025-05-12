# Feature FT009 - Settings Option Implementation Plan

This document outlines the plan to implement the `setSettings()` instance method and the `.settings()` builder method for the `QRCodeJs` class, as per Task ID FT009.

## I. Define `SettingsOptions` Type

1.  **Create/Update Type Definition File:**
    *   A new file, `src/types/settings-options.ts`, will be created.
    *   **Content:**
        ```typescript
        import { RecursivePartial } from './helper';
        import { Options, BorderOptions } from '../utils/options';
        import { StyleOptions } from './style-options';
        import { TextOptions } from './text-options';

        export interface SettingsOptions {
          id?: string;
          name?: string;
          description?: string;
          template?: string | RecursivePartial<Options>;
          templateId?: string;
          style?: string | StyleOptions;
          styleId?: string;
          text?: string | TextOptions;
          textId?: string;
          border?: string | RecursivePartial<BorderOptions>;
          borderId?: string;
          options?: RecursivePartial<Options>; // For direct overrides/merges into the main Options
        }
        ```
2.  **Export:** Ensure `SettingsOptions` is exported from this new file.
3.  **Import in `qr-code-js.ts`:** Add the necessary import for `SettingsOptions`.

## II. Implement Static `QRCodeJs.settings()` Method in `qr-code-js.ts`

1.  **Add Static Property:**
    ```typescript
    private static _selectedSettings: SettingsOptions | null = null;
    ```
2.  **Create Static `settings()` Method:**
    *   Define the public static method:
        ```typescript
        public static settings(settings: SettingsOptions | null): typeof QRCodeJs {
          // 1. Reset all existing static configurations to ensure "replace" behavior
          QRCodeJs._selectedTemplate = null;
          QRCodeJs._selectedBorder = null;
          QRCodeJs._selectedStyle = null;
          QRCodeJs._selectedImage = null;
          QRCodeJs._selectedImageOverride = false;
          QRCodeJs._selectedText = null;
          QRCodeJs._selectedTextOverride = false;
          // Potentially other static states if any are missed here.

          if (settings === null) {
            QRCodeJs._selectedSettings = null;
            return QRCodeJs;
          }

          QRCodeJs._selectedSettings = settings;

          // 2. Apply individual configurations from the 'settings' object
          if (settings.templateId) {
            QRCodeJs.setTemplateId(settings.templateId);
          } else if (settings.template) {
            QRCodeJs.setTemplate(settings.template);
          }

          if (settings.styleId) {
            QRCodeJs.setStyleId(settings.styleId);
          } else if (settings.style) {
            QRCodeJs.setStyle(settings.style);
          }

          if (settings.textId) {
            QRCodeJs.setTextId(settings.textId);
          } else if (settings.text) {
            QRCodeJs.setText(settings.text);
          }

          if (settings.borderId) {
            QRCodeJs.setBorderId(settings.borderId);
          } else if (settings.border) {
            QRCodeJs.setBorder(settings.border);
          }
          
          return QRCodeJs;
        }
        ```

## III. Modify `QRCodeJs` Constructor in `qr-code-js.ts`

*   The constructor's option merging logic needs to account for `_selectedSettings`.
*   **Revised Constructor Logic (Conceptual):**
    1.  Initialize `baseOptions`.
    2.  Initialize `staticSettingsOptions = {}`.
    3.  **If `QRCodeJs._selectedSettings` exists:**
        *   If `QRCodeJs._selectedSettings.options` exists, `staticSettingsOptions` is merged with `QRCodeJs._selectedSettings.options`.
        *   The presence of `_selectedSettings` implies that `_selectedTemplate`, `_selectedStyle`, etc., would have already been set by the `QRCodeJs.settings()` static method. The existing constructor logic that processes these will pick up the values derived from `_selectedSettings`.
    4.  The merging order would be: `baseQRTemplateOptions`, then `staticSettingsOptions` (from `_selectedSettings.options`), then options from `_selectedTemplate`, `_selectedBorder`, `_selectedText`, `_selectedStyle`, `_selectedImage` (if any), and finally `rawOptions` passed to the constructor.
    5.  `mergeDeep` will handle the combination.
    6.  Proceed with validation and sanitization.

## IV. Implement Instance `setSettings()` Method in `qr-code-js.ts`

1.  **Create Instance `setSettings()` Method:**
    ```typescript
    public async setSettings(settings: SettingsOptions): Promise<void> {
      let newOptions: RecursivePartial<Options> = { ...baseQRTemplateOptions }; // Start fresh for "replace"

      // 1. Apply template
      if (settings.templateId) {
        const foundTemplate = findTemplateById(settings.templateId);
        if (foundTemplate) newOptions = mergeDeep(newOptions, foundTemplate.options);
      } else if (settings.template) {
        if (typeof settings.template === 'string') {
          const foundTemplate = findTemplateByName(settings.template);
          if (foundTemplate) newOptions = mergeDeep(newOptions, foundTemplate.options);
        } else {
          newOptions = mergeDeep(newOptions, settings.template);
        }
      }

      // 2. Apply style
      if (settings.styleId) {
        const foundStyleDef = findStyleById(settings.styleId);
        if (foundStyleDef) newOptions = mergeDeep(newOptions, mapStyleToOptions(foundStyleDef.style));
      } else if (settings.style) {
        if (typeof settings.style === 'string') {
          const foundStyleDef = findStyleByName(settings.style);
          if (foundStyleDef) newOptions = mergeDeep(newOptions, mapStyleToOptions(foundStyleDef.style));
        } else {
          const { isValid, errors } = validateStyleOptions(settings.style);
          if (isValid) {
            newOptions = mergeDeep(newOptions, mapStyleToOptions(settings.style));
          } else {
            console.warn('Invalid style options in setSettings:', errors);
          }
        }
      }

      // 3. Apply text
      let textOptionsToApply: RecursivePartial<Options> = {};
      let textOpts: TextOptions | null = null;
      if (settings.textId) {
        const foundTextTemplate = findTextTemplateById(settings.textId);
        if (foundTextTemplate) textOpts = foundTextTemplate.options;
      } else if (settings.text) {
        if (typeof settings.text === 'string') {
          const foundTextTemplate = findTextByName(settings.text);
          if (foundTextTemplate) textOpts = foundTextTemplate.options;
        } else {
          textOpts = settings.text;
        }
      }
      if (textOpts) {
        // Logic to map textOpts to borderOptions.decorations (similar to constructor)
        if (!textOptionsToApply.borderOptions) textOptionsToApply.borderOptions = {};
        if (!textOptionsToApply.borderOptions.decorations) textOptionsToApply.borderOptions.decorations = {};
        const decorations = textOptionsToApply.borderOptions.decorations;
        // ... (full mapping logic for value, topValue, leftValue, etc.)
        newOptions = mergeDeep(newOptions, textOptionsToApply);
      }

      // 4. Apply border
      if (settings.borderId) {
        const foundBorder = findBorderById(settings.borderId);
        if (foundBorder) newOptions = mergeDeep(newOptions, foundBorder.options);
      } else if (settings.border) {
        if (typeof settings.border === 'string') {
          const foundBorder = findBorderByName(settings.border);
          if (foundBorder) newOptions = mergeDeep(newOptions, foundBorder.options);
        } else { // It's RecursivePartial<BorderOptions>
          newOptions = mergeDeep(newOptions, { borderOptions: settings.border });
        }
      }

      // 5. Apply direct options override
      if (settings.options) {
        newOptions = mergeDeep(newOptions, settings.options);
      }

      // 6. Validate and sanitize the completely new options
      const { warnings, validatedOptions } = validateQROptions(newOptions);
      if (warnings.length > 0) {
        this._logValidationWarnings('QR Code setSettings Validation Warnings:', warnings);
      }
      
      this.options = sanitizeOptions(validatedOptions as Options); // Replace current options

      // 7. Update the QR code
      await this.update();
    }
    ```

## V. Documentation and Tests

1.  **Documentation:**
    *   Add `SettingsOptions` to `docs/typescript-types-definitions.md`.
    *   Document `QRCodeJs.settings()` and `instance.setSettings()` in `docs/api-reference-guide.md` and `docs/usage-guide.md`.
    *   Clearly explain the "replace" behavior for both methods.
    *   Provide usage examples.
2.  **Unit Tests:**
    *   Add comprehensive tests for static `settings()`, instance `setSettings()`, their "replace" behavior, and interactions.

## Mermaid Diagram

```mermaid
graph TD
    subgraph Initialization
        A[Define SettingsOptions Interface in src/types/settings-options.ts]
    end

    subgraph Static/Builder Method
        B[Add static _selectedSettings to QRCodeJs]
        C[Implement static QRCodeJs.settings(settings)]
        C --> C1{settings === null?}
        C1 -- Yes --> C2[Reset _selectedSettings AND all other static config (_template, _style, etc.)]
        C1 -- No --> C3[Reset all other static config (_template, _style, etc.)]
        C3 --> C4[Store in _selectedSettings]
        C4 --> C5[Apply settings.template/Id via QRCodeJs.setTemplate/Id]
        C5 --> C6[Apply settings.style/Id via QRCodeJs.setStyle/Id]
        C6 --> C7[Apply settings.text/Id via QRCodeJs.setText/Id]
        C7 --> C8[Apply settings.border/Id via QRCodeJs.setBorder/Id]
    end

    subgraph Constructor Modification
        D[Modify QRCodeJs Constructor]
        D --> D1[If _selectedSettings exists, its .options form part of the base]
        D --> D2[Existing logic for _selectedTemplate, _selectedStyle, etc. then applies (values may come from _selectedSettings)]
    end

    subgraph Instance Method
        E[Implement instance.setSettings(settings)]
        E --> E1[Start with newOptions = baseQRTemplateOptions]
        E1 --> E2[Apply settings.template/Id to newOptions (mergeDeep)]
        E2 --> E3[Apply settings.style/Id to newOptions (map & mergeDeep)]
        E3 --> E4[Apply settings.text/Id to newOptions (convert & mergeDeep)]
        E4 --> E5[Apply settings.border/Id to newOptions (mergeDeep)]
        E5 --> E6[Apply settings.options to newOptions (mergeDeep)]
        E6 --> E7[Validate and Sanitize newOptions]
        E7 --> E8[this.options = sanitizedNewOptions (REPLACE)]
        E8 --> E9[Call this.update()]
    end

    subgraph Documentation & Testing
        F[Update Documentation (Type, Static Method, Instance Method)]
        G[Add Unit Tests (Static, Instance, Interactions, Replace Behavior)]
    end

    A --> C
    A --> E
    C8 --> D1
    E9 --> G
    F --> G