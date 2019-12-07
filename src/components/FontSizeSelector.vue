<template>
    <select class="font-size" v-model="selectedSize">
        <option v-for="size in sizes" :value="size" :key="size">
            {{size}}
        </option>
    </select>
</template>
<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import Vue from 'vue';

  @Component({name: 'font-size-selector'})
  export default class FontSizeSelector extends Vue {
    @Prop({default: 12})
    value!: number;

    sizes = [6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 48, 72]

    get selectedSize() {
      return this.value
    }

    set selectedSize(newValue: number) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  }
</script>
