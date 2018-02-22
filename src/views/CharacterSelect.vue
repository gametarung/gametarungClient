<template>
  <div id="test">
      <div class="row">
          <CharacterImage v-for="character in characters" :key="character" :character="character"/>
      </div>
  </div>
</template>

<script>
import CharacterImage from '../components/CharacterImage.vue'
import { charRefs } from '../firebase'

export default {
    data () {
        return {
            background: '',
            characters: []
        }
    },
    components: {
        CharacterImage
    },
    created () {
        this.getCharacter()
    },
    methods: {
        getCharacter () {
            charRefs.once("value", snapshot => {
            console.log('INI ADALAH SNAPSHOT', snapshot.val());
            for(let i in snapshot.val()){
                //console.log(i)
                this.characters.push(snapshot.val()[i])
            }
            })
        
        }
    }
}
</script>

<style>
/* #test {
    background-image: url(../assets/background2.jpg);
} */
</style>
