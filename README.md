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
### 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个第三方企业H5微应用： https://open-dev.dingtalk.com/fe/app#/isv/app

4. 配置应用

   
   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

   - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

     https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration
     

![1](https://img.alicdn.com/imgextra/i4/O1CN01nIr7vn1YJuMMtMuqs_!!6000000003039-2-tps-1135-551.png)

配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

本demo使用接口相关权限：

​	”成员信息读权限“、“通讯录部门信息读权限”、“通讯录部门成员读权限”、“待办应用中待办写权限”

![2](https://img.alicdn.com/imgextra/i4/O1CN01nIr7vn1YJuMMtMuqs_!!6000000003039-2-tps-1135-551.png)

## 脚本启动（推荐）

### 脚本说明

脚本中内置了内网穿透工具，不需要再额外启动

```shell
dingBoot-linux.sh     # linux版本
dingBoot-mac.sh       # mac版本
dingBoot-windows.bat  # windows版本
```

### 启动命令

执行时将其中参数替换为对应的应用参数，在backend目录下执行（脚本同级目录），参数获取方法：

1. 获取corpId——开发者后台首页：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

- **启动linux脚本**

```shell
./dingBoot-linux.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **mac系统(mac m1芯片暂不支持)**

```shell
./dingBoot-mac.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **windows系统 使用cmd命令行启动**

```shell
./dingBoot-windows.bat {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```

- **示例（linux脚本执行）**

```sh
 ./dingBoot-linux.sh start h5-demo 8080 ding1jmkwa4o19bxxxx ua2qNVhleIx14ld6xgoZqtg84EE94sbizRvCimfXrIqYCeyj7b8QvqYxxx 122549400 ding9f50b15bccd1000
```

### 启动后配置

1. **配置地址**

启动完成会自动生成临时域名，配置方法：进入开发者后台->进入应用->开发管理->应用首页地址和PC端首页地址

2. **发布应用**

配置好地址后进入“版本管理与发布页面”，发布应用，发布后即可在PC钉钉或移动钉钉工作台访问应用

## 手动启动

**下载本项目至本地**

```shell
git clone https://github.com/open-dingtalk/h5app-learn-to-do-dome.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

**依次执行以下命令进行打包**

```shell
cd front-end
npm install
npm run build
```

**将build中打包好静态资源文件放入后端服务**

![image-20210630154332686](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)



### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到创建的应用，进入应用



## 页面展示

角色页面

![3](https://img.alicdn.com/imgextra/i1/O1CN01f1eza91izifxWDNMz_!!6000000004484-2-tps-444-584.png)

选中角色

![](https://img.alicdn.com/imgextra/i4/O1CN01Bu7GRJ1l6hwwJmxkL_!!6000000004770-2-tps-440-303.png)

创建待办页面

![45](https://img.alicdn.com/imgextra/i1/O1CN01OYUcJA1gN84UepvDG_!!6000000004129-2-tps-446-757.png)

钉钉查看待办

![image-20210630155542745](https://img.alicdn.com/imgextra/i2/O1CN01NhdXw11kSP4LxhkfL_!!6000000004682-2-tps-325-154.png)

点击待办进入任务链接

![image-20210630155647082](https://img.alicdn.com/imgextra/i4/O1CN01Ei2ivC24IavPbgfGY_!!6000000007368-2-tps-444-422.png)

---

## **参考文档**

1. 获取企业内部应用access_token，文档链接：https://developers.dingtalk.com/document/app/obtain-orgapp-token?spm=ding_open_doc.document.0.0.938247e54bE13v#topic-1936350
2. 获取企业内角色列表，文档链接：https://developers.dingtalk.com/document/app/obtains-a-list-of-enterprise-roles
3. 获取指定角色员工列表，文档链接：https://developers.dingtalk.com/document/app/obtain-the-list-of-employees-of-a-role
4. 为指定人员创建任务待办，文档链接：https://developers.dingtalk.com/document/app/new-to-do-items
5. 更新任务待办为完成，文件链接：[https://developers.dingtalk.com/document/app/update-to-do-statu](https://developers.dingtalk.com/document/app/update-to-do-status)
