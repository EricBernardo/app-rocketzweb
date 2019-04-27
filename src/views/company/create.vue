<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Título">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <router-link to="/company">
          <el-button>Voltar</el-button>
        </router-link>
        <el-button :loading="loading" type="primary" @click.native.prevent="onSubmit">Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/company'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      form: {
        title: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.loading = true

      create(this.form).then(response => {

        Message({
          message: 'Cadastrado realizado com sucesso',
          type: 'success',
          duration: 5 * 1000
        })

      }).finally(responde => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

