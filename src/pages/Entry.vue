<template>
  <q-page class="my-font">
    <div class="bg">
      <div class="absolute-center text-center">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              name="email"
              label="Почта"
              hint="unicorn@yandex.ru"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Пожалуйста, введите вашу почту',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              hint="Должно содержать по крайней мере одно число, одну заглавную и строчную буквы, а также не менее 8 символов"
              label="Пароль"
              lazy-rules
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Пожалуйста, введите пароль',
              ]"
            />
            <span class="q-mb-xl" style="opacity: 0">kdkdk</span>

            <!-- <q-toggle class="q-mt-xl" v-model="accept" label="I accept the license and terms" /> -->

            <div class="q-mt-xl">
              <q-btn label="Войти" type="submit" color="primary" />
              <q-btn
                label="Очистить"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>

            <q-item
              to="/registration"
              clickable
              v-ripple
              :active="link === 'trash'"
              @click="link = 'trash'"
              active-class="my-menu-link"
            >
              <q-item-section style="color: #f468ae"
                >Зарегистироваться</q-item-section
              >
            </q-item>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);
    const accept = ref(false);

    return {
      email,
      password,
      accept,

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style>
@font-face {
  font-family: Comic-Sans-MS;
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: "Comic-Sans-MS";
}

.bg {
  background: linear-gradient(
    #c6e4ee 5%,
    #c6e4ee 10%,
    #fed1ae 50%,
    #faa0b9 70%,
    #cb7dcb 90%,
    #757ecb 100%
  );
  height: 100vh;
}
</style>
