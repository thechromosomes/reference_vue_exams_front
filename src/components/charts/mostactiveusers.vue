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
              <td><span class="img_user"> <img :src="props.item.userdetail.profile" class="pop_user"/> </span></td>
            <td>{{props.item.userdetail.firstname}}</td>
            <td>{{props.item.userdetail.lastname}}</td> 
            <td>{{ props.item.userdetail.lastlogin | createDate  }}</td> 
            <td>{{props.item.count}}</td>           
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
        descending: true,
        sortBy: 'count'
      },
        headers: [
          {text: '', align: 'left', sortable: false, value: '' },
          {text: 'First Name', align: 'left', sortable: true, value: 'userdetail.firstname' },
          {text: 'Last Name', align: 'left', sortable: true, value: 'userdetail.lastname' },
          {text: 'Last Login', align: 'left', sortable: true, value: '' },
          {text: 'Login Count', align: 'left', sortable: true, value: 'count' }
          
        ],
        mostactiveusers: []
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
if(this.charttype==0){
     await axios.post(`/getmostactiveusers`,{'userid':this.currentuser})
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