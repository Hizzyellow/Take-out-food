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
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <!-- 两个span靠在一起就没有留白像素 ,正常来说是有留白像素的-->
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
      <!-- 记住这里设置的宽高很重要 -->
    </div>
    <transition name="fade">
      <div  v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 然后在这里传值 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="item.index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title-twice">
              <div class="line-twice"></div>
              <div class="text-twice">商家公告</div>
              <div class="line-twice"></div>
            </div>
            <div class="title-bulletin">
              <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-chahao"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from 'components/star/star.vue';
  export default{
    components: { // import后记得这这里定义
      star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () { // 重点
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () { // 重点
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
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
    position :relative // 这里是backgroud的父元素,记得relative
    background-color :rgba(7,17,27,0.5)
    overflow :hidden // 没有这个的话图片的下边缘会漏出来一点
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
        .icon-youjiantou
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
        font-size :8px
        color :rgb(255,255,255)
        font-weight :200 //字体宽度
        line-height :1.75rem
        padding :0 0.25rem //上下,右左
      .icon-youjiantou
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
    .detail
      position :fixed //相对于浏览器窗口定位 没有这个的话覆盖不了整一个页面
      z-index :100 //放在最上面的一层
      width :100%
      height :100%
      overflow :auto
      top :0
      left :0
      //opacity :1
      background:rgba(7,17,27,0.8) //这个是一定要有的
      backdrop-filter: blur(10px) //背景模糊
      &.fade-enter-active,&.fade-leave-active
        transition : all 0.5s //0.5秒的渐变
      &.fade-enter,&.fade-leave-to //当进入前是 opacity :0,退出后为 opacity :0,可以搭配上个图理解
        opacity :0
        background:rgba(7,17,27,0)
      .detail-wrapper
        min-height :100% //要撑满父元素
        .detail-main //我晕了,这里之前写了.
          margin-top :64px
          padding-bottom :64px //这个是一定需要的,就是用来放置最下面的元素 (64+64)/2
          .name //这个就是标题
            text-align :center
            font-size :16px
            font-weight :700
            color :rgb(255,255,255)
            line-height :16px
          .star-wrapper
            margin-top :16px
            padding :2px 0
            text-align :center
          .title
            display :flex //布局要放在最上面,这是一个编码习惯 vue.router会在执行的时候会引用到一个Postcss工具,会给这写有兼容性的属性自动添加一些兼容性代码
            width :80%
            margin :28px auto 24px auto //这个就是设计稿的东西
            .line //相当与写了一个容器布局
              flex :1
              position :relative//要写了这个后才可以写下面的代码top:-6px
              top:-6px
              border-bottom :1px solid rgba(255,255,255,0.2) //然后在这个容器的最下面来设置一个1px加粗边框,在加上颜色
            .text
              padding :0 12px
              font-weight :700
              font-size :14px
          .supports
            width :80%
            margin :0 auto
            .support-item
              padding :0 12px
              margin-bottom :12px
              font-size :0 //因为下面要写display:inlin-kblock
              &:last-child
                margin-bottom :0//最后一个孩子没有下margin
              .icon
                display :inline-block //一定要写了inlink-block才可以定义长宽
                width :16px
                height :16px
                vertical-align :top
                margin-right :6px
                background-size :16px 16px
                &.decrease
                 bg-image('decrease_2')
                &.discount
                 bg-image('discount_2')
                &.invoice
                 bg-image('invoice_2')
                &.special
                 bg-image('special_2')
                &.guarantee
                 bg-image('guarantee_2')
              .text
                font-size :12px
                font-weight :200
                color :rgb(255,255,255)
                line-height :16px
          .title-twice
            display :flex //布局要放在最上面,这是一个编码习惯 vue.router会在执行的时候会引用到一个Postcss工具,会给这写有兼容性的属性自动添加一些兼容性代码
            width :80%
            margin :28px auto 24px auto //这个就是设计稿的东西
            .line-twice //相当与写了一个容器布局
              flex :1
              position :relative//要写了这个后才可以写下面的代码top:-6px
              top:-6px
              border-bottom :1px solid rgba(255,255,255,0.2) //然后在这个容器的最下面来设置一个1px加粗边框,在加上颜色
            .text-twice
              padding :0 12px
              font-weight :700
              font-size :14px
          .title-bulletin
            width :80%//相对与父元素的80%布局,和上面一样
            margin :24px auto //上下24px 左右自动对齐
            .text
              font-size :12px
              font-weight :200
              color :rgb(255,255,255)
              line-height :24px
      .detail-close
        position :relative
        width :32px //这两个就是icon的图标大小
        height :32px
        margin :-64px auto 0 auto //因为这个和detail-wrapper是同一级,所以这里要是-64 前面不是最小已经撑满屏幕了!!!
        clear :both//清除浮动造成的混乱
        font-size:32px
</style>
