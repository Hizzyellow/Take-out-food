<template>
  <div class="ratingselect">
      <div class="rating-type border-1px">
          <span @click="select(2,$event)" class="block positive" :class="{'active':typeSelected === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span @click="select(0,$event)" class="block positive" :class="{'active':typeSelected === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span @click="select(1,$event)" class="block negative" :class="{'active':typeSelected === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div class="switch">
          <span class="iconfont icon-dagouyouquan" @click="toggleContent($event)" :class="{'on':contOnly}"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        OnlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    data () {
      return {
        typeSelected: this.selectType,
        contOnly: this.OnlyContent
      };
    },
    methods: {
      select (type, _event) { // 点击的时候外层是有一个BScroll的，所以要传递event阻止默认点击
        if (!event._constructed) { // 浏览器直接return掉,去掉自带click事件的点击
          return;
        }
        // 将this.selectType设置成传入的参数,而不是food传过来的初始化的值，之后样式就可以随着点击改变了
        this.typeSelected = type;
        // 派发事件通知父组件food.vue selectType的改变,将type值传出去
        this.$emit('change', this.typeSelected);
      },
      toggleContent (_event) { // 点击的时候外层是有一个BScroll的，所以要传递event阻止默认点击
        if (!event._constructed) { // 浏览器直接return掉,去掉自带click事件的点击
          return;
        }
        this.contOnly = !this.contOnly;
        this.$emit('toggle', this.contOnly);
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE; // 0
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE; // 1
        });
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px // 因为我们要引入border-1px,否则就会有一小部分缺失
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        line-height: 16px // 针对整一个block
        margin-right: 8px
        border-radius: 2px
        font-size: 12px
        &.active
          color: rgb(255,255,255) // 当选中的时候字体颜色变成白色
        .count
          font-size: 8px
          margin-left: 2px
        &.positive
          background: rgba(0,160,220,0.2) // positive 默认的时候就是这个浅蓝色
          &.active
            background: rgb(0,160,220) // 被选中的时候显示这个颜色
        &.negative
          background: rgba(77,85,93,0.2) // negative 默认的时候就是这个灰色
          &.active
            background: rgb(77,85,93) // 被选中的时候显示这个颜色
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    color: rgb(147,153,159)
    font-size: 0
    .icon-dagouyouquan
      font-size: 18px
      margin-right: 4px
      &.on
        color: green
    .text
      display: inline-block
      vertical-align: top
      font-size: 17px
  .rating-wrapper
    font-size: 12px
</style>
