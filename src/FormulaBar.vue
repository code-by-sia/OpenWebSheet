<template>
    <div class="formula-bar" :class="{active}">
        <input type="text" class="cell-name" placeholder="SELECTION" :value="label"/>
        <span class="side">
                    <span class="actions">
                        <i class="fa fa-times cancel" @click="$emit('abort')"></i>
                        <i class="fa fa-check commit" @click="$emit('commit')"></i>
                    </span>
                    𝑓𝑥
                </span>
        <input id="formula-input"
               type="text"
               v-model="formula"
               @focusin="active=true"
               @focusout="active=false"
               class="formula"
        />
        <div class="arrow">
            <i class="fas fa-angle-down"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({name: 'FormulaBar'})
export default class FormulaBar extends Vue {
  public active = false;

  @Prop()
  public value!: string;

  @Prop()
  public label!: string;

  get formula() {
    return this.value;
  }

  set formula(newFormula: string) {
    this.$emit('input', newFormula);
  }
}
</script>

<style lang="scss" scoped>
    .formula-bar {
        border-top: solid thin #dcdcdc;
        border-bottom: solid thin #dcdcdc;
        margin-bottom: 2px;
        display: flex;

        & .side {
            padding: 5px 10px;
            font-weight: bolder;
            font-size: 16px;
            line-height: 18px;
            border-left: solid thin #ccc;
        }

        & input.cell-name {
            width: 80px;
            text-align: center;
            border: none;
        }

        & .side .actions {
            font-size: 12px;
            color: gray;
            cursor: pointer;
        }

        &.active {
            & .actions .cancel {
                color: #a80000;
            }

            & .actions .commit {
                color: #00a800;
            }
        }

        & .side .actions i {
            margin: 0 3px;
        }

        & .arrow {
            line-height: 30px;
            margin: 0 10px;
            font-size: 16px;
            cursor: pointer;
            color: lightgray;


            &:hover {
                color: gray;
            }
        }

        & input.formula {
            flex: 1;
            border: none;
            border-left: solid thin lightgray;
            text-indent: 5px;
            margin: 4px 0;
        }
    }

</style>
