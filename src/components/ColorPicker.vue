<template>
    <div class="color-picker">
        <label>
            <slot>
                <span class="prefix" v-if="!!$slots['prefix']">
                    <slot name="prefix"/>
                </span>
                {{label}}
                <slot name="postfix" class="postfix"/>
            </slot>
        </label>
        <input type="color" v-model="color" id="bg-color"/>
    </div>
</template>

<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import Vue from 'vue';

  @Component({name: "ColorPicker"})
  export default class ColorPicker extends Vue {
    @Prop({default: '#ffffff'})
    value!: string;

    @Prop()
    label?: string;

    get color() {
      if (this.value === null) {
        return '#ffffff';
      }
      return this.value;
    }

    set color(newValue) {
      this.$emit('input', newValue)
    }
  }
</script>

<style lang="scss" scoped>
    .color-picker {
        display: flex;

        & label {
            display: flex;
            align-items: center;
            margin-right: 5px;
        }

        & .prefix {
            margin-right: 5px;
        }

        & .postfix {
            margin-left: 5px;
        }

        & input[type=color] {
            border: none;
            padding: 0;
            width: 20px;
        }
    }
</style>
