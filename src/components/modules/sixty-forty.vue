<template lang="pug">
  //- Split component, reversible
  .blk-split.flex.flex-hor-between.flex-vert-center(
    :class="{'--reversed' : reverse , '--top' : top}")
    //- First Slot - Dynamic anim class
    .blk-split-6(:class="animClassLeft" v-in-viewport)
      slot(name="leftSlot")
    //- Second slot - Dynamic anim class
    .blk-split-4(:class="animClassRight" v-in-viewport)
      slot(name="rightSlot")
</template>



<script>

	export default {
    props: ['animClassLeft', 'animClassRight', 'reverse', 'top']
	};

</script>

<style lang="scss">

/*--------------------------------------*/
/* SIXTY FORTY Component
/*--------------------------------------*/
.blk-split-6 {
  width: 60%;
  padding-right: 1vw;

  @media #{$portrait} {
    width: 100%;
    margin-bottom: 25px;
    padding-right: 0;
  }
}

.blk-split-4 {
  width: 40%;
  padding-left: 1vw;

  @media #{$portrait} {
    width: 100%;
    padding-left: 0;
  }
}

// If prop REVERSED is true, change order of elements
.--reversed {
  .blk-split-6 {
    order: 2;
  }
}

.--top {
  align-items: flex-start;
}
</style>
