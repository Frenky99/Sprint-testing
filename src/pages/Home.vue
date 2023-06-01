<template>
  <q-page class="my-font">
    <!-- Фильтры слева -->
    <q-btn
      class="menu-btn"
      @click="toggleLeftDrawer"
      flat
      round
      dense
      icon="menu"
    />
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="180"
      :breakpoint="700"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-lg">
          <div class="q-py-sm">Цвет</div>

          <q-option-group
            v-model="group"
            :options="options"
            :select="filterColor(group)"
            color="grey"
            type="checkbox"
          />
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- Поиск и кнопка сортировки -->
    <div class="flex q-mt-md items-end justify-around">
      <div class="input_main">
        <div>
          <q-input
            rounded
            outlined
            v-model="searchToy"
            placeholder="Поиск"
            class="q-mt-md"
          >
            <template v-slot:append>
              <q-btn @click="addTask" round dense flat icon="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="q-mr-md q-pt-md">
        <q-select
          class="select_main"
          rounded
          outlined
          v-model="sortToys"
          :options="sortOptions"
          :select="sortedCard(sortToys)"
          label="Сортировать по"
        />
      </div>
    </div>

    <!-- Каталог -->
    <div class="q-pa-md row justify-around">
      <q-card
        v-for="toy in search"
        :key="toy.id"
        class="my-card q-pa-md q-ma-sm"
      >
        <q-img :src="toy.image1" alt="logo" />

        <q-card-section class="q-pa-none">
          <div class="text-subtitle1 text-center q-pt-lg">{{ toy.name }}</div>

          <div class="flex items-center justify-between q-pt-lg">
            <div class="text-h6 q-mb-sm">{{ toy.price }} ₽</div>

            <div class="q-mb-sm" v-if="isVisible">
              <q-btn @click="clickBasket(toy)" flat icon="shopping_cart">
              </q-btn>
            </div>

            <div v-else style="margin: auto">
              <q-btn
                to="/basket"
                class="border-btn"
                style="width: 100%"
                label="Перейти в корзину"
              />
            </div>
          </div>

          <q-btn
            class="q-mt-sm"
            style="width: 100%"
            label="Подробнее"
            color="primary"
            @click="clickInfo(toy)"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- Индивидуальная карточка -->
    <q-dialog v-model="fixed" class="my-font">
      <q-card style="width: 700px">
        <q-card-section class="flex justify-between">
          <div class="text-h6" style="max-width: 600px">
            {{ dialogDesk.name }}
          </div>
          <q-btn @click="clickBasket(dialogDesk)" flat icon="shopping_cart"></q-btn>
        </q-card-section>

        <q-separator />

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 500px"
          class="q-mx-sm"
        >
          <q-card-section>
            <q-carousel
              v-model="slide"
              animated
              arrows
              :autoplay="autoplay"
              :arrows-style="arrowsStyle"
              infinite
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                class="carousel_img"
                :name="1"
                :img-src="dialogDesk.image1"
              />
              <q-carousel-slide
                class="carousel_img"
                :name="2"
                :img-src="dialogDesk.image2"
              />
              <q-carousel-slide
                class="carousel_img"
                :name="3"
                :img-src="dialogDesk.image3"
              />
            </q-carousel>

            <div class="text-h4 q-my-md">{{ dialogDesk.price }} ₽</div>
            <div>
              <p class="text-h6 text-weight-bold">Описание</p>
              <p class="text-italic">{{ dialogDesk.description }}</p>
            </div>
            <div>
              <p class="text-h6 text-weight-bold">Характеристики</p>
              <div class="text-italic">
                <p>
                  Высота/Длина ..................... {{ dialogDesk.height }} см
                </p>
                <p>
                  Цвет товара ........................... {{ dialogDesk.color }}
                </p>
                <p>
                  Тип ..........................................
                  {{ dialogDesk.type }}
                </p>
                <p>
                  Материал ...............................
                  {{ dialogDesk.material }}
                </p>
              </div>
            </div>
          </q-card-section>
        </q-scroll-area>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Назад" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useToysStore } from "../stores/homeToys";

export default {
  setup() {
    /**
     * qusar капот
     */
    const slide = ref(1);
    const autoplay = ref(true);
    const fixed = ref(false);
    /**
     * хранилище
     */
    const storeHomeToys = useToysStore();
    const toys = storeHomeToys.setToys;
    storeHomeToys.getToys();
    const clonToys = computed(() => [...toys.value]);

    /**
     * отображение индивидуальной карточки
     */
    let dialogDesk = ref("");

    const clickInfo = (toy) => {
      fixed.value = true;
      dialogDesk.value = toy;
    };

    /**
     * поиск
     */
    const searchToy = ref("");

    const search = computed(() => {
      return filterArrayColor.value.filter((card) => {
        return card.name.toLowerCase().includes(searchToy.value.toLowerCase());
      });
    });

    /**
     * сортировка
     */

    const sortToys = ref("");

    const sortedCard = () => {
      switch (sortToys.value.value) {
        case "Дёшево - сердито":
          return search.value.sort(sortByAsk);
        case "Дорого - богато":
          return search.value.sort(sortByDesk);
        default: // break 
          return search.value;
      }
    };

    const sortByAsk = (a, b) => {
      return a.price > b.price ? 1 : -1;
    };

    const sortByDesk = (a, b) => {
      return a.price < b.price ? 1 : -1;
    };

    const sortOptions = [
      { label: "Дёшево - сердито", value: "Дёшево - сердито" },
      { label: "Дорого - богато", value: "Дорого - богато" },
    ];

    /**
     * фильтрация
     */
    const group = ref([]);
    const filterByColor = ref([]);

    const filterColor = (group) => {
      filterByColor.value.length = 0;
      for (let i of group) {
        toys.value.map((elem) => {
          if (elem.color === i) {
            filterByColor.value.push(elem);
          } else {
            return;
          }
        });
      }
    };

    const filterArrayColor = computed(() => {
      if (filterByColor.value.length) {
        return filterByColor.value;
      } else {
        return clonToys.value;
      }
    });

    const options = [
      {
        label: "белый",
        value: "белый",
      },
      {
        label: "бежевый",
        value: "бежевый",
      },
      {
        label: "разноцветный",
        value: "разноцветный",
      },
      {
        label: "розовый",
        value: "розовый",
      },
      {
        label: "серый",
        value: "серый",
      },
      {
        label: "радуга",
        value: "радуга",
      },

      //       useQuery(gql`
      //     query MyQuery {
      // toys(distinct_on: color) {
      //   color
      // }
      //   `),
    ];

    /**
     * добавление в корзинку и скрытие корзинки
     */

    let isVisible = ref(true);

    const clickBasket = (toy) => {
      // isVisible.value = false; СКРЫВАЕТ ВСЕ КОРЗИНКИ ВМЕСТО ОДНОЙ

      const clonToy = { ...toy };
      storeHomeToys.getBasket(clonToy);
    };

    // const indexToyObject = this.toy.findIndex((el) => el === toy);
    // console.log(indexToyObject);

    /**
     * схлопывание бургер
     */
    const leftDrawerOpen = ref(true);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      storeHomeToys,
      clonToys,
      clickBasket,
      slide,
      autoplay,
      group,
      filterColor,
      clickInfo,
      fixed,
      dialogDesk,
      options,
      filterByColor,
      filterArrayColor,
      leftDrawerOpen,
      toggleLeftDrawer,
      isVisible,
      searchToy,
      search,
      sortOptions,
      sortToys,
      sortedCard,
      sortByAsk,
      sortByDesk,

      // model: ref(null),
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

      arrowStyle: {
        color: "black",
      },
    };
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: Comic-Sans-MS;
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: "Comic-Sans-MS";
}

.border-btn {
  border: 2px solid #f468ae;
}

.my-card {
  max-width: 220px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 520px;
}

.input_main {
  margin: 0 auto;
  width: 590px;
}

.select_main {
  width: 190px;
  margin: 0 auto;
}

.carousel_img {
  background-size: contain;
  background-repeat: no-repeat;
}

.q-carousel__control {
  color: black;
}

.q-carousel__arrow .q-icon {
  font-size: 36px;
}

.q-btn {
  text-transform: math-auto;
}

.q-dialog__inner--minimized > div {
  max-width: 705px;
}

.menu-btn {
  position: relative;
  top: -65px;
  font-size: 16px;
  color: white;
  z-index: 2000;
}
</style>
