<template>
    <select class="font-family" v-model="selectedFamily" data-qa="font-name-selector">
        <option v-for="family in families" :value="family" :key="family" >
            {{family}}
        </option>
    </select>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({name: 'font-family-selector'})
export default class FontFamilySelector extends Vue {
  @Prop({default: 'Lato'})
  public value!: string;

  public families = ['Lato', 'Sans', 'Serif', 'Courier', 'Courier New'];

  get selectedFamily() {
    return this.value;
  }

  set selectedFamily(newValue: string) {
    this.$emit('input', newValue);
    this.$emit('change', newValue);
  }
}
</script>
