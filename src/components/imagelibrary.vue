<template>
  <v-container subtopic_section>
    <v-layout row wrap>
      <v-flex xs12><h2>Image Library</h2></v-flex>
    </v-layout>
    <form>
      <v-layout row wrap>
        <v-flex xs12 sm6 md12>
          <v-text-field
            label="Tag"
             v-model="tag_name"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md12>
          <v-text-field
            label="Domain"
            v-model="domain"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
          <div v-if="!image">
            <input type="file" ref="file" @change="attachsliderfile()"/><br>
          </div>
      </v-layout>
      <v-layout>

      </v-layout>
      <v-layout>
        <input @click='createLibrary' name="Add" type="submit" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
    </form>
    <!-- <v-layout row wrap>
      <v-flex xs12><h2>Image Library List</h2></v-flex>
    </v-layout> -->
    <template>
      <v-card>
        <v-card-title>
          Images Library List
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
          :items="libraries"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
        >
          <template  slot="items" slot-scope="props">
            <!-- <td>{{ props.item.categoryname }}</td> -->
            <td><img :src="fileurl+props.item.image_link" width="200px" height="100px"></td>
            <td class="text-xs-left">{{ props.item.tag }}</td>
            <td class="text-xs-left">{{ props.item.domain }}</td>
            <td class="cursoron" @click="deleteImage(props.item.unique_id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></td>
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
    import getusername from './users/username'
    import moment from 'moment'
    import axios from 'axios';
    var username=localStorage.username;
    export default 
    {
        data() {
          return {
            image:"",
            currentuser:null,
            search: '',
            pagination: {
              rowsPerPage: 100
            },
            headers: [
              {
                text: 'Images', align: 'left', sortable: true, value: 'image_link' },
              { text: 'Tag',sortable: true, value: 'tag' },
              { text: 'Domain at',sortable: true, value: 'domain' },
              { text: 'Action', sortable: false, value:'' }
            ],
            libraries:[],
            errors: [],
            tag_name:null,
            domain:null,
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
              try{
                  const res = await axios.post("/upload", formData);
                  console.log(res.data);
                  this.image = res.data.file
                 } 
              catch(err){ console.log(err); }
            },

            createLibrary(){
              console.log(this.image);
              axios.post('/addlibrary',{tag_name:this.tag_name,domain:this.domain,link:this.image,createdby:this.currentuser})
              .then((response)=>{
                  location.reload();
              })
              .catch(e => { this.errors.push(e) })
            },
            deleteImage(imageid){  
              if(confirm("Do you really want to delete this image?"))
              {
                  axios.post(`/deletelibraryById`,{'imageid':imageid})
                  .then(response => {
                    location.reload();
                  })
                  .catch(e => {
                     this.errors.push(e)
                  }),
                  console.log(imageid);
              }
            }
        },
        created() 
        {
            axios.post(`/getcurrentuser`,{'username':username})
            .then(response => {
              // JSON responses are automatically parsed.
              this.currentuser = response.data.unique_id
            })
            .catch(e => {
              this.errors.push(e)
            })
            axios.get(`/getalllibraryimages`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.libraries = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
    }
</script>