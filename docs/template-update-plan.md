# Plan: Update Documentation for `useTemplates` Feature

**Objective:** Update the documentation in the `docs` directory to accurately reflect the template features, including modifying `useTemplate` to accept options directly and ensuring both `setTemplate` and the updated `useTemplate` builder pattern are correctly documented.

## Phase 1: Code Modification (To be done in Code Mode)

1.  **Modify `useTemplate` Signature:**
    *   In `src/index.ts`, change `QRCodeJs.useTemplate(templateName: string)` to `QRCodeJs.useTemplate(templateNameOrOptions: string | RecursivePartial<Options>)`.
    *   In `src/node.ts`, make the same change: `QRCodeJs.useTemplate(templateNameOrOptions: string | RecursivePartial<Options>)`.
2.  **Modify `QRCodeBuilder` Constructor:**
    *   In `src/index.ts`, update the `QRCodeBuilder` constructor to handle the `templateNameOrOptions` parameter. If it's a string, look up the template; if it's an object, use it directly as the base configuration.
    *   In `src/node.ts`, make the corresponding change to the `QRCodeBuilder` constructor.

## Phase 2: Documentation Update (Reflecting Both Methods)

1.  **`docs/examples.md`:**
    *   **`setTemplate` Section:** Ensure this section accurately explains setting global template defaults.
    *   **`useTemplate` Section:** Update this section to:
        *   Explain the builder pattern: `QRCodeJs.useTemplate(...).options({...})`.
        *   Show examples using a template name: `useTemplate('rounded').options(...)`.
        *   Show examples providing options directly: `useTemplate({ dotsOptions: {...} }).options(...)`.
        *   Clarify that `.options()` is always needed to provide `data` and final overrides.

2.  **`docs/usage-guide.md`:**
    *   **`setTemplate`:** Verify its documentation is correct.
    *   **`useTemplate`:** Update its description to reflect the new signature (`string | RecursivePartial<Options>`) and explain its use in the builder pattern.
    *   **Static Methods List:** Ensure both `setTemplate` and the updated `useTemplate` are listed correctly.

3.  **`docs/documentation.md`:**
    *   **Verify `setTemplate`:** Ensure it's correctly described throughout (main body, API reference, FAQ).
    *   **Update `useTemplate`:** Update its description in the API reference section to show the new signature and explain the builder pattern usage.

4.  **`docs/api-reference-guide.md`:**
    *   **Verify `setTemplate`:** Ensure it's listed correctly in the methods table.
    *   **Update `useTemplate`:** Update the parameter type to `string | RecursivePartial<Options>` and clarify its role in initiating the builder pattern.

5.  **Review Other Files:** Briefly check `advanced-examples.md`, `typescript-types-definitions.md`, and `license-management.md` for consistency regarding both `setTemplate` and the updated `useTemplate`.

## Conceptual Flow Diagram (`useTemplate`)

```mermaid
graph LR
    subgraph useTemplate Flow
        A[User Code] --> B{QRCodeJs.useTemplate(nameOrOptions)};
        B -- name --> C[Lookup Template];
        B -- options --> D[Use Provided Options];
        C --> E{QRCodeBuilder Instance};
        D --> E;
        A --> F(Specific Options e.g., data);
        E --> G(builder.options(Specific Options));
        F --> G;
        G --> H(Final QRCodeJs Instance);
    end