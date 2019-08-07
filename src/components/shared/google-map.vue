<template>
      <!-- Map Container for Maps API -->
      <div class="blk-g-map" id="map"></div>
</template>

<script>
// Import Map Styles from file
import MapStyles       from '../../g-maps-styling.js';

export default {
  name: 'GoogleMaps',

  props: [ 'mapData', 'initMap' ],

  data: function() {
    return {
      // Styles imported from file
      GStyles: MapStyles
    };
  },

  watch: {
    initMap: function(newVal, oldVal) { // watch it
      // Request frame...
      requestAnimationFrame(() => {
        this.setupMap();
      });
    }
  },

  mounted: function() {
    // Listen to resize and recenter map if it is portrait
    let resizeTimer;
    let resizeTime = 150;
    // Event Listener on scroll with debounce
    window.addEventListener('resize', () => {
      // Clear timout for debounce
      clearTimeout(resizeTimer);
      // Set timeout and fire off animation
      resizeTimer = setTimeout(() => {
        // Request frame...
        requestAnimationFrame(() => {
          // Recentering!
          this.setupMap();
        });
      } ,resizeTime);
    });
  },

  methods: {
    portraitScreen() {
      // Get Window Information
      let mainWindow = window;
      let windowHeight = mainWindow.screen.availHeight;
      let windowWidth = mainWindow.screen.availWidth;

      // Check to see if it is Portrait or Landscape
      if ( windowHeight > windowWidth ) {
        // If portrait, center map and pin
        return true;
      }
      else {
        return false;
      }
    },

    setupMap() {
      // Pin Location
      let pinLocation = this.mapData.pinLocation;
      // Map Settings - Default
      let mapCenter = this.mapData.mapCenter;
      let zoom = this.mapData.zoomLevel;

      // Check if screen is portrait
      if ( this.portraitScreen() ) {
        // Center map on pin if its portrait
        mapCenter = pinLocation;
      }

      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        mapTypeId: this.mapData.mapStyle,
        zoomControl: this.mapData.zoom,
        mapTypeControl: this.mapData.controls,
        scaleControl: this.mapData.controls,
        rotateControl: this.mapData.controls,
        fullscreenControl: this.mapData.controls,
        scrollwheel: this.mapData.scroll,
        navigationControl: this.mapData.controls,
        mapTypeControl: this.mapData.controls,
        scaleControl: this.mapData.controls,
        draggable: this.mapData.drag,
        disableDoubleClickZoom: this.mapData.zoom,
        panControl: this.mapData.drag,
        streetViewControl: this.mapData.controls,
        keyboardShortcuts: this.mapData.kbShortcuts,
        // Imported Externally
        styles: this.GStyles.styles
      });

      map.setCenter( mapCenter );

      var marker = new google.maps.Marker({
        position: pinLocation,
        map: map,
        icon: this.mapData.mapIcon
      });

      // Wait for map to load and add active class
      map.addListener('tilesloaded',  () => {
        this.$emit('mapIsLoaded');
      });
    }
  },
};
</script>
