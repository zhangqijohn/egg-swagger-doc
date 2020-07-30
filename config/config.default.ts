import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";
// import { ConnectionOptions } from "typeorm";
// import * as path from "path";

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1595990865608_8633";

    // add your egg config in here
    config.middleware = [];

    // add your special config in here
    const useConfig = {
        /**
         * typeorm 配置
         */
        // typeorm: {
        //     type: "mysql",
        //     // url: process.env.MYSQL || "mysql://root:dev123@127.0.0.1:3306/user",
        //     host: "localhost",
        //     port: 3306,
        //     username: "root",
        //     password: "dev123",
        //     database: "user",
        //     logging: false,
        //     entities: [path.join(__dirname, "../app/entity/**/*.js")],
        //     migrations: [],
        //     subscribers: [],
        //     synchronize: true,
        // } as ConnectionOptions,

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
                // 配置接口安全授权方式。
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

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...useConfig,
    };
};
