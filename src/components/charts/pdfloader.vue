<template>
 <pdf :src="pdflink" :key="pdfkey" v-if="pdflink"></pdf>     
</template>

<script>

import pdf from 'vue-pdf'
export default {
  components: {pdf},
  props: ['pdflink','pdfkey'],
  data: () => ({
    loaded: false,
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
      console.log('pdf data',this.$refs);
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
    }
  },
  mounted (){
    this.loaddata();
  },
watch: {
    // whenever question changes, this function will run
    pdflink: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>