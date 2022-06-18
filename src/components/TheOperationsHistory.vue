<template>
  <div class="wrapper">
    <table class="table">
      <th class="table-header">Тип операции</th>
      <th class="table-header">Контрагент</th>
      <th class="table-header sortable" @click="$emit('sort-sum')">Сумма</th>
      <th class="table-header sortable" @click="$emit('sort-date')">Дата</th>
      <th class="table-header">Подробнее</th>
      <tr class="table-row" v-for="item in ops" :key="item.id">
        <td class="table-value">
          <div class="table-type table-type-buy" v-if="item.type == 'sale'">
            Продажа
          </div>
          <div class="table-type table-type-sale" v-else>Закупка</div>
        </td>
        <td class="table-value">{{ item.agent.name }}</td>
        <td class="table-value">&#8381;{{ item.sum }}</td>
        <td class="table-value">
          {{ item.date.split("-").reverse().join(".") }}
        </td>
        <td class="table-value">
          <a
            @click.prevent="
              $router.push({
                name: 'OperationInfo',
                query: { id: item.id, type: item.type },
              })
            "
            >открыть</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
export default {
  props: ["operations", "agents"],
  setup(props) {
    const ops = computed(() => {
      return props.operations.map((item) => {
        return {
          id: item.id,
          agent: props.agents.find((a) => a.id == item.agent),
          date: item.date,
          type: item.type,
          sum: item.sum.toFixed(2),
        };
      });
    });
    return { ops };
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
  width: 100%;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table-header {
  color: var(--gray-main);
  font-weight: normal;
  user-select: none;
  text-align: center;
  border-bottom: 1px solid #c5c5c5;
  padding: 5px 0;
}
.table-row:hover {
  background-color: #eeee;
}
.table-row > td:first-child {
  width: 100px;
}
.table-value {
  text-align: center;
  padding: 7px 5px;
  font-weight: 500;
  font-size: 18px;
}
.table-value::selection {
  background-color: var(--red-light);
  color: white;
}
.table-type {
  height: 20px;
  border-radius: 20px;
  color: #fff;
  user-select: none;
  font-size: 16px;
}
.table-type-sale {
  background-color: #d56262;
}
.table-type-buy {
  background-color: #96d562;
}
.negative {
  color: #d56262;
}
.sortable {
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.sortable:hover {
  color: var(--gray-secound);
}
.table-value > a {
  transition: 0.3s ease-in-out;
  color: var(--gray-main);
  cursor: pointer;
  font-size: 16px;
}
.table-value:hover > a {
  color: var(--gray-secound);
  font-size: 17px;
}
</style>