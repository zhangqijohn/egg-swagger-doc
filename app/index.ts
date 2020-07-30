import { Application } from "egg";
import { createConnection } from "typeorm";

export default class AppBootHook {
    public app: Application;
    constructor(app) {
        this.app = app;
    }

    configWillLoad() {
        // 配置文件即将加载，这是最后动态修改配置的时机
    }

    configDidLoad() {
        // 配置文件加载完成
    }

    async didLoad() {
        // 文件加载完成.
        const { app } = this;
        /**
         * typeorm demo
         */
        try {
            await createConnection(app.config.typeorm);
            console.log("Connection success");
        } catch (error) {
            console.log("TypeOrm connection is error" + error);
        }
    }

    async willReady() {
        // 插件启动完毕
    }

    async didReady() {
        // worker 准备就绪
    }

    async serverDidReady() {
        // 应用启动完成
    }

    async beforeClose() {
        // 应用即将关闭
    }
}
