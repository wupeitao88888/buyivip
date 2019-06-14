/** EasyWeb spa v3.0.8 data:2019-03-24 License By http://easyweb.vip */

layui.define(function (a) {
    var b = {
        base_server: "/easyweb-jwt/v1/",
        tableName: "easyweb-jwt",
        pageTabs: false,
        openTabCtxMenu: true,
        maxTabNum: 20,
        viewPath: "components",
        viewSuffix: ".html",
        defaultTheme: "theme-admin",
        getToken: function () {
            var c = layui.data(b.tableName);
            if (c) {
                return c.token
            }
        },
        removeToken: function () {
            layui.data(b.tableName, {key: "token", remove: true})
        },
        putToken: function (c) {
            layui.data(b.tableName, {key: "token", value: c})
        },
        getUser: function () {
            var c = layui.data(b.tableName);
            if (c) {
                return c.login_user
            }
        },
        putUser: function (c) {
            layui.data(b.tableName, {key: "login_user", value: c})
        },
        getUserAuths: function () {
            var e = b.getUser().authorities;
            var c = [];
            for (var d = 0; d < e.length; d++) {
                c.push(e[d].authority)
            }
            return c
        },
        getAjaxHeaders: function () {
            var d = [];
            var c = b.getToken();
            if (c) {
                d.push({name: "Authorization", value: "Bearer " + c})
            }
            return d
        },
        ajaxSuccessBefore: function (c) {
            if (c.code == 401) {
                b.removeToken();
                layer.msg("登录过期", {icon: 2, time: 1500}, function () {
                    location.reload()
                });
                return false
            } else {
                if (c.code == 403) {
                    layer.msg("没有访问权限", {icon: 2})
                } else {
                    if (c.code == 404) {
                        layer.msg("404目标不存在", {icon: 2})
                    }
                }
            }
            return true
        },
        routerNotFound: function (c) {
            layer.alert("路由" + location.hash + "不存在", {
                title: "提示",
                skin: "layui-layer-admin",
                btn: [],
                offset: "30px",
                anim: 6,
                shadeClose: true
            })
        }
    };
    a("config", b)
});