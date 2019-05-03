<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="CEP" prop="cep">
        <el-input v-model="form.cep" v-on:change="getCep()"></el-input>
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
      <el-form-item label="CNPJ" prop="cnpj">
        <el-input v-model="form.cnpj"></el-input>
      </el-form-item>
      <el-form-item label="Bairro" prop="neighborhood">
        <el-input v-model="form.neighborhood"></el-input>
      </el-form-item>
      <el-form-item label="Endereço" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="Número" prop="number">
        <el-input v-model="form.number"></el-input>
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
import { getCEP } from "@/api/cep";
import { getCities } from "@/api/city";
import { create } from "@/api/client";
import { getStates } from "@/api/state";

export default {
  data() {
    return {
      loading: false,
      states: [],
      cities: [],
      form: {
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
  created() {
    getStates().then(response => {
      this.states = response.data.data;
    });
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          create(this.form)
            .then(response => {
              this.$message({
                message: "Cadastro realizada com sucesso",
                type: "success",
                duration: 5 * 1000
              });

              this.title = null;
              this.address = null;
              this.cep = null;
              this.state_id = null;
              this.city_id = null;
              this.cnpj = null;
              this.neighborhood = null;
              this.number = null;
            })
            .finally(responde => {
              this.loading = false;
            });
        } else {
          return false;
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
