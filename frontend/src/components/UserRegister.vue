<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="register">
        <input v-model="name" placeholder="Nom" required />
        <input v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
      <p>Déjà un compte ? <router-link to="/">Connectez-vous</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await this.$http.post('/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.$router.push('/');
        } catch (error) {
          alert('Erreur lors de l\'inscription');
        }
      },
    },
  };
  </script>
  