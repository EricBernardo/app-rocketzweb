(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c44f4096"],{"2dcf":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app-container"},[e("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules},nativeOn:{submit:function(t){t.preventDefault()}}},[e("el-form-item",{attrs:{label:"Título",prop:"title"}},[e("el-input",{attrs:{disabled:t.loading},model:{value:t.form.title,callback:function(n){t.$set(t.form,"title",n)},expression:"form.title"}})],1),t._v(" "),e("el-form-item",[e("router-link",{staticClass:"pull-left",attrs:{to:{name:"company"}}},[e("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),e("el-button",{staticClass:"pull-right",attrs:{size:"mini",loading:t.loading,type:"primary"},on:{click:function(n){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)},a=[],o=(e("456d"),e("ac6a"),e("fcac")),i={data:function(){return{loading:!1,form:{title:null},rules:{title:[{required:!0,message:"Campo obrigatório"}]}}},created:function(){var t=this;this.$route.params.id&&(this.loading=!0,Object(o["e"])(this.$route.params.id).then(function(n){Object.keys(t.form).forEach(function(e){t.form[e]=n.data.data[e]}),t.loading=!1}))},methods:{onSubmit:function(t){var n=this;this.$refs[t].validate(function(e){e&&(n.loading=!0,Object(o["d"])(n.form,n.$route.params.id).then(function(e){n.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),n.$route.params.id||n.$refs[t].resetFields()}).finally(function(t){n.loading=!1}))})}}},u=i,c=e("2877"),l=Object(c["a"])(u,r,a,!1,null,null,null);n["default"]=l.exports},"456d":function(t,n,e){var r=e("4bf8"),a=e("0d58");e("5eda")("keys",function(){return function(t){return a(r(t))}})},"5eda":function(t,n,e){var r=e("5ca1"),a=e("8378"),o=e("79e5");t.exports=function(t,n){var e=(a.Object||{})[t]||Object[t],i={};i[t]=n(e),r(r.S+r.F*o(function(){e(1)}),"Object",i)}},fcac:function(t,n,e){"use strict";e.d(n,"b",function(){return a}),e.d(n,"c",function(){return o}),e.d(n,"e",function(){return i}),e.d(n,"d",function(){return l}),e.d(n,"a",function(){return s});var r=e("b775");function a(t){return Object(r["a"])({url:"/company",method:"get",params:t})}function o(){return Object(r["a"])({url:"/company/all",method:"get"})}function i(t){return Object(r["a"])({url:"/company/"+t,method:"get"})}function u(t){return Object(r["a"])({url:"/company",method:"post",data:t})}function c(t,n){return Object(r["a"])({url:"/company/"+n,method:"put",data:t})}function l(t,n){return n?c(t,n):u(t)}function s(t){return Object(r["a"])({url:"/company/"+t,method:"delete"})}}}]);