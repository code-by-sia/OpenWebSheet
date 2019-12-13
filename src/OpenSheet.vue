<template>
    <div class="open-sheet" ref="canvas-container"></div>
</template>

<script lang="ts">
  import { Component } from "vue-property-decorator";
  import Vue from 'vue';
  import { UI } from "@/lib/UI"
  import { OpenDocument } from "@/lib/core/Document"

  @Component({name: "OpenSheet"})
  export default class OpenSheet extends Vue {
    private ui!: UI

    execute(command: string, args?: any) {
      this.ui.execCmd(command, args)
    }

    load(file: string) {
      this.ui.load(file)
    }

    mounted() {
      this.ui = new UI(<HTMLElement>this.$refs['canvas-container']);
      this.$emit('ready', this.ui);
      this.ui.addOnChangeEventListener((doc: OpenDocument) => {
        this.$emit('change', doc);
      })
    }
  }
</script>

<style scoped>
    .open-sheet {
        flex: 1;
        position: relative;
    }
</style>
