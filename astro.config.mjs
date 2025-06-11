// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import starlightThemeBlack from "starlight-theme-black"

// https://astro.build/config
export default defineConfig({
  // TODO: Set to site URL to generate sitemap
  site: "http://localhost:4321",
  integrations: [
    starlight({
      title: "WDS Shadcn Repository",
      // TODO: Set to the URL of your project's documentation
      editLink: {
        baseUrl: "http://localhost:4321",
      },
      logo: {
        dark: "./src/assets/logo/dark.png",
        light: "./src/assets/logo/light.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          // TODO: Update the URL to your project's GitHub repository
          href: "https://github.com/withastro/starlight",
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
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              // optional
              label: "Docs",
              link: "/getting-started",
            },
          ],
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
