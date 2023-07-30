<template>
    <div class="control-box" data-qa="control-box">
        <div class="control-box-controls" :style="{display:grid?'grid':'flex'}" data-qa="content">
            <slot/>
        </div>
        <div class="control-box-header" data-qa="header" v-if="label">{{label}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({name: 'ControlBox'})
export default class ControlBox extends Vue {
  @Prop()
  public label?: string;

  @Prop({default: true})
  public grid!: boolean;
}
</script>

<style lang="scss" scoped>
    div.control-box {
        display: flex;
        background: #fff;
        box-shadow: 2px 2px 1px #cfcfcf;
        border-top: thin solid #ccc;
        border-left: thin dotted #ccc;
        height: 90px;
        overflow: hidden;
        flex-direction: column;

        &:first-child,
        &.independent {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border-style: solid;
        }

        &.independent {
            margin-left: 7px;
        }

        &:last-child,
        &.last {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        &-header {
            font-size: xx-small;
            height: 20px;
            line-height: 20px;
            color: #aaa;
            font-weight: bold;
            background: -webkit-linear-gradient(to top, #ece9e6, #ffffff);
            background: linear-gradient(to top, #ece9e6, #ffffff);
            text-transform: uppercase;
            text-shadow: 1px 1px 0 #fff;
            text-align: center;
        }

        &-controls {
            align-items: center;
            justify-content: center;
            flex: 1;
            padding: 10px 10px 0 10px;
        }

        & .default-place-holder {
            color: #999999;
            text-transform: uppercase;
            font-style: italic;
            font-size: 8px;
            text-shadow: 1px 1px #fefefe;
            padding: 25px 100px;
            align-self: center;
            justify-self: center;
        }


        & p {
            margin-bottom: 5px;
        }

        button {
            border: solid thin #ccc;
            font-size: x-small;
            border-radius: 2px;
            background: linear-gradient(to top, #ece9e6, #ffffff);
        }

        & label {
            font-size: x-small;
        }

        .flat-button {
            color: #333;
            text-shadow: 1px 1px 0 #eee;
            transition-duration: .1s;
            align-items: center;
            align-content: center;
            display: flex;
            padding: 0 5px;
        }

        .flat-button:hover {
            color: #000;
            text-shadow: 2px 2px 0 #ccc;
            transition-duration: .1s;
        }

        .x-large-font {
            font-size: x-large;
        }

        .xx-large-font {
            font-size: xx-large;
        }
    }
</style>
