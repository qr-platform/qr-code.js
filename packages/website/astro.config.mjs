// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
// import starlightDocSearch from "@astrojs/starlight-docsearch";
import react from "@astrojs/react";
import starlightLinksValidator from "starlight-links-validator";
import sitemap from "@astrojs/sitemap";
// import { loadEnv } from "vite";

// const { DOCSEARCH_API_ID } = loadEnv(
//   process.env.DOCSEARCH_API_ID,
//   process.cwd(),
//   ""
// );
// const { DOCSEARCH_API_SEARCH_KEY } = loadEnv(
//   process.env.DOCSEARCH_API_SEARCH_KEY,
//   process.cwd(),
//   ""
// );
// const { DOCSEARCH_INDEX_NAME } = loadEnv(
//   process.env.DOCSEARCH_INDEX_NAME,
//   process.cwd(),
//   ""
// );

// if (!DOCSEARCH_API_ID || !DOCSEARCH_API_SEARCH_KEY || !DOCSEARCH_INDEX_NAME) {
//   console.error(
//     "Algolia DocSearch enviroment variables are invalid. Please check configuration!"
//   );
//   process.exit(1);
// }

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
            rel: "stylesheet",
          },
        },
      ],
      plugins: [
        starlightBlog({
          title: "What's New",
          recentPostCount: 5,
          prevNextLinksOrder: "chronological",
        }),
        starlightLinksValidator({
          errorOnRelativeLinks: true,
        }),
        // starlightDocSearch({
        //   appId: DOCSEARCH_API_ID,
        //   apiKey: DOCSEARCH_API_SEARCH_KEY,
        //   indexName: DOCSEARCH_INDEX_NAME,
        // }),
      ],
      title: "QRCode.js Library",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/your-repo/qrcode.js",
        },
      ],
      sidebar: [
        {
          label: "Docs and Guides",
          items: [
            { label: "Documentation", slug: "documentation" },
            { label: "Advanced Examples", slug: "advanced-examples" },
            { label: "API Reference Guide", slug: "api-reference-guide" },
            { label: "Examples", slug: "examples" },
            {
              label: "Typescript Types Definitions",
              slug: "typescript-types-definitions",
            },
            { label: "Usage Guide", slug: "usage-guide" },
            { label: "License Management", slug: "license-management" },
          ],
        },
      ],
    }),
    react(),
    sitemap(),
  ],
});
