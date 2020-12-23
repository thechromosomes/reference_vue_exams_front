<template>
  <div class="text_number qtype">
    <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
      <v-text-field label="Number..." required ></v-text-field>
      </v-layout>
    </v-card-text>
  </v-card>
  </div>
</template>

