const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("src/pages/Home.vue") },
      { path: "/shop", component: () => import("/src/pages/Shop.vue") },
      { path: "/contacts", component: () => import("src/pages/Contacts.vue") },
      { path: "/basket", component: () => import("src/pages/Basket.vue") },
      { path: "/entry", component: () => import("src/pages/Entry.vue") },
      { path: "/registration", component: () => import("src/pages/Registration.vue") },
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
