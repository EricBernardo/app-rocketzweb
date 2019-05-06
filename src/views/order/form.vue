<template>
  <div class="app-container">
    <router-link :to="{ name: 'order.create' }">
      <el-button
        type="success"
        class="pull-right m-b-10"
        size="mini"
        @click="addProduct()"
        v-if="this.products.length"
      >Adicionar produto</el-button>
    </router-link>
    <el-form :model="form" :rules="rules" ref="form">
      <pre>{{form}}</pre>
      <el-col :md="6" :sm="24">
        <el-form-item label="Cliente" prop="client_id">
          <el-select v-model="form.client_id">
            <el-option v-for="item in clients" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-table :data="form.products" row-key="id" element-loading-text="Carregando..." border>
          <el-table-column label="Produto">
            <template slot-scope="scope">
              <el-select v-model="scope.row.product_id" @change="calculateProduct(scope.row)">
                <el-option
                  v-for="item in products"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Quantidade">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.quantity"
                @change="calculateProduct(scope.row)"
                :min="1"
                :max="100"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Preço">
            <template slot-scope="scope">
              <money v-model="scope.row.total" readonly disabled class="el-input__inner"></money>
            </template>
          </el-table-column>
          <el-table-column label="-">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="removeProduct(scope.row)">Remover</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-form-item label="Desconto" prop="discount">
          <money v-model="form.discount" class="el-input__inner"></money>
        </el-form-item>
        <el-form-item label="Pago?" prop="paid">
          <el-switch v-model="form.paid"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :md="6" :sm="24" class="pull-right">
        <el-form-item label="Subtotal" prop="subtotal">
          <money v-model="form.subtotal" class="el-input__inner"></money>
        </el-form-item>
        <el-form-item label="Desconto">
          <money v-model="form.discount" class="el-input__inner" disabled readony></money>
        </el-form-item>
        <el-form-item label="Total" prop="total">
          <money v-model="form.total" class="el-input__inner"></money>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="24">
        <el-form-item>
          <router-link :to="{ name: 'company' }" class="pull-left">
            <el-button size="mini">Voltar</el-button>
          </router-link>
          <el-button size="mini" type="primary" class="pull-right" @click="onSubmit('form')">Salvar</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { getAllProducts } from "@/api/product";
import { getAllClients } from "@/api/client";

export default {
  data() {
    return {
      products: [],
      clients: [],
      form: {
        client_id: null,
        discount: 0,
        products: [],
        paid: false,
        subtotal: 0,
        total: 0
      },
      rules: {
        client_id: [
          {
            required: true
          }
        ]
      }
    };
  },
  created() {
    getAllProducts().then(response => {
      this.products = response.data.data;
    });
    getAllClients().then(response => {
      this.clients = response.data.data;
    });
  },
  methods: {
    calculateProduct(row) {
      let price = 0;

      Object.values(this.products).forEach(function(value) {
        if (value.id == row.product_id) {
          price = value.price;
        }
      });

      row.total = row.quantity * price;

      this.calculateOrder();
    },
    calculateOrder() {
      let form = this.form;

      form.subtotal = 0;
      form.total = 0;

      Object.values(form.products).forEach(function(value) {
        form.subtotal = value.total;
        form.total = value.total;
      });

      form.total = form.total - form.discount;
    },
    addProduct() {
      if (this.products.length) {
        let product = this.products[0];
        this.form.products.push({
          product_id: product.id,
          quantity: 1,
          price: product.price,
          total: product.price
        });

        this.calculateOrder();
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
        this.form.products.splice(index, 1);
        this.calculateOrder();
      }
    }
  }
};
</script>
