<template lang="html">
  <div class="">
    <div class="row">
      <div class="row">
        <RoomCard v-for="(r,index) in Rooms" :data="r" :keys="RoomKeys[index]"></RoomCard>
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
      RoomKeys: [],
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
      db.ref('rooms').on('child_added', snapshot => {
        this.Rooms.push(snapshot.val())
        this.RoomKeys.push(snapshot.key)
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
