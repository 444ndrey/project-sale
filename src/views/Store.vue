<template>
  <div class="wrapper">
    <div class="grid container">
      <!-- <div class="grid__item grid__item-header"></div> -->
      <div class="grid__item">
        <div class="list__panel">
          <input
            type="text"
            v-model="searchValue"
            class="control-search1"
            maxlength="20"
            placeholder="Поиск название, артикул, цена"
          />
          <div class="cb">
            <input
              type="checkbox"
              id="cb1"
              v-model="isOnlyAvailable"
              @change="fillProductList()"
            />
            <label for="cb1" class="cb-label">Только товар в наличии</label>
          </div>
          <div class="sort-wrap">
            <select id="sort" class="control-select" @change="sort" >
              <option value="0" class="control-select-opt" selected disabled>Сортировать</option>
              <option value="1" class="control-select-opt">Сначала дорогие</option>
              <option value="2" class="control-select-opt">Сначала дешевые</option>
            </select>
            <label for="sort">
            </label>
          </div>
          <button class="btn1" @click="$router.push({ name: 'NewProduct' })">
            Добавить товар
          </button>
        </div>
      </div>
      <div class="grid__item">
        <h2 class="title1">
          {{ searchProduct.length > 0 ? "Товары" : "Нет товара..." }}
        </h2>
        <div class="list__items">
          <ProductCard
            v-for="item in searchProduct"
            :product="item"
            :key="item.id"
            :filtredAmount="isOnlyAvailable"
            @dblclick="
              $router.push({ name: 'ProdctInfo', query: { id: item.id } })">
            </ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import ProductCard from "../components/uiControls/ProductCard.vue";
import { computed, ref, onMounted } from "vue";
import { ipcRenderer } from "electron";
export default {
  setup() {
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
    onMounted(() => {
      fillProductList();
    });
    let products = ref([]);
    let searchValue = ref("");
    let isOnlyAvailable = false;
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
    function sort(e){
      let val = e.target.value
      switch (val) {
        case '1':
          products.value = products.value.sort((a,b) => b.price - a.price);
          break;
          case '2':
            products.value = products.value.sort((a,b) => a.price - b.price);
            break;
      } 
    }
    return {
      products,
      searchValue,
      searchProduct,
      isOnlyAvailable,
      fillProductList,
      sort
    };
  },
  components: { ProductCard},
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  overflow: visible;
  height: 100%;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
.grid__item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
}
.grid__item-header {
  grid-column: 1 / 3;
}
.list__panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 20px;
}
.list__title {
  color: var(--gray-secound);
}
.list__items {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-bottom: 10px;
  overflow-y: visible;
  border: 2px solid #eeee;
  height: 750px;
  padding: 10px;
  border-radius: 15px;
  overflow-y: scroll;
  align-content: flex-start;
}
.cb {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 12px;
}
.control-search1 {
  margin-bottom: 20px;
}
.sort-wrap{
  margin-bottom: 50px;
}
.btn1{
  align-self: flex-end;
}
@media screen and (max-height: 900px) {
  .grid {
    grid-template-rows: 1fr 6fr;
  }
  .list__items {
    height: 650px;
  }
}
@media screen and (max-height: 790px) {
  .list__items {
    height: 550px;
  }
}
</style>