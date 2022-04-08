<template>
  <div>
    <div class="control-win container">
      <div>
        <h2 class="title1">Добавить товар</h2>
        <div class="message-error" v-if="error.isActive">
            <ul>
              <li v-for="item in error.messages" :key="item">{{item}}</li>
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
import {ref} from 'vue'
export default {
  components: { TheProductForm },
  setup() {
    const product = ref({
      id: 0,
      code: "",
      name: "",
      unit: "",
      price: 0,
    });
    const error = ref({
      messages: [],
      isActive: false
    });
    function addProduct(){
      product.value.unit = product.value.unit.replace('.','')
      console.log(product.value.unit)
      validateFileds();
    };
    function validateFileds(){
      let requiers = ['code','name','unit']
      error.value.isActive = false;
      error.value.messages = [];

      for(let i = 0; i < requiers.length; i++){
        if(product.value[`${requiers[i]}`].length <= 0){
          error.value.messages.push('Не все обязательные поля были заполнены');
          break;
        }
      }
      for(let item of product.value.prices){
          if(item.price <= 0 || item.amount <= 0){
            error.value.messages.push('Кол-во или цена не должны быть равны 0');
            break;
          }
      }
      if(error.value.messages.length > 0){
          error.value.isActive = true;
      }
    }


     return {product,addProduct,error}
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