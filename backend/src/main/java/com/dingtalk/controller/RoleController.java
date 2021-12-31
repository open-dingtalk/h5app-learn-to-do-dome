package com.dingtalk.controller;

import com.dingtalk.api.response.OapiRoleListResponse;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.RoleManager;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    RoleManager roleManager;

    /**
     * 获取用户角色列表
     * @return
     */
    @GetMapping("/list")
    public RpcServiceResult getRoleList() throws ApiException {
        OapiRoleListResponse rsp = roleManager.getRoleList(0l,20l);
        return RpcServiceResult.getSuccessResult(rsp);
    }

}
