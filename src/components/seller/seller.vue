<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="decs border-1px">
          <star :size="36" :score="seller.score"></star>
          <div class="text">({{seller.ratingCount}})</div>
          <div class="text">月售{{seller.sellCount}}单</div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span>元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span>分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="iconfont icon-plus-circle" :class="{'active':favorite}" @click="toggleFavorite($event)"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper border-1px">
          <div class="content">{{seller.bulletin}}</div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="item.index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos" :key="info.index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {saveToLocal, loadFromLocal} from 'common/js/score';
import star from 'components/star/star.vue';
import split from 'components/split/split.vue';
export default {
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  props: {
    seller: { // 一开始是一个空数组
      type: Object
    }
  },
  components: {
    star,
    split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];// 弄一个数组来遍历
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        console.log(2);
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {click: true});
        });
      } else {
        console.log(555);
        this.scroll.refresh();
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        if (!this.picScroll) {
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        } else {
          this.picScroll.refresh();
        }
      }
    },
    toggleFavorite (_event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  },
  watch: {
    'seller' () {
      this._initScroll();
      this._initPics();
    }
  },
  mounted () {
    // console.log(222);
    this._initScroll();
    this._initPics();
  }
  // activated () {
  //   this._initScroll();
  //   this._initPics();
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
  .seller
    position: absolute // 定义一个视口高度 高过视口的高度就会发生better-scroll
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 14px
        color: rgb(7,17,27)
      .decs
        font-size: 0
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          margin-right: 12px
          display: inline-block
          vertical-align: top
          line-height: 18px
          font-size: 10px
          color: rgb(77,85,93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .content
            padding-bottom: 18px
            line-height: 24px
            font-size: 10px // 总的字体大小
            color: rgb(7,17,27)
            .stress
              font-size: 24px // 这个再特别一点
      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-plus-circle
          display: block
          margin-bottom: 4px
          font-size: 24px
          line-height: 24px
          color: #d4d6d9
          &.active
            color: rgb(240,20,20)
        .text
          font-size: 10px
          line-height: 10px
          color: rgb(77,85,93)
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 14px
        color: rgb(7,17,27)
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7,17,27,0.1))
        .content
          line-height: 24px
          font-size: 12px
          font-weight: 200
          color: rgb(240,20,20)
      .supports
        .support-item
          padding: 16px 12px
          font-size: 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none(); // 最后一个孩子不加1像素border
          .icon
            display :inline-block
            vertical-align : top
            margin-right: 6px
            width :0.75rem
            height :0.75rem
            background-size :0.75rem 0.75rem
            background-repeat :no-repeat //图片不平铺
            &.decrease
             bg-image('decrease_4')
            &.discount
             bg-image('discount_4')
            &.invoice
             bg-image('invoice_4')
            &.special
             bg-image('special_4')
            &.guarantee
             bg-image('guarantee_4')
          .text
            display :inline-block
            vertical-align : top
            line-height: 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7,17,27)
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 12px
        font-size: 14px
        color: rgb(7,17,27)
      .pic-wrapper
        width: 100%
        overflow: hidden // 超过的部分隐藏
        white-space: nowrap // 图片宽度超过屏幕宽度的话不折行
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block // 可以减少间隙
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0
    .info
      padding: 18px 18px 0 18px
      .title
        padding-bottom: 12px
        line-height: 12px
        font-size: 14px
        color: rgb(7,17,27)
      .info-item
        padding: 16px 12px
        border-1px(rgba(7,17,27,0.1))
        line-height: 16px
        font-weight: 200
        font-size: 12px
        color: rgb(7,17,27)
        &:last-child
          border-none()
</style>
