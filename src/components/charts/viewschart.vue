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
          Views List
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
            <td>{{sbalistdatas[props.index]}}</td>
             <td>{{kfplistdatas[props.index]}}</td>
            <td>{{caselistdatas[props.index]}}</td>
            <td>{{caselistdatas[props.index]}}</td>
            <td>{{imageOfTheWeek[props.index]}}</td>
            <td>{{userQuestion[props.index]}}</td>
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
    errors:[],
    chartdata:{   
                    labels: [],
                    datasets: [{
                                  label: ['SBA/MCQ'],
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
                                  label: ['KFP'],
                                  backgroundColor: '#5DADE2',
                                   borderColor:'#5DADE2',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#5DADE2',
                                  data: []
                              },
                              {
                                  label: ['Case'],
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
                                  label: ['Image of the week'],
                                  backgroundColor: '#da5c47',
                                   borderColor:'#da5c47',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#da5c47',
                                  data: []
                              },
                               {
                                  label: ['User question'],
                                  backgroundColor: '#d425ca',
                                   borderColor:'#d425ca',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#d425ca',
                                  data: []
                              },
                              {
                                  label: ['Articles'],
                                  backgroundColor: '#B5E8CB',
                                   borderColor:'#B5E8CB',
                                  pointBackgroundColor: 'white',
                                  borderWidth: 1,
                                  fill: false,
                                  lineTension: 0,
                                  pointBorderColor: '#B5E8CB',
                                  data: []
                              }
                              ],

        },
        options: {
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
          {text: 'SBA', align: 'left', sortable: true, value: '' },
          { text: 'KFP', align: 'left', sortable: true, value: '' },
          { text: 'CASE', align: 'left', sortable: true, value: '' },
          { text: 'Image of the week', align: 'left', sortable: true, value: '' },
          { text: 'User Question', align: 'left', sortable: true, value: '' },
          { text: 'Article', align: 'left', sortable: true, value: '' },
          
        ],
        sbalistdatas: [],
        kfplistdatas: [],
        caselistdatas: [],
        articlelistdatas: [],
        lebellistdatas:[],
        imageOfTheWeek:[],
        userQuestion:[],
  }),
  methods:{
    async loaddata(){
          this.loaded = false
    try {
      console.log('hello hi there',this.charttype);
if(this.charttype==0){

  
   await axios.post(`/getsbaviewsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qdaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qdaychartresponse.data)
          this.lebellistdatas = qdaychartresponse.data.labels;
          this.sbalistdatas = qdaychartresponse.data.countdata;
          this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[0].data = qdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),  
     await axios.post(`/getkfpviewsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qadaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qadaychartresponse.data)
 this.lebellistdatas = qadaychartresponse.data.labels;
          this.kfplistdatas = qadaychartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[1].data = qadaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
      await axios.post(`/getcaseviewsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qwdaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qwdaychartresponse.data)
 this.lebellistdatas = qwdaychartresponse.data.labels;
          this.caselistdatas = qwdaychartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[2].data = qwdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
      await axios.post(`/getarticleviewsdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qwdaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qwdaychartresponse.data)
 this.lebellistdatas = qwdaychartresponse.data.labels;
          this.articlelistdatas = qwdaychartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qwdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week days data
     await axios.post(`/imageoftheweekviewdaydata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qwdaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qwdaychartresponse.data)
 this.lebellistdatas = qwdaychartresponse.data.labels;
          this.imageOfTheWeek = qwdaychartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qwdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // user question days data
      await axios.post(`/userviewdaysdata`,{'userid':this.currentuser, 'startDate':this.startDate,'endDate':this.endDate})
    .then(qwdaychartresponse => {
      // JSON responses are automatically parsed.
      console.log(qwdaychartresponse.data)
 this.lebellistdatas = qwdaychartresponse.data.labels;
          this.userQuestion = qwdaychartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qwdaychartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

}else if(this.charttype==1){

 await axios.post(`/getsbaviewsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
 this.lebellistdatas = qweekchartresponse.data.labels;
          this.sbalistdatas = qweekchartresponse.data.countdata;
          this.chartdata.labels = qweekchartresponse.data.labels;
          this.chartdata.datasets[0].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
       await axios.post(`/getkfpviewsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
          this.lebellistdatas = qweekchartresponse.data.labels;
          this.kfplistdatas = qweekchartresponse.data.countdata;
          this.chartdata.labels = qweekchartresponse.data.labels;
          this.chartdata.datasets[1].data = qweekchartresponse.data.countdata;
    })
    .catch(e => {
      this.errors.push(e)
    }),
     await axios.post(`/getcaseviewsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
 this.lebellistdatas = qweekchartresponse.data.labels;
          this.caselistdatas = qweekchartresponse.data.countdata;
          this.chartdata.labels = qweekchartresponse.data.labels;
          this.chartdata.datasets[2].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getarticleviewsweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
 this.lebellistdatas = qweekchartresponse.data.labels;
          this.articlelistdatas = qweekchartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[3].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week WeekData
      await axios.post(`/imageoftheweekviewweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
 this.lebellistdatas = qweekchartresponse.data.labels;
          this.imageOfTheWeek = qweekchartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[4].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // user weekData
      await axios.post(`/userviewweekdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qweekchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qweekchartresponse.data)
 this.lebellistdatas = qweekchartresponse.data.labels;
          this.userQuestion = qweekchartresponse.data.countdata;
         // this.chartdata.labels = qdaychartresponse.data.labels;
          this.chartdata.datasets[5].data = qweekchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })
    
    


}else if(this.charttype==2){

 await axios.post(`/getsbaviewsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.sbalistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[0].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getkfpviewsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.kfplistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[1].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getcaseviewsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.caselistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[2].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    }),
    await axios.post(`/getarticleviewsmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.articlelistdatas = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[3].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // image of the week monthData
     await axios.post(`/imageoftheweekviewmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.imageOfTheWeek = qmonthchartresponse.data.countdata;
          this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[4].data = qmonthchartresponse.data.countdata;

    })
    .catch(e => {
      this.errors.push(e)
    })

    // user monthDAta
      await axios.post(`/userviewmonthdata`,{'userid':this.currentuser, 'startDate':moment(this.startDate).format("x"),'endDate':moment(this.endDate).format("x")})
    .then(qmonthchartresponse => {
      // JSON responses are automatically parsed.
      console.log(qmonthchartresponse.data)
 this.lebellistdatas = qmonthchartresponse.data.labels;
          this.userQuestion = qmonthchartresponse.data.countdata;
          // this.chartdata.labels = qmonthchartresponse.data.labels;
          this.chartdata.datasets[5].data = qmonthchartresponse.data.countdata;

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
    },
     startDate: function (newQuestion, oldQuestion) {
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