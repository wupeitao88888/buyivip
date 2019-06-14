# easyweb-jwt

## 简介
&emsp;基于 SpringBoot、jwt和JwtPermission实现的前后端分离开发框架，接口遵循RESTful风格，相比SpringSecurity和oAuth2.0框架更加轻量级。

> 在线演示：[http://oauth.easyweb.vip/](http://oauth.easyweb.vip/)， 账号：admin，密码：admin。

## 使用技术

描述 | 框架 
:---|:---
核心框架 | Spring、Spring Boot、Spring MVC
持久层 | MyBatis、MyBatis-Plus、Druid
权限框架 | Jwt、[JwtPermission](https://gitee.com/whvse/JwtPermission)
前端框架 | Layui、[EasyWeb-SPA](https://easyw.vip) 

> 另外有基于SpringSecurity、oAuth2.0的版本 [前往获取](https://easyweb.vip/order/buy?goodsId=3)， 有基于Shiro的版本 [在线演示](https://shiro.easyweb.vip)。

&emsp;前端的框架使用的是`easyweb`的spa版本，无需打包、npm环境即可使用，前端框架需要授权才可使用，授权可获得详细的开发文档。

## 导入项目
1. 使用 IDEA 选择 Open 导入项目；
2. 导入数据库到MySQL中，sql 位于根目录；
3. 确认application-dev.properties 配置是否正确；
4. 启动项目，浏览器访问 `http://localhost:8088/`。 

**分离部署：**
1. 把`static`目录下的前端代码部署在nginx里面；
2. 修改`assets/module/config.js`里面的`base_server`为你的后端地址；


## 项目结构

```text
|-main
   |-java
   |    |-com.wf.ew
   |         |-common                            // 核心模块
   |         |    |-config                       // 存放SpringBoot配置类
   |         |    |    |-MyBatisPlusConfig.java  // MyBatisPlus配置
   |         |    |    |-SwaggerConfig.java      // Swagger2配置
   |         |    |
   |         |    |-exception                    // 自定义异常,统一异常处理器
   |         |    |-utils                        // 工具类
   |         |    |-BaseController.java          // controller基类
   |         |    |-JsonResult.java              // 结果集封装
   |         |    |-PageResult.java              // 分页结果集封装
   |         |
   |         |-system                            // 系统管理模块
   |         |-xxxxxx                            // 其他业务模块
   |         |
   |         |-EasyWebApplication.java           // SpringBoot启动类
   |              
   |-resources
        |-mapper                                 // mapper文件
        |    |-system
        |
        |-application.properties                 // 配置文件
```


## 项目截图

![用户管理](https://sowcar.com/t6/692/1553847541x2890174267.png)

![角色管理](https://sowcar.com/t6/692/1553847569x2890208949.png)


## 相关学习资料

- [Spring Boot 从入门到进阶系列教程](http://www.spring4all.com/article/246)

- [Spring Security 从入门到进阶系列教程](http://www.spring4all.com/article/428)
- [理解OAuth 2.0 - 阮一峰](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)
- [基于Token的WEB后台认证机制](https://www.cnblogs.com/xiekeli/p/5607107.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [使用Swagger2构建RESTful API](http://www.spring4all.com/article/251)
- [Swagger2 - 注解详细说明](http://www.spring4all.com/article/251)
- [IDEA SpringBoot 热部署+html修改自动刷新](https://my.oschina.net/yejunxi/blog/845752)

 :smirk: 学如逆水行舟，不进则退~~~


## 联系方式
### 欢迎加入“前后端分离技术交流群”

![群二维码](https://ws1.sinaimg.cn/large/006a7GCKgy1fstbxycj1xj305k07m75h.jpg)

### 推荐
**EasyWeb管系统模板**<br>
&emsp;一个开箱即用的后台模板，使用简单，模板丰富，包含传统ifram版、spa单页面路由版，[前往查看](https://easyweb.vip)。
