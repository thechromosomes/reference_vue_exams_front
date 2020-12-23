<template>
  <v-container>
   <v-layout row wrap>
   <v-flex xs12><h2 class="slider_title">Slider Setting</h2></v-flex>
   </v-layout>
      <v-layout>
          <div class="sliderfileinput">
            <input type="file" ref="file" @change="attachsliderfile()"/>
          </div>
          <!-- <div v-else> -->
            <!-- <img :src="image" /> -->
            <!-- <button @click="removeImage">Remove image</button> -->
          <!-- </div> -->
      </v-layout>
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
      <v-layout>
        <div class="col-md-12">
          <table class="table slider_settingtable" style="width:100%">
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="slider in sliders"  v-bind:key="slider._id" class="slider_total_td">
                  <td><img :src="fileurl+slider.image_link" width="100px"></td>
                  <td>{{slider.linkurl}}</td>
                  <td class="cursoron"> 
                    <a :href="`/editslidersetting?id=${slider.unique_id}` "> <img src="../assets/icons/edit.svg" class="fa_svg_icon" /> </a>    
                    <img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" @click="deleteSliders(slider.unique_id)"/>
                  </td> <br>                 
                </tr>
              </tbody>
          </table>
        </div>
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

            createSlider(){
              console.log(this.image);
              axios.post('/addslider',{linkurl:this.linkurl,link:this.image,createdby:this.currentuser})
              .then((response)=>{
                  location.reload();
              })
              .catch(e => { this.errors.push(e) })
            },

            deleteSliders(sliderid)
            {  
              axios.post(`/deleteSliderById`,{'sliderid':sliderid})
              .then(response => {
                // JSON responses are automatically parsed.
                location.reload();
              })
              .catch(e => {
                this.errors.push(e)
              }),
              console.log(sliderid);
            }
        },
        created() 
        {
            axios.post(`/getcurrentuser`,{'username':username})
            .then(response => {
              // JSON responses are automatically parsed.
              this.currentuser = response.data._id
            })
            .catch(e => {
              this.errors.push(e)
            })
            axios.get(`/getallsliderimages`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.sliders = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
    }
</script>