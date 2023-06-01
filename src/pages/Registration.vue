<template>
  <q-page class="my-font">
    <div class="bg">
      <div class="absolute-center text-center">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ваше Имя *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Пожалуйста, введите ваше Имя',
              ]"
            />
            <q-input filled v-model="surname" label="Ваша Фамилия" lazy-rules />
            <q-input
              filled
              v-model="email"
              name="email"
              label="Почта *"
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
              label="Пароль *"
              lazy-rules
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Пожалуйста, введите пароль',
              ]"
            />

            <q-toggle
              style="max-width: 300px"
              class="q-mt-xl"
              v-model="accept"
              label="Я согласен(а) на обработку персональных данных"
            />

            <div class="flex column">
              <q-btn label="Зарегистироваться" type="submit" color="primary" />
              <q-btn
                label="Очистить"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
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

    const name = ref(null);
    const surname = ref(null);
    const password = ref(null);
    const email = ref(null);
    const accept = ref(false);

    return {
      name,
      surname,
      password,
      email,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Пожалуйста, подтвердите согласие на обработку персональных данных",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },


      onReset() {
        name.value = null;
        surname.value = null;
        password.value = null;
        email.value = null;
        accept.value = false;
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
