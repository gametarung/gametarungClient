<template lang="html">
  
  <div class="col-md-4" v-if="!isFull">
    <!-- <h1>{{Object.keys(data)}}</h1> -->
    
    <!-- <h5>{{ data[Object.keys(data)].nama}}</h5> -->
    
<div class="card mb-3">
  <h6 class="card-header">Room {{data.user1.name}} </h6>
  <img style="height: 200px; width: 100%; display: block;" src="../assets/fight.png" alt="">
    <p>{{Object.keys(data).length}}/2 players</p>
    <button type="button" class="btn btn-info btn-sm" @click="tampilinModal" >Join Game!</button>
    <input type="text" name="" placeholder="Please input Your Name!" v-model="username" v-if="modal" @keyup.enter="join(keys)">
  </div>
</div>
  </div>

</template>

<script>
import { roomRefs } from '../firebase'
export default {
  props: ['data', 'keys'],
  methods: {
    tampilinModal () {
      this.modal = true
    },
    join (roomId) {
      let data = {
        name : this.username,
        hp : 100,
        isTurn : false,
        selectedCharacter: ''
      }
      let self = this
      // console.log(typeof roomId, 'adasdasd')
      roomRefs.child(roomId).once("value")
        .then(function (snapshot) {
            // check room already have 2 player or not
            if(snapshot.val().user2 == null){
              console.log('success');
              roomRefs.child(roomId).update({ user2 : data});
              self.$store.dispatch('setUser', 'user2')
              // let key = roomRefs.child(roomId).push({ user2 : data}).key;
              self.$store.dispatch('setRoom', roomId)
              self.$store.dispatch('setTurn', false)
              self.$router.push('/character')
            }
            else{
              throw Error;
            }
        })
        .catch(function(err){
          console.error(err);
        });
    },
    fullChecker () {
      let length = Object.keys(this.data).length
      if(length == 2) {
        this.isFull = true
      }
    }
  },
  data () {
    return {
      modal: false,
      username: '',
      isFull: false
    }
  },
  created () {
    this.fullChecker()
  }
}
</script>

<style scoped lang="css">
.col-md-4 {
  min-width: 300px;
}
</style>