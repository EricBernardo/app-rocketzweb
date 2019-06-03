<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :md="24" :sm="24">
          <el-form-item label="Papel" prop="role" v-if="rolesUser.length">
            <el-select filterable :disabled="loading" v-model="form.role" placeholder="Select">
              <el-option
                v-for="item in rolesUser"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item
            label="Empresa"
            prop="company_id"
            v-if="companies.length && (this.form.role == 'administrator' || this.form.role == 'client')"
          >
            <el-select filterable :disabled="loading" v-model="form.company_id">
              <el-option
                v-for="item in companies"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item
            label="Cliente"
            prop="client_id"
            v-if="clients.length && this.form.role == 'client'"
          >
            <el-select filterable :disabled="loading" v-model="form.client_id">
              <el-option
                v-for="item in clients"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="Nome" prop="name">
            <el-input :disabled="loading" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="E-mail" prop="email">
            <el-input :disabled="loading" v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="Senha" prop="password">
            <el-input type="password" :disabled="loading" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="Confirmar senha" prop="password_confirmation">
            <el-input type="password" :disabled="loading" v-model="form.password_confirmation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="24">
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
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllCompany } from "@/api/company";
import { getAllClients } from "@/api/client";
import { getProfile, saveProfile } from "@/api/user";

export default {
  data() {
    return {
      companies: [],
      clients: [],
      rolesUser: [{ value: "client", label: "Cliente" }],
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
            required: false,
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
        ],
        client_id: [
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
      this.rolesUser.push({ value: "root", label: "Root" });
      getAllCompany().then(response => {
        this.companies = response.data.data;
      });
    }
    if (this.role == "administrator") {
      this.rolesUser.push({ value: "administrator", label: "Administrador" });
    }
    if (this.role == "root" || this.role == "administrator") {
      getAllClients().then(response => {
        this.clients = response.data.data;
      });
    }
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.loading = true;
      getProfile().then(response => {
        Object.keys(this.form).forEach(key => {
          this.form[key] = response.data.data[key];
        });
        this.loading = false;
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          saveProfile(this.form)
            .then(response => {
              this.$message({
                message: "Salvo com sucesso",
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
