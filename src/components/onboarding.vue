
<template >
<div class="container" v-if="visibility==0">
 <v-carousel v-if="slidedatas.length>0" 
 v-model="model"
 :cycle="cycle"
 :show-arrows="false"
 class="carousel_onboard">
    <v-carousel-item
      v-for="(slidedata, i) in slidedatas"
      :key="slidedata._id"
    >
      <v-sheet
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
         <div class="item text-center">
    <div class="item_image_section">
      <img :src="fileurl+slidedata.hero_img">
    </div>
    <div class="item_text_section">
      <p class="page_heading">{{slidedata.title}}</p>
      <p class="page_text" v-html="slidedata.description"> </p>
    </div>
  </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  
  </v-carousel>
  <div class="text-center">
      <a class="back_btn" v-if="model>0 && model<slidecount" @click="model--">Back</a>
      <a class="next_btn" v-if="model<slidecount" @click="model++">Next</a>
    <a class="start_btn" v-if="model==slidecount" @click="letstartsubmit">Let's Start</a>
    <a class="skip_intro text-center" v-if="model!=slidecount" href="/">Skip intro</a>
</div>
</div>
<div v-else><img src="../assets/icons/loader.gif"></div>
</template>
<script>
var username=localStorage.username;
  export default {
    data () {
      return {
slidedatas:[],
fileurl:window.publicfileurl,
model:0,
slidecount:0,
cycle: false,
visibility:1,
      }
    },
    methods:{
letstartsubmit(){
   axios.post(`/saveboardingsubmission`,{"userid":this.currentuser})
    .then(onboardingsesponce => {
  location.href='/';
    }).catch(e => {
      this.errors.push(e)
    })

}
    },
  created(){
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data.unique_id
      this.currentuserdata = response.data
    axios.post(`/getboardinglist`,{"userid":this.currentuser})
    .then(onboardingsesponce => {
console.log(onboardingsesponce);
this.slidedatas=onboardingsesponce.data;
this.slidecount=onboardingsesponce.data.length-1;
    }).catch(e => {
      this.errors.push(e)
    }),
    axios.post(`/getuserboardingsubmission`,{"userid":this.currentuser})
    .then(usersonboardingsesponce => {
      this.visibility=usersonboardingsesponce.data.length;
       if(usersonboardingsesponce.data.length>0){
  location.href='/';
       }
    }).catch(e => {
      this.errors.push(e)
    })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
  }
</script>

