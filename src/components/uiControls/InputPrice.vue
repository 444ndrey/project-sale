<template>
  <div>
    <div class="price">
      <span>&#8381;</span>
      <input
        type="text"
        class="control-input price-input"
        min="1"
        max="10000000"
        placeholder="Цена"
        :value="inputValue"
        @keypress="validPrice"
        @focusout="fixPrice"
        @input="$emit('update:inputValue',$event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: {
    inputValue: {}
  },
  emits: ['updateValue','update:inputValue'],
  setup(props,context) {
    let value = ref(props.inputValue);
    function validPrice(e) {
      if(e.target.value.length > 8){
        e.preventDefault();
        return;
      }
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
      if (e.target.value == NaN || e.target.value  == '') {
        e.target.value = 0.00;
      } else {
        e.target.value = parseFloat(e.target.value).toFixed(2);
      }
    }

    return { fixPrice,validPrice};
  },
};
</script>

<style>
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
</style>
//@keypress="validPrice" @focusout="fixPrice"