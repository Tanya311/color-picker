<template>
    <div>
        <h1> Колорпикеры </h1>

        <app-color-picker
            v-model="value"
        />

        {{value}}
    </div>
</template>

<script>
    import AppColorPicker from "@/components/app/app-color-picker";

    export default {
        name: 'MainPage',
        components: {
            AppColorPicker
        },
        data() {
            return {
                value: '',
            }
        }
    }
</script>
