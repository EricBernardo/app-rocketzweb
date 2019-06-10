(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d767a53"],{"3d68":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container"},[o("el-button",{staticClass:"pull-right m-b-10",attrs:{type:"success",size:"mini",loading:!this.products.length},on:{click:function(e){return t.addProduct()}}},[t._v("Adicionar produto")]),t._v(" "),o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules},nativeOn:{submit:function(t){t.preventDefault()}}},[o("el-col",{attrs:{md:6,sm:24}},[t.clients.length?o("el-form-item",{attrs:{label:"Cliente",prop:"client_id"}},[o("el-select",{attrs:{disabled:t.loading,filterable:""},model:{value:t.form.client_id,callback:function(e){t.$set(t.form,"client_id",e)},expression:"form.client_id"}},t._l(t.clients,function(e){return o("el-option",{key:e.id,attrs:{label:("root"==t.profile.role?e.company.title+" - ":"")+e.title,value:e.id}})}),1)],1):t._e()],1),t._v(" "),o("el-col",{attrs:{span:24}},[o("el-table",{attrs:{data:t.form.products,"row-key":"id","element-loading-text":"Carregando...",border:"",width:"100%"}},[o("el-table-column",{attrs:{label:"Produto","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-select",{attrs:{filterable:"",disabled:e.row.block},on:{change:function(o){return t.calculateProduct(e.row)}},model:{value:e.row.product_id,callback:function(o){t.$set(e.row,"product_id",o)},expression:"scope.row.product_id"}},t._l(t.products,function(e){return o("el-option",{key:e.id,attrs:{label:("root"==t.profile.role?e.category.company.title+" - ":"")+(-1===e.title.indexOf(e.category.title)?e.category.title+" - ":"")+e.title,value:e.id}})}),1)]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"Quantidade","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-input-number",{attrs:{change:t.calculateProduct(e.row),min:1,max:100,disabled:e.row.block},model:{value:e.row.quantity,callback:function(o){t.$set(e.row,"quantity",o)},expression:"scope.row.quantity"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"Preço","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("money",{staticClass:"el-input__inner",attrs:{disabled:e.row.block,readonly:!0},model:{value:e.row.total,callback:function(o){t.$set(e.row,"total",o)},expression:"scope.row.total"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"-",width:"120",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return t.removeProduct(e.row)}}},[t._v("Remover")])]}}])})],1)],1),t._v(" "),o("el-col",{attrs:{md:6,sm:24}},[o("el-form-item",{attrs:{label:"Desconto",prop:"discount"}},[o("el-col",{attrs:{md:20,sm:24}},[o("money",{staticClass:"el-input__inner",attrs:{disabled:t.loading},model:{value:t.form.discount,callback:function(e){t.$set(t.form,"discount",e)},expression:"form.discount"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"Pago?",prop:"paid"}},[o("el-switch",{attrs:{disabled:t.loading},model:{value:t.form.paid,callback:function(e){t.$set(t.form,"paid",e)},expression:"form.paid"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"Data",prop:"date"}},[o("el-date-picker",{attrs:{disabled:t.loading,format:"dd/MM/yyyy","value-format":"yyyy-MM-dd",type:"date",placeholder:"Data"},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1)],1),t._v(" "),o("el-col",{staticClass:"pull-right",attrs:{md:6,sm:24}},[o("el-form-item",{attrs:{label:"Subtotal",prop:"subtotal"}},[o("money",{staticClass:"el-input__inner",attrs:{readonly:!0},model:{value:t.form.subtotal,callback:function(e){t.$set(t.form,"subtotal",e)},expression:"form.subtotal"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"Total",prop:"total"}},[o("money",{staticClass:"el-input__inner",attrs:{readonly:!0},model:{value:t.form.total,callback:function(e){t.$set(t.form,"total",e)},expression:"form.total"}})],1)],1),t._v(" "),o("el-col",{staticClass:"line",attrs:{span:24}},[o("el-form-item",[o("router-link",{staticClass:"pull-left",attrs:{to:{name:"order"}}},[o("el-button",{attrs:{size:"mini"}},[t._v("Voltar")])],1),t._v(" "),o("el-button",{staticClass:"pull-right",attrs:{size:"mini",type:"primary",loading:t.loading||!this.products.length},on:{click:function(e){return t.onSubmit("form")}}},[t._v("Salvar")])],1)],1)],1)],1)},a=[],n=(o("8615"),o("ac6a"),o("cebc")),i=o("2f62"),l=o("f8b7"),c=o("c4c8"),u=o("b39f"),s={data:function(){return{loading:!1,products:[],clients:[],form:{client_id:null,discount:0,products:[],paid:!1,subtotal:0,total:0,date:null},rules:{client_id:[{required:!0,message:"Campo obrigatório"}],date:[{required:!0,message:"Campo obrigatório"}],products:[{required:!0,message:"Campo obrigatório"}]}}},computed:Object(n["a"])({},Object(i["b"])(["profile"])),created:function(){var t=this;this.form;"root"!=this.profile.role&&"administrator"!=this.profile.role||Object(u["c"])().then(function(e){t.clients=e.data.data}),Object(c["c"])().then(function(e){t.products=e.data.data}),this.getOrder()},methods:{getOrder:function(){var t=this,e=this.form;this.$route.params.id?(this.loading=!0,Object(l["d"])(this.$route.params.id).then(function(o){e.products=[],Object.values(o.data.products).forEach(function(t){e.products.push({id:t.pivot.id,product_id:t.id,quantity:t.pivot.quantity,price:t.pivot.price,total:t.pivot.price*t.pivot.quantity,block:!0})}),e.client_id=o.data.client_id,e.discount=o.data.discount,e.paid=!!o.data.paid,e.subtotal=o.data.subtotal,e.total=o.data.total,e.date=o.data.date,t.loading=!1})):this.form.date=this.$moment().format("YYYY-MM-DD")},calculateProduct:function(t){if(!t.block){var e=0;Object.values(this.products).forEach(function(o){o.id==t.product_id&&(e=o.price)}),t.price=e,t.total=t.quantity*t.price}this.calculateOrder()},calculateOrder:function(){var t=0,e=this.form;e.subtotal=0,e.total=0,Object.values(e.products).forEach(function(e){t+=e.total}),e.discount=Math.abs(e.discount),e.subtotal=t,e.total=t-e.discount},addProduct:function(){if(this.products.length){var t=this.products[0];this.form.products.push({product_id:t.id,quantity:1,price:t.price,total:t.price,block:!1})}else this.$message({message:"Produto não encontrado",type:"error",duration:5e3})},removeProduct:function(t){var e=this.form.products.indexOf(t);e>-1&&(this.form.total-=this.form.products.price,this.form.subtotal-=this.form.products.price,this.form.products.splice(e,1))},onSubmit:function(t){var e=this;this.$refs[t].validate(function(o){if(o){e.loading=!0;var r=e.form;Object(l["c"])(r,e.$route.params.id).then(function(o){e.$message({message:"Salvo com sucesso",type:"success",duration:5e3}),e.$route.params.id||(e.$refs[t].resetFields(),e.form.products=[]),e.getOrder()}).finally(function(t){e.loading=!1})}})}}},d=s,f=o("2877"),m=Object(f["a"])(d,r,a,!1,null,null,null);e["default"]=m.exports},b39f:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"e",function(){return i}),o.d(e,"d",function(){return u}),o.d(e,"a",function(){return s});var r=o("b775");function a(t){return Object(r["a"])({url:"/client",method:"get",params:t})}function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/client/all",method:"get",params:t})}function i(t){return Object(r["a"])({url:"/client/"+t,method:"get"})}function l(t){return Object(r["a"])({url:"/client",method:"post",data:t})}function c(t,e){return Object(r["a"])({url:"/client/"+e,method:"put",data:t})}function u(t,e){return e?c(t,e):l(t)}function s(t){return Object(r["a"])({url:"/client/"+t,method:"delete"})}},c4c8:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"c",function(){return n}),o.d(e,"e",function(){return i}),o.d(e,"d",function(){return u}),o.d(e,"a",function(){return s});var r=o("b775");function a(t){return Object(r["a"])({url:"/product",method:"get",params:t})}function n(){return Object(r["a"])({url:"/product/all",method:"get"})}function i(t){return Object(r["a"])({url:"/product/"+t,method:"get"})}function l(t){return Object(r["a"])({url:"/product",method:"post",data:t})}function c(t,e){return Object(r["a"])({url:"/product/"+e,method:"put",data:t})}function u(t,e){return e?c(t,e):l(t)}function s(t){return Object(r["a"])({url:"/product/"+t,method:"delete"})}},f8b7:function(t,e,o){"use strict";o.d(e,"b",function(){return a}),o.d(e,"d",function(){return n}),o.d(e,"c",function(){return c}),o.d(e,"a",function(){return u});var r=o("b775");function a(t){return Object(r["a"])({url:"/order",method:"get",params:t})}function n(t){return Object(r["a"])({url:"/order/"+t,method:"get"})}function i(t){return Object(r["a"])({url:"/order",method:"post",data:t})}function l(t,e){return Object(r["a"])({url:"/order/"+e,method:"put",data:t})}function c(t,e){return e?l(t,e):i(t)}function u(t){return Object(r["a"])({url:"/order/"+t,method:"delete"})}}}]);