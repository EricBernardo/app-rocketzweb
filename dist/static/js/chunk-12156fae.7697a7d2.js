(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12156fae"],{"456d":function(t,e,a){var o=a("4bf8"),r=a("0d58");a("5eda")("keys",function(){return function(t){return r(o(t))}})},"5eda":function(t,e,a){var o=a("5ca1"),r=a("8378"),n=a("79e5");t.exports=function(t,e){var a=(r.Object||{})[t]||Object[t],i={};i[t]=e(a),o(o.S+o.F*n(function(){a(1)}),"Object",i)}},b39f:function(t,e,a){"use strict";a.d(e,"b",function(){return r}),a.d(e,"c",function(){return n}),a.d(e,"e",function(){return i}),a.d(e,"d",function(){return c}),a.d(e,"a",function(){return d});var o=a("b775");function r(t){return Object(o["a"])({url:"/client",method:"get",params:t})}function n(){return Object(o["a"])({url:"/client/all",method:"get"})}function i(t){return Object(o["a"])({url:"/client/"+t,method:"get"})}function l(t){return Object(o["a"])({url:"/client",method:"post",data:t})}function s(t,e){return Object(o["a"])({url:"/client/"+e,method:"put",data:t})}function c(t,e){return e?s(t,e):l(t)}function d(t){return Object(o["a"])({url:"/client/"+t,method:"delete"})}},fca4:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"120px"},nativeOn:{submit:function(t){t.preventDefault()}}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{md:12,sm:24}},["root"==t.role?a("el-form-item",{attrs:{label:"Empresa",prop:"company_id"}},[a("el-select",{attrs:{filterable:"",disabled:t.loading},model:{value:t.form.company_id,callback:function(e){t.$set(t.form,"company_id",e)},expression:"form.company_id"}},t._l(t.companies,function(t){return a("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1):t._e()],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Título",prop:"title"}},[a("el-input",{attrs:{disabled:t.loading},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],attrs:{label:"CNPJ",prop:"cnpj"}},[a("el-input",{attrs:{disabled:t.loading},model:{value:t.form.cnpj,callback:function(e){t.$set(t.form,"cnpj",e)},expression:"form.cnpj"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"CEP",prop:"cep"}},[a("el-input",{directives:[{name:"mask",rawName:"v-mask",value:"#####-###",expression:"'#####-###'"}],attrs:{disabled:t.loading||t.loading_cep},on:{change:function(e){return t.getCep()}},model:{value:t.form.cep,callback:function(e){t.$set(t.form,"cep",e)},expression:"form.cep"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Estado",prop:"state_id"}},[a("el-select",{attrs:{filterable:"",disabled:t.loading||t.loading_cep||t.loading_cities},on:{change:function(e){return t.getCities(!0)}},model:{value:t.form.state_id,callback:function(e){t.$set(t.form,"state_id",e)},expression:"form.state_id"}},t._l(t.states,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Cidade",prop:"city_id"}},[a("el-select",{attrs:{filterable:"",disabled:t.loading||t.loading_cep||t.loading_cities},model:{value:t.form.city_id,callback:function(e){t.$set(t.form,"city_id",e)},expression:"form.city_id"}},t._l(t.cities,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Bairro",prop:"neighborhood"}},[a("el-input",{attrs:{disabled:t.loading||t.loading_cep},model:{value:t.form.neighborhood,callback:function(e){t.$set(t.form,"neighborhood",e)},expression:"form.neighborhood"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Endereço",prop:"address"}},[a("el-input",{attrs:{disabled:t.loading||t.loading_cep},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:12,sm:24}},[a("el-form-item",{attrs:{label:"Número",prop:"number"}},[a("el-input-number",{attrs:{disabled:t.loading,"controls-position":"right",min:1,max:99999},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:24,sm:24}},[a("el-form-item",[a("router-link",{staticClass:"pull-left",attrs:{to:"/client"}},[a("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),a("el-button",{staticClass:"pull-right",attrs:{size:"mini",loading:t.loading,type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)],1)],1)},r=[],n=(a("7f7f"),a("8615"),a("456d"),a("ac6a"),a("cebc")),i=a("2f62"),l=a("b775");function s(){return Object(l["a"])({url:"/state",method:"get"})}function c(t){return Object(l["a"])({url:"/city/"+t,method:"get"})}function d(t){return Object(l["a"])({url:"/cep/"+t,method:"get"})}var u=a("b39f"),m=a("fcac"),f={data:function(){return{loading:!1,loading_cep:!1,loading_cities:!1,states:[],cities:[],companies:[],form:{company_id:null,title:null,address:null,cep:null,state_id:null,city_id:null,cnpj:null,neighborhood:null,number:null},rules:{company_id:[{required:!0,message:"Campo obrigatório"}],title:[{required:!0,message:"Campo obrigatório"}],address:[{required:!0,message:"Campo obrigatório"}],cep:[{required:!0,message:"Campo obrigatório"}],state_id:[{required:!0,message:"Campo obrigatório"}],city_id:[{required:!0,message:"Campo obrigatório"}],cnpj:[{required:!0,message:"Campo obrigatório"}],neighborhood:[{required:!0,message:"Campo obrigatório"}],number:[{required:!0,message:"Campo obrigatório"}]}}},computed:Object(n["a"])({},Object(i["b"])(["role"])),created:function(){var t=this;s().then(function(e){t.states=e.data.data}),"root"==this.role&&Object(m["c"])().then(function(e){t.companies=e.data.data}),this.$route.params.id&&(this.loading=!0,Object(u["e"])(this.$route.params.id).then(function(e){Object.keys(t.form).forEach(function(a){t.form[a]=e.data.data[a],"state_id"==a&&t.getCities()}),t.loading=!1}))},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate(function(a){a&&(e.loading=!0,Object(u["d"])(e.form,e.$route.params.id).then(function(a){e.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),e.$route.params.id||e.$refs[t].resetFields()}).finally(function(t){e.loading=!1}))})},getCities:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=this;o.loading_cities=!0,c(this.form.state_id).then(function(r){t.cities=r.data.data;var n=t.form;e&&(n.city_id=null,a&&Object.values(t.cities).forEach(function(t){t.name==a&&(n.city_id=t.id)})),o.loading_cities=!1})},getCep:function(){var t=this;t.loading_cep=!0,t.cities=[],t.form.neighborhood=null,t.form.address=null,t.form.state_id=null,t.form.city_id=null,d(this.form.cep).then(function(e){e.data.data&&(t.form.neighborhood=e.data.data.bairro,t.form.address=e.data.data.logradouro,Object.values(t.states).forEach(function(a){a.abbr==e.data.data.uf&&(t.form.state_id=a.id,t.getCities(t.form.state_id,e.data.data.localidade))}))}).finally(function(e){t.loading_cep=!1})}}},p=f,b=a("2877"),g=Object(b["a"])(p,o,r,!1,null,null,null);e["default"]=g.exports},fcac:function(t,e,a){"use strict";a.d(e,"b",function(){return r}),a.d(e,"c",function(){return n}),a.d(e,"e",function(){return i}),a.d(e,"d",function(){return c}),a.d(e,"a",function(){return d});var o=a("b775");function r(t){return Object(o["a"])({url:"/company",method:"get",params:t})}function n(){return Object(o["a"])({url:"/company/all",method:"get"})}function i(t){return Object(o["a"])({url:"/company/"+t,method:"get"})}function l(t){return Object(o["a"])({url:"/company",method:"post",data:t})}function s(t,e){return Object(o["a"])({url:"/company/"+e,method:"put",data:t})}function c(t,e){return e?s(t,e):l(t)}function d(t){return Object(o["a"])({url:"/company/"+t,method:"delete"})}}}]);