<template>
  <div class="text-xs-center">
    <v-rating v-model="rating"></v-rating>
  </div>
</template>
<script>  
export default {
    data(){
      return {
        rating: null
      }
    }

}
</script>