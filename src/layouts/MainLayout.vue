<template>
  <q-layout view="hHh Lpr lff" class="my-font">
    <!-- Хедер -->
    <q-header class="q-py-lg">
      <q-toolbar>
        <q-space />

        <q-list class="row">
          <q-item
            to="/"
            clickable
            v-ripple
            :active="link === 'inbox'"
            @click="link = 'inbox'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Главная</q-item-section>
          </q-item>

          <q-item
            to="/shop"
            clickable
            v-ripple
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Магазины</q-item-section>
          </q-item>

          <q-item
            to="/contacts"
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Контакты</q-item-section>
          </q-item>

          <q-btn to="/basket" flat icon="shopping_cart">{{
            storeHomeToys.basketQuantity
          }}</q-btn>

          <!-- <q-item to="/entry"
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            
            <q-item-section class="text-h6">Войти</q-item-section>
          </q-item> -->

          <q-item id="auth-links" clickable v-ripple>
            <q-btn @click="login" flat label="Войти" type="button" />
          </q-item>

          <div class="q-ml-md">
            <div id="user-button"></div>
          </div>

        </q-list>
        <!-- <q-btn to="/basket" flat icon="shopping_cart">{{storeHomeToys.basketQuantity}}</q-btn> -->

        <!-- <q-btn flat icon="account_circle"></q-btn> -->
      </q-toolbar>
      <q-img
        class="backround_unicorn absolute-top"
        src="../assets/unicorn_back.png"
      ></q-img>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useToysStore } from "../stores/homeToys";
import Clerk from "@clerk/clerk-js";
import { login, logout } from "../clerk/index";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    // Clerk //
    const publishableKey =
      "pk_test_d2VhbHRoeS1lZnQtMzEuY2xlcmsuYWNjb3VudHMuZGV2JA";

    const script = document.createElement("script");
    script.setAttribute("data-clerk-publishable-key", publishableKey);
    script.async = true;
    script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
    script.crossOrigin = "anonymous";

    script.addEventListener("load", async function () {
      await window.Clerk.load();

      const userButton = document.getElementById("user-button");
      const authLinks = document.getElementById("auth-links");

      window.Clerk.addListener(({ user }) => {
        authLinks.style.display = user ? "none" : "";
      });

      if (window.Clerk.user) {
        window.Clerk.mountUserButton(userButton);
        userButton.style.margin = "auto";
        localStorage.setItem("session_id", window.Clerk.session.id);
      }
    });

    document.body.appendChild(script);

    // Другое
    const storeHomeToys = useToysStore();
    return { linksList, storeHomeToys, logout, login };
  },
});
</script>

<style>
@font-face {
  font-family: "Comic-Sans-MS";
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: "Comic-Sans-MS";
}

.backround_unicorn {
  height: 100%;
  opacity: 0.4;
  z-index: -1;
}
</style>
