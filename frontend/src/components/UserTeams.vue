<template>
  <div>
    <h1>Gestion des Équipes</h1>

    <!-- Si une équipe est récupérée, affiche-la -->
    <div v-if="teams.length > 0">
      <h2>Vos équipes</h2>
      <ul>
        <li v-for="team in teams" :key="team._id">
          Nom de l'équipe: {{ team.name }}
        </li>
      </ul>
    </div>

    <!-- Si aucune équipe, proposer la création d'une équipe -->
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
      teams: [],  // Tableau pour stocker les équipes
      teamName: '',
    };
  },
  async created() {
    this.fetchTeam();  // Appelle la fonction pour récupérer les équipes lors du chargement du composant
  },
  methods: {
    // Fonction pour récupérer les équipes
    async fetchTeam() {
      try {
        const token = localStorage.getItem('token');
        const response = await this.$http.get('/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Réponse de l\'API:', response.data);  // Vérifie ce que renvoie l'API
        
        if (Array.isArray(response.data)) {
          this.teams = response.data;  // Assigne les équipes récupérées à la variable teams
        } else {
          this.teams = [];  // Si aucune équipe, vide le tableau
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes:', error);
        alert('Erreur lors de la récupération des équipes');
      }
    },
    // Fonction pour créer une nouvelle équipe
    async createTeam() {
      try {
        const token = localStorage.getItem('token');
        await this.$http.post(
          '/add-team',
          { name: this.teamName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.fetchTeam();  // Recharge les équipes après création
      } catch (error) {
        alert('Erreur lors de la création de l\'équipe');
      }
    }
  },
};
</script>
