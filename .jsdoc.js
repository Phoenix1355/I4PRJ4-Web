module.exports = {
    plugins: [
        'plugins/markdown',
        'node_modules/jsdoc-vuejs',
    ],
    source: {
        include: [
            'src',
        ],
        includePattern: '\\.(vue|js)$',
    },
    opts: {
        encoding: 'utf8',
        "recurse": true,
    },
};
