<template lang="pug">
  .blk-main-content
    contact-map( :animLoaded="anim" )
</template>




<script>
// Import SEO From File
import SEOData       from '../../seo-meta.js';
import ContactMap     from '../shared/contact-map.vue';
// Import SEO From File
import { stagingBuild, template, social, general }       from '../../seo-meta.js';

export default {
  name: 'About',
  // TODO - Edit meta Title

  data: function(){
    return {
      anim: false
    };
  },

  mounted (){
    // TODO - Replace interval with proper transition animation
    setTimeout( () => {
      // Anim switches to true when the animation is finished
      // this will trigger the map rendering
      this.anim = true;
    }, 250);
  },
  // Meta SEO Function
  metaInfo() {
    return {
      title: general.title,
      meta: [
        // SEO
        { vmid: 'desc', name: 'description', content: general.desc },
        { vmid: 'ogtitle', property: 'og:title', content: general.title + template.slugAddon },
        { vmid: 'ogimage', property: 'og:image', content: (stagingBuild ? template.stageUrl : template.liveUrl) + this.loadImage(social.ogimage) },
        { vmid: 'ogdesc', property: 'og:description', content: general.desc },
        { vmid: 'twtitle', name: 'twitter:title', content:  general.title + template.slugAddon },
        { vmid: 'twimage', name: 'twitter:image', content: (stagingBuild ? template.stageUrl : template.liveUrl) + this.loadImage(social.twimage) },
        { vmid: 'twdesc', name: 'twitter:description', content: general.desc }
      ]
    };
  },

  components: {
    'contact-map' : ContactMap
  }
};
</script>



<style lang="scss">

/*-------------------------------------*/
/* ABOUT Component Styles
/--------------------------------------*/


/*--------------------------------------*/

</style>
