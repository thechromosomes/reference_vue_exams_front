<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Edit Sub-Topic</h2></v-flex>
    </v-layout>
    <form>
      <v-layout>
        <v-select
 :items="categories"
          
          label="Select Topic"
         v-model="catname"
           item-text="categoryname"
          item-value="unique_id"
        ></v-select>
      </v-layout>
      <v-layout>
        <v-text-field
          v-model="tagsedit[0].tagname"
          label="Sub-Topic Name"
          required
        ></v-text-field>
      </v-layout>
 <v-layout>

<input type="checkbox"  v-model="tagsedit[0].available"  >
<label for="checkbox" class="radio_labelsbtpc">Available</label>
<input type="checkbox"   v-model="tagsedit[0].studyplan"   >
<label for="checkbox" class="radio_labelsbtpc">Study Plan</label> 
<input type="checkbox"   v-model="tagsedit[0].resources"   >
<label for="checkbox" class="radio_labelsbtpc">Resources</label>
<input type="checkbox"   v-model="tagsedit[0].questionvisible"   >
<label for="checkbox" class="radio_labelsbtpc">Question Visible</label>
 </v-layout>
      <v-layout>
        <input @click='updateTag' name="Add" type="button" value="Update" class="btn submit_btn" />
        <input name="Cancel" type="button" class="btn cancel_btn" value="Cancel" @click='cancelTag' />
      </v-layout>
    </form>
   
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
    data() {
      return {
        tagname:null,
        currentuser:null,
        checkedacty:false,
        checkedstyplan:false,
        errors: [],
        categories:[],
        category:null,
       tagsedit:[],
        tags: [],
catname:""
      }
    },
    methods: {
cancelTag(){
location.href = "/addsubtopic"
},
      updateTag(){
 axios.post('/updatetags',{id:this.$route.params.id,catname:this.catname,createdby:this.currentuser,avail:this.tagsedit[0].available,studypln:this.tagsedit[0].studyplan,tagname:this.tagsedit[0].tagname, resources:this.tagsedit[0].resources, visible:this.tagsedit[0].questionvisible })
        .then(response => {
          // JSON responses are automatically parsed.
if(response.data){
 location.href = "/addsubtopic"}
else
{
}
        })
               .catch(e => {
          this.errors.push(e)
        })
        
      }
},
     
 created() {
    axios.post(`/getcurrentuser`,{'username':username})
    .then(response => {
      // JSON responses are automatically parsed.
      this.currentuser = response.data._id
    })
    .catch(e => {
      this.errors.push(e)
    }),
         
     axios.get(`/getallcategory`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.categories = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
axios.post('/edittags',{'id':this.$route.params.id})
    .then(response => {
      // JSON responses are automatically parsed.
           this.tagsedit=response.data
axios.post('/edittagcategory',{'id':this.tagsedit[0].category_id})
    .then(response => {
this.catname=response.data[0].unique_id
console.log(response.data);
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