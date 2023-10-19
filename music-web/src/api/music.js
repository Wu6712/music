import request from "@/utils/request";

export function getList() {
  return request({
    url: '/music/query',
    method: 'get'
  })
}

export function insertOne(data) {
  return request({
    url: '/music/add',
    method: 'post',
    params: {
      name: data.data,
      link: data.link
    }
  })
}

export function deleteOne(data) {
  return request({
    url: '/music/del',
    method: 'delete',
    params: {
      id: data
    }
  })
}
