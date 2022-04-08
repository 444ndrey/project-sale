<template>
  <div class="wrapper">
    <div class="grid container">
      <div class="control-win">
        <TheProductForm :product="product"></TheProductForm>
        <div class="buttons-wrapper">
        <button class="btn1" @click="saveProduct">Сохранить</button>
        <button class="btn2" @click="$router.go(-1)">Назад</button>
      </div>
      </div>
      <div class="control-win">
        <h2 class="title1">IN DEV</h2>
        <canvas id="chartAmonutByPrice" width="600" height="400"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import {ref} from 'vue'
import TheProductForm from "../components/TheProductForm.vue";
export default {
    setup() {
        const route = useRoute();
        const products = [
            {
                id: 0,
                name: "Сахар",
                code: "001956",
                price: 90,
                unit: "шт",
                items: [
                    { id: 0, price: 75, amount: 20 },
                    { id: 1, price: 77, amount: 12 },
                ],
            },
            {
                id: 1,
                name: "Гвозди 50 шт пачка",
                code: "001253",
                price: 177,
                unit: "шт",
                items: [{ id: 0, price: 3, amount: 203 }],
            },
        ];
        const product = ref(products.find(a => a.id == route.query.id));
        return { product };
    },
    components: { TheProductForm }
};
function drawPriceByAmount(){

}
</script>

<style scoped>
.wrapper{
  margin: 0;
}
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 3fr;
  height: 100%;
}
.buttons-wrapper{
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
}
</style>