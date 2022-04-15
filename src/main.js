import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ethers } from "ethers";



createApp(App).use(router, ethers).mount("#app");


