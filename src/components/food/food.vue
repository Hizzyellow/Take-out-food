<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="foods.image">
          <div class="back">
            <span class="iconfont icon-plus-circle" @click="back"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{foods.name}}</h1>
          <div class="detail">
            <span class="sell">月售{{foods.sellCount}}份</span><span class="rating">好评率{{foods.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{foods.price}}</span><span class="old" v-show="foods.oldPrice">¥{{foods.oldPrice}}</span>
          </div>
           <div class="cartcontrol-wrapper">
            <cartcontrol :food="foods" @cart-add="handlecartAdd"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!foods.count||foods.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="foods.info"></split>
        <div class="info" v-show="foods.info">
          <h1 class="title">商品详情</h1>
          <p class="text">{{foods.info}}</p>
        </div>
        <split></split>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import split from 'components/split/split.vue';
import Vue from 'vue';
export default {
  props: {
    foods: {
        type: Object
    }
  },
  data () {
    return {
       showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    back () {
      this.showFlag = false;
    },
    addFirst (_event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target); // 第一个就会加入
      Vue.set(this.foods, 'count', 1);
    },
    handlecartAdd () {
      this.$emit('cart-add', event.target); // 派发事件
    }
  },
  components: {
    cartcontrol,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transform: translate3d(0,0,0)
      transition: all 0.3s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100% // 这个有点意思
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-plus-circle
        display: block
        padding: 10px
        font-size: 20px
        color: #fff
    .content
      position: relative
      padding: 18px 0 0 18px
      .title
        font-size: 14px
        line-height: 14px
        font-weight: 700
        color: rgb(7,17,27);
      .detail
        margin-top: 8px
        .sell, .rating
          font-size: 10px
          line-height 10px
          color: rgb(147,153,159)
        .sell
          margin-right: 12px
      .price
        font-weight :700
        line-height :24px
        .now // 新价格
          margin-right :8px // 间隔
          font-size :14px
          color: red
        .old // 旧价格
          text-decoration :line-through // 这个是在文字中间划过一条横线
          font-size :10px
          color :rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 10px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background-color: rgb(0,160,220)
        transition: all 0.2s
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 14px
        font-weight: 200
        color: rgb(77,85,93)
</style>
