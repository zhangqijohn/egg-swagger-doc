"use strict";

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
