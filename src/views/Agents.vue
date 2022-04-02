<template>
  <div>
    <div class="control-win container">
      <div class="win__panel">
        <input
          class="control-search1"
          type="text"
          maxlength="20"
          placeholder="Поиск название, ИНН"
          v-model="searchValue"
        />
        <button class="btn1" @click="$router.push('NewAgent')">Добавить контрагента</button>
      </div>
      <table class="table">
        <th class="table__header">Имя</th>
        <th class="table__header">ИНН</th>
        <th class="table__header">Адрес</th>
        <th class="table__header">Телефон</th>
        <th class="table__header">Подробнее</th>
        <th class="table__header">Удалить</th>
        <tr class="table__row" v-for="item in searchAgents" :key="item.id">
          <td class="table__value">{{ item.name }}</td>
          <td class="table__value">{{ item.inn }}</td>
          <td class="table__value">{{ item.address }}</td>
          <td class="table__value">{{ item.phone }}</td>
          <td class="table__value">
            <router-link to="/agents" class="table__value-link"
              >открыть</router-link
            >
          </td>
          <td class="table__value">
            <button class="table__value-del">&#10006;</button>
          </td>
        </tr>
      </table>
      <p class="table-empty" v-if="searchAgents.length == 0">
        Ой, тут пусто :(
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { ref } from "vue";
export default {
  setup() {
    let agents = [
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
    ];
    let searchValue = ref("");
    let searchAgents = computed(() => {
      if (searchValue.value.length > 0) {
        return agents.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
            item.inn.toLowerCase().includes(searchValue.value.toLowerCase())
        );
      }
      return agents;
    });

    return { searchValue, searchAgents };
  },
};
</script>

<style scoped>

.win__panel {
  display: flex;
  justify-content: left;
  gap: 50px;
  align-items: center;
  margin-bottom: 40px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}
.table__header {
  text-align: left;
  color: var(--gray-main);
  padding: 10px 5px;
  border-bottom: 1px solid rgba(209, 209, 209, 0.933);
  /* border-bottom: 1px solid var(--gray-main); */
}
.table__value {
  color: var(--gray-secound);
  border: 0px 1px solid var(--gray-main);
  font-size: 18px;
  padding: 10px 10px;
  word-break: break-all;
}
.table__row {
  border-radius: 10px;
  padding: 20px 0;
}
.table__row:hover {
  background-color: #eeee;
}
.table__value-link {
  color: var(--gray-main);
  text-decoration: none;
  font-size: 16px;
  transition: 0.2s ease-in-out;
  user-select: none;
}
.table__value-link:hover {
  color: var(--gray-secound);
  font-size: 17px;
}
.table__value-del {
  color: var(--gray-main);
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.table__value-del:hover {
  color: #d62424;
  transform: scale(1.1);
}
.table-empty {
  text-align: center;
  color: var(--gray-main);
  font-size: 18px;
  font-weight: bold;
}
</style>