(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75d32418"],{"452a":function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"c",function(){return o}),n.d(e,"e",function(){return i}),n.d(e,"d",function(){return s}),n.d(e,"a",function(){return l});var a=n("b775");function r(t){return Object(a["a"])({url:"/product_category",method:"get",params:t})}function o(){return Object(a["a"])({url:"/product_category/all",method:"get"})}function i(t){return Object(a["a"])({url:"/product_category/"+t,method:"get"})}function u(t){return Object(a["a"])({url:"/product_category",method:"post",data:t})}function c(t,e){return Object(a["a"])({url:"/product_category/"+e,method:"put",data:t})}function s(t,e){return e?c(t,e):u(t)}function l(t){return Object(a["a"])({url:"/product_category/"+t,method:"delete"})}},8119:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("router-link",{attrs:{to:{name:"product_category.create"}}},[n("el-button",{staticClass:"pull-right m-b-10",attrs:{type:"success",size:"mini"}},[t._v("Cadastrar")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list.data,"element-loading-text":"Carregando...",border:""}},[n("el-table-column",{attrs:{label:"Título"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.title))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"-"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{name:"product_category.edit",params:{id:e.row.id}}}},[n("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("Editar")])],1),t._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return n.preventDefault(),t.destroyData(e.row.id)}}},[t._v("Excluir")])]}}])})],1),t._v(" "),n("pagination",{attrs:{data:t.list},on:{"pagination-change-page":t.fetchData}},[n("span",{attrs:{slot:"prev-nav"},slot:"prev-nav"},[t._v("Anterior")]),t._v(" "),n("span",{attrs:{slot:"next-nav"},slot:"next-nav"},[t._v("Próximo")])])],1)},r=[],o=n("452a"),i={filters:{statusFilter:function(t){var e={published:"success",draft:"gray",deleted:"danger"};return e[t]}},data:function(){return{list:{},listLoading:!1}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.listLoading=!0;var n={page:e};Object(o["b"])(n).then(function(e){t.list=e.data,t.listLoading=!1})},destroyData:function(t){var e=this;this.$confirm("Desejas realmente excluir esse registro?","Atenção",{confirmButtonText:"Confirmar",cancelButtonText:"Cancelar",type:"warning"}).then(function(){Object(o["a"])(t).then(function(t){e.fetchData()})}).catch(function(){})}}},u=i,c=n("2877"),s=Object(c["a"])(u,a,r,!1,null,null,null);e["default"]=s.exports}}]);