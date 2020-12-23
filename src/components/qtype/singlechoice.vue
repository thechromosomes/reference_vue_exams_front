<template>
  <div class="singlechoice_question qtype">
     <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
      <v-radio value="radio-1" hide-details class="shrink mr-2"></v-radio>
        <v-text-field label="Option 1"></v-text-field>
        </v-layout>
              <v-layout align-center>
      <v-radio value="radio-1" hide-details class="shrink mr-2"></v-radio>
        <v-text-field label="Option 2"></v-text-field>
        </v-layout>
              <v-layout align-center>
      <v-radio value="radio-1" hide-details class="shrink mr-2"></v-radio>
        <v-text-field label="Option 3"></v-text-field>
        </v-layout>
    </v-card-text>
  </v-card>
   <v-chip class="addchip">
      <v-avatar>
        <v-icon>add</v-icon>
      </v-avatar>
      Add choice
    </v-chip>
  </div>
</template>
