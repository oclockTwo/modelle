// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
    "nuxt-headlessui",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
  ],

  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },

  runtimeConfig: {
    public: {},
    private: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },

  nitro: {
    server: {
      handlers: {
        '/api/*': {
          timeout: 50000 // 50秒
        }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "robots",
          content:
            "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
        },
      ],
    },
  },
  site: {
    url: "https://modelleai.com",
  },
  robots: {
    UserAgent: "*",
    Disallow: "",
  },
});
