<template>
  <v-container>
   <v-layout row wrap>
   <v-flex xs12><h2 class="slider_title">Edit Slider</h2></v-flex>
   </v-layout>
   <v-layout>
    <div class="form_group">
      <p><img :src="fileurl+image" width="500px"></p>
      <span>{{image}}</span>
    </div>
   </v-layout>
      <v-layout>
          <div class="sliderfileinput">
            <input type="file" value="image" ref="file" @change="attachsliderfile()"/>
          </div>
      </v-layout>
      <br>
      <v-layout>
          <v-text-field
            label="Link"
            v-model="linkurl"
          ></v-text-field>
      </v-layout>
      <v-layout class="slider_grpbtn">
        <input @click='createSlider' name="Add" type="submit" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
  </v-container>
</template>
<script>
    import getusername from './users/username'
    import moment from 'moment'
    import axios from 'axios';
    var username=localStorage.username;
    export default 
    {
        data() {
          return {
            image:"",
            linkurl:null,
            currentuser:null,
            sliders:[],
            errors: [],
            fileurl:window.publicfileurl
          }
        },
        methods: 
        {
            async attachsliderfile()
            {
              this.image = "dfghdkhgkjdf";
              const file = this.$refs.file.files[0];
              console.log(file);
              const formData = new FormData();
              formData.append("file", file);
              console.log(formData)
              try{
                  const res = await axios.post("/upload", formData);
                  console.log(res.data);
                  this.image = res.data.file
                  // this.image = "/publicfiles/1563195503776_11.JPG";
                 } 
              catch(err){ console.log(err); }
            },
            createSlider()
            {
              console.log(this.image);
              console.log(this.linkurl);
              axios.post('/editsliderimage',{id:this.$route.query.id, imagelink:this.image, linkurl:this.linkurl})
              .then((response)=>{
                console.log('response-',response.data)
                location.href = "/slidersetting"
              })
              .catch(e => { this.errors.push(e) })
            },

        },
        created() 
        {
          console.log('id-',this.$route.query.id)
          var id = this.$route.query.id
            axios.post(`/getcurrentuser`,{'username':username})
            .then(response => {
              this.currentuser = response.data._id
            })
            .catch(e => {
              this.errors.push(e)
            })
            axios.post(`/getoneslider`,{'id':this.$route.query.id})
            .then(response => {
              console.log('sliders-',response.data)
              this.slider=response.data;
              this.image=this.slider[0].image_link
              this.linkurl=this.slider[0].linkurl
              console.log('il-',this.image)
              console.log('l-',this.linkurl)
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
    }
</script>