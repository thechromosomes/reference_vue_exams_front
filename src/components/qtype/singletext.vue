<template>
  <div class="text_single qtype">
      <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
      <v-text-field v-model="answerhere"  label="Answer" ></v-text-field>
         </v-layout>
    </v-card-text>
  </v-card>
  </div>
</template>
