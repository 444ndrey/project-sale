<template>
  <div>
      <div class="control-win container">
        <div class="title1">Операции</div>
        <div class="search-panel">
          <input type="text" class="control-search1" placeholder="Поиск по агенту, товару, договору" maxlength="30">
          <button class="btn1">Оформить продажу</button>
          <button class="btn1">Оформить покупку</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.search-panel{
  display: flex;
  gap: 10px;
}
.search-panel input{
  margin-right: 30px;
}
</style>