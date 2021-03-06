<template lang="html">
    <div
        v-on-clickaway="blur"
        class="dropdown"
        :class="{ 'is-expanded': active }"
    >
        <button
            aria-haspopup="true"
            :aria-expanded="active"
            class="dropdown-toggle"
            type="button"
            @click="toggle"
        >
            <span>{{ text }}</span>
        </button>
        <div
            class="dropdown-menu"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

import DropdownItem from './DropdownItem.vue';
import DropdownHead from './DropdownHead.vue';
import DropdownDivider from './DropdownDivider.vue';

// Gather all imports so we won't have to re-import them one by one when using
// them.
export {
    DropdownItem,
    DropdownHead,
    DropdownDivider,
};

/**
 * The dropdown button that display the user information, aswell as providing a
 * logout button.
 *
 * @module Components/Dropdown
 *
 * @vue-prop {String} text - The text to display in the button
 *
 * @vue-data {Bool} active - The toggle for the dropdown menu
 *
 * @vue-event {void} toggle - Toggles the active state
 * @vue-event {void} blur - Set the active state to false
 */
export default {
    mixins: [
        clickaway,
    ],
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        active: false,
    }),
    methods: {
        toggle() {
            this.active = !this.active;
        },
        blur() {
            this.active = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.dropdown {
    .dropdown-toggle {
        @extend .barley;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0;

        text-align: center;

        border: 0;
        outline: 0;
        background-color: transparent;

        cursor: pointer;
    }

    .dropdown-menu {
        position: absolute;
        z-index: 1;

        display: none; // Hide by default
        max-width: 180px;
        padding: 5px 0;

        background-color: $white;
        box-shadow: $shadow-medium;
        border: 1px solid $border-color;
        border-radius: 4px;

        // The arrow
        &:after,
        &:before {
            bottom: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        &:after {
            border-color: rgba(255, 255, 255, 0);
            border-bottom-color: #ffffff;
            border-width: 8px;
            margin-left: -8px;
        }
        &:before {
            border-color: rgba(194, 225, 245, 0);
            border-bottom-color: $border-color;
            border-width: 9px;
            margin-left: -9px;
        }

        .dropdown-head,
        .dropdown-item {
            @extend .barley;

            display: block;
        }

        .dropdown-head {
            padding: 10px 15px;
            margin-bottom: -8px;

            line-height: 25px;
        }

        .dropdown-divider {
            display: block;
            height: 0;
            margin: 8px 0;

            border-top: 1px solid $border-color;
        }

        .dropdown-item {
            display: block;
            padding: 7px 15px 5px;
            margin: 0;

            text-decoration: none;

            color: $black;
            cursor: pointer;

            &:hover {
                color: $white;
                background-color: $blue;
            }
        }
        .dropdown-item[disabled="disabled"] {
            color: rgba($black, 0.5);

            cursor: not-allowed;

            &:hover {
                color: rgba($black, 0.5);
                background-color: transparent;
            }
        }
    }

    &.is-expanded {
        .dropdown-menu {
            display: block;
        }
    }
}
</style>
