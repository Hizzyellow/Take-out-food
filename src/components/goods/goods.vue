<template>
  <div class="good">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index,event) in goods" :key="index" class="menu-item " :class="{'current':currentIndex===index}"
        @click="selectMenu(index,event)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item.index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(foods,$event)" v-for="foods in item.foods" :key="foods.index" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="foods.icon" >
              </div>
              <div  class="content">
                <h2 class="name">{{foods.name}}</h2>
                <p class="des">{{foods.description}}</p>
                <div class="extra">
                  <span class="count">月售{{foods.sellCount}}份</span><span>好评率{{foods.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{foods.price}}</span><span class="old" v-show="foods.oldPrice">¥{{foods.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cart-add="_drop" :food="foods"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart @cart-add="_drop" ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
    <food :foods="selectedFood" ref="food" @cart-add="_drop"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import food from 'components/food/food.vue';
  const ERR_OK = 0;
  export default {
    props: {// 这里是接受来自App.vue的seller
      seller: {
        type: Object
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data () {
      return {
        goods: {}, // 一开始为空,然后下面的在引入data.json
        listHeight: [], // 存列表高度
        scrollY: 0, // 监视右边的数据
        selectedFood: {} // 已选择的数组
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]; // 区间高点
          let height2 = this.listHeight[i + 1]; // 区间低点
          // console.log(height1);
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) { // 当srcollY不是最后一个或者落在这一个区间的时候
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        let Arr = Array.from(this.goods); // this.goods是一个类数组,不是一个真正的数据,用Array.from可以将类数组对象转换成真正的数组
        // console.log(Arr);
        Arr.forEach((good) => {
          good.foods.forEach((food) => { // food的price就是从这里传进去shopcart
            // console.log(food.count);
            if (food.count) { // 如果count值大于0
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
          // console.log(this.goods);
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      selectMenu (index, _event) {
        if (!event._constructed) {
          return;
        }
        // console.log(index);
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); // 取得foodList这一个dom 所有列表
        let el = foodList[index]; // 滚动到相应列表
        this.foodsScroll.scrollToElement(el, 300); // 页面滚动到el,300ms为滚动时间
      },
      selectFood (foods, _event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = foods;
        this.$refs.food.show(); // 调用子组件的show方法
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, { // 新建一个实例
          click: true // 初始化better-scroll要传一个属性,就是click 因为BS会监听一些touchstart,end,会阻止到一些默认,简单来说就是一开始的click是false
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 希望能实时告诉我们scrollY的位置
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)); // 取一个整数然后取一个绝对值 实时拿到scrollY数据
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight; // 拿到每一个foodList的高度,然后累加
          // console.log(height);
          this.listHeight.push(height); // 方每一个高度放进数组(递增数组)
          // console.log(this.listHeight);
        }
      },
      _drop (target) {
        // 异步执行下落动画,优化体验
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target); // 访问子组件
        });
      }
    },
    events: { // 接收来自cartcontrol,food,shopcart派发的事件
        'cart-add' (target) {
          this._drop(target); // 把target值传进_drop方法
        }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .good
    display :flex
    position :absolute //这里要绝对定位
    top:174px //134+40
    bottom :46px //这里是留着下面的购物车
    width :100%
    overflow :hidden //超出的部分要隐藏
    .menu-wrapper
      flex: 0 0 80px //等分,内容不足缩放情况,占位
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table//垂直居中 父元素写这个
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px //这里是计算出来的
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display :inline-block //一定要写了inlink-block才可以定义长宽
          width :12px
          height :12px
          vertical-align :top
          margin-right :2px
          background-size :12px 12px
          &.decrease
           bg-image('decrease_3')
          &.discount
           bg-image('discount_3')
          &.invoice
           bg-image('invoice_3')
          &.special
           bg-image('special_3')
          &.guarantee
           bg-image('guarantee_3')
        .text // 文字的样式 item.name
          display :table-cell //子元素写1
          width :56px
          vertical-align :middle//子元素写2
          font-size :12px
          font-weight :200
          line-height :14p
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex : 1 //自适应布局
      .title
        padding-left :14px
        height :26px
        line-height :26px
        color :rgb(147,153,159) //文字颜色
        font-size :12px
        border-left :2px solid #d9dde1 //注意这里有个两像素的黑框
        background :#F3F5F7 //背景颜色
      .food-item
        display: flex //这里是自适应布局
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))  //after伪元素
        &:last-child//最后一个孩子元素不用加伪元素和margin-bottom,不然就会撑开叠加,叠加到36px
          border-none()
          margin-bottom: 0
        .icon
          flex : 0 0 57px//默认,默认,icon占57px
          margin-right :10px
        .content
          flex: 1 //右半边部分自适应布局
          .name
            font-size: 14px
            color: rgb(7,17,27)
            line-height: 14px
            margin:2px 0 8px 0
          .des, .extra //共有的属性可以写在一起,减少代码含量
            font-size:10px
            line-height :10px
            color :rgb(147,153,159)
          .des
            line-height: 12px
            margin-bottom :8px//间隔
          .extra
            .count
              margin-right :12px//间隔
          .price
            font-weight :700
            line-height :24px
            .now//新价格
              margin-right :8px//间隔
              font-size :14px
              color: red
            .old//旧价格
              text-decoration :line-through//这个是在文字中间划过一条横线
              font-size :10px
              color :rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
