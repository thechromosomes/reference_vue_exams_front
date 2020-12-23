<template>
<v-container>
 <v-layout row wrap>
 <v-flex xs12><h2>Add Survey</h2></v-flex>
 </v-layout>
  <form>
   <v-layout>
    <v-text-field
    v-model="surveyname"
      label="Survey Name"
      required
    ></v-text-field>
    </v-layout>
    <v-layout>
       <v-select
  :items="projects"
  name="project"
  label="Select a Category"
  v-model="project"
  item-text="projectname"
  ></v-select>
          </v-layout>
               <v-select
  :items="semesters"
  name="semester"
  label="Select Semester"
  v-model="Semester"
  ></v-select>
          </v-layout>
   <v-layout>
    <v-btn @click='createSurvey'>Add</v-btn>
    <v-btn @click='clear'>Cancel</v-btn>
     </v-layout>
  </form>
   </v-container>
</template>
<script>
var datetime = new Date();
var username=localStorage.username;
import axios from 'axios';
  export default {
   data() {
    return {
      currentuser:null,
      projects:[],
      project:null,
      surveyname:null,
      semesters: ['2019.1','2019.2','2018.1','2018.2','2017.1','2017.2'],
      semester:null,
      errors: []
    }
  },
    methods: {

      createSurvey(){
        axios.post('/createsurvey',{surveyname:this.surveyname,category:this.project,createdby:this.currentuser,createddate:datetime})
    .then(response => {
      // JSON responses are automatically parsed.
    })
    .catch(e => {
      this.errors.push(e)
    })
        
      },
       clear () {
        this.surveyname = ''
        this.project = null
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
          axios.get(`/getprojects`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.projects = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
}

}
</script>