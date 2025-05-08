# Plan: Update Documentation for Border Methods

**Objective:** Update documentation files to include information about the new border configuration methods: `setBorder`, `setBorderId`, `useBorder`, and `useBorderId`.

## 1. Target Files

*   `README.md`
*   `docs/documentation.md`
*   `docs/usage-guide.md`
*   `docs/api-reference-guide.md`
*   `docs/examples.md`
*   `docs/advanced-examples.md`
*   `docs/typescript-types-definitions.md`

## 2. Update Strategy & Content

*   **Update README:** Briefly mention the new static methods (`setBorder`, `setBorderId`, `useBorder`, `useBorderId`) in a relevant section (e.g., Features) and link to the main documentation for details.
*   **Explain Both Mechanisms:** In `documentation.md` and `usage-guide.md`, clearly differentiate the `set...` (global default) and `use...` (builder pattern) approaches for border configuration.
*   **Update Method Tables:** Add entries for `setBorder`, `setBorderId`, `useBorder`, and `useBorderId` to static method tables in relevant files, detailing parameters, return types, and purpose.
*   **Add Examples:**
    *   In `examples.md`, add simple examples for `setBorder`, `setBorderId`, `useBorder`, and `useBorderId`.
    *   In `advanced-examples.md`, add examples combining global defaults (`setTemplate`/`setStyle`/`setBorder`) and builder methods (`useTemplate`/`useStyle`/`useBorder`).
*   **Update Options Tables:** Ensure the `borderOptions` description mentions configuration via the new static/builder methods.
*   **Verify Types:** Briefly check `docs/typescript-types-definitions.md` for `BorderOptions`.

## 3. Implementation

This plan will be implemented by switching to Code mode after approval.