<template>
  <q-page padding>
    <h5 class="text-center">Login</h5>
    <q-form
      class="authentication q-gutter-y-md"
      v-model="form"
      @submit.prevent="handleLogin"
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
        :type="isPwd ? 'password' : 'text'"
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
        label="Login"
      >
      </q-btn>

      <p class="q-ma-sm text-center">
        <router-link class="text-blue" to="/auth/register"
          >Create account?</router-link
        >
      </p>

      <p class="q-ma-sm text-center">
        <router-link class="text-blue" to="forgotPassword"
          >Forgot Password?</router-link
        >
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
import { mapActions } from "vuex";
import { useState } from "vue";

export default defineComponent({
  name: "LoginPage",

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
    const { login, user } = useAuthUser();
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

    const handleLogin = async () => {
      try {
        //console.log("handleLogin: form.value", form.value);
        user.value = await login(form.value.email, form.value.password);
        //console.log("handleLogin: user", user);
        notifySuccess("Login Successful");
        router.push("me");
      } catch (error) {
        //alert(error.message);
        console.log("handleLogin: error", error);
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
