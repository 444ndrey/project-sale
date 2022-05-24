<template>
  <div>
    <div class="control-win container">
      <div class="title1">Операции</div>
      <div class="search-panel">
        <input
          type="text"
          class="control-search1"
          placeholder="Поиск по агенту, товару, договору"
          maxlength="30"
        />
        <button class="btn1" >&#8650; Оформить продажу</button>
        <button class="btn1 btn-bought" @click="$router.push('NewPurchase')">&#8648; Оформить покупку</button>
      </div>
      <TheOperationsHistory :operations="operations" :agents="agents"></TheOperationsHistory>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TheOperationsHistory from "../components/TheOperationsHistory.vue";
export default {
  components: { TheOperationsHistory },
  setup() {
    const purchase = [
      { id: 0, agent: 0, sum: 13000, date: '09.04.2022' },
      { id: 1, agent: 0, sum: 17000, date: '08.04.2022'},
      { id: 1, agent: 1, sum: 17000, date: '08.04.2022' },
    ].map(a => ({...a, type: 'buy'}));
    const sale = [
      { id: 0, agent: 0, sum: 13000, date: '30.03.2022' },
    ].map(a => ({...a, type: 'sale'}));
    const operations = purchase.concat(sale);
    const agents = [
      {
        id: 0,
        name: 'ооо"Магазин"',
        inn: "141131510365",
        address: "г.Москва ул.Улчиная д.17",
        phone: "8 123 4567089",
      },
      {
        id: 1,
        name: "ИП Иванов",
        inn: "757040423077",
        address: "г.Москва ул.Другая 18",
        phone: "8 123 4567089",
      },
      {
        id: 2,
        name: 'оао "ИДЕЯ"',
        inn: "621883385834",
        address: "г.Ярославль ул.Ярославская д.9",
        phone: "8 123 4567089",
      },
    ]

    return {operations,agents}
  },
};
</script>

<style scoped>
.search-panel {
  display: flex;
  gap: 10px;
}
.search-panel input {
  margin-right: 30px;
}
</style>