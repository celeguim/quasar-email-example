<template>
  <router-view />
</template>

<script>
import { useUsersStore } from "stores/users";
import { mapActions } from "pinia";

export default {
  setup() {
    const store = useUsersStore();

    // onMounted(() => {
    //   console.log("mounted", this.$store);
    //   //this.$store.dispatch("handleAuthStateChanged");
    //   //this.store.dispatch("handleAuthStateChanged");
    // });

    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },

  methods: {
    ...mapActions(useUsersStore, ["handleAuthStateChanged"]),
  },

  mounted() {
    this.handleAuthStateChanged();
  },
};
</script>
