<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
			<el-row :gutter="10">
				<el-col :md="12" :sm="24">
					<el-form-item label="Título" prop="title">
						<el-input v-model="form.title" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Nome Fantasia" prop="title">
						<el-input v-model="form.fantasy" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="IE" prop="title">
						<el-input v-model="form.ie" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="CRT (Código regime tributário)" prop="crt">
						<el-select filterable v-model="form.crt" :disabled="loading">
							<el-option v-for="item in crts" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="CNPJ" prop="cnpj" v-mask="'##.###.###/####-##'">
						<el-input v-model="form.cnpj" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="CEP" prop="cep">
						<el-input
							v-model="form.cep"
							v-on:change="getCep()"
							:disabled="loading || loading_cep"
							v-mask="'#####-###'"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Estado" prop="state_id">
						<el-select
							filterable
							v-model="form.state_id"
							@change="getCities(true)"
							:disabled="loading || loading_cep || loading_cities"
						>
							<el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Cidade" prop="city_id">
						<el-select
							filterable
							v-model="form.city_id"
							:disabled="loading || loading_cep || loading_cities"
						>
							<el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Bairro" prop="neighborhood">
						<el-input v-model="form.neighborhood" :disabled="loading || loading_cep"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Endereço" prop="address">
						<el-input v-model="form.address" :disabled="loading || loading_cep"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Número" prop="number">
						<el-input-number
							v-model="form.number"
							:disabled="loading"
							controls-position="right"
							:min="1"
							:max="99999"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Certificado (.PFX)" prop="cert_file">
						<el-upload
							class="cert_file"
							:action="`${base_api}/company/file`"
							:headers="{'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }"
							:file-list="fileList"
							:on-change="handleChange"
							:on-error="handleUploadError"
							:on-success="handleSuccess"
							:on-exceed="handleExceed"
							:before-remove="beforeRemove"
							:on-progress="handleProgress"
							:limit="1"
						>
							<el-button size="small" type="default" :disabled="loading">Arquivo</el-button>
						</el-upload>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Senha" prop="cert_password">
						<el-input v-model="form.cert_password" :disabled="loading"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="24" :sm="24">
					<el-form-item>
						<router-link :to="{ name: 'company' }" class="pull-left">
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
	import { show, save, destroyFile } from "@/api/company";
	import { getToken } from "@/utils/auth";
	import { Message } from "element-ui";
	import { getStates } from "@/api/state";
	import { getCities } from "@/api/city";
	import { getCEP } from "@/api/cep";

	export default {
		data() {
			return {
				fileList: [],
				token: getToken(),
				base_api: process.env.VUE_APP_BASE_API,
				loading: false,
				loading_cep: false,
				loading_cities: false,
				states: [],
				cities: [],
				crts: [
					{
						id: 1,
						name: "Simples Nacional"
					},
					{
						id: 2,
						name:
							"Simples Nacional – excesso de sublimite da receita bruta"
					},
					{
						id: 3,
						name: "Regime Normal NOTAS EXPLICATIVAS"
					}
				],
				form: {
					title: null,
					fantasy: null,
					cert_password: null,
					cert_file: null,
					ie: null,
					crt: null,
					cnpj: null,
					address: null,
					number: null,
					neighborhood: null,
					state_id: null,
					city_id: null,
					cep: null
				},
				rules: {
					title: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					fantasy: [
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
					],
					crt: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					cnpj: [
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
					number: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					neighborhood: [
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
					cep: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					]
				}
			};
		},
		created() {
			getStates().then(response => {
				this.states = response.data.data;
			});
			if (this.$route.params.id) {
				this.loading = true;
				this.fileList = [];
				show(this.$route.params.id).then(response => {
					Object.keys(this.form).forEach(key => {
						this.form[key] = response.data.data[key];
						if (key == "state_id") {
							this.getCities();
						}
						if (key == "cert_file" && response.data.data[key]) {
							this.fileList.push({ name: response.data.data[key] });
						}
					});
					this.loading = false;
				});
			}
		},
		methods: {
			handleProgress(event, file, fileList) {
				this.loading = true;
			},
			handleChange(event, file, fileList) {
				this.loading = false;
			},
			handleExceed(files, fileList) {
				this.$message.warning(`Para atualizar o arquivo, apague o atual.`);
			},
			beforeRemove(file) {
				return this.$confirm(
					`Desejas realmente excluir esse arquivo?`
				).then(() => {
					if (!this.$route.params.id && this.form.cert_file) {
						this.loading = true;
						destroyFile(file.name).then(response => {
							this.loading = false;
						});
					}
					this.form.cert_file = null;
				});
			},
			handleSuccess(file) {
				this.form.cert_file = file.data;
				this.fileList = [];
				this.fileList.push({ name: file.data });
			},
			handleUploadError(msg, file) {
				if (msg.status !== 404) {
					let obj = JSON.parse(msg.message);
					Message({
						message:
							obj.errors != undefined
								? obj.errors.file[0]
								: obj.message,
						type: "error",
						duration: 5 * 1000,
						dangerouslyUseHTMLString: true
					});
				} else {
					Message({
						message: "Ocorreu algum erro. Tente novamente mais tarde.",
						type: "error",
						duration: 5 * 1000,
						dangerouslyUseHTMLString: true
					});
				}
			},
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
									this.fileList = [];
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
			},
			getCep() {
				let __this = this;

				__this.loading_cep = true;

				__this.cities = [];

				__this.form.neighborhood = null;
				__this.form.address = null;
				__this.form.state_id = null;
				__this.form.city_id = null;

				getCEP(this.form.cep)
					.then(response => {
						if (response.data.data) {
							__this.form.neighborhood = response.data.data.bairro;
							__this.form.address = response.data.data.logradouro;
							__this.states.map(function(state) {
								if (state.abbr == response.data.data.uf) {
									__this.form.state_id = state.id;
									__this.getCities(
										__this.form.state_id,
										response.data.data.localidade
									);
								}
							});
						}
					})
					.finally(response => {
						__this.loading_cep = false;
					});
			}
		}
	};
</script>

<style scoped>
	.el-radio,
	.cert_file {
		width: 100%;
		float: left;
	}
	.el-radio {
		margin-top: 5px;
	}
</style>
