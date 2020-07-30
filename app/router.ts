import { Application } from "egg";

export default (app: Application) => {
    const { controller, router } = app;
    router.get("/", controller.home.index);
    router.get("/api/user/header", controller.user.header);
    router.post("/api/user/upload", controller.user.upload);
    router.resources("user", "/api/user", controller.user);
};
