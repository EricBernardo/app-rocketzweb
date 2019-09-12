<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
			<el-row :gutter="10">
				<el-col :md="12" :sm="24">
					<el-form-item label="Empresa" prop="company_id" v-if="profile.role=='root'">
						<el-select filterable v-model="form.company_id" :disabled="loading">
							<el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Título" prop="title">
						<el-input v-model="form.title" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="CPF" prop="cpf" v-mask="'###.###.###-##'">
						<el-input v-model="form.cpf" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Estado" prop="state_id">
						<el-select
							filterable
							v-model="form.state_id"
							@change="getCities(true)"
							:disabled="loading || loading_cities"
						>
							<el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Cidade" prop="city_id">
						<el-select filterable v-model="form.city_id" :disabled="loading || loading_cities">
							<el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Endereço" prop="address">
						<el-input v-model="form.address" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="IE" prop="ie">
						<el-input v-model="form.ie" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="24" :sm="24">
					<el-form-item>
						<router-link to="/shipping_company" class="pull-left">
							<el-button size="mini">Voltar</el-button>
						</router-link>
						<el-button
							size="mini"
							:loading="loading"
							type="primary"
							class="pull-right"
							@click="onSubmit('form')"
						>Salvar</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { getStates } from "@/api/state";
	import { getCities } from "@/api/city";
	import { show, save } from "@/api/shipping_company";
	import { getAllCompany } from "@/api/company";

	export default {
		data() {
			return {
				loading: false,
				loading_cities: false,
				states: [],
				cities: [],
				companies: [],
				form: {
					company_id: null,
					title: null,
					address: null,
					state_id: null,
					city_id: null,
					cpf: null,
					ie: null
				},
				rules: {
					company_id: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					title: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					address: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					state_id: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					city_id: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					cpf: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					ie: [
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
			getStates().then(response => {
				this.states = response.data.data;
			});
			if (this.profile.role == "root") {
				getAllCompany().then(response => {
					this.companies = response.data.data;
				});
			}
			if (this.$route.params.id) {
				this.loading = true;
				show(this.$route.params.id).then(response => {
					Object.keys(this.form).forEach(key => {
						this.form[key] = response.data.data[key];
						if (key == "state_id") {
							this.getCities();
						}
					});
					this.loading = false;
				});
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.loading = true;
						save(this.form, this.$route.params.id)
							.then(response => {
								this.$message({
									message: "Salvo com sucesso",
									type: "success",
									duration: 5 * 1000
								});
								if (!this.$route.params.id) {
									this.$refs[formName].resetFields();
								}
							})
							.finally(responde => {
								this.loading = false;
							});
					}
				});
			},
			getCities(change = false, city = null) {
				let __this = this;
				__this.loading_cities = true;
				getCities(this.form.state_id).then(response => {
					this.cities = response.data.data;
					let form = this.form;
					if (change) {
						form.city_id = null;
						if (city) {
							this.cities.map(function(item) {
								if (item.name == city) {
									form.city_id = item.id;
								}
							});
						}
					}
					__this.loading_cities = false;
				});
			}
		}
	};
</script>
