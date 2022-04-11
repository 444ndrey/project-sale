<template>
  <div class="wrapper">
      <div class="grid container">
        <!-- <div class="grid__item grid__item-header"></div> -->
        <div class="grid__item"></div>
        <div class="grid__item">
          <div class="list__panel">
            <input
              type="text"
              v-model="searchValue"
              class="control-search1"
              maxlength="20"
              placeholder="Поиск название, артикул, цена"
            />
            <button class="btn1" @click="$router.push({name:'NewProduct'})">Добавить товар</button>
          </div>
          <h2 class="title1">
            {{ searchProduct.length > 0 ? "Товар в наличии" : "Нет товара..." }}
          </h2>
          <div class="list__items">
            <ProductCard
              v-for="item in searchProduct"
              :product="item"
              :key="item.id"
              @dblclick="$router.push({name: 'ProdctInfo', query:{id:item.id}})"
            ></ProductCard>
          </div>
        </div>
      </div>
  </div>
</template>

<script scoped>
import ProductCard from "../components/uiControls/ProductCard.vue";
import { computed, ref } from "vue";
export default {
  setup() {
    let products = ref([
      {
        id: 0,
        name: "Сахар 1кг",
        code: "001956",
        price: 90,
        unit: "шт",
        items: [
          { id: 0, price: 75, amount: 20 },
          { id: 1, price: 77, amount: 12 },
        ],
      },
      {
        id: 1,
        name: "Гвозди 50 шт пачка",
        code: "001253",
        price: 177,
        unit: "шт",
        items: [{ id: 0, price: 3, amount: 203 }],
      },
    ]);
    let searchValue = ref("");
    let searchProduct = computed(() => {
      if (searchValue.value.length > 0) {
        return products.value.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
            item.code
              .toLowerCase()
              .includes(searchValue.value.toLowerCase()) ||
            item.price.toString().includes(searchValue.value)
        );
      }
      return products.value;
    });

    return { products, searchValue, searchProduct };
  },
  components: { ProductCard },
};
</script>

<style scoped>
.wrapper{
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
  justify-content: space-between;
  margin-bottom: 50px;
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
  height: 600px;
  padding: 10px;
  border-radius: 15px;
  overflow-y: scroll;
}

@media screen and (max-height: 900px) {
  .grid {
    grid-template-rows: 1fr 6fr;
  }
}
</style>