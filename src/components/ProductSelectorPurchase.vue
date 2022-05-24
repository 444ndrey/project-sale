<template v-if="isActive">
  <div class="wrapper">
    <div class="container control-win">
      <p class="title1">Выбрать товар</p>
      <div class="selector">
        <input
          type="text"
          class="control-search1"
          placeholder="Поиск по названию, артикулу, цене"
          v-model="searchValue"
        />
        <div class="products">
          <div class="product" v-for="item in searchProduct" :key="item.id">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="price">
          <span>&#8381;</span>
          <input
            type="text"
            class="control-input price-input"
            min="1"
            max="10000000"
            placeholder="Цена"
            v-model="price"
            @keypress="validPrice"
            @focusout="fixPrice"
          />
        </div>
        <input type="number" class="control-input amount-input" maxlength="6" v-model="amount">
      </div>
      <p class="selected-product">Выбранный</p>
      <button class="btn1">Выбрать</button>
      <button class="btn2" @click="isActvie = false">Отмена</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { ipcRenderer } from "electron";
export default {
    props: ['isActive'],
  setup() {
    let amount = ref(0);
    let price = ref(0);
    let products = ref(null);
    let searchValue = ref("");
    let searchProduct = computed(() => {
      let result = products.value;
      if (searchValue.value.length > 0) {
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
            item.code.toLowerCase().includes(searchValue.value.toLowerCase()) ||
            item.price.toString().includes(searchValue.value)
        );
        return result;
      }
      return result;
    });
    function fillProductList() {
      ipcRenderer.invoke("get-all-products").then((res) => {
        products.value = res.map((item) => {
          return {
            id: item.id,
            name: item.name,
            code: item.code,
            price: parseFloat(item.price).toFixed(2),
            unit: item.unit,
          };
        });
      });
    }
    function validPrice(e) {
      if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 46) {
        e.preventDefault();
        return;
      }
      if (e.target.value.length == 0 && e.keyCode == 46) {
        e.preventDefault();
        return;
      }
      let value = e.target.value;
      let dots = 0;
      value.split("").forEach((i) => {
        if (i === ".") {
          dots++;
        }
      });
      if (dots == 1 && e.keyCode == 46) {
        e.preventDefault();
        return;
      }
    }
    function fixPrice(e) {
      if (price.value == NaN || price.value == '') {
        price.value = 0;
      } else {
        price.value = parseFloat(e.target.value).toFixed(2);
      }
    }

    onMounted(() => {
      fillProductList();
    });

    return {
      searchValue,
      searchProduct,
      price,
      validPrice,
      fixPrice,
      amount
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 110vh;
  z-index: 100;
  position: absolute;
  background-color: rgba(146, 146, 146, 0.426);
  backdrop-filter: blur(2px);
  transform: translateY(-100px);
}
.control-win {
  width: min(70%, 900px);
  margin: 0 auto;
  margin-top: 200px;
  padding: 15px;
  height: 500px;
}
.products {
  max-height: 400px;
  min-height: 200px;
  overflow-y: scroll;
  margin-top: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 5px;
}
.product {
  padding: 5px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.product > p {
  margin: 0;
}
.product:hover {
  background-color: #eeee;
}
.btn1 {
  margin-top: 30px;
}
.selected-product {
  margin-top: 10px;
  font-weight: bold;
}
.price {
  display: flex;
  align-items: center;
  position: relative;
}
.price-input {
  padding-left: 20px;
  max-width: 150px;
}
.price span {
  position: absolute;
  margin-left: 5px;
  color: var(--gray-main);
  font-size: 20px;
  padding-bottom: 3px;
  user-select: none;
}
.amount-input{
    max-width: 150px;
}
</style>