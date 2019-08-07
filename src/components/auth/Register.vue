<template lang="pug">
  .blk-main-wrapper
    h2
      |Register

    input(v-model="user.email" type="email" placeholder="Email")
    input(v-model="user.firstname" type="text" placeholder="First name")
    input(v-model="user.lastname" type="text" placeholder="Last name")
    input(v-model="user.password" type="password" placeholder="Password")
    button(@click="register")
      |Register
    hr
    p
      |Already have an account?
    router-link(to="/auth/login")
</template>

<script>
// Axios for HTTP Requests
import axios         from 'axios';
export default {
 name: "RegComponent",

 data: function(){
  return{
    user: {
      email: "",
      firstname: "",
      lastname: "",
      password: ""
    }
  };
 },
 methods: {
  register: function() {
    axios.post('https://restful-api', {
      user: this.user,
    })
    .then(function (response) {
      alertify.success('You have Successfully Created a User.');
      alertify.success('You will be redirected to Login shortly...');
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
