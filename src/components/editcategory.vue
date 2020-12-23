<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Edit Topic</h2></v-flex>
      </v-layout>
    <form>
      <v-layout>
        <v-text-field

          v-model="category[0].categoryname"
          label="Topic Name"
          required
        ></v-text-field>

      </v-layout>
   <v-layout>
  
<input type="checkbox"  v-model="category[0].available"  >
<label for="checkbox" class="radio_labelsbtpc">Available</label>
<input type="checkbox"   v-model="category[0].studyplan"   >
<label for="checkbox" class="radio_labelsbtpc">Study Plan</label>
<input type="checkbox"   v-model="category[0].resources"   >
<label for="checkbox" class="radio_labelsbtpc">Resources</label> 
<input type="checkbox"   v-model="category[0].questionvisible"   >
<label for="checkbox" class="radio_labelsbtpc">Question Visible</label> 
 </v-layout>
      <v-layout>
        <input @click='updateCategory' name="Edit" type="button" value="Update" class="btn submit_btn" />
        <input @click='cancelCategory' type="button" class="btn cancel_btn" value="Cancel" />
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
      category:[],

      categorytype:null,
      currentuser:null,
      errors: []
        }
  },

    methods: {
cancelCategory(){
location.href = "/addtopic"
},
     updateCategory(){

         axios.post('/updatecategory',{id:this.$route.params.id,name:this.category[0].categoryname,createdby:this.currentuser,avail:this.category[0].available,studypln:this.category[0].studyplan,resources:this.category[0].resources,visible:this.category[0].questionvisible})
        .then(response => {
          // JSON responses are automatically parsed.
 location.href = "/addtopic"
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
    axios.post('/editcategory',{'id':this.$route.params.id})
    .then(response => {
      // JSON responses are automatically parsed.
           this.category=response.data
console.log(response.data);
    })
    .catch(e => {
      this.errors.push(e)
    })

}


}
</script>