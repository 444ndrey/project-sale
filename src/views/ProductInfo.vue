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
          <AmountByPriceChart :data="items"></AmountByPriceChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import {onMounted, ref} from 'vue'
import TheProductForm from "../components/TheProductForm.vue";
import AmountByPriceChart from "../components/AmountByPriceChart.vue";
import { ipcRenderer } from 'electron';
export default {
    setup() {
        const route = useRoute();
        const items = ref([]);
        const product = ref({});
        onMounted(() => {
          setupProductInfo();
          setupItems();
        });
        function setupProductInfo(){
          ipcRenderer.invoke('get-product-info',route.query.id).then(res => {
              product.value = res;
          });
        }
        function setupItems(){
          ipcRenderer.invoke('get-enities',route.query.id).then(res => {
            items.value = res;
          });
        }
        return { product, items };
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