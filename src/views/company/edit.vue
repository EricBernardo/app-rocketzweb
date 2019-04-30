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
import { show, update } from "@/api/company";

export default {
  data() {
    return {
      loading: false,
      form: {
        title: ""
      }
    };
  },
  created() {
    this.loading = true;

    show(this.$route.params.id).then(response => {
      Object.keys(this.form).forEach(key => {
        this.form[key] = response.data.data[key];
      });

      this.loading = false;
    });
  },
  methods: {
    onSubmit(event) {
      this.loading = true;
      update(this.form, this.$route.params.id)
        .then(response => {
          this.$message({
            message: "Atualização realizada com sucesso",
            type: "success",
            duration: 5 * 1000
          });
        })
        .finally(responde => {
          this.loading = false;
        });
      event.preventDefault();
    }
  }
};
</script>
