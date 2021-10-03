<template>
    <div
        class="colorpicker"
        :class="colorpickerClasses"
    >
        <label
            v-if="textLeft"
            class="colorpicker__label colorpicker__label--left"
        >
            {{ label }}
        </label>

        <button
            class="colorpicker__button button"
            type="button"
            :style="{ background: getColorPickerValue}"
            :disabled="disabled"
            @click.stop.prevent="handleColorPickerClick"
        />

        <label
            v-if="!textLeft"
            class="colorpicker__label colorpicker__label--right"
        >
            {{ label }}
        </label>

        <transition name="effects-fade-slow">
            <div
                v-show="isShow.popup"
                ref="popup"
                class="colorpicker__popup popup"
                :class="popupClasses"
            >
                <div class="colorpicker__popup-inner">
                    <div class="colorpicker__popup-block">
                        <div class="colorpicker__swatches">
                            <ul class="colorpicker__swatches-list">
                                <li
                                    v-for="item in swatches"
                                    :key="item.id"
                                    class="colorpicker__swatches-item"
                                    :class="swatchClasses(item.id)"
                                >
                                    <app-button
                                        class="colorpicker__swatch"
                                        type="button"
                                        :style="{ background: item.color}"
                                        :disabled="item.disabled"
                                        @click.prevent="handleSwatchClick(item, item.color)"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="colorpicker__popup-block">
                        <div class="colorpicker__palette">
                            <div class="colorpicker__palette-actions">
                                <div class="colorpicker__palette-col colorpicker__palette-col--control">
                                    <label class="colorpicker__palette-label">
                                        Свой цвет
                                    </label>

                                    <input
                                        class="colorpicker__palette-input input"
                                        :style="{ background: colorPalette}"
                                        @click="handlePaletteOpenButtonClick"
                                    />
                                </div>

                                <div class="colorpicker__palette-col colorpicker__palette-col--button">
                                    <app-button
                                        class="colorpicker__palette-button"
                                        @click.prevent="handleColorPickerClick"
                                    >
                                        Ок
                                    </app-button>
                                </div>
                            </div>

                            <transition name="effects-fade-slow">
                                <div
                                    v-show="isShow.palettePopup"
                                    class="colorpicker__palette-popup"
                                >
                                    <chrome-picker
                                        v-model="paletteColors"
                                        @input="handlePaletteColorsChange"
                                    />
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import AppButton from '@/components/app/app-button/';

export default {
    name: 'app-color-picker',

    components: {
        AppButton,
    },

    model: {
        prop: 'value',
        event: 'update',
    },

    props: {
        swatchesCustom: {
            type: Array,
            default: null,
        },

        value: {
            type: String,
            default: '',
        },

        label: {
            type: String,
            default: 'Выберите цвет',
        },

        textLeft: {
            type: Boolean,
            default: false,
        },

        popupPosition: {
            type: String,
            default: 'bottom',
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            paletteColors: '',

            isShow: {
                popup: false,
                palettePopup: false,
            },

            colorPalette: '',

            active: 0,

            swatchesDefault: [
                { color : '#E4087E', disabled: false, id: 1 },
                { color : '#F6648B', disabled: false, id: 2 },
                { color : '#F891A6', disabled: false, id: 3 },
                { color : '#FFCCD5', disabled: false, id: 4 },
                { color : '#8F5099', disabled: false, id: 5 },
                { color : '#A364AD', disabled: false, id: 6 },
                { color : '#C182CB', disabled: false, id: 7 },
                { color : '#E1AAE1', disabled: false, id: 8 },
                { color : '#85AC29', disabled: false, id: 9 },
                { color : '#99C03D', disabled: false, id: 10 },
                { color : '#ADD451', disabled: false, id: 11 },
                { color : '#D6F293', disabled: false, id: 12 },
                { color : '#FFA51A', disabled: false, id: 13 },
                { color : '#FFB748', disabled: false, id: 14 },
                { color : '#FFC976', disabled: false, id: 15 },
                { color : '#FFEDD1', disabled: false, id: 16 },
            ],
        };
    },

    computed: {
        popupClasses() {
            return [
                {
                    [`colorpicker__popup--${this.popupPosition}`]: this.popupPosition,
                },
            ];
        },

        colorpickerClasses() {
            return [
                {
                    'colorpicker--disabled' : this.disabled,
                },
            ];
        },

        getColorPickerValue() {
            return this.value ? `#${this.value}` : '#E4087E';
        },

        swatches() {
            return this.swatchesCustom ? this.swatchesCustom : this.swatchesDefault;
        },
    },

    beforeMount() {
        document.addEventListener('click', this.handleDocumentClick);
    },

    mounted() {
        if (this.value) {
            if (this.swatches.some(elem => elem.color === this.value)) {
                this.active = this.swatches.filter(elem => elem.color === this.value)[0].id;
            } else {
                this.colorPalette = this.value;
            }
        } else {
            this.active = 1;
        }
    },

    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick);
    },

    methods: {
        swatchClasses(id) {
            return {
                'colorpicker__swatches-item--active' : id === this.active,
            };
        },

        openPopup() {
            this.isShow.popup = true;
            document.addEventListener('keydown', this.handleDocumentKeydown);
        },

        closePopup() {
            this.isShow.popup = false;
            document.removeEventListener('keydown', this.handleDocumentKeydown);
        },

        changePopupState() {
            return this.isShow.popup ? this.closePopup() : this.openPopup();
        },

        handleSwatchClick(index, value) {
            if (!index) {
                return;
            }

            if (this.active === index.id) {
                return;
            }

            this.active = index.id;
            this.closePopup();
            this.colorPickerValue = value;
            this.$emit('update', this.prepareResultValue(value));
        },

        handleColorPickerClick() {
            if (this.isShow.palettePopup) {
                this.isShow.palettePopup = false;
            }

            setTimeout(() => {
                this.changePopupState();
            }, 500); // для анимации
        },

        handlePaletteColorsChange(val) {
            this.colorPickerValue = val.hex;
            this.colorPalette = val.hex;
            this.active = 0;
            this.$emit('update', this.prepareResultValue(val.hex));
        },

        handlePaletteOpenButtonClick() {
            this.isShow.palettePopup = !this.isShow.palettePopup;
        },

        handleDocumentClick(event) {
            let outside = !this.$refs.popup.contains(event.target);

            if (outside) {
                this.closePopup();
            }
        },

        handleDocumentKeydown(e) {
            if (e.code === 'Escape') {
                this.closePopup();
            }
        },
        prepareResultValue(value){
            return value.replace('#','');
        },
    },
};
</script>
