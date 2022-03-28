<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class=" iconfont icon-minus-circle" :class="{'highlight':totalCount>0}"></i>
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
        <div class="ball-container">
              <div v-for="(ball,index) in balls" :key="index">
                <transition name="drop" @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter">
                  <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                  </div>
                </transition>
              </div>
        </div>
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.count*food.price}}</span>
                </div>
                <div class="cartconcrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
export default {
  data () {
    return {
      balls: [ // 弄一个小球数组
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropballs: [],
      fold: true
    };
  },
  methods: {
    drop (el) {
      console.log(el); // 验证是否能够正确输出
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropballs.push(ball);
          return;
        }
      }
    },
    handleBeforeEnter: function (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = ''; // 因为display默认是none,这里先把他设置为空
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0]; // getElementsByClassName默认是输出一个集合数组,这里[0]才是取到值
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    // 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
    handleEnter: function (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; // 触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          // Vue为了知道过渡的完成，必须设置相应的事件监听器。
          // 如果没有这一句那将不会执行handleAfterEnter
          el.addEventListener('transitionend', done);
      });
    },
    handleAfterEnter: function (el) {
      // 完成一次动画就删除一个dropBalls的小球
      let ball = this.dropballs.shift(); // 做完一个动画就取一个dropballs
      if (ball) { // 然后重置小球
        ball.show = false;
        el.style.display = 'none'; // 把display设置为默认值
      }
    },
    toggleList () { // 点击事件
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    }
  },
  props: {
    selectFoods: {
      type: Array, // 如果你的type是Array或者是一个Object,默认值就是一个函数
      default () {
        return [];
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
    },
    listShow () {
      if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
    }
  },
  components: {
    cartcontrol
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
            .icon-minus-circle
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
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-active
          transition: all 0.8s cubic-bezier(0.49,-0.49,0.75,0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0,160,220)
            transition: all 0.8s
</style>
