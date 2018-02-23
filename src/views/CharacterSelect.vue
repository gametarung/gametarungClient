<template>
  <div id="test">
      <div class="row">
          <CharacterImage v-for="character in characters" :key="character.name" :character="character" @choose="choose"/>
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
            for(let i in snapshot.val()){
                this.characters.push(snapshot.val()[i])
            }
            })
        },
        choose(character){
            console.log('tes')
            console.log(character)
        }
    }
}
</script>

<style>
/* #test {
    background-image: url(../assets/background2.jpg);
} */
</style>
