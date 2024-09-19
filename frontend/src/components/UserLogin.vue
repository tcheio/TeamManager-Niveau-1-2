<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte ? <router-link to="/auth/register">Inscrivez-vous</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await this.$http.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/teams');
        } catch (error) {
          alert('Erreur lors de la connexion');
        }
      },
    },
  };
  </script>
  