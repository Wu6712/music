import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: '/user/query',
    method: 'get',
  })
}

export function modPassword(data) {
  return request({
    url: '/user/modPassword',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteOne(data) {
  return request({
    url: '/user/del',
    method: 'delete',
    params: {
      id: data
    }
  })
}

export function queryByName(data) {
  return request({
    url: '/user/queryByName',
    method: 'get',
    params: {
      name: data
    }
  })
}
