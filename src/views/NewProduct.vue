<template>
  <div>
    <div class="control-win container">
      <div>
        <h2 class="title1">Добавить товар</h2>
        <div class="message-error" v-if="error.isActive">
          <ul>
            <li v-for="item in error.messages" :key="item">{{ item }}</li>
          </ul>
        </div>
        <TheProductForm :product="product"></TheProductForm>
      </div>
      <div class="buttons-wrapper">
        <button class="btn1" @click="addProduct">Добавить</button>
        <button class="btn2" @click="$router.go(-1)">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import TheProductForm from "../components/TheProductForm.vue";
import { ref } from "vue";
import router from "../router";
import { ipcRenderer } from 'electron';
export default {
  components: { TheProductForm },
  setup() {
    const product = ref({
      id: 0,
      code: "",
      name: "",
      unit: "",
      price: 0,
      nds: 20
    });
    const error = ref({
      messages: [],
      isActive: false,
    });
    function addProduct() {
      product.value.unit = product.value.unit.replace(".", "");
      validateFileds();
    }
    function validateFileds() {
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
          let message = {};
          Object.assign(message,product.value);
          ipcRenderer.send('add-product',message);
          router.go(-1);
      }
    }
    return { product, addProduct, error };
  },
};
</script>

<style scoped>
.control-win {
  max-width: 700px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 10px;
  margin-top: 10px;
  bottom: 0;
}
</style>