<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-form-item label="Empresa" prop="company_id" v-if="role=='root'">
        <el-select filterable v-model="form.company_id" :disabled="loading">
          <el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title" :disabled="loading"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ name: 'product_category' }" class="pull-left">
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
import { mapGetters } from "vuex";
import { show, save } from "@/api/product_category";
import { getAllCompany } from "@/api/company";

export default {
  data() {
    return {
      loading: false,
      companies: [],
      form: {
        company_id: null,
        title: null
      },
      rules: {
        company_id: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        title: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["role"])
  },
  created() {
    if (this.role == "root") {
      getAllCompany().then(response => {
        this.companies = response.data.data;
      });
    }

    if (this.$route.params.id) {
      this.loading = true;
      show(this.$route.params.id).then(response => {
        Object.keys(this.form).forEach(key => {
          this.form[key] = response.data.data[key];
        });
        this.loading = false;
      });
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          save(this.form, this.$route.params.id)
            .then(response => {
              this.$message({
                message: "Salvo com sucesso",
                type: "success",
                duration: 5 * 1000
              });
              if (!this.$route.params.id) {
                this.$refs[formName].resetFields();
              }
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
