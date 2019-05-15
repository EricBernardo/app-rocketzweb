(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46d19d57"],{b39f:function(t,e,r){"use strict";r.d(e,"b",function(){return i}),r.d(e,"c",function(){return a}),r.d(e,"e",function(){return o}),r.d(e,"d",function(){return u}),r.d(e,"a",function(){return c});var n=r("b775");function i(){return Object(n["a"])({url:"/client",method:"get"})}function a(){return Object(n["a"])({url:"/client/all",method:"get"})}function o(t){return Object(n["a"])({url:"/client/"+t,method:"get"})}function l(t){return Object(n["a"])({url:"/client",method:"post",data:t})}function s(t,e){return Object(n["a"])({url:"/client/"+e,method:"put",data:t})}function u(t,e){return e?s(t,e):l(t)}function c(t){return Object(n["a"])({url:"/client/"+t,method:"delete"})}},fca4:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"Título",prop:"title"}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"CEP",prop:"cep"}},[r("el-input",{directives:[{name:"mask",rawName:"v-mask",value:"#####-###",expression:"'#####-###'"}],on:{change:function(e){return t.getCep()}},model:{value:t.form.cep,callback:function(e){t.$set(t.form,"cep",e)},expression:"form.cep"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Estado",prop:"state_id"}},[r("el-select",{on:{change:function(e){return t.getCities(!0)}},model:{value:t.form.state_id,callback:function(e){t.$set(t.form,"state_id",e)},expression:"form.state_id"}},t._l(t.states,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"Cidade",prop:"city_id"}},[r("el-select",{model:{value:t.form.city_id,callback:function(e){t.$set(t.form,"city_id",e)},expression:"form.city_id"}},t._l(t.cities,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),t._v(" "),r("el-form-item",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],attrs:{label:"CNPJ",prop:"cnpj"}},[r("el-input",{model:{value:t.form.cnpj,callback:function(e){t.$set(t.form,"cnpj",e)},expression:"form.cnpj"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Bairro",prop:"neighborhood"}},[r("el-input",{model:{value:t.form.neighborhood,callback:function(e){t.$set(t.form,"neighborhood",e)},expression:"form.neighborhood"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Endereço",prop:"address"}},[r("el-input",{model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"Número",prop:"number"}},[r("el-input-number",{attrs:{"controls-position":"right",min:1,max:99999},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1),t._v(" "),r("el-form-item",[r("router-link",{staticClass:"pull-left",attrs:{to:"/client"}},[r("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),r("el-button",{staticClass:"pull-right",attrs:{size:"mini",loading:t.loading,type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)},i=[],a=(r("7f7f"),r("db0c")),o=r.n(a),l=r("a4bb"),s=r.n(l),u=(r("ac6a"),r("b775"));function c(){return Object(u["a"])({url:"/state",method:"get"})}function d(t){return Object(u["a"])({url:"/city/"+t,method:"get"})}function f(t){return Object(u["a"])({url:"/cep/"+t,method:"get"})}var m=r("b39f"),p={data:function(){return{loading:!1,states:[],cities:[],form:{title:null,address:null,cep:null,state_id:null,city_id:null,cnpj:null,neighborhood:null,number:null},rules:{title:[{required:!0}],address:[{required:!0}],cep:[{required:!0}],state_id:[{required:!0}],city_id:[{required:!0}],cnpj:[{required:!0}],neighborhood:[{required:!0}],number:[{required:!0}]}}},created:function(){var t=this;c().then(function(e){t.states=e.data.data}),this.$route.params.id&&(this.loading=!0,Object(m["e"])(this.$route.params.id).then(function(e){s()(t.form).forEach(function(r){t.form[r]=e.data.data[r],"state_id"==r&&t.getCities()}),t.loading=!1}))},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate(function(r){r&&(e.loading=!0,Object(m["d"])(e.form,e.$route.params.id).then(function(r){e.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),e.$route.params.id||e.$refs[t].resetFields()}).finally(function(t){e.loading=!1}))})},getCities:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;d(this.form.state_id).then(function(n){t.cities=n.data.data;var i=t.form;e&&(i.city_id=null,r&&o()(t.cities).forEach(function(t){t.name==r&&(i.city_id=t.id)}))})},getCep:function(){var t=this,e=this;f(this.form.cep).then(function(r){if(r.data.data){var n=t.form;t.cities;n.neighborhood=r.data.data.bairro,n.address=r.data.data.logradouro,o()(t.states).forEach(function(t){t.abbr==r.data.data.uf&&(n.state_id=t.id,e.getCities(n.state_id,r.data.data.localidade))})}})}}},b=p,h=r("2877"),v=Object(h["a"])(b,n,i,!1,null,null,null);e["default"]=v.exports}}]);