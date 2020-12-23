<template>
  <div class="text_comment qtype">
    
        <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
           <v-flex xs6>
        <v-textarea
          name="input-7-1"
          label="Default style"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
        ></v-textarea>
      </v-flex>
 
      </v-layout>
    </v-card-text>
  </v-card>


  </div>
</template>

