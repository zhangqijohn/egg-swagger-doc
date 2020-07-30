"use strict";

module.exports = {
    user: {
        id: { type: "string", required: true, description: "id 唯一键" },
        name: { type: "string", required: true, description: "用户姓名" },
        sex: { type: "string", required: true, description: "用户性别" },
        age: { type: "integer", required: true, description: "年龄" },
    },
};
