<template>
  <div class="container">
 <v-dialog v-model="imagevalidationpopup" width="600" >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          Select date and time <span class="crosspopup cp_scheduler" @click="imagevalidationpopup=false">x</span>
        </v-card-title>
        <v-card-text>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <input @click='imagevalidationpopup=false' name="Set" type="Done" class="submit_btn set_scheduler" />
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>
<script>
export default {
  name: 'LineChartContainer',
  components: { LineChart},
  props: ['charttype','startDate','endDate'],
  data: () => ({
    loaded: false,
    chartdata:{   
                    labels: [],
                    datasets: [{
                                  label: 'Active users',
                                  backgroundColor: '#2ECC71',
                                  borderColor:'#2ECC71',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#2ECC71',
                                  data: []
                              },
                              {
                                  label: 'User churn rate',
                                  backgroundColor: '#CC0000',
                                  borderColor:'#CC0000',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#CC0000',
                                  data: []
                              }
                              ],

        },
    options:{
                scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: true } }],
                          xAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: false} }]
                },
                legend: { display: true },
                //tooltips: { enabled: true,  mode: 'single', callbacks: { label: function(tooltipItems, data) { return tooltipItems.yLabel + ''; } }},
                responsive: true,
                maintainAspectRatio: false,
                height: 200
                
        },
         search: '',
        pagination: {
        rowsPerPage: 100,
        descending: true,
        sortBy: 'created_at'
      },
        headers: [
          {text: 'Label', align: 'left', sortable: true, value: '' },
          {text: 'Nubmer of active users ', align: 'left', sortable: true, value: '' },
          { text: 'User churn rate(%)', align: 'left', sortable: true, value: '' },
          
        ],
        listdatas: [],
        lebellistdatas:[]
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
      console.log('hello hi ',this.charttype+'start '+this.startDate+' end '+this.endDate);
if(this.charttype==0){
     await axios.post(`/getchangeactiveuserdaysdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
    .then(daychartresponse => {
      // JSON responses are automatically parsed.
      console.log(daychartresponse.data)
          this.lebellistdatas=daychartresponse.data.labels;
          this.listdatas=daychartresponse.data.countdata;
          this.chartdata.labels = daychartresponse.data.labels;
          this.chartdata.datasets[0].data = daychartresponse.data.countdata;
          //this.chartdata.datasets[1].data = daychartresponse.data.countdata;
    }).catch(e => {
      this.errors.push(e)
    }),
     await axios.post(`/getchangeactiveuserdayschurndata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
    .then(daychartresponse => {
      // JSON responses are automatically parsed.
      console.log(daychartresponse.data)
          //this.lebellistdatas=daychartresponse.data.labels;
          //this.listdatas=daychartresponse.data.countdata;
          //this.chartdata.labels = daychartresponse.data.labels;
          this.chartdata.datasets[1].data = daychartresponse.data.countdata;
          //this.chartdata.datasets[1].data = daychartresponse.data.countdata;
    }).catch(e => {
      this.errors.push(e)
    })
}else if(this.charttype==1){
  await axios.post(`/getchangeactiveuserweekdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
    .then(weekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(weekchartresponse.data)
      this.lebellistdatas=weekchartresponse.data.labels;
          this.listdatas=weekchartresponse.data.countdata;
          this.chartdata.labels = weekchartresponse.data.labels;
          this.chartdata.datasets[0].data = weekchartresponse.data.countdata;
          //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getchangeactiveuserweekchurndata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
    .then(weekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(weekchartresponse.data)
      //this.lebellistdatas=weekchartresponse.data.labels;
         // this.listdatas=weekchartresponse.data.countdata;
          //this.chartdata.labels = weekchartresponse.data.labels;
          this.chartdata.datasets[1].data = weekchartresponse.data.countdata;
          //this.chartdata.datasets[1].data = daychartresponse.data.countdata;

    })
    .catch(e => {
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