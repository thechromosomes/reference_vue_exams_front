me<template>
<div>
    <h3>Sent link report</h3>
    <v-data-table
        :headers="headers"
        :items="sendlinkreport"
        :rows-per-page-items="[50, 100, 150]"
        :pagination.sync="pagination"
        :search="search"
        >
         <template  slot="items" slot-scope="props">
            <td>{{props.item.userDetails.firstname}} {{props.item.userDetails.lastname}}</td>
            <td>{{props.item.mobileNumber}}</td>
            <td>{{props.item.platform}}</td>
            <td>{{props.item.created_at | createDatentime}}</td>
        </template>
    </v-data-table>
</div>
</template>
<script>
var username=localStorage.username;

export default {
    data(){
        return{
            headers: [
                { text: 'User name', align: 'left', value: 'created_by', sortable: true },
                { text: 'Mobile number', align: 'left', value: 'mobileNumber', sortable: true },
                { text: 'Platform', align: 'left', value: 'platform',  sortable: false },
                { text: 'Dated', align: 'left', value: 'posted_at', sortable: true },

            ],
            sendlinkreport:[]
        }
    },
    methods:{

    },

    created(){

        axios.post(`/sendlinkreport`)
        .then(response => {
            this.sendlinkreport = response.data.data
        })
        .catch(error => {
            console.log("error: ", error)
        })
    }
}
</script>
