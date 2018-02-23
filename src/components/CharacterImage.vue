<template>
  <div class="col-md-4">
    <img :src="character.image" alt="" id="image">
    <h3>{{character.name}}</h3>
  </div>
</template>

<script>


export default {
    data () {
        return {
            img: '',
            name: ''
        }
    },
    props: ['character'],
    created () {

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
