<template>
  <div>
    <Dialog
      :isActive="dialog.isDialogShown"
      :message="dialog.message"
      :type="dialog.type"
      :handler="dialog.dialogFunc"
      @update="updateList()"
    ></Dialog>
    <div class="control-win container">
      <h2 class="tilte1">Контрагенты</h2>
      <div class="win__panel">
        <input
          class="control-search1"
          type="text"
          maxlength="20"
          placeholder="Поиск название, ИНН"
          v-model="searchValue"
        />
        <button class="btn1" @click="$router.push('NewAgent')">
          Добавить контрагента
        </button>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <th class="table__header">Имя</th>
          <th class="table__header">ИНН</th>
          <th class="table__header">Адрес</th>
          <th class="table__header">Телефон</th>
          <th class="table__header">Подробнее</th>
          <th class="table__header">Удалить</th>
          <tbody>
            <tr class="table__row" v-for="item in filtredAgents" :key="item.id">
              <td class="table__value">{{ item.name }}</td>
              <td class="table__value">{{ item.inn }}</td>
              <td class="table__value">{{ item.address }}</td>
              <td class="table__value">{{ item.phone }}</td>
              <td class="table__value">
                <a
                  @click="
                    $router.push({ name: 'EdtAgent', query: { id: item.id } })
                  "
                  class="table__value-link"
                  >открыть</a
                >
              </td>
              <td class="table__value">
                <button class="table__value-del" @click="removeAgent(item.id)">
                  &#10006;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="table-empty" v-if="filtredAgents.length == 0">
        Ой, тут пусто :(
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { ipcRenderer } from "electron";
import Dialog from "../components/uiControls/Dialog.vue";
export default {
  setup() {
    let agents = ref([]);
    let dialog = ref({
      dialogFunc: () => {},
      isDialogShown: false,
      type: undefined,
      message: undefined,
    });
    onMounted(() => {
      fillAgentsList();
    });
    function fillAgentsList() {
      ipcRenderer.send("get-all-agents");
      ipcRenderer.on("send-all-agents", (e, data) => {
        agents.value = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            inn: item.inn,
            address: item.address,
            phone: item.phone,
          };
        });
      });
    }
    let searchValue = ref("");
    let filtredAgents = computed(() => {
      if (searchValue.value.length > 0) {
        return agents.value.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(searchValue.value.toLocaleLowerCase()) ||
            item.inn.includes(searchValue.value)
        );
      }
      return agents.value;
    });
    function removeAgent(id) {
      (dialog.value.type = "warning"),
        (dialog.value.message =
          "Вы действительно хотите удалить этого агента ?");
      dialog.value.isDialogShown = true;
      dialog.value.dialogFunc = () => {
        let agentId = id;
        return ipcRenderer.invoke("remove-agent", agentId);
      };
    }
    function updateList() {
      fillAgentsList();
      dialog.value.isDialogShown = false;
    }
    return { searchValue, filtredAgents, removeAgent, dialog, updateList };
  },
  components: { Dialog },
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
  overflow: auto;
  position: relative;
}
.table-wrapper {
  max-height: 600px;
  overflow-y: auto;
}
.table__header {
  text-align: left;
  color: var(--gray-main);
  padding: 10px 5px;
  /* border-bottom: 1px solid rgba(209, 209, 209, 0.933); */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #fff;
}
.table__value {
  color: var(--gray-secound);
  border: 0px 1px solid var(--gray-main);
  font-size: 18px;
  padding: 10px 10px;
  word-break: break-all;
}
.table__value::selection {
  background-color: var(--red-light);
  color: white;
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
  cursor: pointer;
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