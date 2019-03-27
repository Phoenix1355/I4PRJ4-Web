module.exports = {
    plugins: [
        'plugins/markdown',
        'node_modules/jsdoc-vuejs',
    ],
    source: {
        include: [
            'components',
            'layouts',
            'middleware',
            'pages',
            'store',
        ],
        includePattern: '\\.(vue|js)$',
    },
    opts: {
        encoding: 'utf8',
    },
};
