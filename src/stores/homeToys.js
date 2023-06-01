import { defineStore } from "pinia";
import { getToys } from "../queries/getToys";
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";

export const useToysStore = defineStore("toys", {
  state: () => ({
    toys: [],
    basket: [],
    priceToys: 0,
    basketQuantity: 0,
  }),

  getters: {
    setToys(state) {
      return computed(() => state.toys);
    },
    setBasket(state) {
      return computed(() => state.basket);
    },
  },

  actions: {
    getToys() {
      let { result } = useQuery(getToys);
      this.toys = computed(() => result.value?.toys ?? []);
    },

    getBasket(card) {
      if (this.basket.length) {
        let isToys = false;
        this.basket.map((el) => {
          if (card.name === el.name) {
            isToys = true;
            el.quantity++;
            this.priceToys += el.price;
          }
          return el;
        });
        if (!isToys) {
          this.basket.push(card);
          card.quantity = 1;
          this.basketQuantity += 1;
          this.priceToys += card.price;
        }
      } else {
        this.basket.push(card);
        card.quantity = 1;
        this.priceToys += card.price;
        this.basketQuantity += 1;
      }
    },

    increment(toy) {
      toy.quantity++;
      this.priceToys += toy.price;
      this.basketQuantity++;
    },
    decrement(toy) {
      if (toy.quantity > 1) {
        toy.quantity--;
        this.priceToys -= toy.price;
        this.basketQuantity--;
      }
    },
    deleteToys(card) {
      // if (card.quantity > 1) {

      // } else {

      // }
      const indexToy = this.basket.findIndex((el) => el === card);
      this.basket.splice(indexToy, 1);
      // this.basketQuantity -= card.quantity;
      this.priceToys -= card.price;
    },
  },
});
