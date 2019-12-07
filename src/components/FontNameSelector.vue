<template>
    <select class="font-family" v-model="selectedFamily">
        <option v-for="family in families" :value="family" :key="family">
            {{family}}
        </option>
    </select>
</template>
<script lang="ts">
  import { Component, Prop } from "vue-property-decorator"
  import Vue from 'vue';

  @Component({name: 'font-family-selector'})
  export default class FontFamilySelector extends Vue {
    @Prop({default: 'Lato'})
    value!: string;

    families = ['Lato','Sans','Serif','Courier','Courier New']

    get selectedFamily() {
      return this.value
    }

    set selectedFamily(newValue: string) {
      this.$emit('input', newValue)
      this.$emit('change', newValue)
    }
  }
</script>
