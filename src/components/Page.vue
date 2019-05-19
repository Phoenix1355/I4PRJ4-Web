<template lang="html">
    <div
        id="page"
        class="site"
    >
        <Header />
        <div
            id="content"
            class="site-content"
        >
            <main
                id="main"
                class="main"
                role="main"
            >
                <slot />
            </main>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';

/**
 * A resusable wrapper for each page that displays the proper html structure,
 * including the header component.
 *
 * @module Components/Page
 */
export default {
    components: {
        Header,
    },
};
</script>

<style lang="scss" scoped>
</style>
