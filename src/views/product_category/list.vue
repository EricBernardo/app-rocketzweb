<template>
  <div class="app-container">
    <router-link :to="{ name: 'product_category.create' }">
      <el-button type="success" class="pull-right m-b-10" size="mini">Cadastrar</el-button>
    </router-link>

    <el-table v-loading="listLoading" :data="list.data" element-loading-text="Carregando..." border>
      <el-table-column label="Empresa" v-if="profile.role == 'root'">
        <template slot-scope="scope">{{ scope.row.company ? scope.row.company.title : '' }}</template>
      </el-table-column>
      <el-table-column label="Título">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="-">
        <template slot-scope="scope">
          <router-link :to="{ name: 'product_category.edit', params: { id: scope.row.id } }">
            <el-button type="primary" size="mini">Editar</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click.prevent="destroyData(scope.row.id)">Excluir</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :data="list" @pagination-change-page="fetchData">
      <span slot="prev-nav">Anterior</span>
      <span slot="next-nav">Próximo</span>
    </pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { get, destroy } from "@/api/product_category";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: {},
      listLoading: false
    };
  },
  computed: {
    ...mapGetters(["profile"])
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      this.listLoading = true;

      var params = { page: page };

      get(params).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    destroyData(id) {
      this.$confirm("Desejas realmente excluir esse registro?", "Atenção", {
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        type: "warning"
      })
        .then(() => {
          destroy(id).then(response => {
            this.fetchData();
          });
        })
        .catch(() => {});
    }
  }
};
</script>
