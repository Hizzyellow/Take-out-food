<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses"  class="star-item" :class="itemClass" :key="itemClass.index"></span>
    <!-- vue2.2.0+的版本里，当在组件中使用v-for时，key是必须的。如果直接写key只为item的话会导致key值重复,加上一个index就不会了 -->
  </div>
</template>

<script>
  const LENGTH = 5;// 一共有5个星星
  const CLS_ON = 'on';// 代码要写有语义的东西,这个定义的话后期就不用修改这么多东西
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props: { // props接收值,是接收来来自header组件的值
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () { // 这个是来接收该星星像素是多少
        return 'star-' + this.size;
      },
      itemClasses () { // 这里是一个数组 接收data.json数据{{seller.score}}看看应该显示
        let result = [];
        let score = Math.floor(this.score * 2) / 2;// floor函数是向下取整
        let hasDecimal = score % 1 !== 0;// 当有余数的时候,只能1.5,2.5,3.5,4.5 只能是.5形式
        let integer = Math.floor(score);// 这里是取整数部分
        for (let i = 0; i < integer; i++) { // 当有整数的时候就往里塞多少颗完整的星星
          result.push(CLS_ON);
        }
        if (hasDecimal) { // 只有有一个.5的形式存在,有的话就往里面塞一个半星
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) { // 如果长度小于5的话就自动补充空星星的图标
          result.push(CLS_OFF);
        }
        return result;// 最后返回一个数组
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';//要用bg-image所以要引用
  .star
    font-size :0 //看下面两行
    .star-item
      display :inline-block //因为这里是inline-block排列,所以上面要font-size为0
      background-repeat :no-repeat//图片不平铺
    &.star-48 //&代表父元素 记住这个是和star-item同级
      .star-item
        width :20px
        height :20px
        margin-right :22px//这个是算出来的
        background-size :20px 20px
        &:last-child //最后一个星星后面没有右间距
          margin-right :0
        &.on //全星  相当于
          bg-image('star48_on')
        &.half //半星
          bg-image('star48_half')
        &.off //没有星
          bg-image('star48_off')
    &.star-36
      .star-item
        width :15px
        height :15px
        margin-right :6px//这个是算出来的
        background-size :15px 15px
        &:last-child //最后一个星星后面没有右间距
          margin-right :0
        &.on //全星
          bg-image('star36_on')
        &.half //半星
          bg-image('star36_half')
        &.off //没有星
          bg-image('star36_off')
    &.star-24
      .star-item
        width :10px
        height :10px
        margin-right :3px//这个是算出来的
        background-size :10px 10px
        &:last-child //最后一个星星后面没有右间距
          margin-right :0
        &.on //全星
          bg-image('star24_on')
        &.half //半星
          bg-image('star24_half')
        &.off //没有星
          bg-image('star24_off')
</style>
