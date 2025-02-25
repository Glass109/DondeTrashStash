// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    ssr: false,
    app: {
        pageTransition: {
            name: 'page', mode: 'out-in'
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        '@nuxt/icon',
        'nuxt-marquee',
        '@tresjs/nuxt',
        '@formkit/auto-animate'
    ],
    tres: {
        glsl: true,
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    },
    runtimeConfig: {
        public: {
            BACKEND_URL: process.env.NUXT_BACKEND_URL
        }
    }
})