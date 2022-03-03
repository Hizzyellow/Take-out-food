<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater">
        <img width="64" heigh ="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-a-16-23_fuzhi-06"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <!-- 两个span靠在一起就没有留白像素 ,正常来说是有留白像素的-->
      <i class="icon-a-16-23_fuzhi-06"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
      <!-- 记住这里设置的宽高很重要 -->
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];// 弄一个数组来遍历
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .header
    color :#fff
    position :relative //这里是backgroud的父元素,记得relative
    background-color :rgba(7,17,27,0.5)
    .content-wrapper
      padding : 24px 12px 18px 24px
      font-size :0
      position :relative//小黑块定位之前要在父元素加上这个 !!!!!
      .avater
        display :inline-block // 把元素放在一行 通俗来说就是不独占一行的元素
        vertical-align :top// 使图片和文字在所在行的顶部对齐
        img
          border-radius :0.25rem // 圆角
      .content
        padding-left :1rem
        display :inline-block
        // font-size :1rem // 这里其实可以删掉? 一定要删掉不然后面的样式会改变 font-size会影响冲突
        .title
          margin :2px 0 8px 0
          .brand
            display :inline-block // 这里制定成这个才有用 因为原文是一个span标签 这样就在一行上面
            vertical-align :top // 因为两个span标签表示的是不一样的东西,所以不能对齐,这里这意思是规定顶部对齐
            width :1.875rem
            height :1.125rem
            bg-image('brand')
            background-size :1.875rem 1.125rem
            background-repeat :no-repeat
          .name
            margin-left :0.375rem
            font-size :1rem
            color :rgb(255,255,255)
            font-weight :bold
            line-height :1rem
        .description
            margin :0.5rem 0 0.625rem 0
            font-size :0.75rem
            color :rgb(255,255,255)
            line-height : 0.75rem
        .support
          .icon
            vertical-align : top
            display :inline-block
            margin :0 0.25rem 0.125rem 0
            width :0.75rem
            height :0.75rem
            background-size :0.75rem 0.75rem
            background-repeat :no-repeat //图片不平铺
            &.decrease
             bg-image('decrease_1')
            &.discount
             bg-image('discount_1')
            &.invoice
             bg-image('invoice_1')
            &.special
             bg-image('special_1')
            &.guarantee
             bg-image('guarantee_1')
          .text
            line-height :0.75rem
            font-size :0.625rem
            color :rgb(255,255,255)
            font-weight :200
      .support-count
        position :absolute
        right:0.75rem
        bottom :1.125rem
        padding :0 0.5rem
        height :1.5rem
        line-height :1.5rem
        border-radius :0.875rem
        background :rgba(0,0,0,0.2)
        text-align :center
        .count
          font-size :0.625rem
        .icon-a-16-23_fuzhi-06
          font-size :0.625rem
    .bulletin-wrapper
      // vertical-align :top
      position:relative//这个是小箭头父元素的
      height :28px//标注说明
      line-height :28px
      padding :0 1.375rem 0 0.75rem
      white-space :nowrap // 以下三个是点点点省略号的写法
      overflow :hidden
      text-overflow :ellipsis
      background-color :rgba(7,17,27,0.2)
      .bulletin-title //这个是那张图片
        // vertical-align :top
        display :inline-block //记得写这个 才可以定义width和height
        width :1.375rem
        height :0.75rem
        bg-image('bulletin')
        background-size :1.375rem 0.75rem
        background-repeat :no-repeat//不平铺图片
      .bulletin-text
        vertical-align :top
        font-size :0.625rem
        color :rgb(255,255,255)
        font-weight :200 //字体宽度
        line-height :1.75rem
        padding :0 0.25rem //上下,右左
      .icon-a-16-23_fuzhi-06//这里又显示不出来
        position :absolute //小箭头的绝对定位
        font-size :0.625rem
        right :10px //从右边移过来10像素
        top : 0.125rem//从下面一下来1像素
    .background
     width :100%
     height :100%
     position :absolute
     top:0
     left :0
     z-index :-1 //把图片放在-1层
     filter :blur(10px)//模糊10像素,相当于一个滤镜
</style>
