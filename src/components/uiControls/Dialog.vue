<template>
  <div class="wrapper" v-if="isActive">
    <div class="container control-win">
      <div class="dialog__header">
        <div class="dialog__header-icon" :class="{'dialog__type-warn': type == 'warning','dialog__type-success': type == 'success','dialog__type-error': type == 'error' }" ></div>
      </div>
      <p class="dialog__content">
        {{message}}
      </p>
      <div class="dialog__buttons" v-if="type == 'warning'">
          <button class="dialog__btn" @click="runHandler()">Да</button>
          <button class="dialog__btn" @click="isActive=false">Отмена</button>
      </div>
      <div class="dialog__buttons" v-else>
          <button class="dialog__btn" @click="isActive=false">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // types: error, succes, warning
  props: ['type','isActive', 'handler','message'],
  setup(props, context) {
      function runHandler(){
          props.handler();
          context.emit('update');
      }
      return {runHandler}
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
  background-color: #fff;
  width: min(70%, 500px);
  margin: 0 auto;
  margin-top: 200px;
  padding: 0;
  padding: 10px;
  height: max-content;
}
.dialog__header {
  width: 100px;
  height: 70px;
  margin: 0;
  margin: 10px auto;
}
.dialog__header__text {
  text-align: center;
  padding: 20px;
  font-size: 32px;
  margin: 0;
  color: #fff;
}
.dialog__header-icon {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  margin: 10px auto;
}
.dialog__type-warn {
  background-image: url(../../assets/icons/warn.svg);
}
.dialog__type-success{
  background-image: url(../../assets/icons/success.svg);
}
.dialog__type-error{
    background-image: url(../../assets/icons/eror.svg);
}
.dialog__content{
    padding: 0 10px;
    font-size: 18px ;
    text-align: center;
}
.dialog__buttons{
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 10px;
    gap: 20px;
}
.dialog__btn{
    border: 1px solid #a4a4a4;
    background-color: transparent;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 25px;
    transition: 0.3s ease-in-out;
}
.dialog__btn:hover{
    background-color: var(--red-light);
    color: #fff;
    border-color: var(--red);
    box-shadow: 1px 1px 29px 2px rgba(247, 92, 92, 0.3);
}
</style>