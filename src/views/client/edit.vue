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
import { getStates } from "@/api/state";
import { getCities } from "@/api/city";
import { getCEP } from "@/api/cep";
import { show, update } from "@/api/client";

export default {
  data() {
    return {
      isValid: false,
      loading: false,
      states: [],
      cities: [],
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
            validator: "string",
            onChanged(model, schema, oldValue, field) {
              let states = this.states;
              console.log("model", model);
              console.log("schema", schema);
              let cep = model.cep.replace(/[a-z,A-Z]/g, "");

              model.cep = cep;

              if (cep.length >= 8) {
                getCep(cep);
              }
            }
          },
          {
            type: "select",
            label: "Estado",
            model: "state_id",
            required: true,
            validator: "required",
            values: (model, schema, oldValue, field) => {
              if (model.state_id > 0) {
                getCities(model.state_id).then(response => {
                  this.cities = response.data.data;
                });
              }

              return this.states;
            },
            onChanged(model) {
              model.city_id = "";
            }
          },
          {
            type: "select",
            label: "Cidade",
            model: "city_id",
            required: true,
            validator: "required",
            values: () => {
              return this.cities;
            }
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
        validateAfterChanged: true
      },
      model: {
        title: " ",
        address: " ",
        cep: " ",
        state_id: " ",
        city_id: " ",
        cnpj: " ",
        neighborhood: " ",
        number: " "
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

    getStates().then(response => {
      this.states = response.data.data;
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
