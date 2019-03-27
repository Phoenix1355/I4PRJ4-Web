<template>
    <button class="button">
        <slot>Button</slot>
    </button>
</template>

<style lang="scss">
@import '../styles/helpers.scss';
@import '../styles/typography.scss';

.button {
    @extend .barley;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 120px;
    padding: 0;

    text-align: center;

    color: $white;
    background-color: $blue;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
}
</style>
