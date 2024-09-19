<template>
    <div>
      <h1>Modifier l'équipe</h1>
      <form @submit.prevent="updateTeam">
        <div>
          <label>Nom de l'équipe :</label>
          <input v-model="team.name" required />
        </div>
        <div>
          <label>Description :</label>
          <textarea v-model="team.description"></textarea>
        </div>
        <div>
          <label>Membres :</label>
          <ul>
            <li v-for="(member, index) in team.members" :key="index">
              {{ member }}
              <button @click.prevent="removeMember(index)">Retirer</button>
            </li>
          </ul>
          <input v-model="newMember" placeholder="Ajouter un membre" />
          <button @click.prevent="addMember">Ajouter</button>
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        team: {
          name: '',
          description: '',
          members: []
        },
        newMember: ''
      };
    },
    async created() {
      this.fetchTeam();
    },
    methods: {
      async fetchTeam() {
        try {
          const token = localStorage.getItem('token');
          const response = await this.$http.get(`/teams/${this.$route.params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.team = response.data;
        } catch (error) {
          alert('Erreur lors de la récupération des données de l\'équipe');
        }
      },
  
      async updateTeam() {
        try {
          const token = localStorage.getItem('token');
          await this.$http.put(`/teams/${this.$route.params.id}`, this.team, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert('Équipe mise à jour avec succès');
          this.$router.push('/');
        } catch (error) {
          alert('Erreur lors de la mise à jour de l\'équipe');
        }
      },
  
      addMember() {
        if (this.newMember) {
          this.team.members.push(this.newMember);
          this.newMember = '';
        }
      },
  
      removeMember(index) {
        this.team.members.splice(index, 1);
      }
    }
  };
  </script>
  