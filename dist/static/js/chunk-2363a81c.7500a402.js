(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2363a81c"],{"452a":function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"e",function(){return u}),n.d(e,"d",function(){return l}),n.d(e,"a",function(){return d});var r=n("b775");function o(t){return Object(r["a"])({url:"/product_category",method:"get",params:t})}function a(){return Object(r["a"])({url:"/product_category/all",method:"get"})}function u(t){return Object(r["a"])({url:"/product_category/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/product_category",method:"post",data:t})}function i(t,e){return Object(r["a"])({url:"/product_category/"+e,method:"put",data:t})}function l(t,e){return e?i(t,e):c(t)}function d(t){return Object(r["a"])({url:"/product_category/"+t,method:"delete"})}},b7bb:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules},nativeOn:{submit:function(t){t.preventDefault()}}},["root"==t.role?n("el-form-item",{attrs:{label:"Empresa",prop:"company_id"}},[n("el-select",{attrs:{disabled:t.loading},model:{value:t.form.company_id,callback:function(e){t.$set(t.form,"company_id",e)},expression:"form.company_id"}},t._l(t.companies,function(t){return n("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1):t._e(),t._v(" "),n("el-form-item",{attrs:{label:"Título",prop:"title"}},[n("el-input",{attrs:{disabled:t.loading},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),n("el-form-item",[n("router-link",{staticClass:"pull-left",attrs:{to:{name:"product_category"}}},[n("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),n("el-button",{staticClass:"pull-right",attrs:{size:"mini",loading:t.loading,type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)},o=[],a=n("a4bb"),u=n.n(a),c=(n("ac6a"),n("cebc")),i=n("2f62"),l=n("452a"),d=n("fcac"),s={data:function(){return{loading:!1,companies:[],form:{company_id:null,title:null},rules:{company_id:[{required:!0,message:"Campo obrigatório"}],title:[{required:!0,message:"Campo obrigatório"}]}}},computed:Object(c["a"])({},Object(i["b"])(["role"])),created:function(){var t=this;"root"==this.role&&Object(d["c"])().then(function(e){t.companies=e.data.data}),this.$route.params.id&&(this.loading=!0,Object(l["e"])(this.$route.params.id).then(function(e){u()(t.form).forEach(function(n){t.form[n]=e.data.data[n]}),t.loading=!1}))},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate(function(n){n&&(e.loading=!0,Object(l["d"])(e.form,e.$route.params.id).then(function(n){e.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),e.$route.params.id||e.$refs[t].resetFields()}).finally(function(t){e.loading=!1}))})}}},m=s,f=n("2877"),p=Object(f["a"])(m,r,o,!1,null,null,null);e["default"]=p.exports},fcac:function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"e",function(){return u}),n.d(e,"d",function(){return l}),n.d(e,"a",function(){return d});var r=n("b775");function o(t){return Object(r["a"])({url:"/company",method:"get",params:t})}function a(){return Object(r["a"])({url:"/company/all",method:"get"})}function u(t){return Object(r["a"])({url:"/company/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/company",method:"post",data:t})}function i(t,e){return Object(r["a"])({url:"/company/"+e,method:"put",data:t})}function l(t,e){return e?i(t,e):c(t)}function d(t){return Object(r["a"])({url:"/company/"+t,method:"delete"})}}}]);