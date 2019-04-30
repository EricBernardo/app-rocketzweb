<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-form-item label="Título">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item>
        <router-link to="/company" class="pull-left">
          <el-button size="mini">Voltar</el-button>
        </router-link>
        <el-button
          size="mini"
          :loading="loading"
          type="primary"
          class="pull-right"
          :disabled="!this.form.title"
          @click.native.prevent="onSubmit"
        >Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/company";

export default {
  data() {
    return {
      loading: false,
      form: {
        title: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      if (this.isValid) {
        this.loading = true;
        create(this.form)
          .then(response => {
            this.$message({
              message: "Cadastrado realizado com sucesso",
              type: "success",
              duration: 5 * 1000
            });
            this.model.title = "";
          })
          .finally(responde => {
            this.loading = false;
          });
      }
      event.preventDefault();
    }
  }
};
</script>
