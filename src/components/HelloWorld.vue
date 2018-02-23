<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
        <CreateRoom></CreateRoom>
          <Rooms></Rooms>

    

  </div>
</template>

<script>
import { charRefs } from '../firebase'
import Rooms from '@/components/Rooms'
import CreateRoom from '@/components/CreateRoom'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Rooms: Rooms,
    CreateRoom: CreateRoom
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
