import { option } from "./http";

export const getBannerList = () => {
    return option({
        url: "/banner/query",
        method: "get"
    })
}

export const uploadBanner = (data) => {
    return option({
        url: "/banner/upload",
        method: "post",
        data
    })
}

export const uploadAvatar = (data) => {
    return option({
        url: "/user/modAvatar",
        method: "post",
        data
    })
}

export const updateUser = (data) => {
    return option({
        url: "/user/modInfo",
        method: 'put',
        params: {
            id: data.id,
            sex: data.sex,
            nickname: data.nickname,
            signature: data.signature
        }
    })
}

export const modAvatar = (data) => {
    return option({
        url: "/user/modAvatar",
        method: 'post',
        params: {
            id: data.id
        }
    })
}

export const getMusicList = () => {
    return option({
        url: "/music/query",
        method: "get"
    })
}

export const getMusicListFuzzy = (name) => {
    return option({
        url: "/music/queryFuzzy",
        method: "get",
        params: {
            name
        }
    })
}

export const getNewsList = () => {
    return option({
        url: "/news/query",
        method: "get"
    })
}

export const getMusicOne = (id) => {
    return option({
        url: '/music/queryOne',
        method: 'get',
        params: {
            id
        }
    })
}

export const getUserByName = (name) => {
    return option({
        url: '/user/queryByName',
        method: 'get',
        params: {
            name
        }
    })
}

export const modPassword = (data = {}) => {
    return option ({
        url: '/user/modPassword',
        method: 'put',
        data
    })
}

export const login = (data = {}) => {
    return option({
        url: 'user/login',
        method: 'post',
        data
    })
}

export const register = (data = {}) => {
    return option({
        url: 'user/register',
        method: 'post',
        data
    })
}