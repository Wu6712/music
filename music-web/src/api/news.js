import request from "@/utils/request";

export function getDataList() {
  return request({
    url: '/news/query',
    method: 'get'
  })
}

export function deleteOne(id) {
  return request({
    url: '/news/del',
    method: 'delete',
    params: {
      id
    }
  })
}

export function insertOne(data) {
  return request({
    url: '/news/add',
    method: 'post',
    params: {
      name: data.name,
      link: data.link,
      content: data.content
    }
  })
}

export function updateOne(data) {
  return request({
    url: '/news/mod',
    method: 'put',
    params: {
      id: data.id,
      name: data.name,
      link: data.link,
      content: data.content
    }
  })
}
