<template>
	<div class="app-container">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>Faturamento</span>
			</div>
			<el-form :inline="true" class="demo-form-inline">
				<el-row :gutter="5">
					<el-col :md="6" :sm="24">
						<el-form-item label="De">
							<el-date-picker
								v-model="start_date"
								type="date"
								format="dd/MM/yyyy"
								value-format="yyyy-MM-dd"
								placeholder="Data inicial"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="6" :sm="24">
						<el-form-item label="Até">
							<el-date-picker
								v-model="end_date"
								type="date"
								format="dd/MM/yyyy"
								value-format="yyyy-MM-dd"
								placeholder="Data final"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :md="6" :sm="24">
						<el-form-item label="Empresa" prop="company_id" v-if="profile.role == 'root'">
							<el-select
								clearable
								filterable
								v-model="company_id"
								:disabled="!this.companies.length"
								@change="getAllClients()"
							>
								<el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="6" :sm="24">
						<el-form-item
							label="Cliente"
							prop="company_id"
							v-if="profile.role == 'root' || profile.role == 'administrator'"
						>
							<el-select clearable filterable v-model="client_id" :disabled="!this.clients.length">
								<el-option v-for="item in clients" :key="item.id" :label="item.title" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :md="24" :sm="24">
						<el-form-item>
							<el-button size="small" :loading="loading" type="primary" @click="get">Filtrar</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-col :md="24" :sm="24">
				<ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
			</el-col>
		</el-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { get } from "@/api/dashboard";
	import { getAllCompany } from "@/api/company";
	import { getAllClients } from "@/api/client";
	import VeHistogram from "v-charts/lib/histogram.common";
	export default {
		components: { VeHistogram },
		data() {
			this.chartSettings = {
				label: {
					normal: { show: true, position: "top" }
				},
				legendName: { total: "Total" },
				labelMap: { total: "Total" }
			};
			return {
				loading: false,
				companies: [],
				clients: [],
				company_id: null,
				client_id: null,
				start_date: this.$moment()
					.add(-7, "days")
					.format("YYYY-MM-DD"),
				end_date: this.$moment().format("YYYY-MM-DD"),
				chartData: {
					columns: ["date", "total"],
					rows: []
				}
			};
		},
		computed: {
			...mapGetters(["profile"])
		},
		created() {
			this.get();
			if (this.profile.role == "root") {
				getAllCompany().then(response => {
					this.companies = response.data.data;
				});
			}
			if (this.profile.role == "administrator") {
				getAllClients().then(response => {
					this.clients = response.data.data;
				});
			}
		},
		methods: {
			getAllClients() {
				let __this = this;
				if (__this.profile.role == "root") {
					__this.clients = [];
					if (__this.company_id) {
						getAllClients({ company_id: __this.company_id }).then(
							response => {
								__this.client_id = null;
								__this.clients = response.data.data;
							}
						);
					}
				}
			},
			get() {
				this.loading = true;
				let params = {
					start_date: this.start_date,
					end_date: this.end_date,
					client_id: this.client_id,
					company_id: this.company_id
				};
				get(params).then(response => {
					this.chartData.rows = [];
					Object.keys(response.data.data.billings).forEach(date => {
						this.chartData.rows.push({
							date: this.$moment(date).format("DD/MM/YYYY"),
							total:
								response.data.data.billings[date].paid +
								response.data.data.billings[date].paid_no
						});
					});
					this.loading = false;
				});
			}
		}
	};
</script>
