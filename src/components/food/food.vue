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
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="foods.ratings"
          @change="change" @toggle="toggle"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="foods.ratings && foods.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in foods.ratings" :key="rating.index" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'iconfont icon-minus-circle':rating.rateType===1,'iconfont icon-plus-circle':rating.rateType===0}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!foods.ratings || !foods.ratings.length">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import split from 'components/split/split.vue';
import ratingselect from 'components/ratingselect/ratingselect.vue';
import {formatDate} from 'common/js/date.js';
import Vue from 'vue';
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  props: {
    foods: {
        type: Object
    }
  },
  data () {
    return {
       showFlag: false,
       selectType: ALL,
       onlyContent: true,
       desc: {
         all: '全部',
         positive: '推荐',
         negative: '吐槽'
       }
    };
  },
  methods: {
    show () {
      this.showFlag = true;
      this.selectType = ALL; // 保持初始化状态
      this.onlyContent = true; // 保持初始化状态
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
    },
    change (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggle (val) {
      this.onlyContent = val;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow (type, text) {
      if (this.onlyContent && !text) { // 1.如果只显示内容且不含文本return false 2.有文本,显不显示都一样 true 3.只显示内容且有内容,true
        return false;
      }
      if (this.selectType === ALL) { // 判断this.selectType,这个时候是onlyContent为false或者是有文本的时候
        return true;
      } else {
        return type === this.selectType; // 否则选择类型要与判断类型要一致,就是只return true的,不return false的,有三个 ALL,positive,negative
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
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
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              margin-right: 6px
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147,153,159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
            .icon-minus-circle, .icon-plus-circle
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-plus-circle
              color: rgb(0,160,220)
            .icon-minus-circle
              color: rgb(7,17,27)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147,153,159)
</style>
