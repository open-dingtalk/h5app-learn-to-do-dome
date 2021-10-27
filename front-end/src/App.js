import * as dd from "dingtalk-jsapi"
import axios from "axios"
import "./App.css"
import react, { useState, useEffect } from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { withRouter } from "react-router-dom"

const App = (props) => {
  const [form] = Form.useForm()
  // state.domain 内网穿透工具介绍:
  // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
  // 替换成后端服务域名
  const [state, setState] = useState({
    domain: "",
    authCode: "",
    userId: "",
    userName: "",
    showNewRole: true, //角色列表
    showToDoForm: false, //任务表单
    roleList: [],
    ids: [],
    roles: [],
    finish: false,
    bizId: "",
  })
  const loginAction = (corpId) => {
    console.log(state.userId, "-----11111")
    dd.runtime.permission.requestAuthCode({
      corpId: corpId, //企业 corpId
      onSuccess: function (res) {
        // 调用成功时回调
        state.authCode = res.code
        axios
          .get(state.domain + "/login?authCode=" + state.authCode)
          .then((res) => {
            if (res && res.data.success) {
              let userId = res.data.data.userId
              let userName = res.data.data.userName
              message.success("登录成功，你好" + userName)
              setState({
                ...state,
                userId: userId,
                userName: userName,
              })
              setTimeout(function () {
                getRoleList()
              }, 0)
            } else {
              message.error(res.data.errorMsg)
            }
          })
          .catch((error) => {
            alert("httpRequest failed --->" + JSON.stringify(error))
          })
      },
      onFail: function (err) {
        // 调用失败时回调
        alert("requestAuthCode failed --->" + JSON.stringify(err))
      },
    })
  }

  const getRoleList = () => {
    console.log(state.userId, "-----2222222")

    axios
      .get(state.domain + "/role/list")
      .then((res) => {
        let result = JSON.parse(res.data.data.body)
        setState({
          ...state,
          roleList: result.result.list,
          showNewRole: true,
          showToDoForm: false,
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  const newToDo = () => {
    console.log(state.userId, "-----333333")

    if (!state.ids.length) return
    setState({ ...state, showToDoForm: true, showNewRole: false })
  }

  const changeBoxToDo = (event) => {
    console.log(state.userId, "-----444444")

    let id = event.target.name
    let index = state.ids.indexOf(id)
    if (index === -1) {
      let ids = state.ids.slice(0)
      ids.push(event.target.name)
      let roles = state.roles.slice(0)
      roles.push(event.target.value)
      setState({ ...state, ids: ids, roles: roles })
    } else {
      let ids = state.ids.slice(0)
      let roles = state.roles.slice(0)
      ids.splice(index, 1)
      roles.splice(index, 1)
      setState({ ...state, ids: ids, roles: roles })
    }
  }

  const onSubmit = (data) => {
    console.log(state.userId, "-----555555")

    data.ids = state.ids
    data.origin = window.location.origin
    data.url = origin + data.url
    axios
      .post(state.domain + "/learnToDo/new", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          message.success("创建学习任务待办成功！")
        } else {
          message.error("创建学习任务待办失败！")
          return
        }
        setState({
          ...state,
          showNewRole: true,
          showToDoForm: false,
          ids: [],
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }
  const getBizId = (param) => {
    console.log(state.userId, "-----666666")

    if (param) {
      let arr = param.split("=")
      if (arr) {
        if (arr[0].indexOf("?bizId") !== -1) {
          setState({
            ...state,
            bizId: arr[1],
          })
        }
      }
    } else {
      alert("param error!!!", param)
    }
  }

  const finishLearn = () => {
    console.log(state.userId, "-----777777")

    if (state.finish) {
      message.success("已完成")
      return
    }
    axios
      .post(
        state.domain + "/learnToDo/update",
        {
          userId: state.userId,
          bizId: state.bizId,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        message.success("完成学习")
        setState({
          ...state,
          finish: true,
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  useEffect(() => {
    axios
      .get(state.domain + "/getCorpId")
      .then((res) => {
        if (res.data) {
          loginAction(res.data)
        }
      })
      .catch((error) => {
        alert("corpId err, " + JSON.stringify(error))
      })
    console.log(state.userId, "-----88888")

    form.setFieldsValue({
      title: "学习任务待办",
      url: "/toLearn",
      createTime: "2021-06-30 15:00:00",
      formTitle: "学习标题",
      formContent: "学习内容",
    })
  }, [])

  return props.location.search ? (
    <div className="App">
      {(() => {
        if (state.bizId === "") {
          getBizId(props.location.search)
        }
        return state.finish ? (
          <div className="finishOrLearn">已完成</div>
        ) : (
          <div className="finishOrLearn">
            <p>学习中。。。</p>
            <br />
            <Button type="primary" onClick={finishLearn}>
              完成学习
            </Button>
          </div>
        )
      })()}
    </div>
  ) : (
    <div className="App">
      <h5 className="title">
        {(() => {
          if (state.showNewRole) {
            return "角色列表"
          } else if (state.showToDoForm) {
            return `学习任务代办人：${state.roles}`
          }
        })()}
      </h5>
      <div className="content">
        {state.showNewRole && (
          <div>
            {state.roleList.map((group, index) => {
              return (
                <div className="checkbox">
                  {group.roles.map((role, i) => (
                    <div className="check">
                      <Checkbox
                        name={role.id}
                        value={role.name}
                        onChange={changeBoxToDo}
                      >
                        {role.name}
                      </Checkbox>
                      <br />
                    </div>
                  ))}
                </div>
              )
            })}
            {state.ids.length > 0 && (
              <Button type="primary" onClick={newToDo}>
                创建待办学习任务
              </Button>
            )}
          </div>
        )}
        {state.showToDoForm && (
          <div className="content">
            <Form form={form} onFinish={onSubmit}>
              <Form.Item label="任务标题" name="title">
                <Input placeholder="请输入标题" />
              </Form.Item>
              <Form.Item label="任务链接" name="url">
                <Input placeholder="请输入任务链接" />
              </Form.Item>
              <Form.Item label="待办时间" name="createTime">
                <Input placeholder="输入格式：yyyy-MM-dd hh:mm:ss" />
              </Form.Item>
              <Form.Item label="学习标题" name="formTitle">
                <Input placeholder="请输入学习标题" />
              </Form.Item>
              <Form.Item label="学习内容" name="formContent">
                <Input placeholder="请输入学习内容" />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(App)
