<template>
  <div class="app-container">
    <vue-form-generator
      @validated="onValidated"
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <router-link to="/client" class="pull-left">
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
import { show, update } from "@/api/client";

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
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      model: {
        title: " "
      }
    };
  },
  created() {
    this.loading = true;

    show(this.$route.params.id).then(response => {
      Object.keys(this.model).forEach(key => {
        this.model[key] = response.data.data[key];
      });

      this.loading = false;

      this.isValid = true;
    });
  },
  methods: {
    onSubmit(event) {
      if (this.isValid) {
        this.loading = true;
        update(this.model, this.$route.params.id)
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
      }
      event.preventDefault();
    },
    onValidated(isValid) {
      this.isValid = isValid;
    }
  }
};
</script>
