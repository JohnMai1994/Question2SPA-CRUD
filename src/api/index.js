import axios from "axios";
import {message} from "antd";


const service = axios.create({baseURL: "http://127.0.0.1:5000/"});

service.interceptors.request.use((config) => {
    console.log("请求操作", config);
    return config
})

service.interceptors.response.use((response) => {
    console.log("返回操作", response);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        message.error("获取数据失败，请输入命令行 node restful-api.js")
    }
})

const getData = (name ="") => {
    console.log("开始Get")
    return service.get(`${name}`)
}

const createData = (name="", data) => {
    return service.post(`${name}`)
}

const updateData = (name="", data) => {
    return service.put(`${name}`)
}

const deleteData = (name="", data) => {
    return service.delete(`${name}`)
}

export {
    getData,
    createData,
    updateData,
    deleteData,
}

