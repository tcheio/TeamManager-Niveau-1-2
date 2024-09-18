<template>
  <div id="app">
    <AddTeam @team-added="refreshTeams"/>
    <TeamsList ref="teamsList"/>
  </div>
</template>

<script>
import AddTeam from './components/AddTeam.vue';
import TeamsList from './components/TeamList.vue';

export default {
  components: {
    AddTeam,
    TeamsList
  },
  methods: {
    refreshTeams() {
      this.$refs.teamsList.fetchTeams();
    }
  }
}
</script>
