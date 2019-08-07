<template lang="pug">
  .blk-image
    img(:src="loadImage(homeBrand)")
</template>



<script>

export default {
  name: 'MainHero',
  data: function() {
    return{
      homeBrand: 'blackmesalogo2.svg'
    };
  },

  methods:{
    // Get Compiled image Paths

    loadImage(path){
      return require('../../assets/images/' + path);
    }
  }
};

</script>

<style lang="scss">

/*-------------------------------------*/
/* HERO MAIN Component Styles
/--------------------------------------*/
.blk-image {
  width: 50%;
  margin: 120px auto 60px;

  img {
    width: 100%;
  }
}

/*--------------------------------------*/

</style>
