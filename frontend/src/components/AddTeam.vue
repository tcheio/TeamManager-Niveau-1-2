<template>
    <div>
      <h1>Ajouter une équipe</h1>
      <input v-model="newTeamName" placeholder="Nom de l'équipe">
      <button @click="addTeam">Ajouter</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        newTeamName: ''
      }
    },
    methods: {
      async addTeam() {
        if (this.newTeamName.trim() === '') {
          alert("Le nom de l'équipe ne peut pas être vide");
          return;
        }
        try {
          await axios.post('/add-team', { name: this.newTeamName });
          this.newTeamName = '';
          this.$emit('team-added'); 
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'équipe:', error);
        }
      }
    }
  }
  </script>
  