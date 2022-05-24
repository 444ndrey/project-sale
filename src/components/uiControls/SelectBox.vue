<template>
  <div class="selectbox" tabindex="0" ref="selectBox" @keydown.esc="isActive = false">
    <div
      class="selectbox-title"
      :class="{ 'selectbox-active': isActive }" @click="toggle">
      <p class="selectbox-selected-text">{{selected.name}}</p>
      <span v-if="!isActive">&#9660;</span>
    </div>
    <div class="selectbox-content" v-if="isActive">
      <input
        type="text"
        class="selectbox-search"
        v-model="searchValue"
        placeholder="Поиск"
        maxlength="20"/>
      <div class="selectbox-items">
        <div class="selectbox-item" :class="{'selectbox-item-active' : selected.id == item.id}" v-for="item in filtredItems"  @click="select(item)" :key="item.id">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  props: ["data"],
  emits: ['selectedItem'],
  setup(props,ctx) {
    let items = ref(props.data);
    let searchValue = ref("");
    let isActive = ref(false);
    let selectBox = ref(null);
    let selected = ref({id: null, name: 'Выбрать'});
    function toggle(event){
        isActive.value = !isActive.value;
        searchValue.value = '';
        event.target.focus();
        selectBox.value.focus();
    };
    function select(res){
        selected.value = res;
        ctx.emit('selectedItem',selected.value);
        selectBox.value.focus();
        isActive.value = !isActive.value;
    }
    let filtredItems = computed(() => {
      if (searchValue.value.length > 0) {
        return  props.data.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(searchValue.value.toLocaleLowerCase()) ||
            item.inn.includes(searchValue.value)
        );
      }
      return props.data;
    });
    return { isActive, searchValue, filtredItems, items, toggle, selectBox, selected, select };
  },
};
</script>

<style scoped>
.selectbox {
  border: 1px solid var(--gray-main);
  border-radius: 10px;
  max-width: 500px;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
  outline: none;
}
.selectbox-active {
  background-color: #f3f3f3;
  border-radius: 10px;
}
.selectbox-title {
  display: flex;
  justify-content: space-between;
  color: var(--gray-secound);
  user-select: none;
  padding: 5px;
}
.selectbox-title > span {
  color: var(--gray-main);
}
.selectbox-selected-text {
  margin: 0;
}
.selectbox-search {
  outline: none;
  border-radius: 10px;
  border: 1px solid var(--gray-main);
  color: var(--gray-main);
  padding: 5px;
  width: 100%;
  margin: 0;
  margin-top: 5px;
}
.selectbox-content {
  text-align: center;
  padding: 10px;
  width: 100%;
  z-index: 1000;
  position: absolute;
  background: rgb(255, 255, 255);
  border-top: none;
  margin-top: 1px;
  box-shadow: 1px 9px 8px 3px rgba(34, 60, 80, 0.2);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.selectbox-items {
  margin-top: 10px;
  width: 100%;
  max-height: 120px;
  overflow-y: auto;
  border-radius: 5px;
}
.selectbox-item {
  text-align: left;
  padding: 5px;
  transition: 0.2s ease-in-out;
}
.selectbox-item-active{
    background-color: var(--red);
    color: #fff;
}
.selectbox-item:hover {
  background-color: var(--red-light);
  color: #fff;
}
</style>