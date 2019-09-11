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
	import { show, save, destroyFile } from "@/api/company";

	import { getToken } from "@/utils/auth";

	import { Message } from "element-ui";

	export default {
		data() {
			return {
				fileList: [],
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
				this.fileList = [];
				show(this.$route.params.id).then(response => {
					Object.keys(this.form).forEach(key => {
						this.form[key] = response.data.data[key];
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
