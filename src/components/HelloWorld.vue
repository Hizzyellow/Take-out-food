<template>
  <div class="hello">
    <header></header>
    <h1>{{ msg }}</h1>
    <h2>Hizzyellow又开始了</h2>
    <div>{{ hizz }} </div>
    <!-- 下面datareturn里面注册了才可以使用 -->
  </div>
</template>

<script>
import Header from './header/header.vue';
export default {
  name: 'HelloWorld',
  data () { // 注册一个
    return {
      msg: 'Welcome Hizzyellow',
      hizz: '1111111'
    };
  },
  components: {
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
