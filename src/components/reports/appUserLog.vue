<template>
<div>
    <h3>App user log</h3>
    <h4>Total user {{userLogReport.length}}</h4>
     <v-data-table
        :headers="headers"
        :items="userLogReport"
        :rows-per-page-items="[50, 100, 150]"
        :pagination.sync="pagination"
        :search="search"
        >
        <template slot="items" slot-scope="props">
            <td>{{props.item.users.firstname}} {{props.item.users.firstname}}</td>
            <td>{{props.item.created_at | createDatentime}}</td>
        </template>
    </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userLogReport: [],
            search: null,
            pagination: {
                rowsPerPage: 100,
                descending: true,
                sortBy: 'created_at'
            },
            errors:[],
            headers: [
                { text: 'User', sortable: true, value:'firstname', sortable: true},
                { text: 'Login', sortable: true, value:'created_at', sortable: true},
            ]
        }
    },

    created(){
        axios.post('/appuserlog')
        .then(response => {
            this.userLogReport = response.data.data
        })
        .catch(err => {
          this.errors.push(err)
        })
    }
}
</script>