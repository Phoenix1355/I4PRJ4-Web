<template lang="html">
    <div class="container">
        <slot />
    </div>
</template>

<script>
/**
 * A container module that displays content in a limited center container box
 *
 * @module Components/Container
 */
export default {

};
</script>

<style lang="scss">
.container {
    max-width: $site-width;
    width: 100%;
    padding: 0 40px;
    margin: 0 auto;

    @include bp(hg) {
        padding: 0;
    }
}
</style>
