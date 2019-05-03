<template>
  <div class="app-container">
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
export default {
  components: { VeLine },
  data() {
    return {
      chartData: {
        columns: ["date", "Vendas"],
        rows: [
          { date: "01/01/2019", Vendas: 1231 },
          { date: "01/02/2019", Vendas: 1223 },
          { date: "01/03/2019", Vendas: 2123 },
          { date: "01/04/2019", Vendas: 4123 },
          { date: "01/05/2019", Vendas: 3123 },
          { date: "01/06/2019", Vendas: 7123 }
        ]
      }
    };
  }
};
</script>
