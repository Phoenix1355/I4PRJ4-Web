<template lang="html">
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '../styles/helpers.scss';

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
