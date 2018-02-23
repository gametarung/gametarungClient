import {roomRefs, charRefs} from '../../src/firebase'
const chai = require('chai')
const expect = chai.expect

const arrChar = []
let roomId = ''

describe('Test API', () => {
  describe('Show list character', () => {
    it('Success List Character', (done) => {
      charRefs.once('value')
        .then((snapshot) => {
          let dataCollection = snapshot.val()
          for (let keys in dataCollection) {
            let data = dataCollection[keys]
            expect(data).to.have.property('image')
            expect(data).to.have.property('name')
            expect(data).to.have.property('skills')
            arrChar.push(data)
          }
          done()
        })
        .catch((err) => {
          console.error(err)
        })
    }).timeout(0)
  })

  describe('Create Room', () => {
    it('Success Create Room', (done) => {
      let dataCreateRoom = {
        name: 'robert',
        hp: 100,
        isTurn: true
      }
      roomId = roomRefs.push({user1: dataCreateRoom}).key
      roomRefs.child(roomId).once('value')
        .then((snapshot) => {
          expect(snapshot.val()).to.be.an('object')

          expect(snapshot.val()).to.have.property('user1')
          expect(snapshot.val().user1).to.have.property('hp')
          expect(snapshot.val().user1).to.have.property('name')

          expect(snapshot.val().user1.hp).to.be.a('number')
          expect(snapshot.val().user1.hp).to.equal(dataCreateRoom.hp)

          expect(snapshot.val().user1.name).to.be.a('string')
          expect(snapshot.val().user1.name).to.equal(dataCreateRoom.name)

          expect(snapshot.val().user1.isTurn).to.be.a('boolean')
          expect(snapshot.val().user1.isTurn).to.equal(dataCreateRoom.isTurn)
          expect(snapshot.val().user1.isTurn).to.equal(true)

          done()
        })
        .catch(err => {
          console.log('err', err)
        })
    }).timeout(0)
  })

  describe('Join Room', () => {
    it('Success Join ROom', (done) => {
      let dataJoin = {
        name: 'dom',
        hp: 100,
        isTurn: false
      }

      roomRefs.child(roomId).once('value')
        .then((snapshot) => {
          let roomData = snapshot.val()
          expect(roomData.user2).to.be.a('undefined')

          roomRefs.child(roomId).update({user2: dataJoin})
            .then((data) => {
              roomRefs.child(roomId).once('value')
                .then((updatedSnapshot) => {
                  expect(updatedSnapshot.val()).to.be.an('object')

                  expect(updatedSnapshot.val()).to.have.property('user2')
                  expect(updatedSnapshot.val().user2).to.have.property('hp')
                  expect(updatedSnapshot.val().user2).to.have.property('name')

                  expect(updatedSnapshot.val().user2.hp).to.be.a('number')
                  expect(updatedSnapshot.val().user2.hp).to.equal(dataJoin.hp)

                  expect(updatedSnapshot.val().user2.name).to.be.a('string')
                  expect(updatedSnapshot.val().user2.name).to.equal(dataJoin.name)

                  expect(updatedSnapshot.val().user2.isTurn).to.be.a('boolean')
                  expect(updatedSnapshot.val().user2.isTurn).to.equal(dataJoin.isTurn)
                  done()
                })
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    }).timeout(0)
  })

  describe('Update User Character', () => {
    it('Success update char', (done) => {
      roomRefs.child(roomId).child('user1').update({selectedCharacter: arrChar[0]})
      roomRefs.child(roomId).child('user2').update({selectedCharacter: arrChar[1]})
      roomRefs.child(roomId).once('value')
        .then((snapshot) => {
          expect(snapshot.val()).to.be.an('object')

          expect(snapshot.val()).to.have.property('user1')
          expect(snapshot.val()).to.have.property('user2')

          expect(snapshot.val().user1).to.have.property('selectedCharacter')
          expect(snapshot.val().user2).to.have.property('selectedCharacter')

          expect(snapshot.val().user1).to.be.an('object')
          expect(snapshot.val().user2).to.be.an('object')

          done()
        })
    }).timeout(0)
  })

  describe('Attack Other user', () => {
    it('Success attack user 2', (done) => {
      roomRefs.child(roomId).child('user2').once('value', (snapshot) => {
        let hp = snapshot.val().hp
        if (hp > 0) {
          let newHp = hp - 10
          let updateHp = newHp < 0 ? 0 : newHp
          roomRefs.child(roomId).child('user2').update({hp: updateHp}, (err) =>{
            if (err) return
            roomRefs.child(roomId).child('user2').once('value')
              .then((snapshot) => {
                expect(snapshot.val()).to.be.an('object')

                expect(snapshot.val()).to.have.property('hp')
                expect(snapshot.val().hp).to.be.an('number')
                expect(snapshot.val().hp).to.equal(90)

                done()
              })
          })
        }
      })
    }).timeout(0)
  })

  describe('Change users turn', () => {
    it('Success Change turn', (done) => {
      roomRefs.child(roomId).once('value', (snapshot) => {
        roomRefs.child(roomId).child('user1').update({isTurn: !snapshot.val().user1.isTurn})
        roomRefs.child(roomId).child('user2').update({isTurn: !snapshot.val().user2.isTurn})

        roomRefs.child(roomId).on('value', (snapshot) => {
          expect(snapshot.val().user1.isTurn).to.equal(false)
          expect(snapshot.val().user2.isTurn).to.equal(true)
          done()
        })
      })
    }).timeout(0)
  })
})
