<template>
  <div>
    <div class="control-win container">
      <header class="head">
        <h2 class="title1">Продажа</h2>
      </header>
      <div class="message-error" v-if="error.isActive">
        <ul>
          <li v-for="item in error.messages" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="field-items">
        <div class="field-item">
          <label for="">Контрагент:</label>
          <SelectBox
            :data="agents"
            :type="'agent'"
            @selectedItem="selectAgent"
          ></SelectBox>
        </div>
        <div class="field-item">
          <label for="">Дата покупки</label>
          <input
            v-model="datePicker"
            class="datePicker"
            type="date"
            name=""
            id=""
          />
        </div>
        <div class="field-item">
          <label for="">Товары к покупке:</label>
          <div>
            <button class="btn2" @click="isProductAddWin = !isProductAddWin">
              Добавить позицию
            </button>
            <SelectProductSale
              v-if="isProductAddWin"
              @addProduct="addProduct"
              class="selector"
            ></SelectProductSale>
          </div>
        </div>
        <div class="list-items-wrap">
          <div class="list-items">
            <p class="list-empty" v-if="products.length == 0">Список пуст</p>
            <div class="list-item" v-for="item in products" :key="item">
              <p class="list-item-text">
                <b>{{ item.product.name }}</b>
              </p>
              <div>
                <p class="list-item-text">
                  Продаем <b>{{ item.amount }} {{ item.product.unit }}</b> по
                  <b>&#8381;{{ item.price }}</b>
                </p>
              </div>
              <p class="list-item-text">
                Всего: <b>&#8381;{{ item.sum }}</b>
              </p>
              <button class="list-item-del" @click="delElement(item)">
                &#10006;
              </button>
            </div>
          </div>
        </div>
        <p class="title1">Cумма: &#8381;{{ sum }}</p>
        <div class="field-item">
          <label>Комментарий:</label>
          <textarea
            class="comment"
            maxlength="300"
            cols="30"
            rows="5"
            placeholder="Комментарий к операции"
            v-model="comment"
          ></textarea>
        </div>
        <div class="buttons">
          <button class="btn1" @click="buy">Оформить</button>
          <button class="btn2" @click="$router.go(-1)">Назад</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import SelectBox from "../components/uiControls/SelectBox.vue";
import { ipcRenderer } from "electron";
import { ref } from "vue";
import router from "../router";
import SelectProductSale from "../components/SelectProductSale.vue";
export default {
  setup() {
    let error = ref({
      isActive: false,
      messages: [],
    });
    let price = ref(0);
    let comment = ref("");
    let isProductAddWin = ref(false);
    let agents = ref(null);
    let sum = computed(() => {
      if (products.value.length != 0) {
        let value = 0;
        products.value.forEach((el) => {
          value += el.sum;
        });
        return value;
      } else {
        return 0;
      }
    });
    let selectedAgent = null;
    let products = ref([]);
    let datePicker = ref(new Date().toISOString().substr(0, 10));
    function selectAgent(agent) {
      selectedAgent = agent;
      console.log(agent);
    }
    function addProduct(value) {
      let samePos = 0;
      console.log(value.product.id);
      for (let i in products.value) {
        if (
          value.id == products.value[i].id &&
          value.price == products.value[i].price
        ) {
          samePos++;
          products.value[i].amount += value.amount;
          products.value[i].sum += value.sum;
          break;
        }
      }
      if (samePos == 0) {
        products.value.push(value);
      }

      isProductAddWin.value = false;
    }
    function delElement(el) {
      products.value = products.value.filter((p) => p != el);
    }
    function buy() {
      error.value.isActive = false;
      error.value.messages = [];
      let isValidDate = Date.parse(datePicker.value);
      if (selectedAgent == null) {
        error.value.messages.push("Вы должны указать контрагента");
      }
      if (products.value.length == 0) {
        error.value.messages.push("Список товаров не может быть пустым");
      }
      if (isNaN(isValidDate)) {
        error.value.messages.push("Дата указана некорректно");
      }

      if (error.value.messages.length > 0) {
        error.value.isActive = true;
      } else {
        let productsToSend = products.value.map((item) => {
          return { id: item.product.id, price: item.price, amount: item.amount };
        });
        console.log(productsToSend);
        let message = {
          date: datePicker.value,
          agent: selectedAgent.id,
          comment: comment.value,
          products: productsToSend,
        };
        ipcRenderer.send("add-purchase", message);
        ipcRenderer.on('succes-purchase',() => {
          router.go(-1);
        })
      }
    }
    onMounted(() => {
      ipcRenderer.send("get-all-agents");
      ipcRenderer.on("send-all-agents", (e, data) => {
        agents.value = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            inn: item.inn,
            address: item.address,
            phone: item.phone,
          };
        });
      });
    });
    return {
      agents,
      selectedAgent,
      selectAgent,
      datePicker,
      price,
      isProductAddWin,
      addProduct,
      products,
      sum,
      delElement,
      buy,
      error,
      comment,
    };
  },
  components: { SelectBox, SelectProductSale },
};
</script>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
.control-win {
  max-width: 1000px;
  padding: 30px;
  color: var(--gray-secound);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
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
.field-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}
.btn2 {
  width: max-content;
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
.comment {
  outline: none;
  resize: none;
  width: 100%;
  border-radius: 10px;
  border-color: var(--gray-main);
  padding: 7px;
  color: var(--gray-secound);
  letter-spacing: 0.5px;
  height: 70px;
  transition: .2s ease-in-out;
}
.comment:focus {
  border-color: var(--red-light);
  box-shadow: -1px 6px 15px 0px rgba(247, 92, 92, 0.2);
}
.field-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.field-item > label {
  color: var(--gray-main);
}
.buttons {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
  justify-self: flex-end;
  margin-top: auto;
}
.title1 {
  margin-bottom: 5px;
}
.datePicker {
  width: 150px;
}
.list-item-del {
  margin-left: auto;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: 0.3s ease-in-out;
}
.list-item-del:hover {
  color: var(--red);
}
.message-error {
  padding: 1px;
}
</style>