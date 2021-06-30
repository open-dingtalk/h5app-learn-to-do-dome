package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiWorkrecordAddRequest;
import com.dingtalk.api.response.OapiRoleSimplelistResponse;
import com.dingtalk.api.response.OapiWorkrecordAddResponse;
import com.dingtalk.constant.UrlConstant;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.RoleManager;
import com.dingtalk.service.UserManager;
import com.dingtalk.service.WorkRecordManager;
import com.dingtalk.util.AccessTokenUtil;
import com.dingtalk.util.TimeUtil;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

@RestController
@RequestMapping("/learnToDo")
public class LearnToDoController {

    @Autowired
    WorkRecordManager workRecordManager;

    @Autowired
    RoleManager roleManager;

    /**
     * 新建待办
     */
    @PostMapping("/new")
    public RpcServiceResult newLearnToDo(@RequestBody Map paramMap) {
        try {
            // 待办时间
            Long createTime = TimeUtil.stringDateToTimestamp(paramMap.get("createTime").toString());
            // 待办标题
            String title = paramMap.get("title").toString();
            // 任务链接
            String url = paramMap.get("url").toString();
            // 表单标题
            String formTitle = paramMap.get("formTitle").toString();
            // 表单内容
            String formContent = paramMap.get("formContent").toString();
            // 角色id list
            List<String> ids = JSONObject.parseArray(paramMap.get("ids").toString(), String.class);
            for (String id : ids) {
                // 通过角色id获取角色下的用户
                List<OapiRoleSimplelistResponse.OpenEmpSimple> simplelist = roleManager.getRoleSimplelist(Long.parseLong(id), 0L , 10L);
                for(OapiRoleSimplelistResponse.OpenEmpSimple openEmpSimple : simplelist){
                    OapiWorkrecordAddRequest request = new OapiWorkrecordAddRequest();
                    request.setUserid(openEmpSimple.getUserid());
                    request.setCreateTime(createTime);
                    request.setTitle(title);
                    request.setUrl(url);
                    // 创建待办
                    workRecordManager.newLearnToDo(request, formTitle, formContent);
                }
            }
            return RpcServiceResult.getSuccessResult(null);
        }catch (Exception ex){
            return RpcServiceResult.getFailureResult("-1", "newLearnToDo Exception");
        }
    }

    /**
     * 更新待办
     *
     * @return
     * @throws ApiException
     */
    @PostMapping("/update")
    public RpcServiceResult updateLearnToDo(@RequestBody Map<String, String> param) throws ApiException {
        String userId = param.get("userId");
        String bizId = param.get("bizId");
        return RpcServiceResult.getSuccessResult(workRecordManager.updateLearnToDo(userId, bizId));
    }
}
