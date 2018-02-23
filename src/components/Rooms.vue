<template lang="html">
  <div class="row">
    <input type="text" name="" value="" v-model="nama">

    <button type="button" name="button" @click="testRoom">Test dynamic route "CREATE room 1"</button>
    {{Rooms}}
    <div class="row">
      <RoomCard></RoomCard>
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
      db.ref(`room${this.nama}`).push({nama:this.nama, isOnGame: false})
    },
    showAllRoom () {
      db.ref().once('value', snapshot => {
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
