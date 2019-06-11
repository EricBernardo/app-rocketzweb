<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>      
      <el-row :gutter="10"> 
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
import { getProfile, saveProfile } from "@/api/user";

export default {
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        role: null
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
        ]
      }
    };
  },
  created() {
    this.getProfile();    
  },
  methods: {
    getProfile() {
      let __this = this;
      __this.loading = true;
      getProfile().then(response => {
        Object.keys(__this.form).forEach(key => {
          __this.form[key] = response.data.data[key];
        });
        __this.$store.dispatch("user/setProfile", __this.form);
        __this.loading = false;
      });
    },
    onSubmit(formName) {
      let __this = this;
      __this.$refs[formName].validate(valid => {
        if (valid) {
          __this.loading = true;
          saveProfile(__this.form)
            .then(response => {
              __this.$message({
                message: "Salvo com sucesso",
                type: "success",
                duration: 5 * 1000
              });  
              __this.form.password = null;
              __this.form.password_confirmation = null;            
            })
            .finally(responde => {
              __this.loading = false;
            });
        }
      });
    }
  }
};
</script>
