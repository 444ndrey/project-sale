<template>
  <div class="card">
    <div>
      <div class="card__name">{{ product.name.length < 20 ? product.name : product.name.slice(0,19)+'...'}}</div>
      <div class="card__article">Арт.{{ product.code }}</div>
      <div class="card__amount">{{ amount }} {{ product.unit }}.</div>
    </div>
    <div class="card__price">{{ product.price }}&#8381;</div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["product"],
  setup(props) {
    const amount = computed(() => {
      return props.product.items
        .map((item) => {
          return item.amount;
        })
        .reduce((sum, a) => sum + a);
    });
    return { amount };
  },
};
</script>

<style scoped>
.card {
  border: 0 1px solid var(-gray-main);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  padding: 10px;
  gap: 10px;
  color: var(--gray-secound);
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgba(187, 187, 187, 0.933);
  user-select: none;
  transition: background-color 0.1s ease-in-out;
}
.card:hover {
  background-color: #eeee;
}
.card__name {
  font-weight: bold;
  font-size: 18px;
}
.card__article {
  color: var(--gray-main);
}
.card__amount {
  font-weight: bold;
}
.card__price {
  font-size: 24px;
  font-weight: bold;
  justify-self: flex-end;
}
.card__bottom {
  display: flex;
  justify-content: space-between;
}
</style>