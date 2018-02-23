<template lang="html">
<<<<<<< c0003f910bcfaffe1fd4472fc3fe1449122b6f23
  <div class="row">
    <input type="text" name="" value="" v-model="nama">

    <button type="button" name="button" @click="testRoom">Test dynamic route "CREATE room 1"</button>
    {{Rooms}}
=======
  <div class="">
>>>>>>> get all rooms
    <div class="row">
      <!-- <input type="text" name="" value="" v-model="nama">
      
      <button type="button" name="button" @click="testRoom">Test dynamic route "CREATE room 1"</button> -->
      <div class="row">
        <RoomCard v-for="r in Rooms" :data="r"></RoomCard>
      </div>
    </div>
  </div>
  
</template>

<script>
import { db } from '../firebase'
import RoomCard from '@/components/Room'

export default {
  data () {
    return {
      nama: null,
      Rooms: [],
      allRooms: []
    }
  },
  components: {
    RoomCard
  },
  methods: {
    testRoom () {
      db.ref(`rooms`).push({nama:this.nama, isOnGame: false})
    },
    showAllRoom () {
      db.ref('rooms').once('value', snapshot => {
        for (let i in snapshot.val()) {
          this.Rooms.push(snapshot.val()[i])
        }
      })
    },
    populateAllRooms () {

    }
  },
  created () {
    this.showAllRoom ()
  }
}
</script>

<style lang="css">
</style>
