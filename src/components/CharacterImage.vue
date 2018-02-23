<template>
  <div class="col-md-4">
    <img :src="character.image" alt="" id="image" @click="updateUserCharacter">
    <h3>{{character.name}}</h3>
  </div>
</template>

<script>
import { roomRefs } from '../firebase'
export default {
    data () {
        return {
            img: '',
            name: this.character.name
        }
    },
    props: ['character'],
    methods: {
      updateUserCharacter(){
        roomRefs.child(this.$store.state.roomId).child(this.$store.state.userId).update({ selectedCharacter : this.character})
        this.$router.push('/battle')
      }
    }
}
</script>

<style>
#image:hover{
      transform: scale(1.3);
      margin-bottom: 17px;
  }
#image{
    width: 20%
}
</style>
