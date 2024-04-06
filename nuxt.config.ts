import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/eslint-module"],
  css: ["@/assets/styles/main.scss"],
  eslint: {
    lintOnStart: false,
  },
  app: {
    head: {
      title: "Scheduler",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.15.2/css/all.css",
          integrity:
            "sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
