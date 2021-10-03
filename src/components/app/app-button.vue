<template>
    <button
        class="button"
        :class="classes"
        v-bind="attributes"
        v-on="listeners"
    >
        <span
            v-if="hasText"
            class="button__text"
        >
            <slot/>
        </span>
    </button>
</template>

<script>
const THEMES = [
    'primary',
    'secondary',
    'dark',
    'light',
    'orange',
    'red',
    'blue',
];
const KINDS = ['simple', 'standart'];
const SIZES = ['big', 'normal', 'medium', 'small'];
const DESIGN = ['covered', 'outlined'];
const SHAPES = ['rounded', 'circular'];
const STATES = ['disabled'];

export default {
    name: 'app-button',

    props: {
        kind: {
            type: String,
            required: true,
            validator(value) {
                return KINDS.includes(value);
            },
        },

        theme: {
            type: String,
            required: true,
            validator(value) {
                return THEMES.includes(value);
            },
        },

        size: {
            type: String,
            validator(value) {
                return SIZES.includes(value);
            },
        },

        design: {
            type: String,
            validator(value) {
                return DESIGN.includes(value);
            },
        },

        shape: {
            type: String,
            validator(value) {
                return SHAPES.includes(value);
            },
        },

        state: {
            type: String,
            validator(value) {
                return STATES.includes(value);
            },
        },

    },

    computed: {
        hasText() {
            return !!this.$slots.default;
        },

        classes() {
            const modifiers = [
                this.kind,
                this.theme,
                this.size,
                this.design,
                this.shape,
                this.state,
            ];

            const classes = [];

            modifiers.forEach(modifier => {
                if (!modifier) {
                    return;
                }

                classes.push(`button--${modifier}`);
            });

            return classes;
        },

        attributes() {
            return this.$attrs;
        },

        listeners() {
            return {
                ...this.$listeners,
            };
        },
    },
};
</script>
