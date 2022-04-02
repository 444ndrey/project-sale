<template>
  <div class="wrapper">
      <div class="params__items">
      <div class="params__item" v-for="item in params" :key="item.name">
          <input type="text" class="params__item-input" placeholder="Название" maxlength="20">
          <input type="text" class="params__item-input" placeholder="Значаение" maxlength="40">
          <button class="del" @click="delCurr">&#10006;</button>
      </div>
      <div class="additional__bottom">
          <div class="btn3" @click="addNewParam" v-if="params.length < 10">Добавить</div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ["params"],
  setup(props) {
      function addNewParam(){
          props.params.push({name: '', value: '', id: props.params.length == 0 ? 0 : props.params.at(-1).id++});
        }
        return { addNewParam,props };
  },
};
</script>

<style scoped>
.wrapper{
    overflow-y: scroll;
    margin-top: 50px;
    padding: 5px;
    width: 100%;
    height: 140px;
}
.params__items {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    max-height: 140px;
}
.params__item{
    display: flex;
    justify-content: stretch;
    border-bottom: 1px solid var(--gray-main);  
}
.params__item-input{
    width: 100%;
    outline: none;
    border: none;
    letter-spacing: 1.5px;
    padding: 5px;
}
.params__item-input + .params__item-input{
    border-left: 1px solid var(--gray-main);
}
.additional__bottom{
   display: flex;
    justify-content: center;
    margin-top: 10px;
}
.del{
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--red);
    outline: none;
}
.del:hover{
    color: var(--red-light);
}
</style>