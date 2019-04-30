<template>
  <div class="app-container">
    <vue-form-generator @validated="onValidated" :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <router-link :to="{ name: 'company' }" class="pull-left">
      <el-button size="mini">Voltar</el-button>
    </router-link>
    <el-button size="mini" :loading="loading" type="primary" class="pull-right" :disabled="!isValid" @click.native.prevent="onSubmit">Salvar</el-button>
  </div>
</template>

<script>
  import { create } from '@/api/company'

  export default {
    data() {
      return {
        isValid: false,
        loading: false,
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              label: 'Título',
              model: 'title',
              required: true,
              validator: 'string'
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true,
          validateAsync: true
        },
        model: {
          title: ''
        }
      }
    },
    methods: {
      onSubmit(event) {
        if (this.isValid) {
          this.loading = true
          create(this.model).then(response => {
            this.$message({
              message: 'Cadastrado realizado com sucesso',
              type: 'success',
              duration: 5 * 1000
            })
            this.model.title = ''
            this.isValid = false
          }).finally(responde => {
            this.loading = false
          })
        }
        event.preventDefault()
      },
      onValidated(isValid) {
        this.isValid = isValid
      }
    }
  }
</script>
