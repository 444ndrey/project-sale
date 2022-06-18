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
          <h2 class="title2">Маржа</h2>
          <h2
            class="title2 head-item-value"
            :class="{ negative: totalIncome - totalExpenses < 0 }"
          >
            {{ (totalIncome - totalExpenses).toFixed(2) }}&#8381;
          </h2>
        </div>
        <div class="head-item">
          <h2 class="title2">Маржинальность</h2>
          <h2 class="title2 head-item-value" :class="{ negative: totalIncome - totalExpenses < 0 }">
            {{ (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(2) }}%
          </h2>
        </div>
      </div>
      <ProfitChart :data="productStructurebySale"></ProfitChart>
      <div class="tableWrapper">
        <table class="tableStat">
        <th>Месяц</th>
        <th>Доход от продаж</th>
        <th>Затраты на закупки</th>
        <th>Маржа</th>
        <tr v-for="item in statByMonth" :key="item.monthNumber">
          <td>{{item.monthName}}</td>
          <td>{{item.income}}&#8381;</td>
          <td>{{item.cost}}&#8381;</td>
          <td>{{item.income - item.cost}}&#8381;</td>
        </tr>
      </table>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { ipcRenderer } from "electron";
import ProfitChart from "../components/StructureProductChart.vue";
export default {
  setup() {
    let sales = [];
    let statByMonth = ref([]);
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
            total += sale.amount;
          }
        });
        productStructurebySale.value.push({
          name: prdct.name,
          count: counter,
          sum: sum,
        });
      });
      productStructurebySale.value = productStructurebySale.value.filter(
        (p) => p.count > 0
      );
      productStructurebySale.value.forEach((item) => {
        item.percent = parseFloat((item.count / total) * 100).toFixed();
      });
    }
    function setStatByMonths() {
      let months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];
      let arr = [];
      purchases.forEach((item) => {
        let date = new Date(item.date);
        let count = arr.filter(a => a.monthNumber == date.getMonth() && a.year == date.getFullYear()).length;
        if(count == 0){
          arr.push({
            date: date,
            monthNumber: date.getMonth(),
            monthName: months[date.getMonth()],
            cost: item.cost * item.amount,
            year: date.getFullYear(),
          });
        }
        else{
          let a = arr.filter(a => a.date.getMonth() == date.getMonth() && a.year == date.getFullYear())[0].cost;
          arr.filter(a => a.date.getMonth() == date.getMonth() && a.year == date.getFullYear())[0].cost += a;
        }
      });
      arr.forEach(item => {
        let income = 0;
        sales.forEach(sale => {
          let date = new Date(sale.date);
            if(date.getMonth() == item.monthNumber && date.getFullYear() == item.year){
              income += sale.price * sale.amount;
            }
        });
        item.income = parseFloat(income);
      })
      statByMonth.value = arr.sort((a,b) => a.monthNumber - b.monthNumber);
    }
    onMounted(() => {
      ipcRenderer.invoke("get-all-sales-v2").then((res) => {
        sales = res;
        console.log(sales[0]);
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
      setTimeout(() => setStatByMonths(), 300);
    });
    return {
      totalExpenses,
      totalIncome,
      makeReadableNumber,
      productStructurebySale,
      statByMonth
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
.tableStat{
  width: 100%;
  border-collapse: collapse;
}
.tableStat th{
  border: 1px solid var(--gray-main);
  font-weight: bold;
  user-select: none;
}
.tableStat td{
  text-align: center;
  padding: 5px;
  border: 1px solid var(--gray-main);
}
.tableWrapper{
  max-height: 400px;
  padding: 10px;
  overflow-y: scroll;
}
</style>