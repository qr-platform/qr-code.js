# Plan: Custom Text Override for QR Code Builder

This document outlines the plan to implement a "Custom Text Override" feature in the QR code builder.

**User Story:**

As a user, I want to be able to input custom text for different border positions (all, top, bottom, left, right) of my QR code. When this custom text override is enabled via a toggle, it should take precedence over any text selected through the "Text Template" dropdown. The "Text Template" selector should be disabled when the override is active. The text should be applied using the `borderOptions.decorations` settings as per the API.

**Key Requirements:**

1.  **Custom Text Input:** Allow users to input text for "All", "Top", "Bottom", "Left", and "Right" border positions.
2.  **Position Selector:** A dropdown to select which border position the current text input applies to.
3.  **Override Toggle:** A toggle switch to enable/disable the custom text override feature.
4.  **Disable Text Template:** When the override is enabled, the existing "Text Template" selector ([`TemplateControls`](packages/demo/src/components/ui/TemplateControls.tsx)) should be disabled.
5.  **Override Logic:**
    *   Custom text for a specific position (e.g., "Top") overrides text set for "All" positions for that specific side.
    *   If "All" has text and a specific side does not, the "All" text is used for that side.
    *   If override is enabled and no custom text is provided for a side (either directly or via "All"), no text should appear on that side from any template.
6.  **API Integration:** Use `borderOptions.decorations` (specifically `DecorationOptions` for each side: `top`, `bottom`, `left`, `right`) from the `QRCode.js` library API to apply the text. Default styling from the API will be used initially.
7.  **State Management:** Integrate new state variables and actions into the existing Jotai/Zustand store ([`qrConfigStore.ts`](packages/demo/src/store/qrConfigStore.ts)).

**Implementation Phases:**

## Phase 1: State Management (`qrConfigStore.ts`)

1.  **Add New State Variables:**
    *   `isCustomTextOverrideEnabled: boolean` (default: `false`)
    *   `customTextOverridePosition: 'all' | 'top' | 'bottom' | 'left' | 'right'` (default: `'all'`) - Tracks the currently selected position in the new UI.
    *   `customTextOverrides: { all?: string, top?: string, bottom?: string, left?: string, right?: string }` (default: `{}`) - Stores the actual text inputs.
    *   Corresponding `initialDefault...` versions for reset functionality.

2.  **Implement Setter Actions:**
    *   `setIsCustomTextOverrideEnabled(enabled: boolean): void`
    *   `setCustomTextOverridePosition(position: 'all' | 'top' | 'bottom' | 'left' | 'right'): void`
    *   `setCustomTextOverride(position: 'all' | 'top' | 'bottom' | 'left' | 'right', text: string): void` - Updates the specific text in `customTextOverrides`.
    *   `clearCustomTextOverride(position: 'all' | 'top' | 'bottom' | 'left' | 'right'): void` (Optional, if a clear button per input is desired)
    *   `resetCustomTextOverrides(): void` - Resets all custom text fields and the toggle to their initial defaults.

## Phase 2: New UI Component (`CustomTextOverrideControls.tsx`)

1.  **Create File:** `packages/demo/src/components/ui/CustomTextOverrideControls.tsx`
2.  **Component Structure:**
    *   A main `div` container.
    *   **Toggle Switch:**
        *   Label: "Enable Custom Text Override"
        *   Controlled by `isCustomTextOverrideEnabled` from the store.
        *   On change, calls `setIsCustomTextOverrideEnabled`.
    *   **Position Dropdown (`Select` from `@heroui/react`):**
        *   Label: "Text Position"
        *   Options: "All Sides", "Top Side", "Bottom Side", "Left Side", "Right Side".
        *   Controlled by `customTextOverridePosition` from the store.
        *   On change, calls `setCustomTextOverridePosition`.
        *   Disabled if `isCustomTextOverrideEnabled` is `false`.
    *   **Text Input (`Input` from `@heroui/react`):**
        *   Label: Dynamically changes based on `customTextOverridePosition` (e.g., "Text for All Sides", "Text for Top Side").
        *   Value: Displays the text from `customTextOverrides[customTextOverridePosition]`.
        *   On change, calls `setCustomTextOverride(customTextOverridePosition, newText)`.
        *   Disabled if `isCustomTextOverrideEnabled` is `false`.
3.  **Styling:** Ensure consistent styling with the rest of the builder.

## Phase 3: Main Builder UI (`qr-code-builder.tsx`)

1.  **Import:** Import the new `CustomTextOverrideControls` component.
2.  **Integrate Component:**
    *   Place `CustomTextOverrideControls` adjacent to the existing "Text Template" `TemplateControls`. The image provided suggests it should be to the right.
    *   The `div` at [`qr-code-builder.tsx:211`](packages/demo/src/components/qr-code-builder.tsx:211) (which wraps the "Text Template" controls) will need to be modified to use a flex or grid layout to accommodate both `TemplateControls` and `CustomTextOverrideControls` side-by-side within its cell in the main `md:grid-cols-2` layout.
3.  **Disable Text Template Controls:**
    *   Modify [`TemplateControls.tsx`](packages/demo/src/components/ui/TemplateControls.tsx) to accept an `isDisabled?: boolean` prop.
    *   Pass this prop to the underlying `@heroui/react` `Select` component and disable other interactive elements (like next/prev buttons) within `TemplateControls` if `isDisabled` is true.
    *   In [`qr-code-builder.tsx`](packages/demo/src/components/qr-code-builder.tsx), pass `isDisabled={isCustomTextOverrideEnabled}` to the "Text Template" `TemplateControls` instance.

## Phase 4: Logic for Applying Text Overrides

This will primarily be handled by how the final `Options` object for `QRCodeJs` is constructed. It's recommended to use a derived Jotai atom (e.g., `finalQrCodeOptionsAtom`) for this, which `QRCodePreview.tsx` would consume.

1.  **Create/Update `finalQrCodeOptionsAtom` (in `qrConfigStore.ts` or a new selectors file):**
    *   This atom will depend on: `qrData`, `selectedTemplateId`, `selectedStyleId`, `selectedBorderId`, `selectedTextTemplateId`, `selectedImageId`, `advancedOptions`, `isCustomTextOverrideEnabled`, and `customTextOverrides`.
    *   **Base Options:** Start with options derived from `advancedOptions` or selected templates (style, base, border).
    *   **Text Logic:**
        *   If `isCustomTextOverrideEnabled` is `true`:
            *   Initialize `borderOptions.decorations = {}`.
            *   For each side (`top`, `bottom`, `left`, `right`):
                *   Determine the text: `const textValue = customTextOverrides[side] || customTextOverrides.all || '';`
                *   If `textValue` is not empty, create a `DecorationOptions` object for that side:
                    ```typescript
                    // Example for 'top'
                    if (textValue) {
                      decorations.top = {
                        enableText: true,
                        type: 'text',
                        value: textValue,
                        // Use default styles from API, or allow future customization
                        style: { /* default API styles or new state-driven styles */ }
                      };
                    } else {
                      // Ensure no text from a template is shown if override is on but text is empty
                      decorations.top = { enableText: false };
                    }
                    ```
            *   Set `finalOptions.borderOptions.decorations = decorations`.
            *   Crucially, ensure `finalOptions.text` (or however text templates are applied) is nullified or ignored.
        *   If `isCustomTextOverrideEnabled` is `false`:
            *   Apply text based on `selectedTextTemplateId` as currently implemented (or ensure `borderOptions.decorations` are derived from the selected text template if that's how it works).
            *   If no text template is selected, ensure `borderOptions.decorations` is empty or all `enableText` are `false`.
    *   **Other Options:** Merge `qrData`, `image` (from `selectedImageId`), etc., into the `finalOptions`.
2.  **Update `QRCodePreview.tsx`:**
    *   Ensure it consumes `finalQrCodeOptionsAtom` to get the fully constructed options object.
    *   Pass these options to the `QRCodeJs` instance for rendering or updates. The `setText` or `useSettings` methods from the API ([`docs/api-reference-guide.md:93`](docs/api-reference-guide.md:93), [`docs/api-reference-guide.md:112`](docs/api-reference-guide.md:112)) will be relevant here, likely by constructing the `SettingsOptions` object that includes the `borderOptions` with the custom decorations.

**Mermaid Diagram:**

```mermaid
graph TD
    subgraph User Interaction
        UI_QRCodeBuilder["QRCodeBuilder Component (`qr-code-builder.tsx`)"]
        UI_TextTemplate["Text Template Controls (`TemplateControls.tsx`)"]
        UI_CustomOverride["New: Custom Text Override Controls (`CustomTextOverrideControls.tsx`)"]
        UI_Toggle["Override Toggle (in Custom Controls)"]
        UI_PositionSelect["Position Dropdown (in Custom Controls)"]
        UI_TextInput["Text Input (in Custom Controls)"]

        UI_QRCodeBuilder --> UI_TextTemplate
        UI_QRCodeBuilder --> UI_CustomOverride
        UI_CustomOverride --> UI_Toggle
        UI_CustomOverride --> UI_PositionSelect
        UI_CustomOverride --> UI_TextInput
    end

    subgraph State Management (`qrConfigStore.ts`)
        State_Store["qrConfigStore (Jotai/Zustand)"]
        State_IsOverrideEnabled["isCustomTextOverrideEnabled (boolean)"]
        State_OverridePosition["customTextOverridePosition (string)"]
        State_Overrides["customTextOverrides (object)"]
        State_SelectedTextTemplate["selectedTextTemplateId (string)"]
        State_Actions["Setter Actions (for new state)"]
        State_DerivedOptions["finalQrCodeOptionsAtom (Derived Atom)"]

        State_Store --> State_IsOverrideEnabled
        State_Store --> State_OverridePosition
        State_Store --> State_Overrides
        State_Store --> State_SelectedTextTemplate
        State_Store --> State_Actions
        State_Store --> State_DerivedOptions
    end

    subgraph QR Code Generation
        Lib_QRCodeJs["QRCode.js Library"]
        Comp_QRCodePreview["QRCodePreview Component"]
    end

    UI_Toggle --> State_IsOverrideEnabled
    UI_PositionSelect --> State_OverridePosition
    UI_TextInput --> State_Overrides
    UI_TextTemplate -- Selects --> State_SelectedTextTemplate

    State_IsOverrideEnabled -- Controls Disabling --> UI_TextTemplate
    State_IsOverrideEnabled -- Determines Logic --> State_DerivedOptions
    State_OverridePosition -- Determines Logic --> State_DerivedOptions
    State_Overrides -- Determines Logic --> State_DerivedOptions
    State_SelectedTextTemplate -- Determines Logic --> State_DerivedOptions
    
    State_DerivedOptions -- Provides Options --> Comp_QRCodePreview
    Comp_QRCodePreview -- Uses --> Lib_QRCodeJs

    click State_Store "packages/demo/src/store/qrConfigStore.ts"
    click UI_QRCodeBuilder "packages/demo/src/components/qr-code-builder.tsx"
    click UI_TextTemplate "packages/demo/src/components/ui/TemplateControls.tsx"
    click UI_CustomOverride "packages/demo/src/components/ui/CustomTextOverrideControls.tsx"
```

This plan provides a structured approach to implementing the custom text override feature.