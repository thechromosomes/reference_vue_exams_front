<template>
  <div class="multichoice_question qtype">
    <div class="multichoice_option">
       <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
        <v-checkbox v-model="includeFiles" hide-details class="shrink mr-2"></v-checkbox>
        <v-text-field label="Option 1"></v-text-field>
      </v-layout>
      <v-layout align-center>
        <v-checkbox v-model="includeFiles" hide-details class="shrink mr-2"></v-checkbox>
        <v-text-field label="Option 2"></v-text-field>
      </v-layout>
      <v-layout align-center>
        <v-checkbox v-model="includeFiles" hide-details class="shrink mr-2"></v-checkbox>
        <v-text-field label="Option 3"></v-text-field>
      </v-layout>
    </v-card-text>
  </v-card>
 
      </div>
 <v-chip class="addchip">
      <v-avatar>
        <v-icon>add</v-icon>
      </v-avatar>
      Add choice
    </v-chip>

  </div>
</template>
