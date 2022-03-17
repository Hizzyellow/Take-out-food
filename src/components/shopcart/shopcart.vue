<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-a-16-23_fuzhi-06" :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">
                  ￥{{totalPrice}}
                </div>
                <div class="deliver">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
              <div class="pay" :class="payClass">
                {{pays}}
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array, // 如果你的type是Array或者是一个Object,默认值就是一个函数
      default () {
        return [{
          price: 17,
          count: 1
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0 // 加一个默认值比较好
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
         total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.count;
      });
      return total;
    },
    pays () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      }
      if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'none-enough';
      } else {
        return 'enough';
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed //可以给这个组件绝对定位
    left: 0
    z-index: 50
    bottom: 0
    width: 100%
    height: 48px
    .content
      display: flex // flex自适应布局
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block // 写了inline-block就要应该在父元素写font-size: 0
          position: relative
          top: -10px //这个就是向上突出的部分
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box // 告诉浏览器去理解你设置的边框和内边距的值是包含在width内的
          vertical-align: top
          border-radius: 50% // 通用样式,50%就是一个圆
          background: #141d27 // 和父组件是一样的背景颜色
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            font-size: 9px
            line-height: 16px
            text-align: center
            border-radius: 16px
            color: rgb(255,255,255)
            background-color: rgb(240,20,20)
            box-shadow: 0px 4px 8px 0 rgba(0,0,0,0.4)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c //黑灰色
            &.highlight // 加上highlight
              background-color: rgb(0,160,240) // 图标变蓝色
            .icon-a-16-23_fuzhi-06
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight // 加上highlight
                color: #fff // 图标变成白色
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          line-height: 24px // line-height写这个是因为如果写48的话,border-right就会撑开一整个布局,不符合要求
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highlight // 加上highlight
            color: #fff // 字体变成白色
        .deliver
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          font-size: 10px
          font-weight: 700
          line-height: 24px
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px // 绝对定位,绝对像素
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          color: rgba(255,255,255,0.4)
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.none-enough
            background: #2b333b // 和原样式相同
          &.enough
            background: green //背景变成绿色
            color: #fff // 字体变成白色
</style>
