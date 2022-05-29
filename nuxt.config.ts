import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    notionProject: process.env.NOTION_PROJECT,
    notionToken: process.env.NOTION_TOKEN,
  },
});
