<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="CEP" prop="cep">
        <el-input v-model="form.cep"></el-input>
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
import { getStates } from "@/api/state";
import { getCities } from "@/api/city";
import { getCEP } from "@/api/cep";
import { show, update } from "@/api/client";

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
        ]
      }
    };
  },
  created() {
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

    getStates().then(response => {
      this.states = response.data.data;
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
        } else {
          return false;
        }
      });
    },
    getCities(change = false) {
      getCities(this.form.state_id).then(response => {
        this.cities = response.data.data;
        if (change) {
          this.form.city_id = null;
        }
      });
    },
    getCep(cep) {
      getCEP(cep).then(response => {
        if (response.data.data) {
          // model.neighborhood = response.data.data.bairro;

          console.log("states", this.states);
          // Object.values(states).forEach(function(value) {
          //   console.log("value", value);
          // });
        }
      });
    }
  }
};
</script>
