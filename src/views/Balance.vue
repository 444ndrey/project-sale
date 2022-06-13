<template>
  <div>
    <div class="control-win container">
      <div class="title1">Операции</div>
      <div class="search-panel">
        <input
          type="text"
          class="control-search1"
          placeholder="Поиск по агенту"
          maxlength="30"
          v-model="searchValue"
        />
        <button class="btn1" @click="$router.push('NewSale')">
          &#8650; Оформить продажу
        </button>
        <button class="btn1" @click="$router.push('NewPurchase')">
          &#8648; Оформить покупку
        </button>
      </div>
      <TheOperationsHistory
        :operations="searchResult"
        :agents="agents"
        @sort-date="sortByDate"
        @sort-sum="sortBySum"
      ></TheOperationsHistory>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TheOperationsHistory from "../components/TheOperationsHistory.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { ipcRenderer } from "electron";
import SelectBox from "../components/uiControls/SelectBox.vue";
export default {
  components: { TheOperationsHistory, SelectBox },
  setup() {
    let purchase = [];
    let sales = [];
    let agents = ref([]);
    let sorting = ref({
      isFirstLast: false,
      isExpensiveFirst: false
    });
    const operations = ref([]);
    let searchValue = ref("");
    let searchResult = computed(() => {
      let result;
      if (searchValue.value.length > 0) {
        let agentRes = agents.value.filter((item) =>
          item.name.toLowerCase().includes(searchValue.value.toLowerCase())
        );
        result = operations.value.filter((item) => {
          for (let j of agentRes) {
            if (item.agent == j.id) {
              return true;
            }
          }
        });
      } else {
        result = operations.value;
      }
      return result;
    });
    function setOperations() {
      sales = sales.map((item) => {
        item.type = "sale";
        ipcRenderer.invoke("get-sale-products", item.id).then((res) => {
          item.products = res;
        });
        return item;
      });
      purchase = purchase.map((item) => {
        item.type = "buy";
        ipcRenderer.invoke("get-purchase-products", item.id).then((res) => {
          item.products = res;
        });
        return item;
      });
      operations.value = purchase.concat(sales);
      setTimeout(() => {
        operations.value.forEach((item) => {
          let sum = 0;
          let type = item.type;
          item.products.forEach((item) => {
            if(type == 'buy'){
              sum += item.cost * item.amount;
            }else{
               sum += item.price * item.amount;
            }
          });
          item.sum = sum;
        });
      }, 100);
      console.log(operations.value)
      sortByDate();
    }
    function sortByDate() {
      sorting.value.isFirstLast = !sorting.value.isFirstLast;
      if (sorting.value.isFirstLast) {
        return operations.value.sort((a, b) => {
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          return +bDate - +aDate;
        });
      } else {
        return operations.value.sort((a, b) => {
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          return +aDate - +bDate;
        });
      }
    }
    function sortBySum(){
      if(sorting.value.isExpensiveFirst){
        operations.value.sort((a,b) => a.sum - b.sum);
      }else{
        operations.value.sort((a,b) => b.sum - a.sum);
      }
      sorting.value.isExpensiveFirst = !sorting.value.isExpensiveFirst;
    }
    onMounted(() => {
      ipcRenderer.send("get-all-agents");
      ipcRenderer.on("send-all-agents", (e, data) => {
        agents.value = data;
        return ipcRenderer
          .invoke("get-all-sales")
          .then((result) => {
            sales = result;
            return;
          })
          .then(() => {
            return ipcRenderer
              .invoke("get-all-purchases")
              .then((result) => {
                purchase = result;
              })
              .then(() => {
                setOperations();
                return;
              });
          });
      });
    });

    return {
      agents,
      operations,
      sortByDate,
      sorting,
      searchValue,
      searchResult,
      sortBySum,
    };
  },
};
</script>

<style scoped>
.search-panel {
  display: flex;
  gap: 10px;
  align-items: center;
}
.search-panel input {
  margin-right: 30px;
}
</style>