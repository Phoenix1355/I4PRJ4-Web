const fs = require('fs');
const pkg = require('./package');

const externalModules = fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((acc, cur) => Object.assign(acc, { [cur]: `commonjs ${cur}` }), {});

module.exports = {
    mode: 'spa',
    srcDir: 'src/',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
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
    ** Global CSS
    */
    css: [
        '@/styles/main.scss',
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
    ],

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
                config.externals = externalModules();
            }
        },
    },
};
