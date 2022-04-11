<template>
  <div class="chart">
    <Bar :chart-data="chartData" :height="100"></Bar>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  components: { Bar },
  props: ["data"],
  setup(props) {
    const chartData = {
      labels: props.data.map((a) => `${a.amount} ед. по ${a.price} руб.`),
      datasets: [
        {
          label: "Кол-во товара закупочной цене",
          backgroundColor: ["#ff9191"],
          borderColor: '#ff4242',
          borderWidth: 3,
          borderRadius: 10,
          data: props.data.map((a) => a.amount),
        },
      ],
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beingAtZero: true,
          },
        },
      },
    };
    return { chartData };
  },
};
</script>

<style scoped>
.chart {
  height: 300px !important;
  width: 100%;
}
</style>