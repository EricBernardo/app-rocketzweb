(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd7c3382"],{"5c71":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container"},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-row",{attrs:{gutter:10}},[r("el-col",{attrs:{md:12,sm:24}},[e.rolesUser.length?r("el-form-item",{attrs:{label:"Papel",prop:"role"}},[r("el-select",{attrs:{filterable:"",disabled:e.loading,placeholder:"Select"},on:{change:function(t){return e.getAllClients()}},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},e._l(e.rolesUser,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1):e._e()],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},[!e.companies.length||"administrator"!=this.form.role&&"client"!=this.form.role?e._e():r("el-form-item",{attrs:{label:"Empresa",prop:"company_id"}},[r("el-select",{attrs:{filterable:"",disabled:e.loading},on:{change:function(t){return e.getAllClients()}},model:{value:e.form.company_id,callback:function(t){e.$set(e.form,"company_id",t)},expression:"form.company_id"}},e._l(e.companies,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1)],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},["client"==this.form.role?r("el-form-item",{attrs:{label:"Cliente",prop:"client_id"}},[r("el-select",{attrs:{filterable:"",disabled:e.loading||!e.clients.length},model:{value:e.form.client_id,callback:function(t){e.$set(e.form,"client_id",t)},expression:"form.client_id"}},e._l(e.clients,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1):e._e()],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},[r("el-form-item",{attrs:{label:"Nome",prop:"name"}},[r("el-input",{attrs:{disabled:e.loading},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},[r("el-form-item",{attrs:{label:"E-mail",prop:"email"}},[r("el-input",{attrs:{disabled:e.loading},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},[r("el-form-item",{attrs:{label:"Senha",prop:"password"}},[r("el-input",{attrs:{type:"password",disabled:e.loading},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:12,sm:24}},[r("el-form-item",{attrs:{label:"Confirmar senha",prop:"password_confirmation"}},[r("el-input",{attrs:{type:"password",disabled:e.loading},model:{value:e.form.password_confirmation,callback:function(t){e.$set(e.form,"password_confirmation",t)},expression:"form.password_confirmation"}})],1)],1),e._v(" "),r("el-col",{attrs:{md:24,sm:24}},[r("el-form-item",[r("router-link",{staticClass:"pull-left",attrs:{to:{name:"user"}}},[r("el-button",{attrs:{size:"mini"}},[e._v("Voltar")])],1),e._v(" "),r("el-button",{staticClass:"pull-right",attrs:{size:"mini",loading:e.loading,type:"primary"},on:{click:function(t){return e.onSubmit("form")}}},[e._v("Salvar")])],1)],1)],1)],1)],1)},a=[],o=r("a4bb"),l=r.n(o),i=(r("ac6a"),r("cebc")),s=r("2f62"),c=r("fcac"),m=r("b39f"),u=r("c24f"),d={data:function(){var e=this;return{companies:[],clients:[],rolesUser:[{value:"administrator",label:"Administrador"},{value:"client",label:"Cliente"}],loading:!1,form:{name:null,email:null,password:null,password_confirmation:null,role:null,client_id:null,company_id:null},rules:{name:[{required:!0,message:"Campo obrigatório"}],email:[{required:!0,message:"E-mail inválido",type:"email"}],password:[{required:!this.$route.params.id,min:8,message:"Campo deve conter no mínimo 8 caracteres"}],role:[{required:!0,message:"Campo obrigatório"}],password_confirmation:[{validator:function(t,r,n){e.form.password&&r!==e.form.password?n(new Error("As senhas não combinam!")):n()},trigger:"blur"}],company_id:[{required:!0,message:"Campo obrigatório"}],client_id:[{required:!0,message:"Campo obrigatório"}]}}},computed:Object(i["a"])({},Object(s["b"])(["profile"])),created:function(){var e=this;"root"==this.profile.role&&(this.rolesUser.push({value:"root",label:"Root"}),Object(c["c"])().then(function(t){e.companies=t.data.data})),"administrator"==this.profile.role&&Object(m["c"])().then(function(t){e.clients=t.data.data}),this.getUser()},methods:{getAllClients:function(){var e=this;e.clients=[],e.form.company_id&&Object(m["c"])({company_id:e.form.company_id}).then(function(t){e.form.client_id=null,e.clients=t.data.data})},getUser:function(){var e=this;this.$route.params.id&&(this.loading=!0,Object(u["g"])(this.$route.params.id).then(function(t){l()(e.form).forEach(function(r){e.form[r]=t.data.data[r]}),Object(m["c"])({company_id:e.form.company_id}).then(function(t){e.clients=t.data.data}),e.loading=!1}))},onSubmit:function(e){var t=this;this.$refs[e].validate(function(r){r&&(t.loading=!0,Object(u["e"])(t.form,t.$route.params.id).then(function(r){t.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),t.$route.params.id||t.$refs[e].resetFields()}).finally(function(e){t.loading=!1}))})}}},f=d,p=r("2877"),b=Object(p["a"])(f,n,a,!1,null,null,null);t["default"]=b.exports},b39f:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"c",function(){return o}),r.d(t,"e",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"a",function(){return m});var n=r("b775");function a(e){return Object(n["a"])({url:"/client",method:"get",params:e})}function o(e){return Object(n["a"])({url:"/client/all",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/client/"+e,method:"get"})}function i(e){return Object(n["a"])({url:"/client",method:"post",data:e})}function s(e,t){return Object(n["a"])({url:"/client/"+t,method:"put",data:e})}function c(e,t){return t?s(e,t):i(e)}function m(e){return Object(n["a"])({url:"/client/"+e,method:"delete"})}},fcac:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"c",function(){return o}),r.d(t,"e",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"a",function(){return m});var n=r("b775");function a(e){return Object(n["a"])({url:"/company",method:"get",params:e})}function o(){return Object(n["a"])({url:"/company/all",method:"get"})}function l(e){return Object(n["a"])({url:"/company/"+e,method:"get"})}function i(e){return Object(n["a"])({url:"/company",method:"post",data:e})}function s(e,t){return Object(n["a"])({url:"/company/"+t,method:"put",data:e})}function c(e,t){return t?s(e,t):i(e)}function m(e){return Object(n["a"])({url:"/company/"+e,method:"delete"})}}}]);