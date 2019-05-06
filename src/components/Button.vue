<template>
    <button
        class="button"
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
    
};
</script>

<style lang="scss">
.button {
    @extend .barley;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 30px;

    text-align: center;

    color: $white;
    background-color: $blue;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
}
</style>
