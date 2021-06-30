import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

function LoginBtn(props){
  if(props.showLogin){
    return(
      <div>
        <button type="button" onClick={props.onClick}> 点击登录</button>
      </div>
    )
  }return <div></div>
}
function RoleListBtn(props){
  if(props.showRoleList){
    return(
      <div>
        <button type="button" onClick={props.onClick}> 查看用户组</button>
      </div>
    )
  }return <div></div>
}


function NewRoleBoard(props){
  if(props.showNewRole){
    const todoItems = props.roleList.map((group, index) => {
      const roles = group.roles.map((role, i) =>
        <span key={role.id}>
          <input type="checkbox" name={role.id} value={role.name}
            onChange={props.onChange}
          />
          <text>{role.name}</text>
        </span>
      )
      return(
          <div key={index}>
            <div>{group.name}</div>
            <div>
              {roles}
            </div>
          </div>
        )
      }
    )
    return(
      <div>
        <button type="button" onClick={props.onClick}>创建待办学习任务</button>
        {todoItems}
      </div>
    )
  }return <div></div>
}
function ToDoFormBoard(props) {
  if(props.showToDoForm){
    return(
        <div>
          学习任务
            <text>代办人：{props.roles}</text>
            <div className="page-section">
              <div className="form-row">
                <div className="form-row-label">任务标题</div>
                <div className="form-row-content">
                  <input name="title" className="input" placeholder="输入标题"
                         value={props.form.title}
                         onChange={props.onChange}
                  />
                </div>
              </div>
              <div className="form-line"/>
              <div className="form-row">
                <div className="form-row-label">任务链接</div>
                <div className="form-row-content">
                  <input name="url" className="input" placeholder="输入任务链接"
                         value={props.form.url}
                         onChange={props.onChange}
                  />
                </div>
              </div>
              <div className="form-line"/>
              <div className="form-row">
                <div className="form-row-label">待办时间</div>
                <div className="form-row-content">
                  <input name="createTime" className="input" placeholder="输入格式：yyyy-MM-dd hh:mm:ss"
                         value={props.form.createTime}
                         onChange={props.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="page-section">
              <div className="form-row">
                <div className="form-row-label">学习标题</div>
                <div className="form-row-content">
                  <input name="formTitle" className="input" placeholder="输入学习标题"
                         value={props.form.formTitle}
                         onChange={props.onChange}
                  />
                </div>
              </div>
              <div className="form-line"/>
              <div className="form-row">
                <div className="form-row-label">学习内容</div>
                <div className="form-row-content">
                  <input name="formContent" className="input" placeholder="输入学习内容"
                         value={props.form.formContent}
                         onChange={props.onChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="button" onClick={props.onClick}>创建</button>
            </div>
        </div>
    )
  }return <div></div>
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      //内网穿透工具介绍:
      // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
      // 替换成后端服务域名
      domain:"http://abcde.vaiwan.com",
      corpId: '',
      authCode:'',
      userId:'',
      userName:'',
      showLogin: true, //登陆按钮
      showRoleList: false, //查看用户组按钮
      showNewRole: false, //角色列表
      showToDoForm: false, //任务表单
      roleList: [],
      ids:new Array(),
      roles:new Array(),
      form:{
        title:"学习任务待办",
        url:"http://abcde.vaiwan.com/toLearn",
        createTime:"2021-06-30 15:00:00",
        formTitle:"学习标题",
        formContent:"学习内容"
      },
      bizId:'',
      finish:false
    };
  }

  getBizId(param){
    if(param){
      let arr = param.split("=");
      if(arr){
        if(arr[0].indexOf("bizId") != -1){
          this.setState({
            bizId:arr[1]
          })
        }
      }
    }else{
      alert("param error!!!", param);
    }
  }
  finishLearn(){
    if(this.state.finish){
      alert("已完成")
      return;
    }
    axios.post(this.state.domain + "/learnToDo/update", {
      userId:this.state.userId,
      bizId:this.state.bizId,
    },{headers:{"Content-Type":"application/json"}}).then(res => {
      alert("完成学习")
      // alert(JSON.stringify(res))
      this.setState({
        finish:true
      })
    }).catch(error => {
      alert(JSON.stringify(error))
    })

  }

  render() {
    let param = this.props.location.search;
    if(param){
      if(this.state.userId === ""){
        this.login();
      }
      if(this.state.bizId === ""){
        this.getBizId(param);
      }
      let status = this.state.finish ? <div>已完成</div> : <div>
        学习中。。。
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button type="button" onClick={() => this.finishLearn()}>完成学习</button>
      </div>
      return (
          <div>
            {status}
          </div>
      );
    }else{
      return (
          <div>
            <LoginBtn
                showLogin={this.state.showLogin}
                onClick={() => this.login()}
            />
            <RoleListBtn
                showRoleList={this.state.showRoleList}
                onClick={() => this.getRoleList()}
            />
            <div>
              <form>
                <NewRoleBoard
                    showNewRole={this.state.showNewRole}
                    roleList={this.state.roleList}
                    onChange={(e) => this.changeBoxToDo(e)}
                    onClick={(e) => this.newToDo(e)}
                />
              </form>
            </div>
            <div>
              <form>
                <ToDoFormBoard
                    showToDoForm={this.state.showToDoForm}
                    roles={this.state.roles.join(",")}
                    form={this.state.form}
                    onChange={(e) => this.updateFormData(e)}
                    onClick={(e) => this.newWorkRecord(e)}

                />
              </form>
            </div>

          </div>
      );
    }
  }
  updateFormData(e){
    let form = this.state.form;
    switch (e.target.name) {
      case "title":
        form.title = e.target.value;
        this.setState({form: form});
        break;
      case "url":
        form.url = e.target.value;
        this.setState({form: form});
        break;
      case "createTime":
        form.createTime = e.target.value;
        this.setState({form: form});
        break;
      case "formTitle":
        form.formTitle = e.target.value;
        this.setState({form: form});
        break;
      case "formContent":
        form.formContent = e.target.value;
        this.setState({form: form});
        break;
    }
  }
  newWorkRecord(e){
    let ids = this.state.ids;
    let data = this.state.form;
    data.ids = ids;
    // alert(JSON.stringify(data));
    axios.post(this.state.domain + "/learnToDo/new",
      JSON.stringify(data),{headers:{"Content-Type":"application/json"}}
    ).then(res => {
      // alert(JSON.stringify(res));
      if(res.data.success){
        alert("创建学习任务待办成功！")
      }else{
        alert("创建学习任务待办失败！")
      }
      this.setState({
        showNewRole: true,
        showToDoForm: false,
        roleList:[]
      })
      this.getRoleList();
    }).catch(error => {
      alert(JSON.stringify(error))
    })
  }
  changeBoxToDo(event) {
    // alert("====changeBoxTo====");
    let id = event.target.name;
    let index = this.state.ids.indexOf(id);
    if(index == -1){
      let ids = this.state.ids.slice(0);
      ids.push(event.target.name);
      let roles = this.state.roles.slice(0);
      roles.push(event.target.value);
      this.setState({
        ids:ids,
        roles:roles
      })
    }else{
      let ids = this.state.ids.slice(0);
      let roles = this.state.roles.slice(0);
      ids.splice(index, 1);
      roles.splice(index, 1);
      this.setState({
        ids:ids,
        roles:roles
      })
    }
  }
  newToDo(event) {
    this.setState({
      showToDoForm: true,
      showNewRole: false,
    })
  }
  getRoleList(){
    axios.get(this.state.domain + "/role/list")
      .then(res => {
        let result = JSON.parse(res.data.data.body);
        this.setState({
          roleList: result.result.list,
          showNewRole: true,
          showToDoForm: false,
        })
      }).catch(error => {
        alert(JSON.stringify(error))
      })

  }

  login() {
    let _this = this;
    dd.runtime.permission.requestAuthCode({
      corpId: "***",//企业 corpId
      onSuccess : function(res) {
        // 调用成功时回调
        _this.state.authCode = res.code
        axios.get(_this.state.domain + "/login?authCode=" + _this.state.authCode
        ).then(res => {
            if (res && res.data.success) {
              let userId = res.data.data.userId;
              let userName = res.data.data.userName;
              alert('登陆成功，你好，' + userName);
              _this.setState({
                userId:userId,
                userName:userName,
                showLogin: false,
                showRoleList: true
              })
            } else {
              alert("httpRequest failed --->", res);
            }
          }).catch(error => {
            alert(JSON.stringify(error))
          })
      },
      onFail : function(err) {
        // 调用失败时回调
        alert(JSON.stringify(err))

      }
    });
  }

}



export default withRouter(App)
