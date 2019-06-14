package com.wf.ew.jmsgUtils;

import cn.jiguang.common.resp.APIConnectionException;
import cn.jiguang.common.resp.APIRequestException;
import cn.jmessage.api.JMessageClient;
import cn.jmessage.api.common.model.RegisterInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class JmsgUserUtils {

    protected static final Logger LOG = LoggerFactory.getLogger(JmsgUserUtils.class);

    private static final String appkey = "35e10f384453fe426830bcad";
    private static final String masterSecret = "ffc343854189d096a12f5081";
    private static final String defaultPw="3ea721b2d640fc87";

    /***
     * 注册jmsg
     * @param username  用户名称
     * @throws APIConnectionException
     * @throws APIRequestException
     */
    public static void register(String username) throws APIConnectionException, APIRequestException {
        JMessageClient client = new JMessageClient(appkey, masterSecret);

        List<RegisterInfo> users = new ArrayList<RegisterInfo>();

        RegisterInfo user = RegisterInfo.newBuilder()
                .setUsername(username)
                .setPassword(defaultPw)
                .build();
        users.add(user);
        RegisterInfo[] regUsers = new RegisterInfo[users.size()];
        String res = client.registerUsers(users.toArray(regUsers));
        LOG.info(res);
    }


}
