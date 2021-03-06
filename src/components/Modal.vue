<template lang="html">
    <div
        class="modal"
        :class="{ 'is-open': active }"
    >
        <div
            class="modal-overlay"
            @click="close"
        />
        <div class="modal-body">
            <div class="model-header">
                <button
                    class="modal-close"
                    @click="close"
                >
                    <span />
                    <span />
                </button>
            </div>
            <div class="modal-content">
                <div class="details">
                    <slot name="content" />
                </div>
                <div class="map">
                    <slot name="map" />
                </div>
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
/**
 * A functional popup modal used for displaying content
 *
 * @module Components/Modal
 *
 * @vue-prop {Function} onOpen - An binding prop method that calls on the modal open
 * @vue-prop {Function} onClose - An binding prop method that calls on the modal close
 *
 * @vue-data {Bool} active - The modal state (open/closed)
 *
 * @vue-event {Bool} open - Opens the modal
 * @vue-event {Bool} close - Closes the modal
 */
export default {
    props: {
        onOpen: {
            type: Function,
            required: false,
            default: () => {},
        },
        onClose: {
            type: Function,
            required: false,
            default: () => {},
        },
    },

    data: () => ({
        active: false,
    }),

    methods: {
        open() {
            console.log('Open() was called!');
            this.active = true;
            this.onOpen();
        },
        close() {
            console.log('Close() was called!');
            this.active = false;
            this.onClose();
        },
    },
};
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 40px;

    transition: $speed $animation;
    opacity: 0;
    pointer-events: none;
    overflow-y: auto;

    &.is-open {
        opacity: 1;
        pointer-events: all;
    }

    .modal-overlay {
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: rgba($black, 0.6);
    }

    .modal-body {
        position: relative;
        z-index: 98;

        display: grid;
        grid-template-rows: auto 1fr auto;
        width: 1200px;
        min-height: 400px;

        background-color: $white;
        box-shadow: $shadow-big;
    }

    .modal-content {
        display: grid;
        grid-template-columns: 500px auto;

        p {
            @extend .oat;
        }
    }

    .details {
        padding: 10px 30px;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        padding: 10px 30px;

        border-top: 1px solid $border-color;
    }

    .modal-close {
        position: absolute;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        padding: 0;

        border: 0;
        outline: 0;
        cursor: pointer;

        span {
            position: absolute;

            display: block;
            width: 20px;
            height: 3px;
            padding: 0;

            background-color: $black;
            border-radius: 2px;
        }

        span:nth-child(1) {
            transform: rotate(45deg);
        }
        span:nth-child(2) {
            transform: rotate(-45deg);
        }
    }
}
</style>
