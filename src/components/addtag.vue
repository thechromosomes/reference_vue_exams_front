<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2 class="add_title">Add Sub-Topic</h2></v-flex>
    </v-layout>
    <form>
      <v-layout>
        <input type="text" class="domain_input col-md-12 bounce" v-model="searchCategory" @keyup="searchCategoryApi"  placeholder="Input search query"/><br>
      </v-layout>

  <v-layout>
    <v-text-field
      v-model="tagname"
      label="Sub-Topic Name"
      required
    ></v-text-field>
  </v-layout>

  <div class="form-group">
      <template v-if="showMe == true">
      <ul class="drop_ul">
      <li  @click="updateModel(item)" v-for="(item, index) in categories" :key="index"> {{item.categoryname}} </li>
      </ul>
    </template>
  </div>
  
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
    <input @click='createTag' name="Add" type="button" value="Add" class="btn submit_btn" />
    <input @click='resetTag' name="Cancel" type="reset" class="btn cancel_btn" />
  </v-layout>
</form>
 
    <template>
      <v-card>
        <v-card-title>
          Sub-Topic List
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
          :items="tags"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
        >
          <template  slot="items" slot-scope="props">
            <td>{{ props.item.tagname }}</td>
              <td v-if="props.item.topicsubtopic.length>0">{{ props.item.topicsubtopic[0].categoryname }}</td>
              <td v-else></td>
              <td class="text-xs-left">{{ props.item.created_at | createDate  }}</td>
              <td>
                <a  :href="'/tags/edit/' + props.item.unique_id">    
                  <img src="../assets/icons/edit.svg" class="fa_svg_icon"   />   
                </a>    
                <img src="../assets/icons/trash-alt.svg" class="fa_svg_icon"  @click="deleteTag(props.item.unique_id)" /> 
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
        showMe :false,
        tagname:null,
        currentuser:null,
        checkedacty:true,
        checkedstyplan:false,
        checkedresources:false,
        questionvisible:false,
        errors: [],
        categories:[],
        category:null,
        search: '',
        pagination: {
        rowsPerPage: 100
      },
        headers: [
          { text: 'Sub-Topic Name', align: 'left', sortable: true, value: 'tagname' },
          { text: 'Topic', align: 'left', sortable: true, value: 'topicsubtopic[0].categoryname' },
          { text: 'Created at', align: 'left', sortable: true, value: 'created_at' },
          { text: 'Action', sortable: false, value:'' }
        ],
        tags: [],
        searchCategory: null
      }
    },
    methods: {
      resetTag(){
      this.category = '',
      this.checkedacty='',
      this.checkedstyplan='',
      this.tagname=''
      },
      createTag(){
        axios.post('/createtag',{tagname:this.tagname,category:this.category,createdby:this.currentuser,avail:this.checkedacty,studypln:this.checkedstyplan, resources:this.checkedresources, visible:this.questionvisible})
        .then(response => {
          location.reload();
          // JSON responses are automatically parsed.
        })
        .catch(e => {
          this.errors.push(e)
        })
        
      },
      deleteTag(tagid){  
        if(confirm("Do you really want to delete this tag?"))
        {
            console.log(tagid);
            axios.post(`/deleteTagById`,{'tagid':tagid})
            .then(response => {
              location.reload();
            })
            .catch(e => {
               this.errors.push(e)
            })
        }
      },
      searchCategoryApi(){
        axios.post(`/getallcategory`, {searchCategory: this.searchCategory})
        .then(response => {
          this.categories = response.data
          this.showMe = true
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      updateModel(item){
        this.category = item.unique_id
        this.searchCategory = item.categoryname
        this.showMe = false
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
          axios.get(`/gettagdatatable`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.tags = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    //  axios.get(`/getallcategory`)
    // .then(response => {
    //   // JSON responses are automatically parsed.
    //   this.categories = response.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
}

}
</script>