<template>
  <div id="test">
      <div class="row">
          <CharacterImage v-for="character in characters" :key="character.name" :character="character" @choose="choose"/>
      </div>
  </div>
</template>

<script>
import CharacterImage from '../components/CharacterImage.vue'
import { db,charRefs } from '../firebase'

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
            db.ref(`rooms/${this.$store.state.roomId}/${this.$store.state.userId}`).set({
                character:character
            })
            this.$route.push({
                name: 'battle'
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
