<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"
      @change="change" @toggle="toggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" :key="rating.index" class="rating-item border-1px">
            <div class="avatar">
              <img  height="28" width="28" :src="rating.avatar">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="iconfont icon-plus-circle"></span>
                <span v-for="item in rating.recommend" :key="item.index" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from 'components/star/star.vue';
import split from 'components/split/split.vue';
import ratingselect from 'components/ratingselect/ratingselect.vue';
import {formatDate} from 'common/js/date.js';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
const ERR_OK = 0;
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
       ratings: [],
       selectType: ALL,
       onlyContent: true,
       desc: {
         all: '全部',
         positive: '满意',
         negative: '不满意'
       }
    };
  },
  components: {
    star,
    split,
    ratingselect
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.data;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
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
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
  .ratings
    position: absolute // 定义一个视口高度 高过视口的高度就会发生better-scroll
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex // flex布局
      padding: 18px 0
      .overview-left
        padding: 6px 0
        flex: 0 0 137px // 宽度为137px
        width: 137px
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        @media only screen and (max-width: 320px) // 如果设备的最大宽度为320px就显示这一个
          flex: 0 0 120px // 宽度为137px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .title
          margin-bottom: 6px
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px // 上右下左
        @media only screen and (max-width: 320px) // 如果设备的最大宽度为320px就显示这一个
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block // 文字和图片放在一起才需要inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block // 文字和图片放在一起才需要inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255,153,0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .time
            margin-left: 12px
            font-size: 12px
            color: rgb(255,153,0)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              margin-right: 6px
              display: inline-block
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              font-weight: 200
              color: rgb(147,153,159)
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size: 0
            .icon-plus-circle,.item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-plus-circle
              color: rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: 1px
              color: rgb(147,153,159)
              background-color: rgb(255,255,255)
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            font-weight: 200
            color: rgb(147,153,159)
</style>
