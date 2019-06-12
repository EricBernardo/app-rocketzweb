<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
			<el-row :gutter="10">
				<el-col :md="12" :sm="24">
					<el-form-item label="Papel" prop="role" v-if="rolesUser.length">
						<el-select
							filterable
							:disabled="loading"
							v-model="form.role"
							placeholder="Select"
							@change="getAllClients()"
						>
							<el-option
								v-for="item in rolesUser"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item
						label="Empresa"
						prop="company_id"
						v-if="companies.length && (this.form.role == 'administrator' || this.form.role == 'client')"
					>
						<el-select filterable :disabled="loading" v-model="form.company_id" @change="getAllClients()">
							<el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Cliente" prop="client_id" v-if="this.form.role == 'client'">
						<el-select filterable :disabled="loading || !clients.length" v-model="form.client_id">
							<el-option v-for="item in clients" :key="item.id" :label="item.title" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Nome" prop="name">
						<el-input :disabled="loading" v-model="form.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="E-mail" prop="email">
						<el-input :disabled="loading" v-model="form.email"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Senha" prop="password">
						<el-input type="password" :disabled="loading" v-model="form.password"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="12" :sm="24">
					<el-form-item label="Confirmar senha" prop="password_confirmation">
						<el-input type="password" :disabled="loading" v-model="form.password_confirmation"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="24" :sm="24">
					<el-form-item>
						<router-link :to="{ name: 'user' }" class="pull-left">
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
	import { getAllCompany } from "@/api/company";
	import { getAllClients } from "@/api/client";
	import { show, save } from "@/api/user";

	export default {
		data() {
			return {
				companies: [],
				clients: [],
				rolesUser: [
					{ value: "administrator", label: "Administrador" },
					{ value: "client", label: "Cliente" }
				],
				loading: false,
				form: {
					name: null,
					email: null,
					password: null,
					password_confirmation: null,
					role: null,
					client_id: null,
					company_id: null
				},
				rules: {
					name: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					email: [
						{
							required: true,
							message: "E-mail inválido",
							type: "email"
						}
					],
					password: [
						{
							required: !this.$route.params.id,
							min: 8,
							message: "Campo deve conter no mínimo 8 caracteres"
						}
					],
					role: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					password_confirmation: [
						{
							validator: (rule, value, callback) => {
								if (
									this.form.password &&
									value !== this.form.password
								) {
									callback(new Error("As senhas não combinam!"));
								} else {
									callback();
								}
							},
							trigger: "blur"
						}
					],
					company_id: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					client_id: [
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
			if (this.profile.role == "root") {
				this.rolesUser.push({ value: "root", label: "Root" });
				getAllCompany().then(response => {
					this.companies = response.data.data;
				});
			}

			if (this.profile.role == "administrator") {
				getAllClients().then(response => {
					this.clients = response.data.data;
				});
			}

			this.getUser();
		},
		methods: {
			getAllClients() {
				let __this = this;
				__this.clients = [];
				if (__this.form.company_id) {
					getAllClients({ company_id: __this.form.company_id }).then(
						response => {
							__this.form.client_id = null;
							__this.clients = response.data.data;
						}
					);
				}
			},
			getUser() {
				if (this.$route.params.id) {
					this.loading = true;
					show(this.$route.params.id).then(response => {
						Object.keys(this.form).forEach(key => {
							this.form[key] = response.data.data[key];
						});

						getAllClients({ company_id: this.form.company_id }).then(
							response => {
								this.clients = response.data.data;
							}
						);

						this.loading = false;
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
									this.$refs[formName].resetFields();
								}
							})
							.finally(responde => {
								this.loading = false;
							});
					}
				});
			}
		}
	};
</script>
