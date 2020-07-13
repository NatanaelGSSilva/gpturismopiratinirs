<template>
  <div id="app">
    <SideBarMenu :user="user" />
  </div>
</template>

<script>
import SideBarMenu from "./components/SideBarMenu.vue";

export default {
  name: "App",
  components: {
    SideBarMenu
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    mudaUser(nome) {
      this.user = nome;
    }
  }
};
</script>

<style>
</style>
