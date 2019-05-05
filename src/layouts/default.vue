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
                <nuxt />
            </main>
        </div>
    </div>
</template>

<script>
/**
 * The page wrapper
 * @type {Component}
 */

import Header from '../components/Header.vue';

export default {
    components: {
        Header,
    },
};
</script>

<style lang="scss" scoped>
</style>
