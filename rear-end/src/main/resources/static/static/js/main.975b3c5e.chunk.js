(this["webpackJsonplearning-to-do-dome"]=this["webpackJsonplearning-to-do-dome"]||[]).push([[0],{280:function(e,t,s){},517:function(e,t,s){},618:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s(23),i=s.n(n),c=(s(280),s(3)),r=s(7),o=s(189),l=s(79),d=s.n(l),u=(s(517),s(621)),m=s(214),j=s(213),h=s(623),b=s(622),O=s(211),f=s(123),p=s.n(f),g=s(27),x=s(16),v=Object(g.e)((function(e){var t=u.a.useForm(),s=Object(r.a)(t,1)[0],n=Object(a.useState)(!1),i=Object(r.a)(n,2),l=i[0],f=i[1],g=Object(a.useState)(null),v=Object(r.a)(g,2),N=v[0],w=v[1],I=Object(a.useState)({domain:"",authCode:"",userName:"",showNewRole:!0,showToDoForm:!1,roleList:[],ids:[],roles:[],finish:!1,bizId:""}),y=Object(r.a)(I,2),C=y[0],T=y[1],D=function(){d.a.get(C.domain+"/role/list").then((function(e){var t=JSON.parse(e.data.data.body);T(Object(c.a)(Object(c.a)({},C),{},{roleList:t.result.list,showNewRole:!0,showToDoForm:!1}))})).catch((function(e){alert(JSON.stringify(e))}))},S=function(e){var t=e.target.name,s=C.ids.indexOf(t);if(-1===s){var a=C.ids.slice(0);a.push(e.target.name);var n=C.roles.slice(0);n.push(e.target.value),T(Object(c.a)(Object(c.a)({},C),{},{ids:a,roles:n}))}else{var i=C.ids.slice(0),r=C.roles.slice(0);i.splice(s,1),r.splice(s,1),T(Object(c.a)(Object(c.a)({},C),{},{ids:i,roles:r}))}};function F(e){for(var t=window.location.search,s=t?t.substr(1).split("&"):[],a={},n=0,i=s.length;n<i;n++){var c=s[n].split("=");a[c[0]]=c[1]}return e?a[e]||"":a}var Y=function(){C.finish?m.b.success("\u5df2\u5b8c\u6210"):d.a.post(C.domain+"/learnToDo/update",{userId:sessionStorage.getItem("userId"),bizId:C.bizId},{headers:{"Content-Type":"application/json"}}).then((function(e){m.b.success("\u5b8c\u6210\u5b66\u4e60"),T(Object(c.a)(Object(c.a)({},C),{},{finish:!0}))})).catch((function(e){alert(JSON.stringify(e))}))};Object(a.useEffect)((function(){d.a.get(C.domain+"/getCorpId").then((function(e){var t;e.data&&(t=e.data,o.runtime.permission.requestAuthCode({corpId:t,onSuccess:function(e){C.authCode=e.code,d.a.get(C.domain+"/login?authCode="+C.authCode).then((function(e){if(e&&e.data.success){var t=e.data.data.userId;sessionStorage.setItem("userId",t);var s=e.data.data.userName;m.b.success("\u767b\u5f55\u6210\u529f\uff0c\u4f60\u597d"+s),T(Object(c.a)(Object(c.a)({},C),{},{userName:s})),setTimeout((function(){D()}),0)}else m.b.error(e.data.errorMsg)})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},onFail:function(e){alert("requestAuthCode failed ---\x3e"+JSON.stringify(e))}}))})).catch((function(e){alert("corpId err, "+JSON.stringify(e))})),s.setFieldsValue({title:"\u5b66\u4e60\u4efb\u52a1\u5f85\u529e",url:"/toLearn",createTime:"2021-06-30 15:00:00",formTitle:"\u5b66\u4e60\u6807\u9898",formContent:"\u5b66\u4e60\u5185\u5bb9"})}),[]);var J=new Date;return Object(x.jsxs)("div",{className:"content",children:[Object(x.jsxs)("div",{className:"header",children:[Object(x.jsx)("img",{src:"https://img.alicdn.com/imgextra/i3/O1CN01Mpftes1gwqxuL0ZQE_!!6000000004207-2-tps-240-240.png",className:"headImg"}),"\u9489\u9489\u6a21\u677f"]}),e.location.search?Object(x.jsx)("div",{className:"App",children:(""===C.bizId&&function(){var e=F("bizId"),t=F("id");sessionStorage.setItem("userId",t),T(Object(c.a)(Object(c.a)({},C),{},{bizId:e}))}(),C.finish?Object(x.jsx)("div",{className:"finishOrLearn",children:"\u5df2\u5b8c\u6210"}):Object(x.jsxs)("div",{className:"finishOrLearn",children:[Object(x.jsx)("p",{children:"\u5b66\u4e60\u4e2d\u3002\u3002\u3002"}),Object(x.jsx)("br",{}),Object(x.jsx)(j.a,{type:"primary",onClick:Y,children:"\u5b8c\u6210\u5b66\u4e60"})]}))}):Object(x.jsx)("div",{className:"App",children:Object(x.jsxs)("div",{className:"padding",children:[Object(x.jsx)("h5",{className:"title",children:C.showNewRole?"\u89d2\u8272\u5217\u8868":C.showToDoForm?"\u5b66\u4e60\u4efb\u52a1\u5f85\u529e\u89d2\u8272\uff1a".concat(C.roles):void 0}),C.showNewRole&&Object(x.jsxs)("div",{children:[C.roleList.map((function(e,t){return Object(x.jsx)("div",{className:"checkbox",children:e.roles.map((function(e,t){return Object(x.jsxs)("div",{className:"check",children:[Object(x.jsx)(h.a,{name:e.id,value:e.name,onChange:S,children:e.name}),Object(x.jsx)("br",{})]})}))})})),C.ids.length>0&&Object(x.jsx)(j.a,{type:"primary",onClick:function(){C.ids.length&&T(Object(c.a)(Object(c.a)({},C),{},{showToDoForm:!0,showNewRole:!1}))},children:"\u521b\u5efa\u5f85\u529e\u5b66\u4e60\u4efb\u52a1"})]}),C.showToDoForm&&Object(x.jsx)("div",{className:"padding",children:Object(x.jsxs)(u.a,{form:s,onFinish:function(e){e.ids=C.ids,e.origin=window.location.origin,e.url=origin+e.url,e.createTime=p()(e.createTime).format("YYYY-MM-DD HH:mm"),d.a.post(C.domain+"/learnToDo/new",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(e){e.data.success?(m.b.success("\u521b\u5efa\u5b66\u4e60\u4efb\u52a1\u5f85\u529e\u6210\u529f\uff01"),T(Object(c.a)(Object(c.a)({},C),{},{showNewRole:!0,showToDoForm:!1,ids:[],roles:[]}))):m.b.error("\u521b\u5efa\u5b66\u4e60\u4efb\u52a1\u5f85\u529e\u5931\u8d25\uff01")})).catch((function(e){alert(JSON.stringify(e))}))},children:[Object(x.jsx)(u.a.Item,{label:"\u4efb\u52a1\u6807\u9898",name:"title",rules:[{required:!0,message:"\u4efb\u52a1\u6807\u9898\u5fc5\u586b"}],children:Object(x.jsx)(b.a,{placeholder:"\u8bf7\u8f93\u5165\u6807\u9898"})}),Object(x.jsx)(u.a.Item,{label:"\u4efb\u52a1\u94fe\u63a5",name:"url",rules:[{required:!0,message:"\u4efb\u52a1\u94fe\u63a5\u5fc5\u586b"}],children:Object(x.jsx)(b.a,{placeholder:"\u8bf7\u8f93\u5165\u4efb\u52a1\u94fe\u63a5"})}),Object(x.jsxs)(u.a.Item,{label:"\u5f85\u529e\u65f6\u95f4",name:"createTime",rules:[{required:!0,message:"\u5f85\u529e\u65f6\u95f4\u5fc5\u9009"}],children:[Object(x.jsx)(j.a,{type:"primary",onClick:function(){return f(!0)},style:{marginRight:"12px"},children:N?"\u5df2\u9009\u62e9\u5f85\u529e\u65f6\u95f4":"\u9009\u62e9\u5f85\u529e\u65f6\u95f4"}),Object(x.jsx)(O.a,{visible:l,onClose:function(){f(!1)},min:new Date(J.setHours(J.getHours())),precision:"minute",onConfirm:function(e,t){w(e),s.setFieldsValue({createTime:e})},children:function(e){return e?p()(e).format("YYYY-MM-DD HH:mm"):p()(J).format("YYYY-MM-DD HH:mm")}})]}),Object(x.jsx)(u.a.Item,{label:"\u5b66\u4e60\u6807\u9898",name:"formTitle",rules:[{required:!0,message:"\u5b66\u4e60\u6807\u9898\u5fc5\u586b"}],children:Object(x.jsx)(b.a,{placeholder:"\u8bf7\u8f93\u5165\u5b66\u4e60\u6807\u9898"})}),Object(x.jsx)(u.a.Item,{label:"\u5b66\u4e60\u5185\u5bb9",name:"formContent",rules:[{required:!0,message:"\u5b66\u4e60\u5185\u5bb9\u5fc5\u586b"}],children:Object(x.jsx)(b.a,{placeholder:"\u8bf7\u8f93\u5165\u5b66\u4e60\u5185\u5bb9"})}),Object(x.jsx)(j.a,{htmlType:"submit",type:"primary",children:"\u63d0\u4ea4"})]})})]})})]})})),N=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,624)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,c=t.getTTFB;s(e),a(e),n(e),i(e),c(e)}))},w=(s(617),s(142));i.a.render(Object(x.jsx)(w.a,{basename:"/",children:Object(x.jsx)(g.a,{path:"/",component:v})}),document.getElementById("root")),N()}},[[618,1,2]]]);
//# sourceMappingURL=main.975b3c5e.chunk.js.map