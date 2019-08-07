<template>
  <section class="blk-full-section">
    <!-- Google Maps Container Mask -->
    <div data-map-active class="blk-map-location">
      <!-- Maps Component -->
      <google-map :initMap="animLoaded" :mapData="mapData" v-on:mapIsLoaded="initPresentation" ></google-map>
    </div>
  </section>
</template>

<script>
import googleMap from './google-map.vue';

export default{
  name: 'ContactMap',
  props: ['animLoaded'],
  data: function(){
    return{
      // TODO - Edit map data accordingly
      mapData: {
        pinLocation:  {lat: 42.991934, lng: -81.213673},
        mapCenter: {lat: 42.992844, lng: -81.211459},
        mapIcon: require('../../assets/images/map/location-ICON.png'),
        mapStyle: 'hybrid',
        zoom: false,
        controls: false,
        kbShortcuts: false,
        scroll: false,
        drag: false,
        zoomLevel: 17.2
      }
    };
  },

  methods: {
    initPresentation() {
      // Enables map presentation
      var mapObject = document.querySelectorAll('[data-map-active]');
      for ( var i=0; i < mapObject.length; i++ ) {
        this.addClass(mapObject[i], '--map-loaded');
      }
    }
  },

  components: {
    'google-map'  : googleMap
  }
};
</script>



<style lang="scss" scoped>
/*-------------------------------------*/
/* Contact--Map Component Styles
/--------------------------------------*/

.blk-map-location {
  width: 100%;
  position: relative;
  left: 0;
  overflow: hidden;
  height: 100vh;
  z-index: 3;
  opacity: 0;
  transition: opacity 1.4s;

  @media #{$portrait} {
    width: 100%;
  }
}

.blk-g-map {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  filter: grayscale(.2) blur(5px);
  transition: 1s filter 1.4s;

  &:after {
    @include pseudo();
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
  }
}

.blk-full-section {
  padding-top: 70px;
  margin-top: -70px;

  @media #{$portrait} {
    margin-bottom: 30px;
    margin-top: -30px;
  }
}

// Active Classes
.--map-loaded {
  opacity: 1;

  .blk-g-map {
    filter: grayscale(1) blur(0);
  }
}

/*--------------------------------------*/
</style>
