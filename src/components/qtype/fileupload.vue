<template>
  <div class="text_single qtype">
      <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
         </v-layout>
    </v-card-text>
  </v-card>
  <v-layout align-center>
   <v-chip class="addchip">
      <v-avatar>
        <v-icon>add</v-icon>
      </v-avatar>
      Add choice
    </v-chip>
    </v-layout>
  </div>
</template>
