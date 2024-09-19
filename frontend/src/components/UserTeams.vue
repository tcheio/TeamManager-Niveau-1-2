<template>
  <div>
    <h1>Gestion des Équipes</h1>

    <div v-if="teams.length > 0">
      <h2>Vos équipes</h2>
      <ul>
        <li v-for="team in teams" :key="team._id">
          <router-link :to="{ name: 'edit-team', params: { id: team._id } }">
            Nom de l'équipe: {{ team.name }}
          </router-link>
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
    console.log("Token récupéré:", token);
    console.log("Nom de l'équipe:", this.teamName);

    const response = await this.$http.post(
      '/add-team',
      { name: this.teamName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log("Réponse de l'API:", response.data);
    this.teamName = '';
    this.fetchTeams();
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error.response.data);
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
  body {
  background-color: #141414;
  font-family: 'Orbitron', sans-serif; /* Style futuriste */
  color: #fff;
  margin: 0;
  padding: 0;
}

h1, h2 {
  text-align: center;
  text-transform: uppercase;
  color: #ff4b2b; /* Accent de couleur rouge pour un effet gamer */
  letter-spacing: 2px;
}

form, ul {
  max-width: 600px;
  margin: 20px auto;
  background-color: #222222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #141414;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
}

form button {
  background-color: #ff4b2b;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #ff2d1a;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #282828;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #333333;
}

li a {
  color: #ff4b2b;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}

li a:hover {
  text-decoration: underline;
}

button {
  background-color: #ff4b2b;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff2d1a;
}

@media (max-width: 600px) {
  form, ul {
    width: 90%;
  }
}
</style>
