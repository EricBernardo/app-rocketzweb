<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Faturamento</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="De">
          <el-date-picker
            v-model="start_date"
            type="date"
            format="dd/MM/yyyy"
            placeholder="Data inicial"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Até">
          <el-date-picker
            v-model="end_date"
            type="date"
            format="dd/MM/yyyy"
            placeholder="Data final"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="get">Filtrar</el-button>
        </el-form-item>
      </el-form>
      <el-col :md="24" :sm="24">
        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { get } from "@/api/dashboard";
const COLOR_LIST = ["green", "red", "blue"];
import VeHistogram from "v-charts/lib/histogram.common";
export default {
  components: { VeHistogram },
  data() {
    this.chartSettings = {
      label: {
        normal: { show: true, position: "top" }
      },
      legendName: { paid: "Pago", paid_no: "Não pago", total: "Total" },
      labelMap: { paid: "Pago", paid_no: "Não pago", total: "Total" }
    };
    return {
      loading: false,
      start_date: this.$moment()
        .add(-7, "days")
        .format("YYYY-MM-DDT00:00:00"),
      end_date: this.$moment().format("YYYY-MM-DDT00:00:00"),
      chartData: {
        columns: ["date", "paid", "paid_no", "total"],
        rows: []
      }
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.loading = true;
      let params = {
        start_date: this.$moment(this.start_date).format("YYYY-MM-DD"),
        end_date: this.$moment(this.end_date).format("YYYY-MM-DD")
      };
      get(params).then(response => {
        this.chartData.rows = [];
        Object.keys(response.data.data.billings).forEach(date => {
          this.chartData.rows.push({
            date: this.$moment(date).format("DD/MM/YYYY"),
            paid: response.data.data.billings[date].paid,
            paid_no: response.data.data.billings[date].paid_no,
            total:
              response.data.data.billings[date].paid -
              response.data.data.billings[date].paid_no
          });
        });
        this.loading = false;
      });
    }
  }
};
</script>
