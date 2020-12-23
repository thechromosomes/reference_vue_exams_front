<template>
  <div class="text_contact qtype">
      <v-card>
    <v-card-text>
    <v-text-field v-model="questiontext"  label="Type Question here..." required ></v-text-field>
      <v-layout align-center>
      <v-text-field label="First Name"  ></v-text-field>
      </v-layout>
       <v-layout align-center>
      <v-text-field label="Last Name"  ></v-text-field>
      </v-layout>
         <v-layout align-center>
      <v-text-field label="Email"  ></v-text-field>
       </v-layout>
         <v-layout align-center>
      <v-text-field label="Phone"  ></v-text-field>
       </v-layout>
         <v-layout align-center>
      <v-text-field label="Address..."  ></v-text-field>
        </v-layout>
    </v-card-text>
  </v-card>
  </div>
</template>
