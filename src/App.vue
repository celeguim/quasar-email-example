<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("UserStore", ["handleAuthStateChanged"]),
  },
  mounted() {
    this.handleAuthStateChanged();
  },
};
</script>
