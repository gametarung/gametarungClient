<template lang="html">
<<<<<<< c0003f910bcfaffe1fd4472fc3fe1449122b6f23
=======
  
  <div class="col-md-4">
    <!-- <h1>{{Object.keys(data)}}</h1> -->
    
    <!-- <h5>{{ data[Object.keys(data)].nama}}</h5> -->
    
<div class="card mb-3">
  <h6 class="card-header">Room {{data[Object.keys(data)].nama}}</h6>
  <img style="height: 200px; width: 100%; display: block;" src="../assets/fight.png" alt="">
    <p>1/2 players</p>
    <a href="#" class="card-link">Join!</a>
    <button type="button" class="btn btn-info btn-sm">Primary</button>
  </div>
</div>
  </div>
>>>>>>> get all rooms

</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped lang="css">
.col-md-4 {
  min-width: 300px;
}
</style>
