<template>
  <div class="battle">
    <div class="container">
      <div class="jumbotron">
        <div class="rows">
          <div class="row">
            <div class="col-md-6">
              <h6>player-1</h6>
              <div style="margin-left:5%" class="health-bar">
                <div :style="bar1" class="bar">
                	  <div class="hit"></div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                </div>
                <div class="col-md-6">
                  <h6 id="player2">player-2</h6>
                  <div class="health-bar">
                    <div :style="bar2" class="bar">
                    	  <div class="hit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <hr class="my-4"> -->
      </div>
      <div class="rows">
        <div class="row">
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg btn-block">Jurus 1</button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg btn-block">Jurus 2</button>
          </div>
          <div class="col-md-4">
            <button @click="hit" type="button" class="btn btn-primary btn-lg btn-block">Jurus 3</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'battle',
  data () {
    return {
      bar1: `background: #c54;
            width: 100%;
            height: 10px;
            position: relative;
            transition: width .5s linear;`,
      bar2: `background: #c54;
            width: 100%;
            height: 10px;
            position: relative;
            transition: width .5s linear;`
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.health-bar {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 200px;
  height: 20px;
  padding: 5px;
  background: #ddd;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

h6 {
  margin-right: 50%;
}

#player2 {
  margin-left: 20% !important;
}
</style>
