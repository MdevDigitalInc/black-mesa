<template lang="pug">
    div
      h2
        |Black Mesa - Vue.js Boilerplate
      a.blk-boilerlink(href="https://github.com/MdevDigitalInc/black-mesa" title="Documentation")
        |Boilerplate Documentation
      a.blk-boilerlink(href="https://github.com/MdevDigitalInc/sass-boilerplate" title="Documentation")
        |SASS Boilerplate Documentation
      a.blk-boilerlink(href="https://vuejs.org/v2/guide/" title="Documentation")
        |Vue Documentation
      a.blk-boilerlink(href="https://github.com/vuejs/awesome-vue" title="Documentation")
        |Vue Resources, Plugins & More
      a.blk-boilerlink(href="https://webpack.js.org/concepts/" title="Documentation")
        |Webpack Documentation
</template>



<script>
export default{
  name: 'MainFooter',
  data: function(){
    return{

    };
  },

  mounted: function(){
    console.log('Element Mounted');
  },

  methods: {
    loadImage(path){
      return require('../../assets/images/' + path);
    },
    // Change Language METHOD
    change () {
      let current = this.$locale.current();
      if (current === 'en') {
        this.$locale.change('pt');
      } else {
        this.$locale.change('en');
      }
    }
  }
};
</script>



<style lang="scss">

/*-------------------------------------*/
/* MAIN FOOTER Component Styles
/--------------------------------------*/
.blk-boilerlink {
  color: $color-brand-primary;
  margin-top: 10px;
  display: block;
}

/*--------------------------------------*/

</style>
