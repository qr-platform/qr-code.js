# Plan for Implementing Border Text Functionality

This document outlines the plan to implement `setText`, `useText`, `setTextId`, and `useTextId` functionality for managing text on QR code borders.

## Phase 1: Define Core Structures and Text Templates

1.  **Create `TextOptions` and `QRTextTemplateDefinition` Types:**
    *   Define these interfaces. A new file like `src/types/text-options.ts` or an existing relevant types file (e.g., `src/utils/options.ts` or `src/types/style-options.ts`) can be used.
    *   **`TextOptions` Interface:**
        ```typescript
        export interface TextOptions {
          topValue?: string | null;
          leftValue?: string | null;
          rightValue?: string | null;
          bottomValue?: string | null;
        }
        ```
    *   **`QRTextTemplateDefinition` Interface:** (similar to `QRTemplateDefinition`)
        ```typescript
        // Assuming TextOptions is in 'text-options.ts' or similar
        import { TextOptions } from './text-options'; // Adjust path as needed

        export interface QRTextTemplateDefinition {
          id: string;
          name: string;
          options: TextOptions;
        }
        ```

2.  **Create New Text Templates File: `src/core/templates/qr-template-text.ts`**
    *   This file will be analogous to `src/core/templates/qr-template-borders.ts`.
    *   It will import `QRTextTemplateDefinition` and `TextOptions`.
    *   Define at least 20 unique `QRTextTemplateDefinition` objects.
        *   Each template will have a unique `id` (e.g., `"scan-me-top"`, `"return-if-found-bottom-left"`).
        *   Each template will have a unique, descriptive `name` (e.g., `"Scan Me (Top Text)"`, `"Return If Found (Bottom & Left Text)"`).
        *   The `options` field will be a `TextOptions` object with various combinations of `topValue`, `leftValue`, `rightValue`, `bottomValue`.
        *   Include `null` values where appropriate to signify no text for a particular side.
        *   Focus on call-to-action phrases like "Scan Me", "Visit Website", "Follow Us", "Contact Info", "Scan to Pay", "Product Details", "Event Info", "Lost & Found", etc.
    *   Export an array `qrTextTemplates: QRTextTemplateDefinition[]`.
    *   Export helper functions `findTextByName(name: string): QRTextTemplateDefinition | undefined` and `findTextById(id: string): QRTextTemplateDefinition | undefined`.

## Phase 2: Implement Core Logic in `QRCodeJs` (`src/core/qr-code-js.ts`)

1.  **Add Static Properties for Selected Text:**
    *   `private static _selectedText: QRTextTemplateDefinition | TextOptions | null = null;`

2.  **Implement `setText` Static Method:**
    *   `public static setText(textNameOrOptions: string | TextOptions | null): typeof QRCodeJs`
    *   If `null`, set `_selectedText` to `null`.
    *   If `string`, use `findTextByName` from `qr-template-text.ts` to find the template. If found, store the `QRTextTemplateDefinition` in `_selectedText`. If not found, log a warning.
    *   If `object` (instance of `TextOptions`), store it directly in `_selectedText`.

3.  **Implement `setTextId` Static Method:**
    *   `public static setTextId(textId: string | null): typeof QRCodeJs`
    *   If `null`, set `_selectedText` to `null`.
    *   Use `findTextById` from `qr-template-text.ts`. If found, store the `QRTextTemplateDefinition` in `_selectedText`. If not found, log a warning.

4.  **Update Constructor and `update` Method Logic:**
    *   In the constructor and `update` method, after merging `borderOptions`, apply `_selectedText`.
    *   **Merging Logic:**
        *   Resolve `_selectedText` to a `TextOptions` object (either from `QRTextTemplateDefinition.options` or directly).
        *   Iterate through `topValue`, `leftValue`, `rightValue`, `bottomValue` of the resolved `TextOptions`.
        *   For each provided value (not `undefined`):
            *   Update `this.options.borderOptions.decorations.<side>.value`.
            *   Set `this.options.borderOptions.decorations.<side>.enableText = true`.
            *   If the value is `null`, set `this.options.borderOptions.decorations.<side>.value = null` and `this.options.borderOptions.decorations.<side>.enableText = false`.
        *   Ensure `this.options.borderOptions.decorations` and each side object (`top`, `left`, etc.) are initialized if they don't exist.

## Phase 3: Implement Builder Logic in `QRCodeBuilder` (`src/index.ts` and `src/node.ts`)

*   Changes need to be mirrored in `QRCodeBuilder` in both `src/index.ts` and `src/node.ts`.

1.  **Add Properties to `QRCodeBuilder`:**
    *   `protected _textSource: string | TextOptions | null = null;`
    *   `protected _isTextById: boolean = false;`

2.  **Implement `useText` Method in `QRCodeBuilder`:**
    *   `public useText(textNameOrOptions: string | TextOptions): this`
    *   Stores `textNameOrOptions` in `_textSource`. Sets `_isTextById = false`.

3.  **Implement `useTextId` Method in `QRCodeBuilder`:**
    *   `public useTextId(textId: string): this`
    *   Stores `textId` in `_textSource`. Sets `_isTextById = true`.

4.  **Update `_resolveAndMergeConfig` in `QRCodeBuilder`:**
    *   Add a step to apply text options after border options.
    *   **Order:** Base Template -> Selected Template -> Selected Border -> **Selected Text** -> Selected Style -> Selected Image -> Final Options.
    *   **Logic:**
        *   Resolve `_textSource` (using `findTextById`/`findTextByName` if string, or directly if object).
        *   If valid `TextOptions` are found:
            *   Create a partial `Options` object: `let textOptionsToApply: RecursivePartial<Options> = { borderOptions: { decorations: {} } };`
            *   For each key in resolved `TextOptions` (e.g., `topValue`):
                *   `textOptionsToApply.borderOptions.decorations.top = { value: textOptions.topValue, enableText: textOptions.topValue !== null };`
            *   Repeat for `left`, `right`, `bottom`.
            *   Merge `textOptionsToApply` into `resolvedConfig`.

5.  **Add Static `useText` and `useTextId` Methods to `QRCodeJs` class (in `src/index.ts` and `src/node.ts`):**
    *   `public static useText(textNameOrOptions: string | TextOptions): QRCodeBuilder`
        *   `return new QRCodeBuilder(this).useText(textNameOrOptions);`
    *   `public static useTextId(textId: string): QRCodeBuilder`
        *   `return new QRCodeBuilder(this).useTextId(textId);`

## Phase 4: Update Imports and Exports

1.  **In `src/index.ts` and `src/node.ts`:**
    *   Import `findTextById`, `findTextByName` from `./core/templates/qr-template-text`.
    *   Import `TextOptions`, `QRTextTemplateDefinition` (if in a separate file).
    *   Export these types if intended for public use.

## Phase 5: Testing and Documentation

1.  **Update `src/templates/borders-templates.html`:**
    *   Add a new dropdown selector for "Text Templates" populated from `qrTextTemplates`.
    *   Modify the rendering loop:
        *   After applying base template, style, and border, add a step to apply a selected text template using `QRCodeJs.setTextId()` or `QRCodeJs.setText()`.
        *   This will demonstrate the override behavior where `setText` modifies the text values on borders already configured by `setBorder`.
    *   Ensure the visual output clearly shows the text being applied/overridden.

2.  **Add Unit Tests (Recommended):**
    *   Test `findTextByName` and `findTextById`.
    *   Test `setText`/`setTextId` in `QRCodeJs` core.
    *   Test `useText`/`useTextId` in `QRCodeBuilder`.

3.  **Update Documentation (`README.md`, API docs):**
    *   Document new types, static methods, and builder methods.
    *   Provide usage examples.

## Mermaid Diagram: `QRCodeBuilder._resolveAndMergeConfig` Flow

```mermaid
graph TD
    A[Start _resolveAndMergeConfig] --> B{Initial Options or Base Template};
    B -- Initial Options --> C[Merge Initial Options];
    B -- Base Template --> C[Merge baseQRTemplateOptions];
    C --> D{Template Source Set?};
    D -- Yes --> E[Find/Apply Template Options];
    D -- No --> F;
    E --> F;
    F{Border Source Set?} --> G;
    G -- Yes --> H[Find/Apply Border Options];
    G -- No --> I;
    H --> I;
    I{Text Source Set?} --> J;
    J -- Yes --> K[Find/Apply Text Options to Decorations];
    J -- No --> L;
    K --> L;
    L{Style Source Set?} --> M;
    M -- Yes --> N[Find/Apply Style Options];
    M -- No --> O;
    N --> O;
    O{Image Source Set?} --> P;
    P -- Yes --> Q[Apply Image Option];
    P -- No --> R;
    Q --> R;
    R[Merge Final User Options] --> S[Return Resolved Config];