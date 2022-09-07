<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()" :loading="l.l"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { axios } from "../App.vue";
import Store from "../store/index";
import Router from '../router/index.js'
import { reactive } from "vue";
var l = reactive({ l: false });
export default {
  setup() {
    Store.tittle = "登录";
  },
  data() {
    return {
      Store,
      form: {
        username: "",
        password: "",
      },
      disabled: false,
      l
    };
  },
  methods: {
    onSubmit() {
      l.l = true;
      axios
        .post("/oath/token/", {
          username: this.form.username,
          password: this.form.password,
        })
        .then(function (response) {
          Store.token = response.data.token;
          Store.login = true;
          Router.push("/");
        })
        .catch(function (error) {
          l.l = false;
          // eslint-disable-next-line
          ElMessage.error(error.response.data.message);
        });
    },
  },
};
</script>
