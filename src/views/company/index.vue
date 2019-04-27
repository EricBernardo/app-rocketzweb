<template>
  <div class="app-container">
    <router-link to="/company/create">
      <el-button type="success" class="right">Cadastrar</el-button>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
    </el-table>
    <pagination :data="list" @pagination-change-page="fetchData" />
  </div>
</template>

<script>
import { getList } from '@/api/company'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: {},
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) {
      this.listLoading = true
      var params = {
        page: page
      }
      getList(params).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination-page-nav.active a {
    background-color: #304156;
    color: #fff;
  }
  .right{
    float: right;
  }
</style>
