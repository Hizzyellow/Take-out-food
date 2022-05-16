<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px bordertop-1px" >
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link  to="/seller">商家</router-link> </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from 'common/js/until.js';
  const response = require('./common/data/seller.json');

  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => { // 取到url中的id 这里是一个立即执行函数
            let queryParam = urlParse();
            // console.log(queryParam);
            return queryParam.id;
          })()
        },
        goods: {},
        ratings: {}
      };
    },
    // created () {
    //   this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
    //       response = response.body;
    //       console.log(response);
    //       if (response.errno === ERR_OK) {
    //         this.seller = Object.assign({}, this.seller, response.data); // 为该对象扩展属性就是往data.json里面的数据加上一些自己写的
    //         // console.log(this.seller);
    //         // console.log(this.seller.id); // 这样输出就不会undefined了
    //       }
    //   });
    // },
    created () {
      // this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      //   response = response.body;
      //   if (response.errno === ERR_OK) {
      //     this.seller = Object.assign({}, this.seller, response.data);
      //   }
      // });
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    },
    components: {
     'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display :flex
      width :100%
      height :2.5rem
      line-height :2.5rem
      .tab-item
        flex : 1
        text-align :center
        bordertop-1px:rgba(7,17,27,0.1)
        border-1px:rgba(7,17,27,0.1)
        &>a
          display :block
          font-size :0.875rem
          color :rgb(77,85,93)
          &.active
            color :rgb(240,20,20)
</style>
