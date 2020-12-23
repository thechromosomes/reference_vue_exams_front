<template>
  <v-container subtopic_section>
   <v-layout row wrap>
   <v-flex xs12><h2 class="slider_title">Default Image</h2></v-flex>
   </v-layout>
      <v-layout>
        <v-text-field
          v-model="title"
          label="Short code"
          required
        ></v-text-field>
      </v-layout>
      <v-layout>
          <div v-if="!image" class="file_input">
            <input type="file" ref="file" @change="attachDefaultImg()"/>
          </div>
      </v-layout>
      <v-layout class="slider_grpbtn">
        <input @click="createimage" name="submit" type="submit" class="btn submit_btn" />
        <input name="Cancel" type="reset" class="btn cancel_btn" />
      </v-layout>
    <template>
      <v-card>
        <v-card-title>
          Default Images List
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
          :items="sliders"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
        >
          <template  slot="items" slot-scope="props">
            <td><img :src="fileurl+props.item.link" width="200px" height="100px"></td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.created_at | createDate}}</td>
            <td class="cursoron" @click="removeImage(props.item.unique_id)"><img src="../assets/icons/trash-alt.svg" class="fa_svg_icon" /></td>
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
            title:null,
            image:'',
            currentuser:null,
            search: '',
            pagination: {
              rowsPerPage: 100
            },
            headers: [
              {
                text: 'Images', align: 'left', sortable: true, value: 'link' },
              { text: 'Title',sortable: true, value: 'title' },
              { text: 'Created At',sortable: true, value: 'created_at' },
              { text: 'Action', sortable: false, value:'' }
            ],
            sliders:[],
            errors: [],
            fileurl:window.publicfileurl
          }
        },
        methods: 
        {
            async attachDefaultImg()
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
                 } 
              catch(err){ console.log(err); }
            },
            createimage()
            {
              console.log(this.image);
              console.log(this.title);
              console.log(this.currentuser);
              axios.post('/addDefaultImage',{title:this.title, link:this.image, created_by:this.currentuser})
              .then((response)=>{
                console.log(response.data);
                  location.reload();
              })
              .catch(e => { this.errors.push(e) })
            },

            removeImage(imageid){  
              if(confirm("Do you really want to delete this image?"))
              {
                  axios.post(`/deletedefaultimage`,{'imageid':imageid})
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
              this.currentuser = response.data._id
            })
            .catch(e => {
              this.errors.push(e)
            })
            axios.get(`/getalldefaultimages`)
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