(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-076201f1"],{bb31:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("router-link",{attrs:{to:{name:"product.create"}}},[n("el-button",{staticClass:"pull-right m-b-10",attrs:{type:"success",size:"mini"}},[t._v("Cadastrar")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list.data,"element-loading-text":"Carregando...",border:""}},["root"==t.role?n("el-table-column",{attrs:{label:"Empresa"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.category.company?e.row.category.company.title:""))]}}],null,!1,1359602358)}):t._e(),t._v(" "),n("el-table-column",{attrs:{label:"Categoria"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.category?e.row.category.title:""))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Título"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.title))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Preço"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("R$ "+t._s(e.row.price))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"-"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{name:"product.edit",params:{id:e.row.id}}}},[n("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("Editar")])],1),t._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return n.preventDefault(),t.destroyData(e.row.id)}}},[t._v("Excluir")])]}}])})],1),t._v(" "),n("pagination",{attrs:{data:t.list},on:{"pagination-change-page":t.fetchData}},[n("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[t._v("Anterior")]),t._v(" "),n("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[t._v("Próximo")])])],1)},a=[],o=n("cebc"),u=n("2f62"),c=n("c4c8"),i={filters:{statusFilter:function(t){var e={published:"success",draft:"gray",deleted:"danger"};return e[t]}},data:function(){return{list:{},listLoading:!1}},computed:Object(o["a"])({},Object(u["b"])(["role"])),created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.listLoading=!0;var n={page:e};Object(c["b"])(n).then(function(e){t.list=e.data,t.listLoading=!1})},destroyData:function(t){var e=this;this.$confirm("Desejas realmente excluir esse registro?","Atenção",{confirmButtonText:"Confirmar",cancelButtonText:"Cancelar",type:"warning"}).then(function(){Object(c["a"])(t).then(function(t){e.fetchData()})}).catch(function(){})}}},l=i,s=n("2877"),d=Object(s["a"])(l,r,a,!1,null,null,null);e["default"]=d.exports},c4c8:function(t,e,n){"use strict";n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"e",function(){return u}),n.d(e,"d",function(){return l}),n.d(e,"a",function(){return s});var r=n("b775");function a(t){return Object(r["a"])({url:"/product",method:"get",params:t})}function o(){return Object(r["a"])({url:"/product/all",method:"get"})}function u(t){return Object(r["a"])({url:"/product/"+t,method:"get"})}function c(t){return Object(r["a"])({url:"/product",method:"post",data:t})}function i(t,e){return Object(r["a"])({url:"/product/"+e,method:"put",data:t})}function l(t,e){return e?i(t,e):c(t)}function s(t){return Object(r["a"])({url:"/product/"+t,method:"delete"})}}}]);