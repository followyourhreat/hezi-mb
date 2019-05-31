<template>
  <div class="main">
    <div class="main-body">
      <transition name="singlePage">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    components: {
    
    },
    data() {
      return {
        
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted() {
      
    },
    methods: {
      
    },
  };
</script>

<style lang="less">
  
</style>
