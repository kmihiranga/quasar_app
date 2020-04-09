<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.handleAuthStateChanged();
  },
  methods: {
    ...mapActions("LoginRegister", ["handleAuthStateChanged"])
  }
};
</script>
