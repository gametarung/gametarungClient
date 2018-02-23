<template lang="html">
  <div class="footer">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <h6 id="labelFooter" >Create your own room!</h6>
      <input type="text" name="" value="" placeholder="Please enter your name" style="min-width: 500px;" id="labelFooter" v-model="username" >
      <button type="button" class="btn btn-info" id="buttonFooter" @click="createRooms">Success</button>
    </nav>
  </div>

</template>

<script>
import { roomRefs } from '../firebase'
export default {
  data () {
    return {
      username: '',
      char: ''
    }
  },
  methods: {
    createRooms(){
      let data = {
        name : this.username,
        hp : 100,
        selectedCharacter : this.char,
        isTurn : true
      }
      // localStorage.setItem('id', 1)
      this.$store.dispatch('setUser', 'user1')
      let key = roomRefs.push({ user1 : data}).key;
      this.$store.dispatch('setRoom', key)
      this.$router.push('/character')
    },
  }
}
</script>

<style lang="css">
.footer {
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
}
#labelFooter {
  margin-left: 150px;
}

#buttonFooter {
  margin-left: 150px;
}
</style>
