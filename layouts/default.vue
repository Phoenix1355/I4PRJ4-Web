<template>
    <div>
        <nuxt />
    </div>
</template>

<style lang="scss">
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

$color-blue: #425D83;
$color-green: #3b8070;

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button {
    display: inline-block;
    padding: 10px 30px;
    margin-left: 15px;

    text-decoration: none;
    font-size: 16px;

    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    outline: 0;

    cursor: pointer;
    transition: 150ms ease;
}

.button--green {
    border: 1px solid $color-green;
    color: $color-green;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: $color-green;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}

.button--blue {
    color: $color-blue;
    border: 1px solid $color-blue;
}

.button--blue:hover {
    color: #fff;
    background-color: $color-blue;
}
</style>
