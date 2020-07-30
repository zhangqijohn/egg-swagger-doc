import { EggPlugin } from "egg";

const plugin: EggPlugin = {
    // static: true,
    // nunjucks: {
    //   enable: true,
    //   package: 'egg-view-nunjucks',
    // },
    // mysql: {
    //     enable: true,
    //     package: "egg-mysql",
    // },
    swaggerdoc: {
        enable: true, // 是否启用。
        package: "egg-swagger-doc", // 指定包名称。
    },
};

export default plugin;
