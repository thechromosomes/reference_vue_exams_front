<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Add Topic</h2></v-flex>
      </v-layout>
    <form>
      <v-layout>
        <v-text-field
          v-model="category" 
          label="Topic Name"
          required
        ></v-text-field>

      </v-layout>
   <v-layout>

 <input type="checkbox"  v-model="checkedacty"  >
<label for="checkbox" class="radio_labelsbtpc">Available</label>
<input type="checkbox"   v-model="checkedstyplan"   >
<label for="checkbox" class="radio_labelsbtpc">Study Plan</label>
<input type="checkbox"   v-model="checkedresources"   >
<label for="checkbox" class="radio_labelsbtpc">Resources</label> 
<input type="checkbox"   v-model="questionvisible"   >
<label for="checkbox" class="radio_labelsbtpc">Question Visible</label> 
 </v-layout>
      <v-layout>
        <input @click='createCategory' name="Add" type="button" value="Add" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
    </form>
    <!-- <v-layout row wrap>
      <v-flex xs12><h2>Category List</h2></v-flex>
    </v-layout> -->
    <template>
      <v-card>
        <v-card-title>
          Topics List
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="categories"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.categoryname }}</td>
            <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
            <td>

           <a  :href="'/category/edit/' + props.item.unique_id">    <img src="../assets/icons/edit.svg" class="fa_svg_icon"  />    </a>    
           
         <img src="../assets/icons/trash-alt.svg" class="fa_svg_icon"   @click="deleteCategory(props.item.unique_id)" /> 


          </td>
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>
<script>
var username=localStorage.username;
import axios from 'axios';
  export default {
   data() {

    return {
      category:null,
      categorytype:null,
      currentuser:null,
      checkedacty:true,
      checkedstyplan:false,
      checkedresources:false,
      questionvisible:false,
      errors: [],
      search: '',
      pagination: {
        rowsPerPage: 100
      },
      headers: [
        { text: 'Topic Name', align: 'left', sortable: true, value: 'categoryname' },
        { text: 'Created at',sortable: true, value: 'created_at' },
        { text: 'Action', sortable: false, value:'' }
      ],
      categories:[]
    }
  },

    methods: {

      createCategory(){
        axios.post('/createcategory',{category:this.category,createdby:this.currentuser,avail:this.checkedacty,studypln:this.checkedstyplan, resources:this.checkedresources, visible:this.questionvisible})
        .then(response => {
          // JSON responses are automatically parsed.
         location.reload();
        })
        .catch(e => {
          this.errors.push(e)
        })
 
      },
      deleteCategory(catgid){  
        if(confirm("Do you really want to delete this category?"))
        {
            axios.post(`/deleteCategoryById`,{'catgid':catgid})
            .then(response => {
              location.reload();
            })
            .catch(e => {
               this.errors.push(e)
            }),
            console.log(catgid);
        }
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
    })
}

}
</script>