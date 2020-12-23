<template>
<div>
<pdf :src="imgdata" v-if="uploadedstem_file.toLowerCase().indexOf('.pdf') >= 0"></pdf>
<img :src="imgdata" v-if="uploadedstem_file.toLowerCase().indexOf('.pdf') < 0" class="q_hero_image img-responsive"/> 
</div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
components: {pdf},
  props: ['uploadedstem_file'],
  data: () => ({
      imgdata:null,
    errors:[],
  }),
  methods:{
      loaddata(){
    this.imgdata=this.uploadedstem_file;
      }
  },
  mounted (){
    this.loaddata();
  },
watch: {
    // whenever question changes, this function will run
    uploadedstem_file: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>