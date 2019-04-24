module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
            plugins: [
                '@babel/plugin-transform-async-to-generator',
            ],
        },
    },
};
