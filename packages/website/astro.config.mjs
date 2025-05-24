// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            rel: 'stylesheet',
          },
        },
      ],
      plugins: [starlightBlog()],
      title: "QRCode.js Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/your-repo/qrcode.js",
        },
      ],
      sidebar: [
        {
          label: "Documentation",
          items: [
            { label: "Advanced Examples", slug: "advanced-examples" },
            { label: "API Reference Guide", slug: "api-reference-guide" },
            { label: "Border Methods Update Plan", slug: "border-methods-update-plan" },
            { label: "Border Text Implementation Plan", slug: "border-text-implementation-plan" },
            { label: "Documentation", slug: "documentation" },
            { label: "Examples", slug: "examples" },
            { label: "FT009 Settings Option Continuation Plan", slug: "ft009-settings-option-continuation-plan" },
            { label: "FT009 Settings Option Plan", slug: "ft009-settings-option-plan" },
            { label: "License Management", slug: "license-management" },
            { label: "Template Update Plan", slug: "template-update-plan" },
            { label: "Typescript Types Definitions", slug: "typescript-types-definitions" },
            { label: "Usage Guide", slug: "usage-guide" },
          ],
        },
      ],
    }),
  ],
});
