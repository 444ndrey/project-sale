<template>
  <div class="wrapper">
    <div class="chart-wrapper">
    <label for="">Структура товаров по количеству в продажах:</label>
    <Doughnut :chart-data="chartData" :chart-options="chartOptions"></Doughnut>
  </div>
  <div class="chart-wrapper">
    <label for="">Структура товаров по сумме продаж в рублях:</label>
    <Doughnut :chart-data="chartDataByPrice" :chart-options="chartOptions"></Doughnut>
  </div>
  </div>
</template>

<script>
import { Pie, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { computed } from "@vue/runtime-core";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
);
// ChartJS.defaults.plugins.legend.display = false;
export default {
  components: { Pie,Doughnut },
  props: ["data"],
  setup(props) {
    const chartOptions = {
      tooltips: {
        enabled: true
    },
    };
    const chartData = computed(() => {
      return {
        labels: props.data.map((a) => a.name),
        hoverBorderWidth: 10,
        datasets: [
          {
            backgroundColor: [
              "#CB3E3E",
              "#6ADC79",
              "#F2542D",
              "#124775",
              "#0e9594",
            ],
            label: ["some", "some", "some"],
            data: props.data.map((a) => a.count),
          },
        ],
        options: chartOptions
      };
    });
    ///
    const chartDataByPrice = computed(() => {
      return {
        labels: props.data.map((a) => a.name),
        hoverBorderWidth: 10,
        datasets: [
          {
            backgroundColor: [
              "#CB3E3E",
              "#6ADC79",
              "#F2542D",
              "#124775",
              "#0e9594",
            ],
            label: ["some", "some", "some"],
            data: props.data.map((a) => a.sum),
          },
        ],
        options: chartOptions
      };
    });


    return { chartData, chartOptions, chartDataByPrice };
  },
};
</script>

<style scoped>
.chart-wrapper {
  max-width: 350px;
}
.chart-wrapper label {
  color: var(--gray-secound);
  font-weight: bold;
  cursor: default;
}
.wrapper{
  margin: 70px 0;
  display: flex;
  gap: 100px;
  align-items: center;
}
</style>