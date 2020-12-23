<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
      <div>
    <br />
     <template>
      <v-card class="clearqstnrprts last_hide" >
        <v-card-title>
          Question List
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
          :items="lebellistdatas"
          :search="search"
          :rows-per-page-items="[50, 100, 150]"
          :pagination.sync="pagination"
          class="kfptable"
        >
          <template  slot="items" slot-scope="props">
            <td>{{props.item}}</td>
            <td>{{qlistdatas[props.index]}}</td>
             <td>{{sbaqlistdatas[props.index]}}</td>
             <td>{{kfpqlistdatas[props.index]}}</td>
             <td>{{caseqlistdatas[props.index]}}</td>
             <td>{{imgqlistdatas[props.index]}}</td>
             <td>{{userqlistdatas[props.index]}}</td>
            
          </template>
          <template slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
        
      </v-card>
    </template>
  </div>
  <div v-if="processloader" class="loading_bg"> <div class="loading_text"> Loading........... </div> </div>
  </div>
</template>

<script>
import LineChart from './LineChart'
import moment from 'moment'


export default {
  name: 'LineChartContainer',
  components: { LineChart},
  props: ['charttype', 'startDate','endDate'],
  data: () => ({
    loaded: false,
    processloader: true,
    errors:[],
    chartdata:{   
                    labels: [],
                    datasets: [{
                                  label: 'All Questions',
                                  backgroundColor: '#F0B27A',
                                  borderColor:'#F0B27A',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#F0B27A',
                                  data: []
                              },
                              {
                                  label: 'SBA Questions',
                                  backgroundColor: '#46504B',
                                  borderColor:'#46504B',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#46504B',
                                  data: []
                              },

                              {
                                  label: 'KFP Questions',
                                  backgroundColor: '#451912',
                                  borderColor:'#451912',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#451912',
                                  data: []
                              },
                              {
                                  label: 'CASE Questions',
                                  backgroundColor: '#79842B',
                                  borderColor:'#79842B',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#79842B',
                                  data: []
                              },
                              {
                                  label: 'Image of the week',
                                  backgroundColor: '#842B7F',
                                   borderColor:'#842B7F',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#842B7F',
                                  data: []
                              },
                                                            {
                                  label: 'User Question',
                                  backgroundColor: '#DA5C48',
                                   borderColor:'#DA5C48',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#DA5C48',
                                  data: []
                              }
                              ],

        },
        options: {
                scales: { yAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: true } }],
                          xAxes: [{ ticks: { beginAtZero: true }, gridLines: { display: false} }]
                },
                legend: { display: true },
               // tooltips: { enabled: true,  mode: 'single', callbacks: { label: function(tooltipItems, data) {return tooltipItems.yLabel + ''; } }},
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
          {text: 'Questions', align: 'left', sortable: true, value: '' },
          { text: 'SBA Questions', align: 'left', sortable: true, value: '' },
          { text: 'KFP Questions', align: 'left', sortable: true, value: '' },
          { text: 'CASE Questions', align: 'left', sortable: true, value: '' },
          { text: 'Image of the week', align: 'left', sortable: true, value: '' },
          { text: 'User Question', align: 'left', sortable: true, value: '' },
          
        ],
        qlistdatas: [],
        sbaqlistdatas: [],
        kfpqlistdatas: [],
        caseqlistdatas: [],
        imgqlistdatas: [],
        userqlistdatas: [],
        lebellistdatas:[],
        
  }),
  methods:{
    async loaddata(){
          this.loaded = false
          this.processloader = true
    try {
      console.log('hello hi ',this.charttype);
if(this.charttype==0){

  
   await axios.post(`/getchangequestiondaysdata`,{'userid':this.currentuser,'startDate':this.startDate,'endDate':this.endDate})
    .then(qdaychartresponse => {
      // JSON responses are automatically parsed.
      // console.log("the get change qusetion days data " ,qdaychartresponse.data)
          this.lebellistdatas = qdaychartresponse.data.labels;
          this.qlistdatas = qdaychartresponse.data.countdata;
          this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[0].data = qdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),

     await axios.post(`/getsbaquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      // console.log(qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaqlistdatas = qadaychartresponse.data.countdata;
          //this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
 
     await axios.post(`/getkfpquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      // console.log(qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfpqlistdatas = qadaychartresponse.data.countdata;
          //this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),

    await axios.post(`/getcasequestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("case respose", qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseqlistdatas = qadaychartresponse.data.countdata;
         // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
 await axios.post(`/getimgquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      // console.log(qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.imgqlistdatas = qadaychartresponse.data.countdata;
         // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getuserquestionsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      // console.log(qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.userqlistdatas = qadaychartresponse.data.countdata;
         // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

}else if(this.charttype==1){

 await axios.post(`/getchangequestionweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 1", qweekchartresponse.data)
          this.lebellistdatas = qweekchartresponse.data.labels;
          this.qlistdatas = qweekchartresponse.data.countdata;
          this.chartdata.labels = qweekchartresponse.data.labels;
          this.chartdata.datasets[0].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getsbaquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 2", qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaqlistdatas = qadaychartresponse.data.countdata;
          this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
  
     await axios.post(`/getkfpquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 3", qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfpqlistdatas = qadaychartresponse.data.countdata;
        this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
  
    await axios.post(`/getcasequestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate': moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 4", qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseqlistdatas = qadaychartresponse.data.countdata;
        this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getimgquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 5 ", qadaychartresponse.data)
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.imgqlistdatas = qadaychartresponse.data.countdata;
        this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getuserquestionsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log("this is week data 6", qadaychartresponse.data)  
          this.lebellistdatas = qadaychartresponse.data.labels;
          this.userqlistdatas = qadaychartresponse.data.countdata;
          // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })


}else if(this.charttype==2){

 await axios.post(`/getchangequestionmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // console.log("respone1", qmonthchartresponse)
      // JSON responses are automatically parsed.
         this.lebellistdatas = qmonthchartresponse.data.labels;
          this.qlistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[0].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
   
    await axios.post(`/getsbaquestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // console.log("respone2", qadaychartresponse.data)
      // JSON responses are automatically parsed.
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.sbaqlistdatas = qadaychartresponse.data.countdata;
        // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),

     await axios.post(`/getkfpquestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // console.log("respone3", qadaychartresponse.data)
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
       //   this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfpqlistdatas = qadaychartresponse.data.countdata;
      //   this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),

    await axios.post(`/getcasequestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // console.log("respone4", qadaychartresponse.data)
      // JSON responses are automatically parsed.
       //   this.lebellistdatas = qadaychartresponse.data.labels;
          this.caseqlistdatas = qadaychartresponse.data.countdata;
         //this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
await axios.post(`/getimgquestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // console.log("respone5", qadaychartresponse.data)
      // JSON responses are automatically parsed.
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.imgqlistdatas = qadaychartresponse.data.countdata;
        // this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getuserquestionsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qadaychartresponse => {
      // console.log("respone6", qadaychartresponse.data)
      // JSON responses are automatically parsed.
         // this.lebellistdatas = qadaychartresponse.data.labels;
          this.userqlistdatas = qadaychartresponse.data.countdata;
       //  this.chartdata.labels = qadaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

}
      this.processloader = false
      this.loaded=true

    } catch (e) {
      console.error(e)
    }
    }
  },
  created (){
    this.loaddata();
  },
  mounted (){
    this.processloader = false

  },
watch: {
    // whenever question changes, this function will run
    charttype: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }, startDate: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    },
     endDate: function (newQuestion, oldQuestion) {
      //this.answer = 'Waiting for you to stop typing...'
      //this.debouncedGetAnswer()
      this.loaddata();
    }
  }
}
</script>