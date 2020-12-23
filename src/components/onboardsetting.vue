<template>
  <v-container>
   <v-layout row wrap>
   <v-flex xs12><h2 class="slider_title">On Board Setting</h2></v-flex>
   </v-layout>
      <v-layout>
          <div class="file_input_onboard">
            <input type="file" ref="file" @change="attachsliderfile()"/>
          </div>
      </v-layout>
      <div class="question_fields col-md-12">
<label>Title </label>
<input type="text" v-model="title" />
</div>
<div class="question_fields col-md-12">
<label>Order </label>
<input type="text" v-model="order" />
</div>
      <div class="question_fields col-md-12">
<label>Description </label>
<tinymce id="desc" v-model="desc" key="desc" ref="description" :other_options="spelloptions"></tinymce>
</div>
      <v-layout class="slider_grpbtn" v-if="id==0">
        <input @click='createSlider' name="Add" type="submit" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
      <v-layout class="slider_grpbtn" v-if="id!=0">
        <input @click='updateSlider' name="Add" value="Update" type="submit" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>

      <v-layout>
        <div class="col-md-12">
          <table class="table slider_settingtable" style="width:100%">
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="slider in sliders"  v-bind:key="slider._id" class="slider_total_td">
                  <td><img :src="fileurl+slider.hero_img" width="100px"></td>
                  <td>{{slider.title}}</td>
                  <td class="cursoron" ><img src="../assets/icons/edit.svg" @click="editSliders(slider._id)" class="fa_svg_icon" /><img @click="deleteSliders(slider._id)" src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></td> <br>                 
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
    import tinymce from 'vue-tinymce-editor'
    export default 
    {
            components: {tinymce},
        data() {
          return {
            image:"",
            id:0,
            desc:null,
            order:null,
            title:null,
            currentuser:null,
            sliders:[],
            errors: [],
            fileurl:window.publicfileurl,
            spelloptions:{browser_spellcheck: true}
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
              axios.post('/addonboarding',{hero_img:this.image,title:this.title,desc:this.desc,order:this.order,createdby:this.currentuser})
              .then((response)=>{
                  location.reload();
              })
              .catch(e => { this.errors.push(e) })
            },
            updateSlider(){
              console.log(this.image);
              axios.post('/updateonboarding',{id:this.id,hero_img:this.image,title:this.title,desc:this.desc,order:this.order,createdby:this.currentuser})
              .then((response)=>{
                  this.id=0;
                  this.image='';
                  this.desc=null;
                  this.order=null;
                  this.title=null;
                  location.reload();
              })
              .catch(e => { this.errors.push(e) })
            },

            deleteSliders(sliderid)
            {  
              axios.post(`/deleteonboarding`,{'id':sliderid})
              .then(response => {
                // JSON responses are automatically parsed.
                // this.sliders=response.data
                location.reload();
              })
              .catch(e => {
                this.errors.push(e)
              }),
              console.log(sliderid);
            },
            editSliders(sliderid)
            {  
              axios.post(`/getoneboardinglist`,{'id':sliderid})
              .then(response => {
                // JSON responses are automatically parsed.
                // this.sliders=response.data
                this.id=response.data._id;
                  this.image=response.data.hero_img;
                  this.desc=response.data.description;
                  this.order=response.data.placeorder;
                  this.title=response.data.title;
                  this.$refs[description].focus();
               // location.reload();
              })
              .catch(e => {
                this.errors.push(e)
              }),
              console.log(sliderid);
            },
               editorInitwithtext(data, questionindex){
        const refdata = this.$refs[questionindex]
        refdata[0].editor.setContent(data);
      },
        },
        created() 
        {
            axios.post(`/getcurrentuser`,{'username':username})
            .then(response => {
              // JSON responses are automatically parsed.
              this.currentuser = response.data.unique_id
        axios.post(`/getboardinglist`,{'userid':this.currentuser})
            .then(response => {
              // JSON responses are automatically parsed.
              this.sliders = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
            })
            .catch(e => {
              this.errors.push(e)
            })
          
        }
    }
</script>