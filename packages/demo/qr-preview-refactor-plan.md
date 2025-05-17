# Refactor Plan: QR Code Preview Template Name Resolution

**Objective:**
Refactor `src/components/qr-code-preview.tsx` to use dedicated selector functions from `src/store/qrConfigStore.ts` for resolving template names, instead of a local utility function and direct data imports.

**Phase 1: Modify the Store (`src/store/qrConfigStore.ts`)**

1.  **Import `imageOptions`**:
    *   Ensure `imageOptions` from `../data/qr-data` is imported in `src/store/qrConfigStore.ts` as it will be needed for the image name selector.
        ```typescript
        import { imageOptions } from '../data/qr-data';
        ```
2.  **Update `QRConfigState` Interface**:
    *   Add the following getter method signatures to the `QRConfigState` interface:
        ```typescript
        // Inside QRConfigState interface
        getSelectedBaseTemplateName: () => string;
        getSelectedStyleTemplateName: () => string;
        getSelectedBorderTemplateName: () => string;
        getSelectedTextTemplateName: () => string;
        getSelectedImageName: () => string;
        ```
3.  **Implement Getter Methods**:
    *   Inside the `create<QRConfigState>((set, get) => ({ ... }))` function, implement these new methods. They will use `get()` to access the current state (e.g., `get().selectedTemplateId`) and the `templatesData` object (already available in the store file) or the imported `imageOptions`.
    *   **Example for `getSelectedBaseTemplateName`**:
        ```typescript
        // Inside the return object of create()
        getSelectedBaseTemplateName: () => {
          const state = get(); // Get current store state
          const template = templatesData.baseTemplates.find(t => t.id === state.selectedTemplateId);
          return template ? template.name : 'Default'; // Provide a fallback
        },
        ```
    *   **Example for `getSelectedStyleTemplateName`**:
        ```typescript
        getSelectedStyleTemplateName: () => {
          const state = get();
          const style = templatesData.styleTemplates.find(s => s.id === state.selectedStyleId);
          return style ? style.name : 'Default';
        },
        ```
    *   **Example for `getSelectedBorderTemplateName`**:
        ```typescript
        getSelectedBorderTemplateName: () => {
          const state = get();
          const border = templatesData.borderTemplates.find(b => b.id === state.selectedBorderId);
          return border ? border.name : 'Default';
        },
        ```
    *   **Example for `getSelectedTextTemplateName`**:
        ```typescript
        getSelectedTextTemplateName: () => {
          const state = get();
          const text = templatesData.textTemplates.find(t => t.id === state.selectedTextTemplateId);
          return text ? text.name : 'Default';
        },
        ```
    *   **Example for `getSelectedImageName`**:
        ```typescript
        // Inside the return object of create()
        getSelectedImageName: () => {
          const state = get();
          if (state.selectedImageId === 'none') {
            return 'None';
          }
          const image = imageOptions.find(img => img.id === state.selectedImageId);
          return image ? image.name : 'Default'; // Provide a fallback
        },
        ```

**Phase 2: Update the Component (`src/components/qr-code-preview.tsx`)**

1.  **Remove Unused Imports and Function**:
    *   Delete the local `getNameById` function.
    *   Remove the direct imports of `templates`, `styles`, `imageOptions`, `textTemplates`, and `borderStyles` from `../data/qr-data.ts`.
2.  **Use New Store Getters**:
    *   The `qrConfig` object (obtained via `useAtomValue(qrConfigAtom)`) will now have the new getter methods.
    *   Update the JSX to call these methods directly on `qrConfig`:
        *   Example: `<dd className="text-default-600 truncate">{qrConfig.getSelectedBaseTemplateName()}</dd>`
        *   Example: `<dd className="text-default-600 truncate">{qrConfig.getSelectedImageName()}</dd>`
        *   And so on for style, border, and text.

**Mermaid Diagram:**

```mermaid
graph LR
    subgraph qrConfigStore.ts
        A[QRCodeJs.getTemplates()] --> B(templatesData)
        C[Zustand Store State: selectedTemplateId, etc.]
        D[imageOptions imported from qr-data.ts]

        subgraph StoreMethodsAndSelectors
            S_Base[getSelectedBaseTemplateName()] -- uses --> C
            S_Base -- uses --> B
            S_Style[getSelectedStyleTemplateName()] -- uses --> C
            S_Style -- uses --> B
            S_Border[getSelectedBorderTemplateName()] -- uses --> C
            S_Border -- uses --> B
            S_Text[getSelectedTextTemplateName()] -- uses --> C
            S_Text -- uses --> B
            S_Image[getSelectedImageName()] -- uses --> C
            S_Image -- uses --> D
        end
        StoreMethodsAndSelectors -- part of --> StoreInstance
        StoreInstance -- exposed via --> qrConfigAtom
    end

    subgraph qr-data.ts
        E[imageOptions array] -- imported by --> qrConfigStore.ts
        F[Other template arrays: templates, styles, etc.] -.-> G[No longer directly imported by PreviewComponent]
    end

    subgraph qr-code-preview.tsx
        H[qrConfig from useAtomValue(qrConfigAtom)]
        H -- calls methods like --> S_Base
        H -- calls methods like --> S_Image
        I{Display Template Name via qrConfig.method()}
        J[Removed getNameById function]
        K[Removed direct imports of template arrays and imageOptions from qr-data.ts]
    end