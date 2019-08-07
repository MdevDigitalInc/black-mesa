<template lang="pug">
  .blk-main-wrapper
    div
      h2
        |Reset
      input(v-model="user.email" type="text" placeholder="Email")
      button(@click="reset")
        |Reset
      hr
      p
        |Don't have an account? <router-link to="/auth/register"> Sign Up! </router-link>
</template>

<script>
// Axios for HTTP Requests
import axios         from 'axios';

export default {
 name: "RegisterComponent",

 data: function() {
  return{
    user:{
      email: ""
    }
  };
 },

 methods: {
  register: function() {
    axios.post('https://restful-api', {
      user: this.user,
    })
    .then(function (response) {
      alertify.success('You have Successfully Reset your Password');
    })
    .catch(function (error) {
      alertify.error(this.$t(error));
    });
  }
 }
};
</script>

<style lang="scss" scoped>

</style>
