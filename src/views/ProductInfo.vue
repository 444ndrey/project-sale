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
        <h2 class="title1">Подробно</h2>
        <div class="chart-amountbyprice">
          <AmountByPriceChart :data="product.items"></AmountByPriceChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import {ref} from 'vue'
import TheProductForm from "../components/TheProductForm.vue";
import AmountByPriceChart from "../components/AmountByPriceChart.vue";
export default {
    setup() {
        const route = useRoute();
        const products = [
            {
                id: 0,
                name: "Сахар 1кг",
                code: "001956",
                price: 90,
                unit: "шт",
                items: [
                    { id: 0, price: 75, amount: 20 },
                    { id: 1, price: 77, amount: 12 },
                    { id: 2, price: 72, amount: 100 },
                    { id: 3, price: 80, amount: 5 },
                ],
            },
            {
                id: 1,
                name: "Гвозди 50 шт пачка",
                code: "001253",
                price: 177,
                unit: "шт",
                items: [{ id: 0, price: 123, amount: 203 }],
            },
        ];
        const product = ref(products.find(a => a.id == route.query.id));
        return { product };
    },
    components: { TheProductForm, AmountByPriceChart }
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
  justify-content: flex-end;
  gap: 10px;
}
.chart-amountbyprice{
  height: 300px;
}
</style>