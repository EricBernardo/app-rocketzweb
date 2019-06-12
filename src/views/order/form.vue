<template>
  <div class="app-container">
    <el-button
      type="success"
      class="pull-right m-b-10"
      size="mini"
      @click="addProduct()"
      :disabled="!this.products.length"
    >Adicionar produto</el-button>
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-col :md="6" :sm="24">
        <el-form-item
          class="order-company"
          label="Empresas"
          prop="company_id"
          v-if="companies.length"
        >
          <el-select
            v-model="form.company_id"
            :disabled="loading"
            filterable
            @change="setClientsCompanies()"
          >
            <el-option
              v-for="item in companies"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-form-item
          label="Cliente"
          prop="client_id"
          v-if="this.profile.role == 'root' || this.profile.role == 'administrator'"
        >
          <el-select
            v-model="form.client_id"
            :disabled="loading || !this.clients.length"
            filterable
          >
            <el-option
              v-for="item in clients"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="form.products"
          row-key="id"
          element-loading-text="Carregando..."
          border
          width="100%"
        >
          <el-table-column label="Produto" min-width="150">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.product_id"
                @change="calculateProduct(scope.row)"
                filterable
                :disabled="scope.row.block"
              >
                <el-option
                  v-for="item in products"
                  :key="item.id"
                  :label="(item.title.indexOf(item.category.title) === -1 ? (item.category.title + ' - ') : '') + item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Quantidade" min-width="150">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.quantity"
                :change="calculateProduct(scope.row)"
                :min="1"
                :max="100"
                :disabled="scope.row.block"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Preço" min-width="150">
            <template slot-scope="scope">
              <money
                v-model="scope.row.total"
                :disabled="scope.row.block"
                :readonly="true"
                class="el-input__inner"
              ></money>
            </template>
          </el-table-column>
          <el-table-column label="-" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="removeProduct(scope.row)">Remover</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-form-item label="Desconto" prop="discount">
          <el-col :md="20" :sm="24">
            <money v-model="form.discount" :disabled="loading" class="el-input__inner"></money>
          </el-col>
        </el-form-item>
        <el-form-item label="Pago?" prop="paid">
          <el-switch v-model="form.paid" :disabled="loading"></el-switch>
        </el-form-item>
        <el-form-item label="Data" prop="date">
          <el-date-picker
            :disabled="loading"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
            v-model="form.date"
            type="date"
            placeholder="Data"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="24" class="pull-right">
        <el-form-item label="Subtotal" prop="subtotal">
          <money v-model="form.subtotal" :readonly="true" class="el-input__inner"></money>
        </el-form-item>
        <el-form-item label="Total" prop="total">
          <money v-model="form.total" :readonly="true" class="el-input__inner"></money>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="24">
        <el-form-item>
          <router-link :to="{ name: 'order' }" class="pull-left">
            <el-button size="mini">Voltar</el-button>
          </router-link>
          <el-button
            size="mini"
            type="primary"
            :loading="loading || !this.products.length"
            class="pull-right"
            @click="onSubmit('form')"
          >Salvar</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { show, save } from "@/api/order";
import { getAllProducts } from "@/api/product";
import { getAllClients } from "@/api/client";
import { getAllCompany } from "@/api/company";

export default {
  data() {
    return {
      loading: false,
      products: [],
      clients: [],
      companies: [],
      form: {
        client_id: null,
        discount: 0,
        products: [],
        paid: false,
        subtotal: 0,
        total: 0,
        date: null
      },
      rules: {
        client_id: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        date: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
        products: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["profile"])
  },
  created() {
    let form = this.form;

    if (this.profile.role == "administrator") {
      getAllClients().then(response => {
        this.clients = response.data.data;
      });
    }

    if (this.profile.role == "root") {
      getAllCompany().then(response => {
        this.companies = response.data.data;
      });
    }

    if (this.profile.role == "administrator" || this.profile.role == "client") {
      getAllProducts().then(response => {
        this.products = response.data.data;
      });
    }

    this.getOrder();
  },
  methods: {
    setClientsCompanies(clear = true) {
      if (this.profile.role == "root") {
        let __this = this;
        if (clear) {
          __this.form.total = 0;
          __this.form.subtotal = 0;
          __this.clients = [];
          __this.products = [];
          __this.form.products = [];
        }
        getAllClients({ company_id: __this.form.company_id }).then(response => {
          if (clear) {
            __this.form.client_id = null;
          }
          __this.clients = response.data.data;
        });
        getAllProducts({ company_id: __this.form.company_id }).then(
          response => {
            __this.products = response.data.data;
          }
        );
      }
    },
    getOrder() {
      let __this = this;
      if (__this.$route.params.id) {
        __this.loading = true;
        show(__this.$route.params.id).then(response => {
          __this.form.products = [];
          response.data.data.products.map(product => {
            __this.form.products.push({
              id: product.pivot.id,
              product_id: product.id,
              quantity: product.pivot.quantity,
              price: product.pivot.price,
              total: product.pivot.price * product.pivot.quantity,
              block: true
            });
          });
          __this.form.client_id = response.data.data.client.id;
          __this.form.company_id = response.data.data.client.company.id;
          __this.form.discount = response.data.data.discount;
          __this.form.paid = response.data.data.paid ? true : false;
          __this.form.subtotal = response.data.data.subtotal;
          __this.form.total = response.data.data.total;
          __this.form.date = response.data.data.date;
          __this.setClientsCompanies(false);
          __this.loading = false;
        });
      } else {
        __this.form.date = __this.$moment().format("YYYY-MM-DD");
      }
    },
    calculateProduct(row) {
      if (!row.block) {
        let price = 0;
        this.products.map(function(value) {
          if (value.id == row.product_id) {
            price = value.price;
          }
        });
        row.price = price;
        row.total = row.quantity * row.price;
      }
      this.calculateOrder();
    },
    calculateOrder() {
      let total = 0;
      let form = this.form;
      form.subtotal = 0;
      form.total = 0;
      form.products.map(function(value) {
        total += value.total;
      });
      form.discount = Math.abs(form.discount);
      form.subtotal = total;
      form.total = total - form.discount;
    },
    addProduct() {
      if (this.products.length) {
        let product = this.products[0];
        this.form.products.push({
          product_id: product.id,
          quantity: 1,
          price: product.price,
          total: product.price,
          block: false
        });
      } else {
        this.$message({
          message: "Produto não encontrado",
          type: "error",
          duration: 5 * 1000
        });
      }
    },
    removeProduct(row) {
      var index = this.form.products.indexOf(row);
      if (index > -1) {
        this.form.total -= this.form.products.price;
        this.form.subtotal -= this.form.products.price;
        this.form.products.splice(index, 1);
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          var form = this.form;
          save(form, this.$route.params.id)
            .then(response => {
              this.$message({
                message: "Salvo com sucesso",
                type: "success",
                duration: 5 * 1000
              });
              if (!this.$route.params.id) {
                this.$refs[formName].resetFields();
                this.form.products = [];
              }
              this.getOrder();
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
