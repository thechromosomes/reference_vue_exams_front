<template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
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
          :items="mostactiveusers"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="mostactiveusers"
        >
          <template  slot="items" slot-scope="props">
              <td><span class="img_user"> <img :src="props.item.profile" class="pop_user"/> </span></td>
            <td>{{props.item.firstname}}</td>
            <td>{{props.item.lastname}}</td>
            <td>{{ props.item.lastlogin | createDate  }}</td>            
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>       
      </v-card>
</template>

<script>


export default {
  props: ['charttype'],
  data: () => ({
    loaded: false,
         search: '',
        pagination: {
        rowsPerPage: 10,
      },
        headers: [
          {text: '', align: 'left', sortable: false, value: '' },
          {text: 'First Name', align: 'left', sortable: true, value: 'firstname' },
          {text: 'Last Name', align: 'left', sortable: true, value: 'lastname' },
          {text: 'Last Login', align: 'left', sortable: true, value: '' }
          
        ],
        mostactiveusers: []
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
if(this.charttype==0){
     await axios.post(`/getstoppedactiveusers`,{'userid':this.currentuser})
    .then(mostactiveusers => {
      // JSON responses are automatically parsed.
      console.log(mostactiveusers.data)
  this.mostactiveusers=mostactiveusers.data;
    }).catch(e => {
      this.errors.push(e)
    })
}
      this.loaded = true

    } catch (e) {
      console.error(e)
    }
    }
  },
  mounted (){
    this.loaddata();
  },
watch: {
    // whenever question changes, this function will run
    charttype: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>