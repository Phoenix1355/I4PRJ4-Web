const pkg = require('./package');

module.exports = {
    mode: 'spa',
    srcDir: 'src/',

    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s – SmartCab',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS/SCSS
    */
    css: [
        'normalize.css/normalize.css',
        '@/assets/styles/main.scss',
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],

    styleResources: {
        scss: [
            'assets/styles/main.scss',
        ],
    },

    /*
    ** Nuxt.js axios
     */
    axios: {
        baseURL: 'https://smartcabbackend.azurewebsites.net',
    },

    /*
    ** Nuxt.js routing
    */
    router: {
        // base: '/prj4-web-test/',
        middleware: ['auth'],
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            if (ctx.isClient) {
                // config.externals = externalModules();
            }
        },
    },
};
