<template>
  <div class="win">
    <div class="header">
      <div class="container">
        <nav class="navbar">
          <router-link class="nodrag" to="/balance"
            ><svg
              width="40"
              height="30"
              viewBox="0 0 40 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="navbar-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32 0.599976C33.9096 0.599976 35.7409 1.35855 37.0912 2.70881C38.4414 4.05907 39.2 5.89042 39.2 7.79998V22.2C39.2 24.1095 38.4414 25.9409 37.0912 27.2911C35.7409 28.6414 33.9096 29.4 32 29.4H8.00001C6.09045 29.4 4.25911 28.6414 2.90884 27.2911C1.55858 25.9409 0.800014 24.1095 0.800014 22.2V7.79998C0.800014 5.89042 1.55858 4.05907 2.90884 2.70881C4.25911 1.35855 6.09045 0.599976 8.00001 0.599976H32ZM34.4 22.2V19.8H22.4V24.6H32C32.6365 24.6 33.247 24.3471 33.6971 23.897C34.1472 23.4469 34.4 22.8365 34.4 22.2ZM17.6 24.6H8.00001C7.36349 24.6 6.75304 24.3471 6.30296 23.897C5.85287 23.4469 5.60001 22.8365 5.60001 22.2V19.8H17.6V24.6ZM17.6 15H5.60001V10.2H17.6V15ZM22.4 10.2H34.4V15H22.4V10.2Z"
                fill="#969696"
              /></svg
          ></router-link>
          <router-link class="nodrag" to="/store"
            ><svg
              width="34"
              height="40"
              viewBox="0 0 34 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="navbar-icon"
            >
              <path
                d="M19.4 36.8C19.4002 37.2089 19.5049 37.611 19.7042 37.9681C19.9035 38.3252 20.1907 38.6255 20.5386 38.8405C20.8865 39.0554 21.2835 39.1779 21.692 39.1963C22.1006 39.2147 22.507 39.1284 22.8728 38.9456L32.4728 34.1456C32.8714 33.9464 33.2067 33.6402 33.4411 33.2612C33.6755 32.8823 33.7998 32.4456 33.8 32V18.1664C33.7998 17.7574 33.6951 17.3553 33.4958 16.9982C33.2966 16.6411 33.0094 16.3409 32.6615 16.1259C32.3136 15.911 31.9165 15.7885 31.508 15.7701C31.0995 15.7517 30.693 15.838 30.3272 16.0208L20.7272 20.8208C20.3286 21.02 19.9933 21.3262 19.7589 21.7051C19.5245 22.0841 19.4003 22.5208 19.4 22.9664V36.8ZM29.5064 11.0624C29.9045 10.8629 30.2393 10.5565 30.4732 10.1776C30.7072 9.79865 30.8311 9.36211 30.8311 8.91679C30.8311 8.47147 30.7072 8.03493 30.4732 7.65601C30.2393 7.27708 29.9045 6.97072 29.5064 6.77119L18.0728 1.05439C17.7397 0.887927 17.3724 0.80127 17 0.80127C16.6276 0.80127 16.2603 0.887927 15.9272 1.05439L4.49361 6.77119C4.0955 6.97072 3.76075 7.27708 3.52681 7.65601C3.29287 8.03493 3.16897 8.47147 3.16897 8.91679C3.16897 9.36211 3.29287 9.79865 3.52681 10.1776C3.76075 10.5565 4.0955 10.8629 4.49361 11.0624L15.9272 16.7792C16.2603 16.9456 16.6276 17.0323 17 17.0323C17.3724 17.0323 17.7397 16.9456 18.0728 16.7792L29.5064 11.0624ZM3.67281 16.0208C3.307 15.838 2.90055 15.7517 2.49203 15.7701C2.0835 15.7885 1.68645 15.911 1.33856 16.1259C0.990663 16.3409 0.703458 16.6411 0.504198 16.9982C0.304937 17.3553 0.200231 17.7574 0.200012 18.1664V32C0.20025 32.4456 0.324532 32.8823 0.558938 33.2612C0.793344 33.6402 1.12862 33.9464 1.52721 34.1456L11.1272 38.9456C11.493 39.1284 11.8995 39.2147 12.308 39.1963C12.7165 39.1779 13.1136 39.0554 13.4615 38.8405C13.8094 38.6255 14.0966 38.3252 14.2958 37.9681C14.4951 37.611 14.5998 37.2089 14.6 36.8V22.9664C14.5998 22.5208 14.4755 22.0841 14.2411 21.7051C14.0067 21.3262 13.6714 21.02 13.2728 20.8208L3.67281 16.0208Z"
                fill="#969696"
              /></svg
          ></router-link>
          <router-link class="nodrag" to="/agents"
            ><svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="navbar-icon"
            >
              <path
                d="M21.6 14.4C21.6 16.3096 20.8415 18.1409 19.4912 19.4912C18.1409 20.8414 16.3096 21.6 14.4 21.6C12.4905 21.6 10.6591 20.8414 9.30886 19.4912C7.95859 18.1409 7.20002 16.3096 7.20002 14.4C7.20002 12.4905 7.95859 10.6591 9.30886 9.30884C10.6591 7.95858 12.4905 7.20001 14.4 7.20001C16.3096 7.20001 18.1409 7.95858 19.4912 9.30884C20.8415 10.6591 21.6 12.4905 21.6 14.4ZM40.8 14.4C40.8 15.3455 40.6138 16.2818 40.252 17.1553C39.8901 18.0289 39.3598 18.8226 38.6912 19.4912C38.0226 20.1598 37.2289 20.6901 36.3553 21.0519C35.4818 21.4138 34.5455 21.6 33.6 21.6C32.6545 21.6 31.7182 21.4138 30.8447 21.0519C29.9712 20.6901 29.1774 20.1598 28.5089 19.4912C27.8403 18.8226 27.3099 18.0289 26.9481 17.1553C26.5863 16.2818 26.4 15.3455 26.4 14.4C26.4 12.4905 27.1586 10.6591 28.5089 9.30884C29.8591 7.95858 31.6905 7.20001 33.6 7.20001C35.5096 7.20001 37.3409 7.95858 38.6912 9.30884C40.0415 10.6591 40.8 12.4905 40.8 14.4ZM31.032 40.8C31.1424 40.0152 31.2 39.216 31.2 38.4C31.2056 34.6293 29.937 30.9673 27.6 28.008C29.4242 26.9548 31.4935 26.4003 33.5999 26.4003C35.7064 26.4003 37.7757 26.9548 39.5999 28.0079C41.4241 29.0611 42.939 30.5759 43.9922 32.4001C45.0455 34.2243 45.6 36.2936 45.6 38.4V40.8H31.032ZM14.4 26.4C17.5826 26.4 20.6349 27.6643 22.8853 29.9147C25.1357 32.1652 26.4 35.2174 26.4 38.4V40.8H2.40002V38.4C2.40002 35.2174 3.66431 32.1652 5.91474 29.9147C8.16518 27.6643 11.2174 26.4 14.4 26.4Z"
                fill="#969696"
              /></svg
          ></router-link>
          <router-link class="nodrag" to="/stat"
            ><svg
              width="40"
              height="34"
              viewBox="0 0 40 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="navbar-icon"
            >
              <path
                d="M0.799988 19.4C0.799988 18.7635 1.05284 18.153 1.50293 17.703C1.95302 17.2529 2.56347 17 3.19999 17H7.99999C8.63651 17 9.24696 17.2529 9.69704 17.703C10.1471 18.153 10.4 18.7635 10.4 19.4V31.4C10.4 32.0365 10.1471 32.647 9.69704 33.0971C9.24696 33.5472 8.63651 33.8 7.99999 33.8H3.19999C2.56347 33.8 1.95302 33.5472 1.50293 33.0971C1.05284 32.647 0.799988 32.0365 0.799988 31.4V19.4ZM15.2 9.80001C15.2 9.16349 15.4528 8.55304 15.9029 8.10296C16.353 7.65287 16.9635 7.40001 17.6 7.40001H22.4C23.0365 7.40001 23.647 7.65287 24.097 8.10296C24.5471 8.55304 24.8 9.16349 24.8 9.80001V31.4C24.8 32.0365 24.5471 32.647 24.097 33.0971C23.647 33.5472 23.0365 33.8 22.4 33.8H17.6C16.9635 33.8 16.353 33.5472 15.9029 33.0971C15.4528 32.647 15.2 32.0365 15.2 31.4V9.80001ZM29.6 2.60001C29.6 1.96349 29.8528 1.35304 30.3029 0.902956C30.753 0.452869 31.3635 0.200012 32 0.200012H36.8C37.4365 0.200012 38.047 0.452869 38.497 0.902956C38.9471 1.35304 39.2 1.96349 39.2 2.60001V31.4C39.2 32.0365 38.9471 32.647 38.497 33.0971C38.047 33.5472 37.4365 33.8 36.8 33.8H32C31.3635 33.8 30.753 33.5472 30.3029 33.0971C29.8528 32.647 29.6 32.0365 29.6 31.4V2.60001Z"
                fill="#969696"
              /></svg
          ></router-link>
          <router-link class="nodrag" to="/settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="navbar-icon"
              viewBox="0 0 20 20"
              fill="#969696"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
          <!-- <img class="logo" src="./assets/icons/logo.svg" draggable="false" /> -->
          <p class="title2 last-child">В разработке</p>
          <div class="win-btns nodrag">
            <button class="win-btn nodrag" @click="minimazeWin">&#8722;</button>
            <button class="win-btn nodrag" @click="resizeWin">&#128471;&#xFE0E;</button>
            <button class="win-btn nodrag" @click="closeWin">&#128473;&#xFE0E;</button>
          </div>
        </nav>
      </div>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  setup() {
    function closeWin(){
      console.log(5+5);
      ipcRenderer.send('close-btn', true)
    }
    function resizeWin(){
      ipcRenderer.send('resize-btn', true);
    }
    function minimazeWin(){
       ipcRenderer.send('minimize-btn', true);
    }
    return {
      closeWin, resizeWin, minimazeWin
    }
  },
};
</script>

<style>
.logo {
  height: 35px;
  margin-left: auto;
}
.header {
  width: 100%;
  background-color: #fff;
  -webkit-box-shadow: 0px 12px 13px -9px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 12px 13px -9px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 12px 13px -9px rgba(34, 60, 80, 0.2);
  border-bottom: 1px solid rgba(202, 202, 202, 0.933);
  position: fixed;
  top: 0;
  -webkit-app-region: drag;
}
.drag{
  -webkit-app-region: drag;
}
.nodrag{
   -webkit-app-region: no-drag;
}
.navbar {
  display: flex;
  justify-content: flex-start;
  gap: 100px;
  align-items: center;
  height: 45px;
}
.navbar-icon {
  width: 25px;
  height: 25px;
}
.navbar-icon > path {
  transition: 0.2s ease-out;
}
.navbar-icon:hover path {
  fill: var(--gray-secound);
}
.router-link-active > .navbar-icon path {
  fill: var(--red);
}
.router-link-active > .navbar-icon {
  -webkit-filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
  transform: scale(1.1);
}
.view {
  height: 100%;
  padding-top: 85px;
  padding-bottom: 30px;
  overflow: hidden;
}
.win {
  height: 100%;
}
.last-child{
  color: #b9b9b9ee;
  position: absolute;
  right: 0px;
  margin-top: 100px;
  padding: 10px;
}
.win-btns{
  display: flex;
  gap:5px;
  align-items: center;
   position: absolute;
  right: 0px;
  top: 0px;
  padding: 10px 10px;
  height: 100%;
}
.win-btn{
  background-color: transparent;
  border:none;
  padding: 0 10px;
  text-align: center;
  font-weight: bold;
  color: var(--gray-main);
  cursor: pointer;
  transition: .3s ease-in-out;
} 
.win-btn:hover{
  background-color: #eeee;
  color: var(--gray-secound);
}
@media screen and (max-width: 750px) {
  .navbar {
    gap: 50px;
  }
}
</style>
