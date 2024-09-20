<template>
  <div class="register-container">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <input v-model="name" placeholder="Nom" required class="input-field" />
      </div>
      <div class="form-group">
        <input v-model="email" placeholder="Email" required class="input-field" />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Mot de passe" required class="input-field" />
      </div>
      <button type="submit" class="btn-register">S'inscrire</button>
    </form>
    <p>Déjà un compte ? <router-link to="/" class="link">Connectez-vous</router-link></p>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

.register-container {
  max-width: 400px;
  margin: 40px auto;
  background-color: #222222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  text-align: center;
}

h1 {
  text-align: center;
  color: #ff4b2b;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  background-color: #141414;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  margin-top: 5px;
}

.btn-register {
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

.btn-register:hover {
  background-color: #ff2d1a;
}

.link {
  color: #ff4b2b;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}
</style>
