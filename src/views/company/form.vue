<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
			<el-form-item label="Título" prop="title">
				<el-input v-model="form.title" :disabled="loading"></el-input>
			</el-form-item>
			<el-form-item label="Certificado (.PFX)" prop="cert_file">
				<el-upload
					class="cert_file"
					:action="`${base_api}/company/file`"
					:headers="{'Authorization': 'Bearer ' + token }"
					:file-list="[
                  {
                    name: form.cert_file
                  }
                ]"
					:limit="1"
				>
					<el-button size="small" type="default" :disabled="loading">Arquivo</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="Senha" prop="cert_password">
				<el-input v-model="form.cert_password" :disabled="loading"></el-input>
			</el-form-item>
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
		</el-form>
	</div>
</template>

<script>
	import { show, save } from "@/api/company";

	import { getToken } from "@/utils/auth";

	export default {
		data() {
			return {
				token: getToken(),
				base_api: process.env.VUE_APP_BASE_API,
				loading: false,
				form: {
					title: null,
					cert_password: null,
					cert_file: null
				},
				rules: {
					title: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					]
				}
			};
		},
		created() {
			if (this.$route.params.id) {
				this.loading = true;
				show(this.$route.params.id).then(response => {
					Object.keys(this.form).forEach(key => {
						this.form[key] = response.data.data[key];
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
			}
		}
	};
</script>

<style scoped>
	.cert_file {
		width: 100%;
		float: left;
	}
</style>
