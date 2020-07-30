
# egg-swagger-ui 配置
## 前言
1. Eggjs 是阿里巴巴团队开发的，一个基于 Koajs 的框架，相当于二次封装，相比较 Koajs ，并没有那么高的自由度，但 Eggjs 这种带有规范性的开发更适合在企业中使用。
2. Swagger 是 RESTFUL 接口的文档在线自动生成工具。
3. 此文档基于Eggjs + egg-swagger-doc 生成RESTFUL 接口供调试使用。


# 环境准备

 1. 操作系统：支持 macOS，Linux，Windows 
 2. 运行环境：建议选择 LTS 版本，最低要求 8.x。
 3. 本文制作时对应eggjs版本： 2.27.0

## 目录结构

```bash
${APP}
├─.vscode
├─app
│  ├─contract // 存放对应type参数为body formData的传参值
│     ├─request // 请求参数
│     │  └─ user.ts
│     └─response  // 返回参数
│        └─ user
│  ├─controller
│        └─	user // swagger读取注释说明
│  └─service
├─config
│  ├─config.default.ts
│  └─plugin.ts
└─test
   └─app
       ├─controller
       └─service
```

## 安装依赖
### 1.快熟搭建,这里选择typescript 作为模板
```
npm init egg --type=ts
npm install
npm install egg-swagger-doc --save
```
###  2. 修改config配置
  ${APP}/config/config.default.ts 新增 egg-swagger-doc 配置信息
```
import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1595990865608_8633";
    config.middleware = [];
    const useConfig = {
        swaggerdoc: {
            dirScanner: "./app/controller", // 配置自动扫描的控制器路径。
            // 接口文档的标题，描述或其它。
            apiInfo: {
                title: "EGGJS", // 接口文档的标题。
                description: "swagger-ui for 蛋蛋的忧伤.", // 接口文档描述。
                version: "1.0.0", // 接口文档版本。
            },
            schemes: ["http", "https"], // 配置支持的协议。
            consumes: ["application/json"], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
            produces: ["application/json"], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
            securityDefinitions: {
                // apikey: {type: "apiKey", name: "clientkey", in: "header",},
                // oauth2: {
                //     type: "oauth2", tokenUrl: "http://petstore.swagger.io/oauth/dialog", flow: "password",
                //     scopes: {
                //         "write:access_token": "write access_token",
                //         "read:access_token": "read access_token",
                //     },
                // },
            },
            enableSecurity: false, // 是否启用授权，默认 false（不启用）。
            // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
            routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
            enable: true, // 默认 true (启用)。
        },
    } as const;

    return {
        ...config,
        ...useConfig,
    };
};

```
  ${APP}/config/plugin.ts 新增 egg-swagger-doc 配置信息
```
import { EggPlugin } from "egg";
const plugin: EggPlugin = {
    // static: true,
    swaggerdoc: {
        enable: true, // 是否启用。
        package: "egg-swagger-doc", // 指定包名称。
    },
};
export default plugin;

```


### 3. Contract编写，业务编写，注释编写，
 -  编写 Contract：Contract 相当于验证，在接收请求和返回数据的时候对数据进行格式约束。
 - 假设有一个数控实体类型,有id、姓名、性别、年龄，如下：
  ${APP}/app/contract/database.ts
```bash
module.exports = {
    user: {
        id: { type: "string", required: true, description: "id 唯一键" },
        name: { type: "string", required: true, description: "用户姓名" },
        sex: { type: "string", required: true, description: "用户性别" },
        age: { type: "integer", required: true, description: "年龄" },
    },
};

```


 - 请求头格式约束：
  ${APP}/app/contract/request/use.ts
  
```bash
const createUserBase = {
    name: { type: "string", required: true, description: "用户姓名" },
    sex: {
        type: "string",
        required: true,
        example: "male",
        enum: ["male", "female"],
        description: "用户性别",
    },
    age: { type: "integer", required: true, min: 1, description: "年龄" },
};

module.exports = {
    createUserRequest: createUserBase,
    showUserRequest: {
        ...createUserBase,
        id: { type: "string", required: true, description: "id" },
    },
    updateUserRequest: {
        ...createUserBase,
        id: { type: "string", required: true, description: "id" },
    },
};

```


 - 请求头格式约束：
  ${APP}/app/contract/response/use.ts
  
```bash
"use strict";

const createUserResBase = {
    id: { type: "string", required: true, description: "id" },
    name: { type: "string", required: true, description: "姓名" },
    sex: {
        type: "string",
        required: true,
        example: "male",
        enum: ["male", "female"],
        description: "性别",
    },
    age: { type: "integer", required: true, min: 1, description: "年龄" },
};

module.exports = {
    listUserResponse: {
        data: { type: "array", itemType: "user" },
        pageIndex: { type: "integer" },
        pageSize: { type: "integer" },
        total: { type: "integer" },
    },
    createUserResponse: createUserResBase,
    showUserResponse: createUserResBase,
    updateUserResponse: createUserResBase,
    uploadUserResponse: {
        id: { type: "string", required: true, description: "id" },
        fileName: { type: "string", required: true, description: "id" },
    },
};

```

 - 业务编写，注释编写：
  ${APP}/app/contract/response/use.ts

```bash
import { Controller } from "egg";

/**
 * @controller User
 */

// 此处Request type 参数值案例：body/path/query/header/formData
export default class UserController extends Controller {
    /**
     * @summary 根据id查找用户
     * @description path 案例
     * @router get /api/user/{id}
     * * @request path string *id 标识
     * @response 200 createUserResponse
     */
    async show() {
        const { ctx } = this;
        ctx.body = { id: ctx.params.id, name: "张三", age: 18, sex: "male" };
    }

    /**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
     * @summary 用户列表分页查询。
     * @description query 案例
     * @router get /api/user
     * * @request query number *pageIndex eg:1 当前页码
     * * @request query number *pageSize eg:20 显示条数
     * * @request query string id 年龄
     * * @request query string name 名字
     * * @request query number age 年龄
     * * @request query string sex 性别
     * @response 200 listUserResponse 返回结果
     */
    async index() {
        const { ctx } = this;
        const res = [{ id: "string", name: "张三", age: 18, sex: "male" }];
        ctx.body = {
            data: res,
            pageIndex: Number(ctx.query.pageIndex),
            pageSize: Number(ctx.query.pageSize),
            total: res.length,
        };
    }

    /**
     * @summary 创建用户
     * @description body案例：
     * @router post /api/user
     * * @request body createUserRequest *body
     * @response 200 createUserResponse 返回结果
     */
    async create() {
        const { ctx } = this;
        ctx.body = { id: "guochan007", ...ctx.request.body };
    }

    /**
     * @summary 根据id查找用户
     * @description header案例
     * @router get /api/user/header
     * * @request header string *id 标识
     * @response 200 createUserResponse 返回结果
     */
    async header() {
        const { ctx } = this;
        ctx.body = { id: ctx.params.id, name: "张三", age: 18, sex: "male" };
    }

    /**
     * @summary 根据id查找用户
     * @description header案例
     * @router post /api/user/upload
     * @request formData string id 用户ID
     * @request formData file *file
     * @response 200 uploadUserResponse
     */
    async upload() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const id = stream.fields.id;

        ctx.body = { id, filename: stream.filename };
    }
}

```

 - 配置路由
  ${APP}/app/router.ts
  

```bash
import { Application } from "egg";
export default (app: Application) => {
    const { controller, router } = app;
    router.get("/api/user/header", controller.user.header);
    router.post("/api/user/upload", controller.user.upload);
    router.resources("user", "/api/user", controller.user);
};

```

  
## 项目运行及预览

 - 项目运行

```bash
npm run dev
```

 - 预览： http://localhost:7001/swagger-ui.html

至此 **大功告成**，利用这些已经可以完成常用的基本接口调试工作了。


### 总结步骤：
 1. 初始化项目;
 2. 建立项目目录;
 3. 安装和配置 Swagger ;
 4. 编写 Contract 对格式进行约束；
 5. 编写 Controller（ 控制器 ）;
 6. 配置路由;
 7. 最后npm run dev运行项目，结束.
