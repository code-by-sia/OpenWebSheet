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

    mounted() {
      this.ui = new UI(<HTMLElement>this.$refs['canvas-container']);
      this.$emit('ready', this.ui);
      this.ui.addOnChangeEventListener((doc: OpenDocument) => {
        this.$emit('change', doc);
      })

      // $('#merge-action').click(function () { return ui.execCmd(ui.isMerged ? 'unmerge' : 'merge'); });
      // $('#left-action').click(function () { return ui.execCmd('align', 'left'); });
      // $('#center-action').click(function () { return ui.execCmd('align', 'center'); });
      // $('#right-action').click(function () { return ui.execCmd('align', 'right'); });
      // $('#top-border-action').click(function () { return ui.execCmd('top-border', $('#border-color').val()); });
      // $('#left-border-action').click(function () { return ui.execCmd('left-border', $('#border-color').val()); });
      // $('#cross-border-action').click(function () { return ui.execCmd('cross-border', $('#border-color').val()); });
      // $('#horizontal-border-action').click(function () { return ui.execCmd('horizontal-border', $('#border-color').val()); });
      // $('#vertical-border-action').click(function () { return ui.execCmd('vertical-border', $('#border-color').val()); });
      // $('#right-border-action').click(function () { return ui.execCmd('right-border', $('#border-color').val()); });
      // $('#bottom-border-action').click(function () { return ui.execCmd('bottom-border', $('#border-color').val()); });
      // $('#border-grid .all').click(function () { return ui.execCmd('full-border', $('#border-color').val()); });
      // $('#no-border').click(function () { return ui.execCmd('no-border', '#fafafa'); });

    }
  }
</script>

<style scoped>
    .open-sheet {
        flex: 1;
        position: relative;
    }
</style>
