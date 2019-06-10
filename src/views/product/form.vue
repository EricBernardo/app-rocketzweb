<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :md="12" :sm="24">
          <el-form-item label="Categoria" prop="product_category_id">
            <el-select v-model="form.product_category_id" :disabled="loading" filterable>
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="(profile.role == 'root' ? item.company.title + ' - ' : '') + item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="Título" prop="title">
            <el-input v-model="form.title" :disabled="loading"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="Preço" prop="price">
            <money v-model="form.price" :disabled="loading" class="el-input__inner"></money>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24">
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
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { show, save } from "@/api/product";
import { getAllProductCategories } from "@/api/product_category";

export default {
  data() {
    return {
      loading: false,
      companies: [],
      categories: [],
      form: {
        product_category_id: null,
        title: null,
        price: 0
      },
      rules: {
        company_id: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        product_category_id: [
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
        ],
        price: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["profile"])
  },
  created() {
    getAllProductCategories().then(response => {
      this.categories = response.data.data;
    });

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
