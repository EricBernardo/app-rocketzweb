(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13e6a2a9"],{"3d68":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-button",{staticClass:"pull-right m-b-10",attrs:{type:"success",size:"mini",disabled:!this.products.length},on:{click:function(e){return t.addProduct()}}},[t._v("Adicionar produto")]),t._v(" "),o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules},nativeOn:{submit:function(t){t.preventDefault()}}},[o("el-col",{attrs:{md:6,sm:24}},[t.companies.length?o("el-form-item",{staticClass:"order-company",attrs:{label:"Empresas",prop:"company_id"}},[o("el-select",{attrs:{disabled:t.loading,filterable:""},on:{change:function(e){return t.setClientsCompanies()}},model:{value:t.form.company_id,callback:function(e){t.$set(t.form,"company_id",e)},expression:"form.company_id"}},t._l(t.companies,function(t){return o("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1):t._e()],1),t._v(" "),o("el-col",{attrs:{md:6,sm:24}},["root"==this.profile.role||"administrator"==this.profile.role?o("el-form-item",{attrs:{label:"Cliente",prop:"client_id"}},[o("el-select",{attrs:{disabled:t.loading||!this.clients.length,filterable:""},model:{value:t.form.client_id,callback:function(e){t.$set(t.form,"client_id",e)},expression:"form.client_id"}},t._l(t.clients,function(t){return o("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}),1)],1):t._e()],1),t._v(" "),o("el-col",{attrs:{span:24}},[o("el-table",{attrs:{data:t.form.products,"row-key":"id","element-loading-text":"Carregando...",border:"",width:"100%"}},[o("el-table-column",{attrs:{label:"Produto","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-select",{attrs:{filterable:"",disabled:e.row.block},on:{change:function(o){return t.calculateProduct(e.row)}},model:{value:e.row.product_id,callback:function(o){t.$set(e.row,"product_id",o)},expression:"scope.row.product_id"}},t._l(t.products,function(t){return o("el-option",{key:t.id,attrs:{label:(-1===t.title.indexOf(t.category.title)?t.category.title+" - ":"")+t.title,value:t.id}})}),1)]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"Quantidade","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-input-number",{attrs:{change:t.calculateProduct(e.row),min:1,max:100,disabled:e.row.block},model:{value:e.row.quantity,callback:function(o){t.$set(e.row,"quantity",o)},expression:"scope.row.quantity"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"Preço","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("money",{staticClass:"el-input__inner",attrs:{disabled:e.row.block,readonly:!0},model:{value:e.row.total,callback:function(o){t.$set(e.row,"total",o)},expression:"scope.row.total"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"-",width:"120",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return t.removeProduct(e.row)}}},[t._v("Remover")])]}}])})],1)],1),t._v(" "),o("el-col",{attrs:{md:6,sm:24}},[o("el-form-item",{attrs:{label:"Desconto",prop:"discount"}},[o("el-col",{attrs:{md:20,sm:24}},[o("money",{staticClass:"el-input__inner",attrs:{disabled:t.loading},model:{value:t.form.discount,callback:function(e){t.$set(t.form,"discount",e)},expression:"form.discount"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"Pago?",prop:"paid"}},[o("el-switch",{attrs:{disabled:t.loading},model:{value:t.form.paid,callback:function(e){t.$set(t.form,"paid",e)},expression:"form.paid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"Data",prop:"date"}},[o("el-date-picker",{attrs:{disabled:t.loading,format:"dd/MM/yyyy","value-format":"yyyy-MM-dd",type:"date",placeholder:"Data"},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1)],1),t._v(" "),o("el-col",{staticClass:"pull-right",attrs:{md:6,sm:24}},[o("el-form-item",{attrs:{label:"Subtotal",prop:"subtotal"}},[o("money",{staticClass:"el-input__inner",attrs:{readonly:!0},model:{value:t.form.subtotal,callback:function(e){t.$set(t.form,"subtotal",e)},expression:"form.subtotal"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"Total",prop:"total"}},[o("money",{staticClass:"el-input__inner",attrs:{readonly:!0},model:{value:t.form.total,callback:function(e){t.$set(t.form,"total",e)},expression:"form.total"}})],1)],1),t._v(" "),o("el-col",{staticClass:"line",attrs:{span:24}},[o("el-form-item",[o("router-link",{staticClass:"pull-left",attrs:{to:{name:"order"}}},[o("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),o("el-button",{staticClass:"pull-right",attrs:{size:"mini",type:"primary",loading:t.loading||!this.products.length},on:{click:function(e){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)],1)},a=[],n=o("cebc"),i=o("2f62"),c=o("f8b7"),l=o("c4c8"),u=o("b39f"),d=o("fcac"),s={data:function(){return{loading:!1,products:[],clients:[],companies:[],form:{client_id:null,discount:0,products:[],paid:!1,subtotal:0,total:0,date:null},rules:{client_id:[{required:!0,message:"Campo obrigatório"}],date:[{required:!0,message:"Campo obrigatório"}],products:[{required:!0,message:"Campo obrigatório"}]}}},computed:Object(n["a"])({},Object(i["b"])(["profile"])),created:function(){var t=this;this.form;"administrator"==this.profile.role&&Object(u["c"])().then(function(e){t.clients=e.data.data}),"root"==this.profile.role&&Object(d["c"])().then(function(e){t.companies=e.data.data}),"administrator"!=this.profile.role&&"client"!=this.profile.role||Object(l["c"])().then(function(e){t.products=e.data.data}),this.getOrder()},methods:{setClientsCompanies:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if("root"==this.profile.role){var e=this;t&&(e.form.total=0,e.form.subtotal=0,e.clients=[],e.products=[],e.form.products=[]),Object(u["c"])({company_id:e.form.company_id}).then(function(o){t&&(e.form.client_id=null),e.clients=o.data.data}),Object(l["c"])({company_id:e.form.company_id}).then(function(t){e.products=t.data.data})}},getOrder:function(){var t=this;t.$route.params.id?(t.loading=!0,Object(c["d"])(t.$route.params.id).then(function(e){t.form.products=[],e.data.data.products.map(function(e){t.form.products.push({id:e.pivot.id,product_id:e.id,quantity:e.pivot.quantity,price:e.pivot.price,total:e.pivot.price*e.pivot.quantity,block:!0})}),t.form.client_id=e.data.data.client.id,t.form.company_id=e.data.data.client.company.id,t.form.discount=e.data.data.discount,t.form.paid=!!e.data.data.paid,t.form.subtotal=e.data.data.subtotal,t.form.total=e.data.data.total,t.form.date=e.data.data.date,t.setClientsCompanies(!1),t.loading=!1})):t.form.date=t.$moment().format("YYYY-MM-DD")},calculateProduct:function(t){if(!t.block){var e=0;this.products.map(function(o){o.id==t.product_id&&(e=o.price)}),t.price=e,t.total=t.quantity*t.price}this.calculateOrder()},calculateOrder:function(){var t=0,e=this.form;e.subtotal=0,e.total=0,e.products.map(function(e){t+=e.total}),e.discount=Math.abs(e.discount),e.subtotal=t,e.total=t-e.discount},addProduct:function(){if(this.products.length){var t=this.products[0];this.form.products.push({product_id:t.id,quantity:1,price:t.price,total:t.price,block:!1})}else this.$message({message:"Produto não encontrado",type:"error",duration:5e3})},removeProduct:function(t){var e=this.form.products.indexOf(t);e>-1&&(this.form.total-=this.form.products.price,this.form.subtotal-=this.form.products.price,this.form.products.splice(e,1))},onSubmit:function(t){var e=this;this.$refs[t].validate(function(o){if(o){e.loading=!0;var r=e.form;Object(c["c"])(r,e.$route.params.id).then(function(o){e.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),e.$route.params.id||(e.$refs[t].resetFields(),e.form.products=[]),e.getOrder()}).finally(function(t){e.loading=!1})}})}}},f=s,m=o("2877"),p=Object(m["a"])(f,r,a,!1,null,null,null);e["default"]=p.exports},b39f:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"e",function(){return i}),o.d(e,"d",function(){return u}),o.d(e,"a",function(){return d});var r=o("b775");function a(t){return Object(r["a"])({url:"/client",method:"get",params:t})}function n(t){return Object(r["a"])({url:"/client/all",method:"get",params:t})}function i(t){return Object(r["a"])({url:"/client/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/client",method:"post",data:t})}function l(t,e){return Object(r["a"])({url:"/client/"+e,method:"put",data:t})}function u(t,e){return e?l(t,e):c(t)}function d(t){return Object(r["a"])({url:"/client/"+t,method:"delete"})}},c4c8:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"e",function(){return i}),o.d(e,"d",function(){return u}),o.d(e,"a",function(){return d});var r=o("b775");function a(t){return Object(r["a"])({url:"/product",method:"get",params:t})}function n(t){return Object(r["a"])({url:"/product/all",method:"get",params:t})}function i(t){return Object(r["a"])({url:"/product/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/product",method:"post",data:t})}function l(t,e){return Object(r["a"])({url:"/product/"+e,method:"put",data:t})}function u(t,e){return e?l(t,e):c(t)}function d(t){return Object(r["a"])({url:"/product/"+t,method:"delete"})}},f8b7:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"d",function(){return n}),o.d(e,"c",function(){return l}),o.d(e,"a",function(){return u});var r=o("b775");function a(t){return Object(r["a"])({url:"/order",method:"get",params:t})}function n(t){return Object(r["a"])({url:"/order/"+t,method:"get"})}function i(t){return Object(r["a"])({url:"/order",method:"post",data:t})}function c(t,e){return Object(r["a"])({url:"/order/"+e,method:"put",data:t})}function l(t,e){return e?c(t,e):i(t)}function u(t){return Object(r["a"])({url:"/order/"+t,method:"delete"})}},fcac:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"e",function(){return i}),o.d(e,"d",function(){return u}),o.d(e,"a",function(){return d});var r=o("b775");function a(t){return Object(r["a"])({url:"/company",method:"get",params:t})}function n(){return Object(r["a"])({url:"/company/all",method:"get"})}function i(t){return Object(r["a"])({url:"/company/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/company",method:"post",data:t})}function l(t,e){return Object(r["a"])({url:"/company/"+e,method:"put",data:t})}function u(t,e){return e?l(t,e):c(t)}function d(t){return Object(r["a"])({url:"/company/"+t,method:"delete"})}}}]);