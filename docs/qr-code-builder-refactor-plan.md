# Plan for Refactoring `packages/demo` into a Comprehensive QR Code Builder (Version 9)

This plan outlines the steps to refactor the existing `packages/demo` into a comprehensive QR code builder application. It will leverage the `QRCodeJs` library, feature simple and advanced configuration modes, and use Zustand and Jotai for state management.

## I. Project Setup & Core Definitions

1.  **Add Dependencies:**
    *   Install `react-best-gradient-color-picker` for enhanced color and gradient selection.
    *   Install `zustand` for global state management.
    *   Install `jotai` and `jotai-zustand` for consuming the Zustand store via Jotai atoms.
    *   These will be added to `packages/demo/package.json`.
2.  **Define Tailwind Color Palette:**
    *   Create a new module (e.g., `packages/demo/src/data/tailwind-colors.ts`) exporting an array of Tailwind's default solid color hex codes to be used as a predefined palette in the color picker.
3.  **Consolidate Option Definitions (`qr-data.ts`):**
    *   Verify and update `packages/demo/src/data/qr-data.ts` to ensure `qrTemplates`, `qrStyleDefinitions`, `qrBorderTemplates`, `qrTextTemplates`, and `imageOptions` are comprehensive and accurately reflect all predefined named entities available in the `QRCodeJs` library.
4.  **Define `AdvancedQROptions` Interface:**
    *   Create a detailed TypeScript interface (e.g., in `packages/demo/src/types/qr-options.ts`) for `AdvancedQROptions`. This interface will cover:
        *   **Core:** `data`, `shape`, `margin`, `qrOptions` (errorCorrectionLevel, `typeNumber`, `mode`).
        *   **Dots:** `type` (all enums from `DotType`), `color`, `size`, `gradient` (full controls: `type`, `rotation`, `colorStops` array).
        *   **Corner Squares:** `type` (all enums from `CornerSquareType`), `color`, `gradient` (full controls).
        *   **Corner Dots:** `type` (all enums from `CornerDotType`), `color`, `gradient` (full controls).
        *   **Background:** `color`, `round`, `gradient` (full controls).
        *   **Image:** `image` (URL input), `imageOptions` (`mode` (all enums), `imageSize`, `margin`, `crossOrigin`, `fill` with `color` and `gradient`).
        *   **Layout:** `isResponsive`, `scale`, `offset`, `verticalOffset`, `horizontalOffset`.
        *   **Borders:** A comprehensive structure mirroring `borderOptions` from the library, including `hasBorder`, `thickness`, `color`, `radius`, `inner` settings, `borderOuter`, `borderInner`, and `decorations` (with UI for text/image on each side, font styles, offsets, curves).
5.  **Create Zustand Store for QR Configuration (`qrConfigStore.ts`):**
    *   Define a vanilla Zustand store using `create()` (e.g., in `packages/demo/src/store/qrConfigStore.ts`).
    *   **Store State (managed by Zustand):**
        *   `qrData: string`
        *   `selectedTemplateId: string`
        *   `selectedStyleId: string`
        *   `selectedBorderId: string`
        *   `selectedTextTemplateId: string`
        *   `selectedImageId: string`
        *   `isAdvancedMode: boolean`
        *   `advancedOptions: AdvancedQROptions`
        *   `initialDefaultQrData: string` (for reset)
        *   `initialDefaultSelectedTemplateId: string` (for reset)
        *   `initialDefaultSelectedStyleId: string` (for reset)
        *   `initialDefaultSelectedBorderId: string` (for reset)
        *   `initialDefaultSelectedTextTemplateId: string` (for reset)
        *   `initialDefaultSelectedImageId: string` (for reset)
        *   `initialDefaultIsAdvancedMode: boolean` (likely `false`)
        *   `initialDefaultAdvancedOptions: AdvancedQROptions` (for reset functionality).
    *   **Preset Structure (for save/load/import/export):**
        ```typescript
        interface QRCodePreset {
          name: string; // User-defined name for the preset
          qrData: string;
          isAdvancedMode: boolean;
          // Simple mode selections
          selectedTemplateId?: string;
          selectedStyleId?: string;
          selectedBorderId?: string;
          selectedTextTemplateId?: string;
          selectedImageId?: string;
          // Advanced mode options
          advancedOptions?: AdvancedQROptions;
        }
        ```
    *   **Store Actions (methods within the Zustand store):**
        *   Setters for each piece of state (e.g., `setQrData(data) { store.setState({ qrData: data }) }`).
        *   `resetToDefaults()`: Resets all relevant state fields to their `initialDefault...` values using `store.setState()`.
        *   `savePreset(presetName: string)`: Gets current state via `store.getState()`, creates a `QRCodePreset`, and saves to `localStorage`.
        *   `loadPreset(presetName: string)`: Loads from `localStorage`, then updates the store using `store.setState()`.
        *   `deletePreset(presetName: string)`: Deletes from `localStorage`.
        *   `listSavedPresets(): {name: string}[]`.
        *   `exportPresetToJSON()`: Gets current state via `store.getState()`, creates `QRCodePreset`, triggers download.
        *   `importPresetFromJSON(file: File): Promise<void>`: Reads file, validates, then updates store using `store.setState()`.
        *   (Error handling and validation for import/load).
6.  **Create Jotai Atom for Store Access:**
    *   **Action:** In a separate file (e.g., `packages/demo/src/store/qrConfigAtom.ts`), create a Jotai atom linked to the Zustand store using `atomWithStore(store)` from `jotai-zustand`.
    *   React components will then use `useAtom(stateAtom)` to access and update the Zustand store's state.
7.  **URL Parameter Synchronization:**
    *   Logic to update URL parameters based on changes in simple mode selections (read from the Jotai atom, which reflects the Zustand store) will be maintained/updated.

## II. UI Development - Simple Mode (Refactor `qr-code-builder.tsx`)

1.  **Layout:**
    *   A top section for selectors: Base Template, Base Style, Image, Text Template, and Border Template.
    *   A main content area to display a grid of QR code previews, one for each available border template.
2.  **Selectors:**
    *   Populate all selectors using data from the updated `qr-data.ts`.
3.  **QR Code Grid Display (`BorderTemplatePreviewCard.tsx`):**
    *   Create/update this component. It receives a `borderTemplate` object and the currently selected global simple mode IDs (base template, style, image, text) from the Zustand store.
    *   Inside the card, it uses `QRCodeJs.setTemplateId()`, `setStyleId()`, `setImage()`, `setTextId()`, and `setBorderId(currentBorderTemplate.id)` followed by `new QRCodeJs()` to render the specific QR code.
    *   Implements scan validation display (e.g., green/red border) for each preview.
4.  **State Interaction:**
    *   Components will use `useAtom(stateAtom)` to read state from and update (via `setState` from `useAtom`) the Zustand store.
    *   Changes in selectors (simple mode IDs) trigger a re-render of the QR code grid.

## III. UI Development - Advanced Mode (Refactor `advanced-customization.tsx`)

1.  **Comprehensive Controls & Structure:**
    *   Expand tabs for better organization: General, Dots & Corners, Background & Image, Borders.
    *   Implement UI controls for all properties defined in the expanded `AdvancedQROptions` interface.
2.  **Gradient Editor Component (`GradientEditor.tsx`):**
    *   Create a reusable component wrapping `react-best-gradient-color-picker`.
    *   It will be configured with the Tailwind color palette (from I.2).
    *   Handles transformation between the picker's output string and the `QRCodeJs` gradient object structure or solid color string.
3.  **Font Style Component (`FontStyleEditor.tsx`):**
    *   Create a reusable component for border decoration text styling (`fontFace`, `fontSize`, `fontColor` via `GradientEditor.tsx`, `letterSpacing`, `fontWeight`, `textTransform`).
4.  **Color Inputs:**
    *   All solid color and gradient inputs will use the new `GradientEditor.tsx`.
5.  **Single Preview (`qr-code-preview.tsx`):**
    *   In advanced mode, this component renders a single QR code based on the live `advancedOptions` (accessed via `useAtom(stateAtom)`).
6.  **Manage Configuration UI (Presets):**
    *   Implement UI elements for:
        *   "Save as Preset" (to `localStorage`) with a name input.
        *   Load dropdown/list of saved presets (from `localStorage`).
        *   Delete preset button (from `localStorage`).
        *   "Export Preset to JSON" button.
        *   "Import Preset from JSON" button (with file input).
        *   "Reset All to Defaults" button.
    *   These UI elements will trigger corresponding actions in the Zustand store (likely by calling methods on the vanilla store instance or by using `setState` from `useAtom` to update the store).

## IV. Core Logic (Zustand Store & Preview Components)

1.  **Option Application in Preview Components:**
    *   **`QRCodePreview` (Advanced Mode):** Reads `qrData` and `advancedOptions` from the Jotai atom (reflecting the Zustand store). Instantiates `new QRCodeJs({ data: qrData, ...advancedOptions })`.
    *   **`BorderTemplatePreviewCard` (Simple Mode):** Reads `qrData` and selected IDs from the Jotai atom. Uses static `QRCodeJs` setters (`setTemplateId`, `setStyleId`, etc.) then `new QRCodeJs()`.
2.  **`qr-code-service.ts` Role:**
    *   Primarily for library initialization (e.g., auth token if needed). Option application logic moves closer to UI/Zustand.
3.  **State Management Logic:**
    *   All core state logic (getting, setting, saving, loading, resetting, importing/exporting full presets) is implemented as methods within the vanilla Zustand store definition. React components interact with this store via the Jotai atom.

## V. Component Interaction & Data Flow (Conceptual Mermaid Diagram)

```mermaid
graph TD
    App[App.tsx] --> MainUI

    subgraph StateManagement
        VanillaZustandStore["Vanilla Zustand Store (qrConfigStore.ts)"]
        VanillaZustandStore -- Defines --> StoreLogic[State & Actions: qrData, selected IDs, advancedOptions, presets, etc.]
        JotaiStateAtom["Jotai Atom (qrConfigAtom.ts) via atomWithStore(VanillaZustandStore)"]
    end
    
    MainUI[Main UI Components (e.g., qr-code-builder.tsx)] -- useAtom --> JotaiStateAtom

    subgraph Components [src/components]
        Builder[qr-code-builder.tsx]
        SimpleModeUI[Simple Mode UI]
        AdvancedUI[advanced-customization.tsx]
        GradientEditor[GradientEditor.tsx]
        FontStyleEditor[FontStyleEditor.tsx]
        Preview[qr-code-preview.tsx]
        BP_Card[BorderTemplatePreviewCard.tsx]
    end

    Builder --> ModeSwitch
    Builder -->|Simple Mode| SimpleUI
    Builder -->|Advanced Mode| AdvancedUI
    
    SimpleUI --> Selectors
    SimpleUI --> GridContainer; GridContainer --> BP_Card
    
    AdvancedUI --> TabsAdv[Tabs for Advanced Options]
    TabsAdv --> ManagePresetsUI[Manage Presets UI (Save, Load, Import, Export, Reset)]

    GradientEditor -- Uses --> ReactBestGradientPicker["react-best-gradient-color-picker"]
    GradientEditor -- Configured with --> TailwindColors[Tailwind Color Palette]
    
    %% Data Flow
    Selectors -- Update state via Jotai Atom --> VanillaZustandStore
    TabsAdv -- Update state via Jotai Atom --> VanillaZustandStore
    ManagePresetsUI -- Trigger Actions via Jotai Atom/Store --> VanillaZustandStore
    
    BP_Card -- Reads state via Jotai Atom from --> VanillaZustandStore
    BP_Card -- Uses --> QRCodeJsLib[QRCodeJs Library]

    Preview -- Reads state via Jotai Atom from --> VanillaZustandStore
    Preview -- Uses --> QRCodeJsLib

    VanillaZustandStore -- Handles --> LocalStorageOps["localStorage Operations"]
    VanillaZustandStore -- Handles --> JSONImportExport["JSON Import/Export"]
    VanillaZustandStore -- Uses --> InitialDefaults
```

This plan provides a comprehensive roadmap for refactoring the demo application into a powerful QR code builder.