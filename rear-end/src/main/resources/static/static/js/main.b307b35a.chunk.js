(this["webpackJsonplearning-to-do-dome"]=this["webpackJsonplearning-to-do-dome"]||[]).push([[0],{285:function(e,t,s){},294:function(e,t,s){"use strict";s.r(t);var n=s(2),i=s.n(n),o=s(37),a=s.n(o),r=(s(48),s(38)),c=s(39),l=s(43),h=s(42),d=s(40),u=s(13),j=s.n(u),m=(s(285),s(4)),f=s(1);function b(e){return e.showLogin?Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"button",onClick:e.onClick,children:" \u70b9\u51fb\u767b\u5f55"})}):Object(f.jsx)("div",{})}function v(e){return e.showRoleList?Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"button",onClick:e.onClick,children:" \u67e5\u770b\u7528\u6237\u7ec4"})}):Object(f.jsx)("div",{})}function O(e){if(e.showNewRole){var t=e.roleList.map((function(t,s){var n=t.roles.map((function(t,s){return Object(f.jsxs)("span",{children:[Object(f.jsx)("input",{type:"checkbox",name:t.id,value:t.name,onChange:e.onChange}),Object(f.jsx)("text",{children:t.name})]},t.id)}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{children:t.name}),Object(f.jsx)("div",{children:n})]},s)}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{type:"button",onClick:e.onClick,children:"\u521b\u5efa\u5f85\u529e\u5b66\u4e60\u4efb\u52a1"}),t]})}return Object(f.jsx)("div",{})}function x(e){return e.showToDoForm?Object(f.jsxs)("div",{children:["\u5b66\u4e60\u4efb\u52a1",Object(f.jsxs)("text",{children:["\u4ee3\u529e\u4eba\uff1a",e.roles]}),Object(f.jsxs)("div",{className:"page-section",children:[Object(f.jsxs)("div",{className:"form-row",children:[Object(f.jsx)("div",{className:"form-row-label",children:"\u4efb\u52a1\u6807\u9898"}),Object(f.jsx)("div",{className:"form-row-content",children:Object(f.jsx)("input",{name:"title",className:"input",placeholder:"\u8f93\u5165\u6807\u9898",value:e.form.title,onChange:e.onChange})})]}),Object(f.jsx)("div",{className:"form-line"}),Object(f.jsxs)("div",{className:"form-row",children:[Object(f.jsx)("div",{className:"form-row-label",children:"\u4efb\u52a1\u94fe\u63a5"}),Object(f.jsx)("div",{className:"form-row-content",children:Object(f.jsx)("input",{name:"url",className:"input",placeholder:"\u8f93\u5165\u4efb\u52a1\u94fe\u63a5",value:e.form.url,onChange:e.onChange})})]}),Object(f.jsx)("div",{className:"form-line"}),Object(f.jsxs)("div",{className:"form-row",children:[Object(f.jsx)("div",{className:"form-row-label",children:"\u5f85\u529e\u65f6\u95f4"}),Object(f.jsx)("div",{className:"form-row-content",children:Object(f.jsx)("input",{name:"createTime",className:"input",placeholder:"\u8f93\u5165\u683c\u5f0f\uff1ayyyy-MM-dd hh:mm:ss",value:e.form.createTime,onChange:e.onChange})})]})]}),Object(f.jsxs)("div",{className:"page-section",children:[Object(f.jsxs)("div",{className:"form-row",children:[Object(f.jsx)("div",{className:"form-row-label",children:"\u5b66\u4e60\u6807\u9898"}),Object(f.jsx)("div",{className:"form-row-content",children:Object(f.jsx)("input",{name:"formTitle",className:"input",placeholder:"\u8f93\u5165\u5b66\u4e60\u6807\u9898",value:e.form.formTitle,onChange:e.onChange})})]}),Object(f.jsx)("div",{className:"form-line"}),Object(f.jsxs)("div",{className:"form-row",children:[Object(f.jsx)("div",{className:"form-row-label",children:"\u5b66\u4e60\u5185\u5bb9"}),Object(f.jsx)("div",{className:"form-row-content",children:Object(f.jsx)("input",{name:"formContent",className:"input",placeholder:"\u8f93\u5165\u5b66\u4e60\u5185\u5bb9",value:e.form.formContent,onChange:e.onChange})})]})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"button",onClick:e.onClick,children:"\u521b\u5efa"})})]}):Object(f.jsx)("div",{})}var g=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(r.a)(this,s),(n=t.call(this,e)).state={domain:"",corpId:"",authCode:"",userId:"",userName:"",showLogin:!0,showRoleList:!1,showNewRole:!1,showToDoForm:!1,roleList:[],ids:new Array,roles:new Array,form:{title:"\u5b66\u4e60\u4efb\u52a1\u5f85\u529e",url:"/toLearn",createTime:"2021-06-30 15:00:00",formTitle:"\u5b66\u4e60\u6807\u9898",formContent:"\u5b66\u4e60\u5185\u5bb9"},bizId:"",finish:!1},n}return Object(c.a)(s,[{key:"getBizId",value:function(e){if(e){var t=e.split("=");t&&-1!=t[0].indexOf("bizId")&&this.setState({bizId:t[1]})}else alert("param error!!!",e)}},{key:"finishLearn",value:function(){var e=this;this.state.finish?alert("\u5df2\u5b8c\u6210"):j.a.post(this.state.domain+"/learnToDo/update",{userId:this.state.userId,bizId:this.state.bizId},{headers:{"Content-Type":"application/json"}}).then((function(t){alert("\u5b8c\u6210\u5b66\u4e60"),e.setState({finish:!0})})).catch((function(e){alert(JSON.stringify(e))}))}},{key:"render",value:function(){var e=this,t=this.props.location.search;if(t){""===this.state.userId&&this.login(),""===this.state.bizId&&this.getBizId(t);var s=this.state.finish?Object(f.jsx)("div",{children:"\u5df2\u5b8c\u6210"}):Object(f.jsxs)("div",{children:["\u5b66\u4e60\u4e2d\u3002\u3002\u3002",Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("button",{type:"button",onClick:function(){return e.finishLearn()},children:"\u5b8c\u6210\u5b66\u4e60"})]});return Object(f.jsx)("div",{children:s})}return Object(f.jsxs)("div",{children:[Object(f.jsx)(b,{showLogin:this.state.showLogin,onClick:function(){return e.login()}}),Object(f.jsx)(v,{showRoleList:this.state.showRoleList,onClick:function(){return e.getRoleList()}}),Object(f.jsx)("div",{children:Object(f.jsx)("form",{children:Object(f.jsx)(O,{showNewRole:this.state.showNewRole,roleList:this.state.roleList,onChange:function(t){return e.changeBoxToDo(t)},onClick:function(t){return e.newToDo(t)}})})}),Object(f.jsx)("div",{children:Object(f.jsx)("form",{children:Object(f.jsx)(x,{showToDoForm:this.state.showToDoForm,roles:this.state.roles.join(","),form:this.state.form,onChange:function(t){return e.updateFormData(t)},onClick:function(t){return e.newWorkRecord(t)}})})})]})}},{key:"updateFormData",value:function(e){var t=this.state.form;switch(e.target.name){case"title":t.title=e.target.value,this.setState({form:t});break;case"url":t.url=e.target.value,this.setState({form:t});break;case"createTime":t.createTime=e.target.value,this.setState({form:t});break;case"formTitle":t.formTitle=e.target.value,this.setState({form:t});break;case"formContent":t.formContent=e.target.value,this.setState({form:t})}}},{key:"newWorkRecord",value:function(e){var t=this,s=this.state.ids,n=this.state.form;n.ids=s,j.a.post(this.state.domain+"/learnToDo/new",JSON.stringify(n),{headers:{"Content-Type":"application/json"}}).then((function(e){e.data.success?alert("\u521b\u5efa\u5b66\u4e60\u4efb\u52a1\u5f85\u529e\u6210\u529f\uff01"):alert("\u521b\u5efa\u5b66\u4e60\u4efb\u52a1\u5f85\u529e\u5931\u8d25\uff01"),t.setState({showNewRole:!0,showToDoForm:!1,roleList:[]}),t.getRoleList()})).catch((function(e){alert(JSON.stringify(e))}))}},{key:"changeBoxToDo",value:function(e){var t=e.target.name,s=this.state.ids.indexOf(t);if(-1==s){var n=this.state.ids.slice(0);n.push(e.target.name);var i=this.state.roles.slice(0);i.push(e.target.value),this.setState({ids:n,roles:i})}else{var o=this.state.ids.slice(0),a=this.state.roles.slice(0);o.splice(s,1),a.splice(s,1),this.setState({ids:o,roles:a})}}},{key:"newToDo",value:function(e){this.setState({showToDoForm:!0,showNewRole:!1})}},{key:"getRoleList",value:function(){var e=this;j.a.get(this.state.domain+"/role/list").then((function(t){var s=JSON.parse(t.data.data.body);e.setState({roleList:s.result.list,showNewRole:!0,showToDoForm:!1})})).catch((function(e){alert(JSON.stringify(e))}))}},{key:"login",value:function(){var e=this;j.a.get(this.state.domain+"/getCorpId").then((function(t){t.data&&e.loginAction(t.data)})).catch((function(e){alert("corpId err, "+JSON.stringify(e))}))}},{key:"loginAction",value:function(e){var t=this;d.runtime.permission.requestAuthCode({corpId:e,onSuccess:function(e){t.state.authCode=e.code,j.a.get(t.state.domain+"/login?authCode="+t.state.authCode).then((function(e){if(e&&e.data.success){var s=e.data.data.userId,n=e.data.data.userName;alert("\u767b\u5f55\u6210\u529f\uff0c\u4f60\u597d"+n),setTimeout((function(){t.setState({userId:s,userName:n})}),0)}else alert("login failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},onFail:function(e){alert("requestAuthCode failed ---\x3e"+JSON.stringify(e))}})}}]),s}(i.a.Component),p=Object(m.e)(g),w=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,295)).then((function(t){var s=t.getCLS,n=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;s(e),n(e),i(e),o(e),a(e)}))},C=s(21);a.a.render(Object(f.jsx)(C.a,{basename:"/",children:Object(f.jsx)(m.a,{path:"/",component:p})}),document.getElementById("root")),w()},48:function(e,t,s){}},[[294,1,2]]]);
//# sourceMappingURL=main.b307b35a.chunk.js.map