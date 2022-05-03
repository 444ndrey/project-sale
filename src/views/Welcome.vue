<template>
  <div class="wrapper">
    <div class="control-win container">
        <p class="title1">Здравствйте! &#9995;</p>
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

};
</script>

<style scoped>
.control-win {
    width: 800px;
    height: 400px;
    margin-top: 100px;
}
.title1{
    text-align: center;
    font-size: 32px;
}
.nav__items{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.nav__item > a{
    text-decoration: none;
    color: var(--gray-secound);
    font-size: 20px;
    transition: .2s ease-in-out;
}
.nav__item > a:hover{
    color: var(--red-light);
}
.link-disabled > a{
    pointer-events: none;
    color: var(--gray-main);
}
</style>