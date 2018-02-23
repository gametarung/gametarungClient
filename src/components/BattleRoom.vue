<template>
  <div class="battle">
    <div class="row">
      <div class="col-md-8">
        <div class="container">
          <div class="jumbotron" :id="background">
            <div class="rows">
              <div class="row">
                <div class="col-md-5">
                  <button type="button" class="btn btn-primary">Yanto trimandi</button>
                  <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" :style="hp1" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12">
                      <img :src="characters[1].image" alt="anime1">
                    </div>
                    <div class="col-md-12">
                      <button type="button" class="btn btn-primary btn-lg btn-block disabled">Character Name</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <img src="https://media.giphy.com/media/l4pTkNEd2P4MWo9iw/giphy.gif" alt="" style="width:100%">
                </div>
                <div class="col-md-5">
                  <button type="button" class="btn btn-primary">Arif trimanda</button>
                  <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" :style="hp2" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12">
                      <img :src="characters[0].image" alt="anime1">
                    </div>
                    <div class="col-md-12">
                      <button type="button" class="btn btn-primary btn-lg btn-block disabled">Character Name</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="question" class="rows">
          <div class="modal-active">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Your Question</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>{{question.question}}</p>
                </div>
                <div v-for="elem in question.incorrect_answers" :key="elem.key" class="modal-footer">
                  <button @click="questionAnswer(elem)" type="button" class="btn btn-secondary" data-dismiss="modal">{{elem}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="rows">
          <div class="row">
            <div class="col-md-4">
              <button v-if="!question" @click="firstSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 1</button>
            </div>
            <div class="col-md-4">
              <button v-if="!question" @click="secondSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 2</button>
            </div>
            <div class="col-md-4">
              <button v-if="!question" @click="thirdSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase'
export default {
  name: 'battle',
  data () {
    return {
      characters: [],
      players: [],
      hp1: 'width: 100%',
      hp2: 'width: 100%',
      question: null,
      background:''
    }
  },
  methods: {
    showCharacters () {
      db.ref('characters').once('value', snapshot => {
        for(let i in snapshot.val()) {
          this.characters.push(snapshot.val()[i])
        }
      })
    },
    turn () {
      db.ref('room-1').once('value', snapshot => {
        // console.log(snapshot.val())
        for(let i in snapshot.val()) {
          this.players.push(snapshot.val()[i])
        }
      })
    },
    firstSkill () {
      this.$axios.get('https://opentdb.com/api.php?amount=1&category=31&difficulty=easy&type=multiple')
        .then(({data})=>{
          console.log({data});
          data.results[0].question = data.results[0].question.replace(/&quot/g,'\\"')
          data.results[0].incorrect_answers.push(data.results[0].correct_answer)
          data.results[0].incorrect_answers = data.results[0].incorrect_answers.sort()
          data.results[0].poin = 10
          this.question = data.results[0]
        })
        .catch((err) => {
          console.error(err);
        })
    },
    secondSkill () {
      this.$axios.get('https://opentdb.com/api.php?amount=1&category=31&difficulty=medium&type=multiple')
        .then(({data})=>{
          console.log({data});
          data.results[0].question = data.results[0].question.replace(/&quot/g,'\\"')
          data.results[0].incorrect_answers.push(data.results[0].correct_answer)
          data.results[0].incorrect_answers = data.results[0].incorrect_answers.sort()
          data.results[0].poin = 20
          this.question = data.results[0]
        })
        .catch((err) => {
          console.error(err);
        })
    },
    thirdSkill () {
      this.$axios.get('https://opentdb.com/api.php?amount=1&category=31&difficulty=hard&type=multiple')
        .then(({data})=>{
          console.log({data});
          data.results[0].question = data.results[0].question.replace(/&quot/g,'\\"')
          data.results[0].incorrect_answers.push(data.results[0].correct_answer)
          data.results[0].incorrect_answers = data.results[0].incorrect_answers.sort()
          data.results[0].poin = 30
          this.question = data.results[0]
        })
        .catch((err) => {
          console.error(err);
        })
    },
    questionAnswer(e) {
      console.log(this.isTurn)
      if(e==this.question.correct_answer){
        this.players.map(f=>{
          console.log(f,Object.keys(f));
          // db.ref('room-1').child(Object.keys(f)).set({
          //   hp: f.isTurn-this.question.poin,
          //   isTurn: !f.isTurn
          // })
        })
      }else{
        this.players.map(f=>{
          console.log(f,Object.keys(f));
          // db.ref('room-1').child(Object.keys(f)).set({
          //   isTurn: !f.isTurn
          // })
        })
      }
      this.question=null
    },
    getbackground(){
      var bg = ['fuji','sea','marvel1','marvel2','marvel3']
      this.background = bg[Math.floor(Math.random()*5)]
    }
  },
  created () {
    this.showCharacters()
    this.turn()
    this.getbackground()
  }
}
</script>

<style scoped>
#fuji{
  background-image: url('https://wallpapercave.com/wp/3yOCFur.jpg');
}
#sea{
  background-image: url('http://globalmedicalco.com/photos/globalmedicalco/26/127639.jpg');
}
#marvel1{
  background-image: url('http://hdwpro.com/wp-content/uploads/2017/11/Awesome-Wallpaper.jpg');
}
#marvel2{
  background-image: url('https://images7.alphacoders.com/411/thumb-1920-411820.jpg');
}
#marvel3{
  background-image: url('https://www.hdwallpapers.in/walls/lovers_dream-wide.jpg');
}
</style>
