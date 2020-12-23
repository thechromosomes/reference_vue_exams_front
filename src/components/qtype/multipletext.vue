<template>
  <div class="text_multiple qtype">
  <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
        <v-layout align-center>
      <v-text-field label="Enter Text Here"  ></v-text-field>
      </v-layout>
      <v-layout align-center>
      <v-text-field  label="Enter Text Here"  ></v-text-field>
       </v-layout>
      <v-layout align-center>
      <v-text-field label="Enter Text Here"  ></v-text-field>
       </v-layout>
      <v-layout align-center>
      <v-text-field label="Enter Text Here"  ></v-text-field>
      
  </v-layout>
    </v-card-text>
  </v-card>
   <v-chip class="addchip">
      <v-avatar>
        <v-icon>add</v-icon>
      </v-avatar>
      Add Textbox
    </v-chip>
  </div>
</template>
