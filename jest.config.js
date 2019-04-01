module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.{js,vue}',
        'pages/**/*.{js,vue}',
        'layouts/**/*.{js,vue}',
        'middleware/**/*.{js,vue}',
        'store/**/*.{js,vue}',
    ],
    moduleFileExtensions: [
        'js',
        'vue',
        'json',
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
}
