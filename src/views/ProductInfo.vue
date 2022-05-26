<template>
  <div class="wrapper">
    <Dialog
      :isActive="dialog.isDialogShown"
      :type="dialog.type"
      :handler="dialog.dialogFunc"
      :message="dialog.message"
      @update="$router.go(-1)"
    ></Dialog>
    <div class="grid container">
      <div class="control-win">
        <div class="message-error" v-if="error.isActive">
          <ul>
            <li v-for="item in error.messages" :key="item">{{ item }}</li>
          </ul>
        </div>
        <TheProductForm :product="product"></TheProductForm>
        <div class="buttons-wrapper">
          <button class="btn1" @click="saveChanges">Сохранить</button>
          <button class="btn2" @click="delProduct">Удалить</button>
          <button class="btn2" @click="$router.go(-1)">Назад</button>
        </div>
      </div>
      <div class="control-win">
        <h2 class="title1">Подробно</h2>
        <h3 class="amount">В наличии: {{totalAmount}} {{product.unit}}.</h3>
        <div class="chart-amountbyprice">
          <AmountByPriceChart :data="items"></AmountByPriceChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import TheProductForm from "../components/TheProductForm.vue";
import AmountByPriceChart from "../components/AmountByPriceChart.vue";
import { ipcRenderer } from "electron";
import Dialog from "../components/uiControls/Dialog.vue";
export default {
  setup() {
    const dialog = ref({
      dialogFunc: () => {},
      isDialogShown: false,
      type: undefined,
      message: undefined,
    });
    const route = useRoute();
    const router = useRouter();
    const items = ref([]);
    const product = ref({});
    const error = ref({
      messages: [],
      isActive: false,
    });
    const totalAmount = computed(() => {
      let total = 0;
         items.value.forEach(el => {
           total += el.amount;
         });
        return total;
    })
    onMounted(() => {
      setupProductInfo();
      setupItems();
    });
    function setupProductInfo() {
      ipcRenderer.invoke("get-product-info", route.query.id).then((res) => {
        product.value = res;
      });
    }
    function setupItems() {
      ipcRenderer.invoke("get-enities", route.query.id).then((res) => {
        items.value = res;
        console.log(items.value);
      });
    }
    function delProduct() {
      dialog.value.type = "warning";
      dialog.value.message = "Вы действительно хотите удалить этот товар ?";
      
      if (items.value.length != 0) {
        dialog.value.message = "Извините, но вы не можете удалить товар, который есть в наличии или ранее использовался в операциях!";
        dialog.value.type = "error";
        dialog.value.isDialogShown = true;
        dialog.value.dialogFunc = () => {};
      } else {
        dialog.value.isDialogShown = true;
        dialog.value.dialogFunc = () => {
          ipcRenderer.send("remove-product", product.value.id);
        };
      }
    }
    function saveChanges() {
      let requiers = ["code", "name", "unit", "price","nds"];
      error.value.isActive = false;
      error.value.messages = [];

      for (let i = 0; i < requiers.length; i++) {
        if (product.value[`${requiers[i]}`].length <= 0) {
          error.value.messages.push("Не все обязательные поля были заполнены");
          break;
        }
      }
      if (product.value.price < 0) {
        error.value.messages.push("Цена не может быть меньше 0");
      }
      if (error.value.messages.length > 0) {
        error.value.isActive = true;
      } else {
        let prod = {};
        Object.assign(prod, product.value);
        ipcRenderer.send("edit-product", prod);
        router.go(-1);
      }
    }
    return { product, items, saveChanges, error, dialog, delProduct,totalAmount  };
  },
  components: { TheProductForm, AmountByPriceChart, Dialog },
};
</script>

<style scoped>
.wrapper {
  margin: 0;
}
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 3fr;
  height: 100%;
}
.buttons-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.chart-amountbyprice {
  height: 300px;
}
.amount{
  width: 100%;
  text-align: right;
  font-weight: 400;
}
</style>