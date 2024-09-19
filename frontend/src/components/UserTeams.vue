<template>
  <div>
    <h1>Gestion des Équipes</h1>

    <div v-if="team">
      <h2>Votre équipe</h2>
      <p>Nom de l'équipe: {{ team.name }}</p>
      <button @click="deleteTeam">Supprimer l'équipe</button>
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
      team: null,
      teamName: '',
    };
  },
  async created() {
    this.fetchTeam();
  },
  methods: {
    async fetchTeam() {
      try {
        const token = localStorage.getItem('token');
        const response = await this.$http.get('/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.length > 0) {
          this.team = response.data[0]; // Chaque utilisateur n'a qu'une équipe
        }
      } catch (error) {
        alert('Erreur lors de la récupération de l\'équipe');
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
        this.fetchTeam();
      } catch (error) {
        alert('Erreur lors de la création de l\'équipe');
      }
    },
    async deleteTeam() {
      try {
        const token = localStorage.getItem('token');
        await this.$http.delete(`/delete-team/${this.team._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.team = null;
      } catch (error) {
        alert('Erreur lors de la suppression de l\'équipe');
      }
    },
  },
};
</script>
