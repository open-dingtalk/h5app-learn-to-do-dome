import * as dd from "dingtalk-jsapi"
import axios from "axios"
import "./App.css"
import react, { useState, useEffect } from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"
import { withRouter } from "react-router-dom"

const App = (props) => {
  const [form] = Form.useForm()
  const [pickerV, setPickerV] = useState(false)
  const [time, settime] = useState(null)
  // state.domain 内网穿透工具介绍:
  // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
  // 替换成后端服务域名
  const [state, setState] = useState({
    domain: "",
    authCode: "",
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
              sessionStorage.setItem("userId", userId)
              let userName = res.data.data.userName
              message.success("登录成功，你好" + userName)
              setState({
                ...state,
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
    if (!state.ids.length) return
    setState({ ...state, showToDoForm: true, showNewRole: false })
  }

  const changeBoxToDo = (event) => {
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
    data.ids = state.ids
    data.origin = window.location.origin
    data.url = origin + data.url
    data.createTime = moment(data.createTime).format("YYYY-MM-DD HH:mm")
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

  function getUrlSearchParam(key) {
    var search = window.location.search
    var arr = !search ? [] : search.substr(1).split("&")
    var param = {}
    for (var i = 0, l = arr.length; i < l; i++) {
      var kv = arr[i].split("=")
      param[kv[0]] = kv[1]
    }
    return key ? param[key] || "" : param
  }

  const getBizId = () => {
    const bizId = getUrlSearchParam("bizId")
    const userId = getUrlSearchParam("id")
    sessionStorage.setItem("userId", userId)
    setState({
      ...state,
      bizId
    })
  }

  const finishLearn = () => {
    if (state.finish) {
      message.success("已完成")
      return
    }
    axios
      .post(
        state.domain + "/learnToDo/update",
        {
          userId: sessionStorage.getItem("userId"),
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

    form.setFieldsValue({
      title: "学习任务待办",
      url: "/toLearn",
      createTime: "2021-06-30 15:00:00",
      formTitle: "学习标题",
      formContent: "学习内容",
    })
  }, [])
  const now = new Date()

  return (
    <div className="content">
      <div className="header">
        <img
          src="https://img.alicdn.com/imgextra/i3/O1CN01Mpftes1gwqxuL0ZQE_!!6000000004207-2-tps-240-240.png"
          className="headImg"
        />
        钉钉模板
      </div>
      {props.location.search ? (
        <div className="App">
          {(() => {
            if (state.bizId === "") {
              getBizId()
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
          <div className="padding">
            <h5 className="title">
              {(() => {
                if (state.showNewRole) {
                  return "角色列表"
                } else if (state.showToDoForm) {
                  return `学习任务代办人：${state.roles}`
                }
              })()}
            </h5>
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
              <div className="padding">
                <Form form={form} onFinish={onSubmit}>
                  <Form.Item
                    label="任务标题"
                    name="title"
                    rules={[{ required: true, message: "任务标题必填" }]}
                  >
                    <Input placeholder="请输入标题" />
                  </Form.Item>
                  <Form.Item
                    label="任务链接"
                    name="url"
                    rules={[{ required: true, message: "任务链接必填" }]}
                  >
                    <Input placeholder="请输入任务链接" />
                  </Form.Item>
                  <Form.Item
                    label="待办时间"
                    name="createTime"
                    rules={[{ required: true, message: "待办时间必选" }]}
                  >
                    <Button
                      type="primary"
                      onClick={() => setPickerV(true)}
                      style={{ marginRight: "12px" }}
                    >
                      {time ? "已选择待办时间" : "选择待办时间"}
                    </Button>

                    <DatePicker
                      visible={pickerV}
                      onClose={() => {
                        setPickerV(false)
                      }}
                      min={new Date(now.setHours(now.getHours()))}
                      precision="minute"
                      onConfirm={(val, s) => {
                        settime(val)
                        form.setFieldsValue({
                          createTime: val,
                        })
                      }}
                    >
                      {(value) => {
                        return value
                          ? moment(value).format("YYYY-MM-DD HH:mm")
                          : moment(now).format("YYYY-MM-DD HH:mm")
                      }}
                    </DatePicker>
                  </Form.Item>
                  <Form.Item
                    label="学习标题"
                    name="formTitle"
                    rules={[{ required: true, message: "学习标题必填" }]}
                  >
                    <Input placeholder="请输入学习标题" />
                  </Form.Item>
                  <Form.Item
                    label="学习内容"
                    name="formContent"
                    rules={[{ required: true, message: "学习内容必填" }]}
                  >
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
      )}
    </div>
  )
}

export default withRouter(App)
