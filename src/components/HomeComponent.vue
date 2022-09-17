<template>
  <template v-if="!Store.token">
    <p>
      欢迎使用<b>你的记录仪</b>，请先<router-link to="/login">登录</router-link
      >或<router-link to="/sign_up">注册</router-link>！
    </p>
  </template>
  <template v-if="Store.token">
    <h2>我的记录册（{{ items.items.length }}）</h2>
    <el-button type="primary" @click="add_dia = true" round>添加</el-button>
    <el-dialog v-model="add_dia" title="添加记录册">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="onCan">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <br />
    <el-row>
      <el-col
        v-for="item in items.items"
        :key="item.id"
        :span="8"
        :offset="2"
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ item.name }}</span>
              <el-button class="button" text>查看详情</el-button>
            </div>
          </template>
          <div class="text item">单位：{{ item.unit }}</div>
          <div class="text item">记录数：{{ item.logs.length }}</div>
        </el-card>
      </el-col>
    </el-row>
  </template>
</template>
<script>
import { axios } from "../App.vue";
import { reactive } from "vue";
import Store from "../store/index";
let items = reactive({ items: [] });
export default {
  setup() {
    Store.tittle = "首页";
    if (Store.token) {
      // eslint-disable-next-line
      const loadingInstance = ElLoading.service({ fullscreen: true });
      axios
        .get("/item/", { headers: { Authorization: Store.token } })
        .then(function (response) {
          loadingInstance.close();
          items.items = response.data.items;
        })
        .catch(function (error) {
          loadingInstance.close();
          // eslint-disable-next-line
          ElMessage.error(error.response.data.message);
        });
    }
  },
  methods: {
    onCan() {
      this.form.name = "";
      this.form.unit = "";
      this.add_dia = false;
    },
    onSubmit() {
      // eslint-disable-next-line
      const loadingInstance = ElLoading.service({ fullscreen: true });
      axios
        .post(
          "/item/",
          { name: this.form.name, unit: this.form.unit },
          { headers: { Authorization: Store.token } }
        )
        .then(function (response) {
          loadingInstance.close();
          items.items = response.data.items;
        })
        .catch(function (error) {
          loadingInstance.close();
          // eslint-disable-next-line
          ElMessage.error(error.response.data.message);
        });
      this.form.name = "";
      this.form.unit = "";
      this.add_dia = false;
    },
  },
  data() {
    return {
      Store,
      items,
      add_dia: false,
      form: { name: "", unit: "" },
    };
  },
};
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  margin: 10px;
}
</style>
