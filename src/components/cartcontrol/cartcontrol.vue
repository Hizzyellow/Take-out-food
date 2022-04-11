<template>
    <div class="cartcontrol">
        <transition name="move">
          <div class="cart-decrease" @click.stop="decreaseCart" v-show="food.count>0">
          <span class="inner iconfont icon-minus-circle"></span>
        </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click.stop="addCart">
            <span class="iconfont icon-plus-circle"></span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    props: {
       food: {
            type: Object
        }
    },
    methods: {
        addCart (_event) {
          if (!event._constructed) {
              return;
          }
          if (!this.food.count) {
              Vue.set(this.food, 'count', 1); // 引用Vue的接口,this.food增加一个count属性,给这个值设为1
          } else {
              this.food.count++;
          }
          this.$emit('cart-add', event.target); // 通过$emit时间来派发一个事件,把event.target作为dom对象传入
        },
        decreaseCart (_event) {
          if (!event._constructed) {
              return;
          }
          if (this.food.count >= 0) {
              this.food.count--;
          }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        //font-size: 24px // 这个一定要注销,不然会报错
        line-height: 24px
        color: rgb(0,160,220)
      &.move-enter-active,&.move-leave-active
        transition: all 0.5s linear
        opacity: 1
        transform: translate3d(0,0,0) // 使画面看起来更加流畅
        .inner //下面三个是旋转的
          transition: all 0.5s linear
          opacity: 1 // 一开始透明度为1,旋转不用改透明
          transform: rotate(0deg) // css旋转样式
      &.move-enter,&.move-leave-active
        opacity: 0 //从0到1,有渐变效果,默认是1的
        transform: translate3d(24px,0,0) //x,y,z轴
        .inner
          opacity: 1
          transform: rotate(180deg) // 180度旋转
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,169)
    .cart-add
      display: inline-block
      padding: 6px
      //font-size: 24px // 不知道为什么这个会变,奇奇怪怪 先注销了
      line-height: 24px
      color: rgb(0,160,220)
</style>
