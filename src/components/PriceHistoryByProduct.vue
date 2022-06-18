<template>
  <div class="wrapper">
    <Line
      :chart-data="chartData"
      :chart-options="chartOptions"
      :height="100"
      v-if="data.length > 0"
    ></Line>
    <h2 class="title2" v-else>Нет продаж</h2>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Legend,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
} from "chart.js";

import { computed } from "@vue/runtime-core";
ChartJS.register(
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
export default {
  props: ["data", "type"],
  setup(props) {
    let chartData = computed(() => {
      let key;
      key = props.type == "sale" ? "price" : "cost";
      let arr = props.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.date === value.date && t.price === value.price));
      arr = arr.sort((a,b) => {
        let adate = new Date(a.date);
        let bdate = new Date(b.date);
        return adate - bdate;
      })
      return {
        labels: arr.map((item) => item.date.toString()),
        datasets: [
          {
            label: "Цена продажи за единицу в рублях",
            data: arr.map((a) => a[key]),
            fill: true,
            backgroundColor: ["#ff9191"],
            borderColor: "#ff4242",
          },
        ],
      };
    });
    let chartOptions = {};
    return { chartData, chartOptions };
  },
  components: { Line },
};
</script>

<style scoped>
.wrapper {
  height: 100px;
}
</style>