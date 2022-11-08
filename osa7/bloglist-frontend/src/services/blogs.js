import axios from 'axios'
const baseUrl = 'api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  console.log('create', newObject.title)
  const newBlog = {
    title: newObject.title,
    author: newObject.author,
    url: newObject.url,
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.put(`${baseUrl}/${id}`, newObject, config)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, remove, update, setToken }
