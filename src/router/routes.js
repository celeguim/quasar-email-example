const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "forgotPassword",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "me",
        component: () => import("pages/MePage.vue"),
        requiresAuth: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
