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
					:on-error="handleUploadError"
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
			handleUploadError(msg, file) {
				if (msg.status !== 404) {
					this.$notify.error({
						title: "Upload Unsuccessful",
						message:
							"File [" + file.name + "] unable to uploaded: " + msg,
						duration: 0
					});
				} else {
					this.$notify.error({
						title: "Path Not Found",
						message: "No such path on the server to upload to",
						duration: 0
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

								this.fileList = [];

								if (!this.$route.params.id) {
									this.$refs[formName].resetFields();
								} else {
									if (
										key == "cert_file" &&
										this.form["cert_file"]
									) {
										this.fileList.push({
											name: this.form["cert_file"]
										});
									}
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
