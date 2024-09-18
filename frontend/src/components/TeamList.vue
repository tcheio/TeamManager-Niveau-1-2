<template>
    <div>
      <h1>Liste des équipes</h1>
      <ul>
        <li v-for="team in teams" :key="team._id">
          {{ team.name }}
          <button @click="deleteTeam(team._id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        teams: []
      }
    },
    methods: {
      async fetchTeams() {
        try {
          const response = await axios.get('/teams');
          this.teams = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des équipes:', error);
        }
      },
      async deleteTeam(teamId) {
        try {
          await axios.delete(`/delete-team/${teamId}`);
          this.fetchTeams();
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'équipe:', error);
        }
      }
    },
    mounted() {
      this.fetchTeams();
    }
  }
  </script>
  