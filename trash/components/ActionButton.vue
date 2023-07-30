<template>
    <button class="action" :disabled="disabled" @click="$emit('click')" data-qa="action">
        <slot>
            <slot name="prefix"/>
            {{label}}
            <slot name="postfix"/>
        </slot>
    </button>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({name: 'ActionButton'})
export default class ActionButton extends Vue {
  @Prop()
  public label?: string;

  @Prop({default: false})
  public disabled!: boolean;
}
</script>

<style lang="scss" scoped>
    button.action {
        border: solid thin #ccc;
        font-size: x-small;
        border-radius: 2px;
        background: linear-gradient(to top, #ece9e6, #ffffff);
        padding: 3px;
        width: 100%;

        &.on {
            background: linear-gradient(to top, #cccccc, #efefef);
        }
    }
</style>
