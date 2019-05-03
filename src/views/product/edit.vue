<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Preço" prop="price">
        <money v-model="form.price" class="el-input__inner"></money>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ name: 'product' }" class="pull-left">
          <el-button size="mini">Voltar</el-button>
        </router-link>
        <el-button
          size="mini"
          :loading="loading"
          type="primary"
          class="pull-right"
          @click="onSubmit('form')"
        >Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { show, update } from "@/api/product";

export default {
  data() {
    return {
      loading: false,
      form: {
        title: null,
        price: 0
      },
      rules: {
        title: [
          {
            required: true
          }
        ],
        price: [
          {
            required: true
          }
        ]
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
        }
      });
    }
  }
};
</script>
