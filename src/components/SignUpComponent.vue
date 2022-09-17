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
import { ElMessage } from 'element-plus';
import { reactive } from "vue";
var l = reactive({ l: false });
export default {
  setup() {
    Store.tittle = "注册";
  },
  data() {
    return {
      Store,
      form: {
        username: "",
        password: "",
      },
      l,
    };
  },
  methods: {
    onSubmit() {
      l.l = true;
      axios
        .post("/user/", {
          username: this.form.username,
          password: this.form.password,
        })
        .then(function (response) {
          Store.token = response.data.token;
          localStorage.setItem('token', response.data.token);
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
