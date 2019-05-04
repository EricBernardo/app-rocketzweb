<template>
  <div class="app-container">
    <router-link :to="{ name: 'order.create' }">
      <el-button type="success" class="pull-right m-b-10" size="mini">Adicionar produto</el-button>
    </router-link>
    <el-form :model="form" :rules="rules" ref="form">
      <el-col :span="12">
        <el-form-item label="Cliente" prop="client_id">
          <el-select v-model="form.client_id">
            <el-option v-for="item in clients" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" row-key="id" element-loading-text="Carregando..." border>
          <el-table-column label="Produto">
            <template slot-scope="scope">
              <el-select v-model="scope.row.product_id">
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
              <el-input-number v-model="scope.row.quantity" :min="1" :max="100"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Preço">
            <template slot-scope="scope">
              <money v-model="scope.row.price" readonly disabled class="el-input__inner"></money>
            </template>
          </el-table-column>
          <el-table-column label="-">
            <el-button type="danger" size="mini">Remover</el-button>
          </el-table-column>
        </el-table>
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
      tableData: [
        {
          product_id: 1,
          quantity: 3,
          price: 450.5
        },
        {
          product_id: 2,
          quantity: 1,
          price: 950
        },
        {
          product_id: 1,
          quantity: 1,
          price: 500
        }
      ],
      form: {
        title: null
      },
      rules: {
        title: [
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
  methods: {}
};
</script>
