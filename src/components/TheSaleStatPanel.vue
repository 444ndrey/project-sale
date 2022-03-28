<template>
  <div>
    <div class="stat">
      <h2 class="stat-date">{{currDateString}}</h2>
    </div>
  </div>
</template>

<script>
export default {
    setup(){
        function getDate(){
            const date = new Date();
            const months = ['Январь','Февраль','Март','Апрель',
                    'Май','Июнь','Июль','Август',
                    'Сентябрь','Окрябрь','Ноябрь','Декабрь',]
            return `${months[date.getMonth()]} ${date.getFullYear()}`
        }
        const currDateString = getDate();
        return {currDateString}
    }
};
</script>

<style>
.stat {
  height: 270px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 0 20px;
  padding: 15px 55px;
}
.stat-date {
  color: var(--gray-secound);
  font-family: Calibri;
  font-size: 36px;
  margin: 0;
}
</style>