<template lang="html">
  
  <div class="col-md-4">
    <!-- <h1>{{Object.keys(data)}}</h1> -->
    
    <!-- <h5>{{ data[Object.keys(data)].nama}}</h5> -->
    
<div class="card mb-3">
  <h6 class="card-header">Room {{data.user1.name}}</h6>
  <img style="height: 200px; width: 100%; display: block;" src="../assets/fight.png" alt="">
    <p>{{Object.keys(data).length}}/2 players</p>
    <button type="button" class="btn btn-info btn-sm" @click="tampilinModal" >Join Game!</button>
    <input type="text" name="" placeholder="Please input Your Name!" v-model="player2" v-if="modal">
  </div>
</div>
  </div>

</template>

<script>
export default {
  props: ['data'],
  components: {
    ModalData
  },
  methods: {
    tampilinModal () {
      this.modal = true
    }
  },
  data () {
    return {
      modal: false,
      player1: ''
    }
  }
}
</script>

<style scoped lang="css">
.col-md-4 {
  min-width: 300px;
}
</style>