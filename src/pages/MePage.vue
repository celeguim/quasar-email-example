<template>
  <q-page padding>
    <p class="col-12 text-h5 text-center">Welcome</p>

    <div v-if="user">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        Hello {{ user.email }}
      </div>
    </div>

    <div class="full-width q-pt-md q-gutter-y-sm">
      <q-btn class="full-width q-mt-md" to="/" color="primary" label="Home" />
    </div>

    <div class="full-width q-pt-md q-gutter-y-sm">
      <q-btn
        class="full-width q-pt-md"
        @click="handleLogout()"
        color="primary"
        label="Logout"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MePage",

  setup() {
    const { user, logout } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();

    const handleLogout = async () => {
      try {
        console.log("Logging out...", user);
        await logout();
        notifySuccess("Logout Successful");
        user.value = null;
        router.push("/");
      } catch (error) {
        //alert(error.message);
        notifyError(error.message);
      }
    };

    return {
      user,
      handleLogout,
    };
  },
});
</script>
