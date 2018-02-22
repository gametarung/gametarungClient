<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Ecosystem</h3>
    <Rooms></Rooms>
    <ul>
      <li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    {{character}}
    <button type="button" name="button" @click="nambahCharacter">NAMBAH CHARACTER</button>
  </div>
</template>

<script>
import { charRefs } from '../firebase'
import Rooms from '@/components/Rooms'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Rooms: Rooms
  },
  firebase: {
    character: charRefs
  },
  methods: {
    nambahCharacter () {
      //push langsung object aja bisa
      charRefs.push({
        name: 'anime1',
        gender: 'female'
      })
    },
    cariCharacter (key) {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
