<template lang="html">
    <a
        role="menuitem"
        class="dropdown-item"
        @click="$emit('click', $event)"
    ><slot /></a>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
</style>
