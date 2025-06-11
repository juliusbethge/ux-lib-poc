// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import starlightThemeBlack from "starlight-theme-black"

import { loadEnv } from "vite"

const { GITHUB_REPO_URL, SERVER_URL } = loadEnv(
  process.env.NODE_ENV!,
  process.cwd(),
  "",
)

// https://astro.build/config
export default defineConfig({
  // TODO: Set to site URL to generate sitemap
  // TODO: Update favicon
  site: SERVER_URL,
  integrations: [
    starlight({
      title: "WDS Shadcn Repository",
      // TODO: Set to the URL of your project's documentation
      editLink: {
        baseUrl: `${GITHUB_REPO_URL}/tree/main`,
      },
      logo: {
        // TODO: Upload logo with square aspect ratio
        dark: "./src/assets/logo/dark.png",
        light: "./src/assets/logo/light.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: GITHUB_REPO_URL,
        },
        {
          icon: "youtube",
          label: "YouTube",
          href: "https://www.youtube.com/@WebDevSimplified",
        },
        {
          icon: "x.com",
          label: "X.com",
          href: "https://x.com/DevSimplified",
        },
      ],
      customCss: ["./src/styles/global.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
      expressiveCode: {
        themes: ["github-dark", "github-light"],
      },
      // components: {
      //   PageFrame: "./src/components/overrides/page-frame.astro",
      // },
      plugins: [
        // TODO: Go back to starlight-theme instead
        starlightThemeBlack({
          navLinks: [
            {
              // TODO: Remove?
              // optional
              label: "Docs",
              link: "/getting-started",
            },
          ],
          // TODO: Remove?
          //optional
          footerText:
            "Built by [Web Dev Simplified](https://webdevsimplified.com) for use with [Shadcn](https://ui.shadcn.com)",
        }),
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
