<template>
  <div>
    <h1>Gestion des Équipes</h1>

    <div v-if="teams.length > 0">
      <h2>Vos équipes</h2>
      <ul>
        <li v-for="team in teams" :key="team._id">
          Nom de l'équipe: {{ team.name }}
          <button @click="deleteTeam(team._id)">Supprimer</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <h2>Créer une équipe</h2>
      <form @submit.prevent="createTeam">
        <input v-model="teamName" placeholder="Nom de l'équipe" required />
        <button type="submit">Créer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
      teamName: '',
    };
  },
  async created() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const token = localStorage.getItem('token');
        const response = await this.$http.get('/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.teams = response.data;
      } catch (error) {
        alert('Erreur lors de la récupération des équipes');
      }
    },

    async createTeam() {
      try {
        const token = localStorage.getItem('token');
        await this.$http.post(
          '/add-team',
          { name: this.teamName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.teamName = '';
        this.fetchTeams();
      } catch (error) {
        alert('Erreur lors de la création de l\'équipe');
      }
    },

    async deleteTeam(teamId) {
      try {
        const token = localStorage.getItem('token');
        await this.$http.delete(`/delete-team/${teamId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchTeams();
      } catch (error) {
        alert('Erreur lors de la suppression de l\'équipe');
      }
    }
  }
};
</script>
