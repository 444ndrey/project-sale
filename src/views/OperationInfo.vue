<template>
  <div>
    <div class="grid container">
      <div class="control-win">
        <header>
          <h2 class="title1" v-if="$route.query.type == 'buy'">
            Покупка №{{ $route.query.id }} от {{ dateString }}
          </h2>
          <h2 class="title1" v-else>
            Продажа №{{ $route.query.id }} от {{ dateString }}
          </h2>
          <button class="btn2" @click="$router.go(-1)">Назад</button>
        </header>
        <div class="info-items">
          <div class="info-item">
            <label
              >Агент: {{ operation.agent.name }}
              <span>ИНН: {{ operation.agent.inn }}</span></label
            >
          </div>
          <div class="info-item">
            <textarea
              cols="30"
              rows="10"
              class="comment"
              maxlength="300"
              v-model="operation.comment"
              placeholder="Комментарий"
              disabled
            ></textarea>
          </div>
        </div>
      </div>
      <div class="control-win">
        <p class="title2">Товар в операции:</p>
        <!-- buy list -->
        <div class="list-items-wrap" v-if="$route.query.type == 'buy'">
          <div class="list-items">
            <p class="list-empty" v-if="operation.products.length == 0">
              Список пуст
            </p>
            <div
              class="list-item"
              v-for="item in operation.products"
              :key="item"
            >
              <p class="list-item-text">
                <b>{{ item.info.name }}</b>
              </p>
              <div>
                <p class="list-item-text">
                  Покупаем <b>{{ item.amount }} {{ item.info.unit }}</b> по
                  <b>&#8381;{{ item.cost }}</b>
                </p>
              </div>
              <p class="list-item-text">
                Всего: <b>&#8381;{{ item.amount * item.cost }}</b>
              </p>
            </div>
          </div>
        </div>
        <!-- sale list -->
        <div class="list-items-wrap" v-if="$route.query.type == 'sale'">
          <div class="list-items">
            <p class="list-empty" v-if="operation.products.length == 0">
              Список пуст
            </p>
            <div
              class="list-item"
              v-for="item in operation.products"
              :key="item"
            >
              <p class="list-item-text">
                <b>{{ item.info.name }}</b>
              </p>
              <div>
                <p class="list-item-text">
                  Продаем <b>{{ item.amount }} {{ item.info.unit }}</b> по
                  <b>&#8381;{{ item.info.price }}</b>
                </p>
              </div>
              <p class="list-item-text">
                Всего: <b>&#8381;{{item.amount * item.info.price}}</b>
                 c учетом НДС {{item.info.nds}}%: <b>&#8381;{{getPriceWithNds(item.amount * item.info.price, item.info.nds)}}</b>
              </p>
            </div>
          </div>
        </div>

        <p class="title1" v-if="$route.query.type == 'buy'">
          Сумма: &#8381;{{ getTotalSumPurchase(operation.products) }}
        </p>
        <p class="title1" v-else>
          Сумма: &#8381;{{ getTotalSumSale(operation.products) }}
        </p>
         <button class="btn1" v-if="$route.query.type == 'sale'" @click="print">Сформировать счет</button>
      </div>
    <!-- BILL -->
    <div v-show="false" class="container">
      <div class="" ref="billEl" style="margin: 10px; padding-left: 50px;  font-family:Calibri; font-weight: 400;">
        <div class="bill-header" style="padding-bottom:12px; border-bottom: 3px solid #000; margin: 20px 0; ">
            <h2>Счет №{{$route.query.id}} от {{dateString}}</h2>
            <div>
              <p style="word-wrap: break-word;">Поставщик: - </p>
            </div>
            <div>
              <p style="word-wrap: break-word;">Клиент: <b>{{operation.agent.name}}, ИНН: {{operation.agent.inn}},
               КПП: {{operation.agent.kpp}}, адрес: {{operation.agent.address}}</b></p>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <th style="border: 2px solid; font-weight: bold">Товары</th>
          <th style="border: 2px solid; font-weight: bold">Кол-во</th>
          <th style="border: 2px solid; font-weight: bold">Ед</th>
          <th style="border: 2px solid; font-weight: bold">Цена</th>
          <th style="border: 2px solid; font-weight: bold">Сумма</th>
          <th style="border: 2px solid; font-weight: bold">НДС</th>
            <tr v-for="item in operation.products" :key="item">
                <td style="border: 2px solid;">{{item.info.name}}</td>
                <td style="border: 2px solid;">{{item.amount}}</td>
                <td style="border: 2px solid;">{{item.info.unit}}</td>
                <td style="border: 2px solid;">{{getPriceWithNds(item.info.price, item.info.nds)}}руб.</td>
                <td style="border: 2px solid;">{{getPriceWithNds(item.info.price * item.amount, item.info.nds)}}руб.</td>
                <td style="border: 2px solid;">{{item.info.nds}}% - {{getNdsFromPrice(item.info.price * item.amount, item.info.nds)}}руб.</td>
            </tr>
        </table>
        <div style="display: flex;">
        <h2>Итого: {{getTotalSumSale(operation.products)}} рублей</h2>
        </div>

      </div>
    </div>


    </div>

    

  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ipcRenderer } from "electron";
export default {
  setup() {
    let billEl = ref(null)
    let route = useRoute();
    let dateString = computed(() => {
      let day =
        operation.value.date.getDate() > 9
          ? operation.value.date.getDate()
          : "0" + operation.value.date.getDate();
      let temp = operation.value.date.getMonth() + 1;
      let month = temp > 9 ? temp : "0" + temp;
      return `${day}.${month}.${operation.value.date.getFullYear()}`;
    });
    let operation = ref({
      id: route.query.id,
      type: route.query.type,
      agent: { name: "", inn: "", kpp: "" },
      date: new Date(),
      comment: "",
      products: [],
    });

    function setPurchaseInfo() {
      ipcRenderer.invoke("get-purchase", route.query.id).then((res) => {
        (operation.value.date = new Date(res.date)),
          (operation.value.comment = res.comment);
        ipcRenderer.invoke("get-agent", res.agent).then((agent) => {
          operation.value.agent = agent;
        });
        ipcRenderer
          .invoke("get-purchase-products", res.id)
          .then((result) => {
            operation.value.products = result;
          })
          .then(() => {
            operation.value.products.forEach((item) => {
              ipcRenderer
                .invoke("get-product-info", item.product)
                .then((res) => {
                  item.info = res;
                });
            });
          });
      });
    }
    function setSaleInfo() {
      ipcRenderer.invoke("get-sale", route.query.id).then((res) => {
        (operation.value.date = new Date(res.date)),
          (operation.value.comment = res.comment);
        ipcRenderer.invoke("get-agent", res.agent).then((agent) => {
          operation.value.agent = agent;
        });
        ipcRenderer
          .invoke("get-sale-products", res.id)
          .then((result) => {
            operation.value.products = result;
          })
          .then(() => {
            operation.value.products.forEach((item) => {
              ipcRenderer
                .invoke("get-product-by-entity", item.product)
                .then((res) => {
                  item.info = res;
                });
            });
          });
      });
    }
    function getPriceWithNds(price,nds){
      return  ((nds / 100) * parseFloat(price) + parseFloat(price)).toFixed(2)
    }
    function getProductSum(amount, price) {
      return parseFloat(price * amount).toFixed(2);
    }
    function getTotalSumPurchase(arr) {
      let sum = 0;
      arr.forEach((item) => {
        sum += parseFloat(getProductSum(item.amount, item.cost));
      });
      return sum.toFixed(2);
    }
    function getTotalSumSale(arr) {
      let sum = 0;
      arr.forEach((item) => {
        sum += parseFloat(getProductSum(item.amount, getPriceWithNds(item.info.price,item.info.nds)));
      });
      return sum.toFixed(2);
    }
    function getNdsFromPrice(price,nds){
     return parseFloat(price * (nds/100)).toFixed(2);
    }

    function print(){
      let html = billEl.value.outerHTML;
      console.log(html)

      ipcRenderer.send('save-bill',html)

    }
    onMounted(() => {
      if (operation.value.type == "buy") {
        setPurchaseInfo();
      } else {
        setSaleInfo();
      }
    });
    return { operation, dateString, getProductSum, getTotalSumPurchase,getTotalSumSale, print,billEl,getPriceWithNds,getNdsFromPrice};
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 20px;
  grid-template-rows: 2fr 5fr;
  height: 100%;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-item > label {
  font-size: 20px;
  font-weight: bold;
  cursor: default;
  margin: 0;
}
.info-item > label > span {
  font-weight: lighter;
  color: var(--gray-main);
  font-size: 16px;
}
.info-items {
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  width: 100%;
}
.comment {
  outline: none;
  resize: none;
  border-radius: 10px;
  border-color: var(--gray-main);
  padding: 7px;
  height: 120px;
  color: var(--gray-secound);
  letter-spacing: 0.5px;
  transition: 0.2s ease-in-out;
  width: 500px;
}
.comment:focus {
  border-color: var(--red-light);
  box-shadow: -1px 6px 15px 0px rgba(247, 92, 92, 0.2);
}
.list-items {
  height: 130px;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  margin-top: 10px;
  margin-bottom: 10px;
}
.list-items-wrap {
  border: 1px solid var(--gray-main);
  padding: 5px;
  border-radius: 10px;
}
.list-empty {
  align-items: center;
  color: var(--gray-main);
  width: 100%;
  text-align: center;
  font-size: 20px;
  user-select: none;
}
.list-item {
  padding: 7px 10px;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  display: flex;
  margin-bottom: 5px;
  gap: 10px;
  align-items: center;
}
.list-item-text {
  margin: 0;
}
.list-item:hover {
  background-color: #eeee;
}

/* BILL STYLES */

.bill-header{
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 3px solid #0000;
}






</style>