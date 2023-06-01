<template>
  <q-page>
    <!-- Если корзинка пустая -->
    <div
      v-if="!storeHomeToys.basket.length"
      class="text-center q-mt-xl absolute-center"
    >
      <p class="text-h4">В корзинке пусто</p>
      <p class="text-h4">
        Вернемся в каталог, чтобы выбрать что-то подходящее?
      </p>
      <q-btn size="20px" color="primary" to="/">На главную</q-btn>
    </div>
    <div class="basket_wrapp">
      <!-- Карточка в корзинке -->
      <div class="q-ma-xl">
        <q-card
          class="flex align-center q-pa-lg justify-between"
          style="width: 100%; margin: 20px"
          v-for="toy in toys"
          :key="toy.id"
        >
          <div class="flex items-center justify-between" style="width: 65%">
            <div style="width: 50%">
              <img style="width: 100%" :src="toy.image1" alt="toy" />
            </div>

            <div style="width: 40%" class="text-center">
              <div class="text-subtitle1 q-pt-lg">{{ toy.name }}</div>
              <q-btn
                @click="storeHomeToys.deleteToys(toy)"
                flat
                icon="delete"
              ></q-btn>
            </div>
          </div>

          <div
            style="width: 25%"
            class="flex items-center justify-center column"
          >
            <div style="margin: 10px" class="text-h6">{{ toy.price }} ₽</div>
            <div style="width: 125px" class="flex items-center">
              <q-btn @click="decrement(toy)">-</q-btn>
              <p style="margin: 0 auto">{{ toy.quantity }}</p>
              <q-btn @click="increment(toy)">+</q-btn>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Окно формы отправки и счетчик цены -->
      <div
        v-if="storeHomeToys.basket.length"
        class="q-gutter-sm flex justify-around"
      >
        <q-btn
          style="margin: 5px; padding: 10px 60px"
          label="Оформить"
          color="primary"
          @click="fixed = true"
        />

        <q-dialog v-model="fixed">
          <q-card>
            <q-card-section>
              <div class="text-h6">Введите данные для получения заказа</div>
            </q-card-section>

            <q-separator />

            <q-scroll-area
              :thumb-style="thumbStyle"
              :bar-style="barStyle"
              style="height: 400px"
              class="q-mx-sm"
            >
              <q-card-section>
                <div class="q-pa-md" style="max-width: 400px">
                  <q-form
                    v-model="clearForm"
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                  >
                    <p class="text-h6">Получатель</p>
                    <q-input
                      filled
                      v-model="name"
                      label="Ваше Имя *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Пожалуйста введите имя',
                      ]"
                    />
                    <q-input
                      filled
                      v-model="surname"
                      label="Ваша Фамилия *"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Пожалуйста введите фамилию',
                      ]"
                    />

                    <q-input
                      filled
                      type="number"
                      v-model="phone"
                      hint="+7(999)999-99-99"
                      label="Контактный телефон*"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 10 && val.length < 12) ||
                          'Пожалуйста введите телефон',
                      ]"
                    />
                    <p class="text-h6">Куда доставить?</p>
                    <q-input
                      filled
                      v-model="address"
                      label="Адрес *"
                      hint="г. Волгоград, ул. Гражданская, д. 28"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Пожалуйста введите ваш адрес',
                      ]"
                    />
                    <q-input
                      filled
                      type="number"
                      v-model="apartment"
                      label="Квартира / офис"
                      lazy-rules
                    />
                    <q-input
                      v-model="text"
                      label="Комментарий для курьера"
                      filled
                      type="textarea"
                    />

                    <q-toggle
                      v-model="accept"
                      label="Я согласен(а) на обработку персональных данных"
                    />

                    <div class="q-mt-md flex justify-between">
                      <q-btn
                        label="Оформить"
                        type="submit"
                        color="primary"
                      />
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
              </q-card-section>
            </q-scroll-area>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                @click="onReset"
                flat
                label="Назад"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div>
          <p class="text-h6">Итого: {{ storeHomeToys.priceToys }} ₽</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useToysStore } from "../stores/homeToys";

export default {
  setup() {
    const storeHomeToys = useToysStore();
    const toys = storeHomeToys.setBasket;

    const increment = (toy) => {
      storeHomeToys.increment(toy);
    };
    const decrement = (toy) => {
      storeHomeToys.decrement(toy);
    };

    const $q = useQuasar();

    const name = ref(null);
    const surname = ref(null);
    const phone = ref(null);
    const address = ref(null);
    const apartment = ref(null);
    const text = ref(null);
    const accept = ref(false);

    return {
      toys,
      storeHomeToys,
      name,
      surname,
      phone,
      address,
      apartment,
      text,
      accept,
      increment,
      decrement,

      onReset() {
        name.value = null;
        surname.value = null;
        phone.value = null;
        address.value = null;
        apartment.value = null;
        text.value = null;
        accept.value = false;
      },

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Вы не подтвердили согласие",
          });
        } else {
          $q.dialog({
            message: "Спасибо! Ваш заказ передан в доставку!",
          });
          // почитать про закрытие формы q.dialog при нажатии на Ок чистить нашу форму и закрывать ее
        }
        this.onReset();
      },

      fixed: ref(false),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f468ae",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#f468ae",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
};
</script>

<style>
.q-btn {
  text-transform: none;
}

.basket_wrapp {
  max-width: 800px;
  margin: 0 auto;
}

.my-card-basket {
  border-radius: 10px;
}


</style>
