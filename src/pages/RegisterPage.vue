<template>
  <q-page padding>
    <h5 class="text-center">Register</h5>
    <q-form
      class="authentication q-gutter-y-md"
      v-model="form"
      @submit.prevent="handleRegister"
    >
      <q-input
        v-model="form.email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        lazy-rules="lazy-rules"
        name="email"
        label="EMAIL"
        type="email"
        :rules="[
          (val) => !!val || '*Field is required',
          (val) =>
            (val.includes('@') && val.includes('.')) ||
            '*Please Provide a valid email',
        ]"
      />
      <q-input
        v-model="form.password"
        for="password"
        name="password"
        lazy-rules="lazy-rules"
        outlined
        autocomplete="current-password"
        color="primary"
        data-cy="password"
        label="PASSWORD"
        :rules="[(val) => !!val || '*Field is required']"
        type="password"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        lazy-rules="lazy-rules"
        outlined
        autocomplete="new-password"
        color="primary"
        data-cy="verifyPassword"
        label="VERIFY PASSWORD"
        v-model="form.passwordMatch"
        :rules="[
          (val) => !!val || '*Field is required',
          (val) => val === form.password || '*Passwords don\'t match',
        ]"
        type="password"
        @keyup.enter="onSubmit()"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn
        class="full-width q-mt-md"
        color="primary"
        data-cy="submit"
        type="submit"
        label="Register"
      >
      </q-btn>

      <p class="q-ma-sm text-center">
        <router-link class="text-blue" to="login">Login?</router-link>
      </p>
    </q-form>
  </q-page>
</template>

<style lang="stylus">
.authentication
  margin auto
  max-width 30em
  width 100%
</style>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "RegisterPage",

  data() {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null,
    };
  },

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const { isLoggedIn } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn()) {
        router.push("me");
      }
    });

    const handleRegister = async () => {
      try {
        console.log("handleRegister: form.value", form.value);
        await register(form.value.email, form.value.password);
        console.log("handleRegister: userCredential", user);
        notifySuccess("Registration was Successful");
        router.push("me");
      } catch (error) {
        console.log("handleLogin: error", error);
        notifyError(error.message);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
