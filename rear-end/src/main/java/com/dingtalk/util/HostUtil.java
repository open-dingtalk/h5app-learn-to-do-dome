package com.dingtalk.util;

public class HostUtil {

    public static String getOriginUrlParam(String origin) {
        return "origin=" + origin;
    }

    public static String getUrlSymbol(String url){
        return url.contains("?") ? "&" : "?";
    }
}
