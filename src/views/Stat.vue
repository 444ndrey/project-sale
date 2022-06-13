<template>
  <div>
    <div class="control-win container">
      <h2 class="title1 placeholder">Статистика</h2>
      <div class="head">
        <div class="head-item">
          <h2 class="title2">Расход на закупки</h2>
          <h2 class="title2 head-item-value">
            {{ totalExpenses.toFixed(2) }}&#8381;
          </h2>
        </div>
        <div class="head-item">
          <h2 class="title2">Доход от продаж</h2>
          <h2 class="title2 head-item-value">
            {{ totalIncome.toFixed(2) }}&#8381;
          </h2>
        </div>
        <div class="head-item">
          <h2 class="title2">Прибыль</h2>
          <h2
            class="title2 head-item-value"
            :class="{ negative: totalIncome - totalExpenses < 0 }"
          >
            {{ (totalIncome - totalExpenses).toFixed(2) }}&#8381;
          </h2>
        </div>
      </div>
      <ProfitChart :data="productStructurebySale"></ProfitChart>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { ipcRenderer } from "electron";
import ProfitChart from "../components/StructurePorudctChart.vue";
export default {
  setup() {
    let sales = [];
    let purchases = [];
    let products = [];
    let totalExpenses = ref(0);
    let totalIncome = ref(0);
    let productStructurebySale = ref([{}]);
    let getExpenses = () => {
      if (purchases.length == 0) return 0;
      let result = 0;
      purchases.forEach((item) => {
        result += item.cost * item.amount;
      });
      return result;
    };
    function makeReadableNumber(number) {
      if (number > 999) {
        let formatter = new Intl.NumberFormat("ru", {
          style: "decimal",
          minimumFractionDigits: 2,
        });
        number = formatter.format(number);
      }
      return number;
    }
    function getIncome() {
      if (sales.length == 0) return 0;
      let result = 0;
      sales.forEach((item) => {
        result += item.price * item.amount;
      });
      return result;
    }
    function setProductStructure() {
       let total = 0;
      products.forEach((prdct) => {
        let counter = 0;
        let sum = 0;
        sales.forEach((sale) => {
          if (prdct.id == sale.info_id) {
            counter += sale.amount;
            sum += sale.price * sale.amount;
            total+= sale.amount;
          }
        });
        productStructurebySale.value.push({
          name: prdct.name,
          count: counter,
          sum: sum
        });
      });
      productStructurebySale.value = productStructurebySale.value.filter(p => p.count > 0);
      console.log(total);
      productStructurebySale.value.forEach(item => {
          item.percent = parseFloat(item.count / total * 100).toFixed();
      })
      console.log(productStructurebySale.value)
    }
    onMounted(() => {
      ipcRenderer.invoke("get-all-sales-v2").then((res) => {
        sales = res;
        totalIncome.value = getIncome();
      });
      ipcRenderer.invoke("get-all-purchase-v2").then((res) => {
        purchases = res;
        totalExpenses.value = getExpenses();
      });
      ipcRenderer.invoke("get-all-products").then((res) => {
        products = res;
        setProductStructure();
      });
    });
    return {
      totalExpenses,
      totalIncome,
      makeReadableNumber,
      productStructurebySale,
    };
  },
  components: { ProfitChart },
};
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-around;
}
.head-item {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head-item-value {
  color: var(--gray-secound);
  font-weight: bold;
}
.negative {
  color: var(--red);
}
</style>