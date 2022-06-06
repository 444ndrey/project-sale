<template>
  <div class="field__items">
    <div class="filed__item">
      <p class="field__item-label field__item-necessary">Название:</p>
      <div>
        <input
          type="text"
          class="control-input"
          maxlength="50"
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
      <p class="field__item-label field__item-necessary">Цена за единицу:</p>
      <InputPrice v-model:inputValue="product.price"></InputPrice>
    </div>
    <div class="filed__item filed__item-short">
      <p class="field__item-label field__item-necessary">НДС:</p>
      <div class="filed__item-input">
        <input
          type="number"
          v-model="product.nds"
          @focusout="fixNds"
          @keypress="fixNdsLength"
          class="control-input"
        />
      </div>
    </div>
    <div class="filed__item">
      <p class="field__item-label">
        Цена за единицу c учетом НДС: {{ sum }}&#8381;
      </p>
    </div>
  </div>
  <div class="params">
    <p class="field__item-label">Дополнительные параметры:</p>
    <div class="params__table">
      <h4 class="title2">Извините, но доп.парметры пока недоступны.</h4>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import InputPrice from "./uiControls/InputPrice.vue";
export default {
  props: ["product"],
  setup(props) {
    let sum = computed(() => {
      let res = (props.product.nds / 100) * parseFloat(props.product.price) + parseFloat(props.product.price);
      if(typeof res !== 'number' || isNaN(res)){
        return 0;
      }else{
        return res.toFixed(2);
      }
    });
    function fixNdsLength(e) {
      if (e.target.value.toString().length >= 3) {
        e.preventDefault();
      }
    }
    function fixNds(e) {
      if (e.target.value > 100) {
        e.target.value = 100;
        props.product.nds = 100;
      }
    }
    return { fixNdsLength, fixNds, sum };
  },
  components: { InputPrice },
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
.params__table {
  width: 100%;
  border: 1px solid #ccccccee;
  border-radius: 5px;
  height: 50px;
  background-color: #eeee;
  display: flex;
  justify-content: center;
  align-items: center;
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
.price span {
  position: absolute;
  margin-left: 5px;
  color: var(--gray-main);
  font-size: 20px;
  padding-bottom: 3px;
  user-select: none;
}
.params {
  margin-bottom: 30px;
}
.filed__item-short {
  max-width: 150px;
}
.filed__item-input {
  display: flex;
}
.filed__item-input::after {
  content: "%";
  color: var(--gray-main);
  font-size: 20px;
}
</style>
