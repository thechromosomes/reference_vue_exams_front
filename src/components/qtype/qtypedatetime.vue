<template>
  <div class="qtype_date">
    <div>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
      </v-flex>
      <v-flex xs12 sm3>
        <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
      </v-flex>
    </v-layout>

    <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
  </div>
  </div>
</template>
<style scoped>
.qtype_date{
  padding-bottom: 30px;
}
</style>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
      }
    }
  }
</script>