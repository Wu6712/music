import request from "@/utils/request";

export function getList() {
  return request({
    url: '/banner/query',
    method: 'get'
  })
}

export function deleteOne(data) {
  return request({
    url: '/banner/del',
    method: 'delete',
    params: {
      id: data
    }
  })
}

export function insertOne(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    params: {
      name: data.name,
      link: data.link
    }
  })
}
