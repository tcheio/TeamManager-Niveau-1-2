<template>
    <div class="edit-team-container">
      <h1>Modifier l'équipe</h1>
      <form @submit.prevent="updateTeam">
        <div class="form-group">
          <label>Nom de l'équipe :</label>
          <input v-model="team.name" required class="input-field" />
        </div>
        <div class="form-group">
          <label>Description :</label>
          <textarea v-model="team.description" class="textarea-field"></textarea>
        </div>
        <div class="form-group">
          <label>Membres :</label>
          <ul class="members-list">
            <li v-for="(member, index) in team.members" :key="index" class="member-item">
              {{ member }}
              <button @click.prevent="removeMember(index)" class="btn-remove-member">Retirer</button>
            </li>
          </ul>
          <input v-model="newMember" placeholder="Ajouter un membre" class="input-field" />
          <button @click.prevent="addMember" class="btn-add-member">Ajouter</button>
        </div>
        <button type="submit" class="btn-save">Enregistrer les modifications</button>
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
          this.$router.push('/teams');
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
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
  
  .edit-team-container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #222222;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    color: #fff;
    font-family: 'Orbitron', sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #ff4b2b;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
  }
  
  .input-field, .textarea-field {
    width: 100%;
    padding: 10px;
    background-color: #141414;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    margin-top: 5px;
  }
  
  .textarea-field {
    height: 100px;
  }
  
  .members-list {
    list-style-type: none;
    padding: 0;
  }
  
  .member-item {
    background-color: #282828;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  
  .btn-add-member, .btn-remove-member {
    background-color: #ff4b2b;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-remove-member {
    margin-left: 10px;
  }
  
  .btn-add-member:hover, .btn-remove-member:hover {
    background-color: #ff2d1a;
  }
  
  .btn-save {
    width: 100%;
    background-color: #ff4b2b;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    text-transform: uppercase;
    transition: background-color 0.3s;
  }
  
  .btn-save:hover {
    background-color: #ff2d1a;
  }
  
  </style>
  