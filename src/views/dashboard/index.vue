<template>
  <div class="app-container">
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
const COLOR_LIST = ["green", "red", "blue"];
import VeHistogram from "v-charts/lib/histogram.common";
export default {
  components: { VeHistogram },
  data() {
    return {
      chartData: {
        columns: ["date", "paid", "paid_no", "total"],
        rows: [
          {
            date: "01/01",
            paid: 1523,
            paid_no: 1523,
            total: 100
          },
          {
            date: "01/02",
            paid: 1223,
            paid_no: 1523,
            total: 100
          },
          {
            date: "01/03",
            paid: 2123,
            paid_no: 1523,
            total: 100
          },
          {
            date: "01/04",
            paid: 4123,
            paid_no: 1523,
            total: 100
          }
        ]
      }
    };
  }
};
</script>
