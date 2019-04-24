module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
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
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~/(.*)$': '<rootDir>/src/$1',
        '^vue$': 'vue/dist/vue.common.js',
    },
};
