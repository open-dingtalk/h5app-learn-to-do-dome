# 学习任务待办Demo

> 此demo为企业为员工创建学习培训任务，此任务分为两个阶段：
>
> 1.企业人员等为企业内指定角色创建学习任务，2.对应角色人员执行任务。
>
> 项目结构：
>
> rear-end：后端springboot模块，请求钉钉开发平台接口，获取企业内部角色、获取角色员工信息、发起待办任务、更新待办任务等。
>
> front-end：前端react模块，模拟用户任务页面，展示角色信息，提交任务表单等。



## 配置

**应用首页地址**

![image-20210630152200698](https://img.alicdn.com/imgextra/i1/O1CN01WlKzZx1ReKgeQbVud_!!6000000002136-2-tps-948-547.png)

---

**申请通讯录和任务待办权限**

![image-20210630152910450](https://img.alicdn.com/imgextra/i2/O1CN01EdcNxb1oNbNhitP2z_!!6000000005213-2-tps-1200-548.png)



## 运行

**下载本项目至本地**

```shell
git clone https://github.com/open-dingtalk/h5app-learn-to-do-dome.git
```

**修改企业corpId**

![image-20210630153418289](https://img.alicdn.com/imgextra/i3/O1CN01vijBDR1mvNM1scp5F_!!6000000005016-2-tps-822-539.png)

**依次执行以下命令进行打包**

```shell
cd front-end
npm install
npm run build
```

**将build中打包好静态资源文件放入后端服务**

![image-20210630154332686](https://img.alicdn.com/imgextra/i4/O1CN013FCWrB20HRRUoC36L_!!6000000006824-2-tps-357-468.png)

**修改后端配置中app_key和app_secret**

![image-20210630154520092](https://img.alicdn.com/imgextra/i3/O1CN01SdZIhb1gHdIEPAre7_!!6000000004117-2-tps-938-520.png)

**启动rear-end，使用钉钉访问服务**



## 页面展示

角色页面

![image-20210630155304017](https://img.alicdn.com/imgextra/i3/O1CN01rJJkIt1GqHEwssHIg_!!6000000000673-2-tps-334-140.png)

创建任务页面

![image-20210630155347875](https://img.alicdn.com/imgextra/i1/O1CN01SYWMFm1whJLovgx9Z_!!6000000006339-2-tps-335-325.png)

钉钉查看待办

![image-20210630155542745](https://img.alicdn.com/imgextra/i2/O1CN01NhdXw11kSP4LxhkfL_!!6000000004682-2-tps-325-154.png)

点击待办进入任务链接

![image-20210630155647082](https://img.alicdn.com/imgextra/i4/O1CN01jzFOCI24df7b1xsCp_!!6000000007414-2-tps-330-169.png)

---

## **参考文档**

1. 获取企业内部应用access_token，文档链接：https://developers.dingtalk.com/document/app/obtain-orgapp-token?spm=ding_open_doc.document.0.0.938247e54bE13v#topic-1936350
2. 获取企业内角色列表，文档链接：https://developers.dingtalk.com/document/app/obtains-a-list-of-enterprise-roles
3. 获取指定角色员工列表，文档链接：https://developers.dingtalk.com/document/app/obtain-the-list-of-employees-of-a-role
4. 为指定人员创建任务待办，文档链接：https://developers.dingtalk.com/document/app/new-to-do-items
5. 更新任务待办为完成，文件链接：[https://developers.dingtalk.com/document/app/update-to-do-statu](https://developers.dingtalk.com/document/app/update-to-do-status)
