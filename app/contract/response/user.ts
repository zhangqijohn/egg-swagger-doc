"use strict";

const createUserResBase = {
    id: { type: "string", required: true, description: "id" },
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
