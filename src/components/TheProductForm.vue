<template>
  <div class="field__items">
    <div class="filed__item">
      <p class="field__item-label field__item-necessary">Название:</p>
      <div>
        <input
          type="text"
          class="control-input"
          maxlength="30"
          placeholder="Название"
          v-model="product.name"
        />
      </div>
    </div>
    <div class="filed__item">
      <p class="field__item-label field__item-necessary">Артикул:</p>
      <div>
        <input
          type="text"
          class="control-input"
          maxlength="30"
          placeholder="Артикул"
          v-model="product.code"
        />
      </div>
    </div>
    <div class="filed__item">
      <p class="field__item-label field__item-necessary">Ед.измерения:</p>
      <div>
        <input
          type="text"
          class="control-input"
          maxlength="4"
          placeholder="Ед.измерения"
          v-model="product.unit"
        />
      </div>
    </div>
    <div class="filed__item">
      <p class="field__item-label field__item-necessary">Ед.измерения:</p>
      <div>
        <div class="price"><span>&#8381;</span>
        <input
          type="number"
          class="control-input price-input"
          min="1"
          max="10000000"
          placeholder="Цена"
          v-model="product.price"
        />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="params">
    <table class="params__table">
      <th class="params__table-header">Количество от</th>
      <th class="params__table-header">Цена</th>
      <th></th>
      <tr class="params__table-row" v-for="item in product.prices" :key="item.id">
        <td class="params__table-value">
          <input
            type="number"
            max="1000000"
            maxlength="5"
            min="1"
            v-model="item.amount"
            :disabled="item.isFirst"
          />
        </td>
        <td class="params__table-value params-col">
          <input type="number" max="100000000" min="0"/>
        </td>
      </tr>
    </table>
  </div> -->
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["product"],
  setup(props) {
    function addParam() {}
    function delParam() {}
    return { addParam, delParam};
  },
};
</script>

<style scoped>
.field__items {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
  margin-top: 10px;
}
.field__item-label {
  margin: 5px;
  color: var(--gray-main);
  user-select: none;
}
.field__item-necessary::after {
  content: "*";
  color: #f79114;
  display: inline;
}
.params_table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}
.price__table-value {
  width: 50%;
  border: 1px solid #c0c0c0;
  position: relative;
}
.params__table-value input {
  width: 100%;
  min-width: 100px;
  outline: none;
  border: none;
  color: var(--gray-secound);
  padding: 5px;
  text-align: center;
}
.params__table-value input:disabled {
  background-color: #eeee;
}
.params__table-value input::selection {
  background-color: var(--red-light);
  color: white;
}
.params-col {
  border-right: none;
}
.btn-more {
  width: 100px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: var(--gray-main);
  border-radius: 20px;
  transition: 0.2s ease-in-out;
  font-weight: 400;
}
.btn-more:hover {
  color: var(--gray-secound);
}
.del-last:hover {
  color: #d22617;
}
.params-footer {
  display: flex;
  justify-content: flex-end;
}
.buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 10px;
  margin-top: 10px;
  bottom: 0;
}
.price {
  display: flex;
  align-items: center;
  position: relative;
}
.price-input {
  padding-left: 20px;
}
.price span{
  position: absolute;
  margin-left: 5px;
  color: var(--gray-main);
  font-size: 20px;
  padding-bottom: 3px;
  user-select: none;
}
</style>
