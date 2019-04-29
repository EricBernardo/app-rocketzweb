<template>
  <div class="app-container">
    <vue-form-generator
      @validated="onValidated"
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <router-link :to="{ name: 'client' }" class="pull-left">
      <el-button size="mini">Voltar</el-button>
    </router-link>
    <el-button
      size="mini"
      :loading="loading"
      type="primary"
      class="pull-right"
      :disabled="!isValid"
      @click.native.prevent="onSubmit"
    >Salvar</el-button>
  </div>
</template>

<script>
import { create } from "@/api/client";
import { Message } from "element-ui";

export default {
  data() {
    return {
      isValid: false,
      loading: false,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Título",
            model: "title",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "Endereço",
            model: "address",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "CEP",
            model: "cep",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "Estado",
            model: "state_id",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "Cidade",
            model: "city_id",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "CNPJ",
            model: "cnpj",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "Bairro",
            model: "neighborhood",
            required: true,
            validator: "string"
          },
          {
            type: "input",
            inputType: "text",
            label: "Número",
            model: "number",
            required: true,
            validator: "string"
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      },
      model: {
        title: "",
        address: "",
        cep: "",
        state_id: "",
        city_id: "",
        cnpj: "",
        neighborhood: "",
        number: ""
      }
    };
  },
  methods: {
    onSubmit(event) {
      if (this.isValid) {
        this.loading = true;
        create(this.model)
          .then(response => {
            Message({
              message: "Cadastrado realizado com sucesso",
              type: "success",
              duration: 5 * 1000
            });
            this.model.title = "";
            this.isValid = false;
          })
          .finally(responde => {
            this.loading = false;
          });
      }
      event.preventDefault();
    },
    onValidated(isValid) {
      this.isValid = isValid;
    }
  }
};
</script>
