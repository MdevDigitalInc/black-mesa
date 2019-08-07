<template>
  <section class="blk-cookies" :class="{'--active' : active }">
    <div class="blk-main-wrapper flex flex-vert-center flex-hor-between u-c-white">
      <!-- Cookies Text Content -->
      <div class="blk-cookies-content">
        <span class="--title u-bold u-uppercase">
          HEADING GOES HERE
        </span>
        <p class="--text">
          TEXT GOES HERE
        </p>
      </div>
      <!-- Action -->
      <div class="blk-cookies-action">
        <button
          v-on:click="acceptCookie"
          class="blk-btn blk-primary-btn"
          :class="{ 'fully-in-viewport' : active }">
           BUTTON TEXT HERE
        </button>
      </div>
    </div>
    <!-- Dismiss Button -->
    <div  v-on:click="dismissCookie" class="blk-close-cookies u-c-white">
      <i class="fas fa-times"></i>
    </div>
  </section>
</template>

<script>
// Import Data From Flat File
import SEOData       from '../../seo-meta.js';

export default{
  name: 'CookiePopup',

  props: [ 'active' ],

  methods: {
    dismissCookie() {
      // Emits event to parent to hide popup
      this.$emit('dismiss');
      // sets token to FALSE
      localStorage.setItem('acceptCookie', false);
    },

    acceptCookie() {
      // Emits event to parent to hid epopup
      this.$emit('dismiss');
      // Saves cookie acceptance
      localStorage.setItem('acceptCookie', true);
      // Sets expiry on acceptance
      localStorage.setItem('cookieExpiration', Date.now() + 15778800);
    }
  }
};
</script>

<style lang="scss">

/*-------------------------------------*/
/* BASE TEMPLATE Component Styles
/--------------------------------------*/
.blk-cookies {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $color-brand-primary;
  padding: 40px 0;
  z-index: 98;
  box-shadow: 0 -3px 5px rgba(0, 0, 0, .2);
  opacity: 0;
  transition: all .5s;

  .blk-cookies-content {
    width: 80%;

    .--title {
      font-size: 17px;
      letter-spacing: 1.6px;
    }

    .--text {
      font-size: 15px;
      letter-spacing: .45px;
    }
  }

  .blk-close-cookies {
    position: absolute;
    padding: 10px;
    top: 0;
    cursor: pointer;
    right: 0;
    transition: all .5s;
    z-index: 3000;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1.2);
      color: $black;
    }
  }

  &.--active {
    transition: all .5s;
    opacity: 1;
  }
}

/*--------------------------------------*/

</style>
