<template>
    <button
        class="button"
        :class="variant ? `button--${variant}` : ''"
        @click="$emit('click', $event)"
    >
        <slot>Button</slot>
    </button>
</template>

<script>
/**
 * This is an awesome button description
 *
 * @module Components/Button
 *
 * @vue-prop {Function} onClick - The binding onclick event prop
 */
export default {
    props: {
        variant: {
            type: String,
            required: false,
            default: null,
        },
    },
};
</script>

<style lang="scss">
.button {
    @extend .barley;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    padding-left: 15px;
    padding-right: 15px;

    text-align: center;

    color: $white;
    background-color: $blue;
    border: 1px solid $blue;
    outline: 0;
    border-radius: 5px;

    transition: $speed-short $animation;
    cursor: pointer;

    & + .button {
        margin-left: 20px;
    }

    &:hover {
        background-color: darken($blue, 5%);
    }

    &.button--disabled {
        background-color: rgba($blue, .8);
    }
}
.button--secondary {
    color: $black;
    background-color: $white;
    border-color: rgba($black, .3);

    &:hover {
        background-color: rgba($black, .1);
    }
}
</style>
