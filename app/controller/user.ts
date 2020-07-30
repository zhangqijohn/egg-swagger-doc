import { Controller } from "egg";

/**
 * @controller User 注释必写，swagger-doc是根据这段注释来生成接口的 ）。
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
     * @summary 设置header传参
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
     * @summary 文件上传
     * @description formData 案例
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
