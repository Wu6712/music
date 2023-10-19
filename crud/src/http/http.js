import axios from "axios";
export const option = (val) => {
    let server = axios.create({
        baseURL: "http://localhost:8080/api",
        timeout: 6000
    });
    //请求拦截
    server.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        console.log(error)
    });

    // 添加响应拦截器
    server.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        console.log(error)
    });

    return server(val)
}
