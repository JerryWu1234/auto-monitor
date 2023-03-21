<template>
  <div id="app">
    <div v-html="html"></div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <!-- <div style="height: 500px; overflow:hidden;" id="container"></div> -->
    添加点击事件
    添加路由监听
    <!-- <router-view/> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      html: null
    }
  },
  async created() {
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
