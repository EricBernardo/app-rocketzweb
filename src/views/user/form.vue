<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-form-item label="Papel" prop="role">
        <el-select :disabled="loading" v-model="form.role" placeholder="Select">
          <el-option
            v-for="item in rolesUser"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Empresa" prop="company_id">
        <el-select :disabled="loading" v-model="form.company_id">
          <el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cliente" prop="client_id">
        <el-select :disabled="loading" v-model="form.client_id">
          <el-option v-for="item in clients" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Nome" prop="name">
        <el-input :disabled="loading" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input :disabled="loading" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Senha" prop="password">
        <el-input type="password" :disabled="loading" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="Confirmar senha" prop="password_confirmation">
        <el-input type="password" :disabled="loading" v-model="form.password_confirmation"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ name: 'user' }" class="pull-left">
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
import { getAllCompany } from "@/api/company";
import { getAllClients } from "@/api/client";
import { show, save } from "@/api/user";

export default {
  data() {
    return {
      companies: [],
      clients: [],
      rolesUser: [
        { value: "root", label: "Root" },
        { value: "administrator", label: "Administrador" },
        { value: "client", label: "Cliente" }
      ],
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        role: null,
        client_id: null,
        company_id: null
      },
      rules: {
        name: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        email: [
          {
            required: true,
            message: "E-mail inválido",
            type: "email"
          }
        ],
        password: [
          {
            required: !this.$route.params.id,
            min: 8,
            message: "Campo deve conter no mínimo 8 caracteres"
          }
        ],
        role: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        password_confirmation: [
          {
            validator: (rule, value, callback) => {
              if (this.form.password && value !== this.form.password) {
                callback(new Error("As senhas não combinam!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        company_id: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ]
      }
    };
  },
  created() {
    getAllCompany().then(response => {
      this.companies = response.data.data;
    });

    getAllClients().then(response => {
      this.clients = response.data.data;
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
