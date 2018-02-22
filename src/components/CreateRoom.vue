<template lang="html">
  <div class="footer">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <h6 id="labelFooter">Create Your Own Room!</h6>
      <input type="text" name="" value="" placeholder="Enter your room's name!" style="min-width: 500px;" id="labelFooter" >
      <button type="button" class="btn btn-info" id="buttonFooter">Success</button>
    </nav>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="css">
.footer {
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
}
#labelFooter {
  margin-left: 150px;
}

#buttonFooter {
  margin-left: 150px;
}
</style>
