<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component({name: 'cell-border-style'})
export default class CellBorderStyle extends Vue {

}
</script>
<template>
    <div class="cell-border-style" data-qa="cell-border">
        <div class="borders all" data-qa="full" @click="$emit('change','full-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders inside" data-qa="cross" @click="$emit('change','cross-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders horizontal" data-qa="hor" @click="$emit('change','horizontal-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders vertical" data-qa="ver" @click="$emit('change','vertical-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders outside" data-qa="out" @click="$emit('change','outside-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders left" data-qa="left" @click="$emit('change','left-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders top" data-qa="top" @click="$emit('change','top-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders right" data-qa="right" @click="$emit('change','right-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders bottom" data-qa="bottom" @click="$emit('change','bottom-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

        <div class="borders" data-qa="no" @click="$emit('change','no-border')">
            <div class="top"></div>
            <div class="right"></div>
            <div class="left"></div>
            <div class="bottom"></div>
        </div>

    </div>
</template>
<style lang="scss" scoped>

    .cell-border-style {
        width: 170px;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-gap: 5px;


        & .borders {
            display: grid;
            grid-template-columns: 10px 10px;
            width: 20px;
            height: 20px;
            padding: 3px;
            border-radius: 2px;
            border: solid thin #eee;
        }

        & .borders:hover {
            background: #fff;
            border: dotted 1px #000;
        }

        & .borders > div {
            border: dotted 1px black;
            display: block;
        }

        & .borders.top .top,
        & .borders.top .right,
        & .borders.outside .top,
        & .borders.outside .right,
        & .borders.all .top,
        & .borders.all .right {
            border-top-style: solid;
            border-top-width: 2px;
        }

        & .borders.horizontal .top,
        & .borders.horizontal .right,
        & .borders.inside .top,
        & .borders.inside .right,
        & .borders.all .top,
        & .borders.all .right {
            border-bottom-style: solid;
            border-bottom-width: 2px;
        }

        & .borders.bottom .bottom,
        & .borders.bottom .left,
        & .borders.all .bottom,
        & .borders.all .left,
        & .borders.outside .bottom,
        & .borders.outside .left {
            border-bottom-style: solid;
            border-bottom-width: 2px;
        }

        & .borders.vertical .top,
        & .borders.vertical .left,
        & .borders.inside .top,
        & .borders.inside .left,
        & .borders.all .top,
        & .borders.all .left {
            border-right-style: solid;
            border-right-width: 1px;
        }


        & .borders.right .right,
        & .borders.right .bottom,
        & .borders.outside .right,
        & .borders.outside .bottom,
        & .borders.all .right,
        & .borders.all .bottom {
            border-right-style: solid;
            border-right-width: 2px;
        }

        & .borders.left .top,
        & .borders.left .left,
        & .borders.outside .top,
        & .borders.outside .left,
        & .borders.all .top,
        & .borders.all .left {
            border-left-style: solid;
            border-left-width: 2px;
        }


        & .borders .right,
        & .borders .bottom {
            border-left: none !important;
        }

        & .borders .left,
        & .borders .bottom {
            border-top: none !important;
        }


        & .borders.vertical .right,
        & .borders.vertical .bottom,
        & .borders.inside .right,
        & .borders.inside .bottom,
        & .borders.all .right,
        & .borders.all .bottom {
            border-left-style: solid !important;
            border-left-width: 1px !important;
        }

    }

</style>
