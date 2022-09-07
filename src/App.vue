<template>
  <br />
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3">{{ Store.tittle }}</span>
    </template>
  </el-page-header>
  <el-divider />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script>
import Store from "./store/index";
import axios from "axios";
//axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.baseURL = "https://jiajiayr.pythonanywhere.com/api_v1/";
export {axios};
export default {
  name: "YourRecording",
  data() {
    return {
      Store,
    };
  },
  methods: {
    goBack(){
      window.history.back();
    }
  }
};
</script>
