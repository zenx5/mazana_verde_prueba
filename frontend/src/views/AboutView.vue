<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ msg }} : {{ $store.state.count }}</p>
    <v-btn @click="up">Count</v-btn>
    <RouterView />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
  import store from '../store'
  console.log(store.state.count)
  export default {
    name: 'AboutView',
    store,
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      up () {
        this.$store.commit('increment')
      }
    }
  }
</script>
