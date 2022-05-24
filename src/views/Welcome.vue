<template>
  <div class="wrapper">
    <div class="control-win container">
      <p class="title1">{{message}}</p>
      <nav class="nav">
        <p class="title2">Разделы:</p>
        <ul class="nav__items">
          <il class="nav__item">
            <router-link to="/balance">Операции</router-link>
          </il>
          <il class="nav__item">
            <router-link to="/store">Товары</router-link>
          </il>
          <il class="nav__item">
            <router-link to="/agents">Контрагенты</router-link>
          </il>
          <il class="nav__item">
            <router-link to="/stat">Статистика</router-link>
          </il>
          <il class="nav__item link-disabled">
            <router-link to="/">Параметры</router-link>
          </il>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    let message = getWelcomeMessage();
    function getWelcomeMessage() {
      const time = new Date();
      const hour = time.getHours();
      let res = "Доброй ночи!🌕 ";
      if(hour < 12 && hour >= 6){
          res = 'Доброе утро!🌅'
      }
      if(hour >= 12 && hour < 18){
          res = "Добрый день!🌞"
      }
      if(hour >= 18 && hour < 0){
          res = "Добрый вечер!🌇"
      }
      if(hour >= 0 && hour < 6){
          res = "Доброй ночи!🌕"
      }
      return res;
    }
    return {message};
  },
};
</script>

<style scoped>
.control-win {
  width: 800px;
  height: 420px;
  margin-top: 100px;
}
.title1 {
  text-align: center;
  font-size: 32px;
}
.nav__items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.nav__item > a {
  text-decoration: none;
  color: var(--gray-secound);
  font-size: 20px;
  transition: 0.2s ease-in-out;
}
.nav__item > a:hover {
  color: var(--red-light);
}
.link-disabled > a {
  pointer-events: none;
  color: var(--gray-main);
}
</style>