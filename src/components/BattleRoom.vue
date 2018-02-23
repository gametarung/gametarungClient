<template>
  <div class="battle">
    <div class="row">
      <div class="col-md-8">
        <div class="container">
          <div class="jumbotron" :id="background">
            <div class="rows">
              <div class="row">
                <div class="col-md-5">
                  <button type="button" class="btn btn-primary">{{ users.user1.name }}</button>
                  <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" :style="hp1" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12">
                      <img :src="users.user1.selectedCharacter.image" alt="anime1">
                    </div>
                    <div class="col-md-12">
                      <button type="button" class="btn btn-primary btn-lg btn-block disabled">{{ users.user1.selectedCharacter.name }}</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <img src="https://media.giphy.com/media/l4pTkNEd2P4MWo9iw/giphy.gif" alt="" style="width:100%">
                </div>
                <div v-if="users.user2" class="col-md-5">
                  <button type="button" class="btn btn-primary">{{ users.user2.name }}</button>
                  <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" :style="hp2" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12">
                      <img :src="users.user2.selectedCharacter.image" alt="anime1">
                    </div>
                    <div class="col-md-12">
                      <button type="button" class="btn btn-primary btn-lg btn-block disabled">{{ users.user2.selectedCharacter.name }}</button>
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
        <div v-if="$store.state.isTurn" class="rows">
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
        <!-- <div v-if="users.user2.isTurn && $store.state.isTurn" class="rows">
          <div class="row">
            <div class="col-md-4">
              <button v-if="!question" @click="firstSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 4</button>
            </div>
            <div class="col-md-4">
              <button v-if="!question" @click="secondSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 5</button>
            </div>
            <div class="col-md-4">
              <button v-if="!question" @click="thirdSkill" type="button" class="btn btn-primary btn-lg btn-block">Jurus 6</button>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <label hidden> {{ characters }} </label>
    <label hidden> {{ users }} </label>
  </div>
</template>
<script>
import { db, roomRefs } from '../firebase'
export default {
  name: 'battle',
  data () {
    return {
      characters: [],
      players: [],
      users: {
        user1: {hp: ''},
        user2: {hp: ''}
      },
      question: null,
      background:''
    }
  },
  methods: {
    firstMethod () {
      let self = this
      console.log('masuk firstmethod');
      roomRefs.child(self.$store.state.roomId).on('value',function(snapshot){
        self.users.user1 = snapshot.val().user1
        self.users.user2 = snapshot.val().user2
        self.$store.dispatch('setTurn', self.users[self.$store.state.userId].isTurn) 
      })
    },
    turn () {
      let self = this
      roomRefs.child(self.$store.state.roomId).on('value',function(snapshot){
        self.users.user1.isTurn = snapshot.val().user1.isTurn
        self.users.user2.isTurn = snapshot.val().user2.isTurn

        self.users.user1.hp = snapshot.val().user1.hp 
        self.users.user2.hp = snapshot.val().user2.hp
        
        let mine = self.$store.state.userId == 'user1' ? 'user1' : 'user2'
        if (self.users.user1.hp === 0 || self.users.user2.hp === 0) {
             alert(self.users[mine].hp === 0 ?'game over' : 'you win')
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
      let self = this
      console.log(this.isTurn)
      if(e==this.question.correct_answer){
        let target = self.$store.state.userId == 'user1' ? 'user2' : 'user1'
        this.attackOtherPlayer(self.$store.state.roomId, target , this.question.poin)
      } 
      
      self.changeTurn(self.$store.state.roomId)
      
      this.question=null
    },
    getbackground(){
      var bg = ['fuji','sea','marvel1','marvel2','marvel3']
      this.background = bg[Math.floor(Math.random()*5)]
    },
    attackOtherPlayer(roomId, userIdTarget, damage){
     roomRefs.child(roomId).child(userIdTarget).once("value", function(snapshot) {
       let hp = snapshot.val().hp;
       let newHp = hp - damage;
       let updateHp = newHp < 0 ? 0 : newHp;
       roomRefs.child(roomId).child(userIdTarget).update({hp : updateHp})
     })
   },
   changeTurn(roomId){
       roomRefs.child(roomId).child('user1').once("value", function(snapshot) {
       roomRefs.child(roomId).child('user1').update({isTurn : !snapshot.val().isTurn})
     })
       roomRefs.child(roomId).child('user2').once("value", function(snapshot) {
       roomRefs.child(roomId).child('user2').update({isTurn : !snapshot.val().isTurn})
     })
     console.log(!this.$store.state.isTurn, 'arif')
   }
  },
  created () {
    this.firstMethod()
    this.turn()
    this.getbackground()
    
  },
  computed: {
    hp1 () {
      return `width: ${this.users.user1.hp}%;` 
    },
    hp2 () {
      return `width: ${this.users.user2.hp}%;` 
    }
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
