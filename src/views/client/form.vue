<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="Empresa" prop="company_id" v-if="role=='root'">
        <el-select v-model="form.company_id">
          <el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="CEP" prop="cep">
        <el-input v-model="form.cep" v-on:change="getCep()" v-mask="'#####-###'"></el-input>
      </el-form-item>
      <el-form-item label="Estado" prop="state_id">
        <el-select v-model="form.state_id" @change="getCities(true)">
          <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cidade" prop="city_id">
        <el-select v-model="form.city_id">
          <el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CNPJ" prop="cnpj" v-mask="'##.###.###/####-##'">
        <el-input v-model="form.cnpj"></el-input>
      </el-form-item>
      <el-form-item label="Bairro" prop="neighborhood">
        <el-input v-model="form.neighborhood"></el-input>
      </el-form-item>
      <el-form-item label="Endereço" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="Número" prop="number">
        <el-input-number v-model="form.number" controls-position="right" :min="1" :max="99999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <router-link to="/client" class="pull-left">
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
import { getStates } from "@/api/state";
import { getCities } from "@/api/city";
import { getCEP } from "@/api/cep";
import { show, save } from "@/api/client";
import { getAllCompany } from "@/api/company";

export default {
  data() {
    return {
      loading: false,
      states: [],
      cities: [],
      companies: [],
      form: {
        company_id: null,
        title: null,
        address: null,
        cep: null,
        state_id: null,
        city_id: null,
        cnpj: null,
        neighborhood: null,
        number: null
      },
      rules: {
        company_id: [
          {
            required: this.role ? true : false
          }
        ],
        title: [
          {
            required: true
          }
        ],
        address: [
          {
            required: true
          }
        ],
        cep: [
          {
            required: true
          }
        ],
        state_id: [
          {
            required: true
          }
        ],
        city_id: [
          {
            required: true
          }
        ],
        cnpj: [
          {
            required: true
          }
        ],
        neighborhood: [
          {
            required: true
          }
        ],
        number: [
          {
            required: true
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["role"])
  },
  created() {
    getStates().then(response => {
      this.states = response.data.data;
    });

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
          if (key == "state_id") {
            this.getCities();
          }
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
    },
    getCities(change = false, city = null) {
      getCities(this.form.state_id).then(response => {
        this.cities = response.data.data;
        let form = this.form;
        if (change) {
          form.city_id = null;
          if (city) {
            Object.values(this.cities).forEach(function(item) {
              if (item.name == city) {
                form.city_id = item.id;
              }
            });
          }
        }
      });
    },
    getCep() {
      let __this = this;
      getCEP(this.form.cep).then(response => {
        if (response.data.data) {
          let form = this.form;
          let cities = this.cities;
          form.neighborhood = response.data.data.bairro;
          form.address = response.data.data.logradouro;
          Object.values(this.states).forEach(function(state) {
            if (state.abbr == response.data.data.uf) {
              form.state_id = state.id;
              __this.getCities(form.state_id, response.data.data.localidade);
            }
          });
        }
      });
    }
  }
};
</script>
