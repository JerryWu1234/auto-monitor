<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
function ccc(){
  pageClick({
    ctrl_name: 's',
    arg: {
      "sd": '23',
    },
    event_type: 'click',
  });
}
</script>

<template>
  <h1>page2</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="ccc">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
