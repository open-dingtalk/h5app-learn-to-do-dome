package com.dingtalk.service;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiRoleListRequest;
import com.dingtalk.api.request.OapiRoleSimplelistRequest;
import com.dingtalk.api.request.OapiWorkrecordAddRequest;
import com.dingtalk.api.response.OapiRoleListResponse;
import com.dingtalk.api.response.OapiRoleSimplelistResponse;
import com.dingtalk.constant.UrlConstant;
import com.dingtalk.util.AccessTokenUtil;
import com.taobao.api.ApiException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleManager {

    /**
     * 获取角色列表
     *
     * @return
     * @throws ApiException
     */
    public OapiRoleListResponse getRoleList(Long offset, Long size) throws ApiException {
        // 获取access_token
        String accessToken = AccessTokenUtil.getAccessToken();

        // 获取角色列表
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.GET_ROLE_LIST);
        OapiRoleListRequest req = new OapiRoleListRequest();
        req.setSize(size);
        req.setOffset(offset);
        return client.execute(req, accessToken);
    }

    /**
     * 通过roleId获取角色详细信息
     * @param roleId
     * @param offset
     * @param size
     * @return
     * @throws ApiException
     */
    public List<OapiRoleSimplelistResponse.OpenEmpSimple> getRoleSimplelist(Long roleId, Long offset, Long size) throws ApiException {
        String accessToken = AccessTokenUtil.getAccessToken();

        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.GET_ROLE_SIMPLE_LIST);
        OapiRoleSimplelistRequest req = new OapiRoleSimplelistRequest();
        req.setRoleId(roleId);
        req.setSize(size);
        req.setOffset(offset);
        OapiRoleSimplelistResponse rsp = client.execute(req, accessToken);
        return rsp.getResult().getList();
    }
}
