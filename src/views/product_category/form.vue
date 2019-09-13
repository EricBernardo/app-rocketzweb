<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
			<el-form-item label="Empresa" prop="company_id" v-if="profile.role=='root'">
				<el-select filterable v-model="form.company_id" :disabled="loading">
					<el-option v-for="item in companies" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="CFOP (Código Fiscal de Operações e de Prestações)" prop="cfop">
				<el-select filterable v-model="form.cfop" :disabled="loading">
					<el-option v-for="item in cfops" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Unidade de medida comercial" prop="cfop">
				<el-select filterable v-model="form.business_unit" :disabled="loading">
					<el-option v-for="item in business_units" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Título" prop="title">
				<el-input v-model="form.title" :disabled="loading"></el-input>
			</el-form-item>
			<el-form-item>
				<router-link :to="{ name: 'product_category' }" class="pull-left">
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
	import { mapGetters } from "vuex";
	import { show, save } from "@/api/product_category";
	import { getAllCompany } from "@/api/company";

	export default {
		data() {
			return {
				loading: false,
				companies: [],
				cfops: [
					{
						id: 5101,
						title: "Venda de produção do estabelecimento"
					}
				],
				business_units: [
					{
						id: "AMPOLA",
						title: "Ampola"
					},
					{
						id: "BALDE",
						title: "Balde"
					},
					{
						id: "BANDEJ",
						title: "Bandeja"
					},
					{
						id: "BARRA",
						title: "Barra"
					},
					{
						id: "BISNAG",
						title: "Bisnaga"
					},
					{
						id: "BLOCO",
						title: "Bloco"
					},
					{
						id: "BOBINA",
						title: "Bobina"
					},
					{
						id: "BOMB",
						title: "Bombona"
					},
					{
						id: "CAPS",
						title: "Capsula"
					},
					{
						id: "CART",
						title: "Cartela"
					},
					{
						id: "CENTO",
						title: "Cento"
					},
					{
						id: "CJ",
						title: "Conjunto"
					},
					{
						id: "CM",
						title: "Centimetro"
					},
					{
						id: "CM2",
						title: "Centimetro quadrado"
					},
					{
						id: "CX",
						title: "Caixa"
					},
					{
						id: "CX2",
						title: "Caixa com 2 unidades"
					},
					{
						id: "CX3",
						title: "Caixa com 3 unidades"
					},
					{
						id: "CX5",
						title: "Caixa com 5 unidades"
					},
					{
						id: "CX10",
						title: "Caixa com 10 unidades"
					},
					{
						id: "CX15",
						title: "Caixa com 15 unidades"
					},
					{
						id: "CX20",
						title: "Caixa com 20 unidades"
					},
					{
						id: "CX25",
						title: "Caixa com 25 unidades"
					},
					{
						id: "CX50",
						title: "Caixa com 50 unidades"
					},
					{
						id: "CX100",
						title: "Caixa com 100 unidades"
					},
					{
						id: "DISP",
						title: "Display"
					},
					{
						id: "DUZIA",
						title: "Duzia"
					},
					{
						id: "EMBAL",
						title: "Embalagem"
					},
					{
						id: "FARDO",
						title: "Fardo"
					},
					{
						id: "FOLHA",
						title: "Folha"
					},
					{
						id: "FRASCO",
						title: "Frasco"
					},
					{
						id: "GALAO",
						title: "Galão"
					},
					{
						id: "GF",
						title: "Garrafa"
					},
					{
						id: "GRAMAS",
						title: "Gramas"
					},
					{
						id: "JOGO",
						title: "Jogo"
					},
					{
						id: "KG",
						title: "Quilograma"
					},
					{
						id: "KIT",
						title: "Kit"
					},
					{
						id: "LATA",
						title: "Lata"
					},
					{
						id: "LITRO",
						title: "Litro"
					},
					{
						id: "M",
						title: "Metro"
					},
					{
						id: "M2",
						title: "Metro quadrado"
					},
					{
						id: "M3",
						title: "Metro cúbico"
					},
					{
						id: "MILHEI",
						title: "Milheiro"
					},
					{
						id: "ML",
						title: "Mililitro"
					},
					{
						id: "MWH",
						title: "Megawatt hora"
					},
					{
						id: "PACOTE",
						title: "Pacote"
					},
					{
						id: "PALETE",
						title: "Palete"
					},
					{
						id: "PARES",
						title: "Pares"
					},
					{
						id: "PC",
						title: "Peça"
					},
					{
						id: "POTE",
						title: "Pote"
					},
					{
						id: "K",
						title: "Quilate"
					},
					{
						id: "RESMA",
						title: "Resma"
					},
					{
						id: "ROLO",
						title: "Rolo"
					},
					{
						id: "SACO",
						title: "Saco"
					},
					{
						id: "SACOLA",
						title: "Sacola"
					},
					{
						id: "TAMBOR",
						title: "Tambor"
					},
					{
						id: "TANQUE",
						title: "Tanque"
					},
					{
						id: "TON",
						title: "Tonelada"
					},
					{
						id: "TUBO",
						title: "Tubo"
					},
					{
						id: "UNID",
						title: "Unidade"
					},
					{
						id: "VASIL",
						title: "Vasilhame"
					},
					{
						id: "VIDRO",
						title: "Vidro"
					}
				],
				form: {
					company_id: null,
					title: null,
					cfop: null,
					business_unit: null
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
					cfop: [
						{
							required: true,
							message: "Campo obrigatório"
						}
					],
					business_unit: [
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
				getAllCompany().then(response => {
					this.companies = response.data.data;
				});
			}

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
