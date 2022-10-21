import axios from 'axios'
const baseUrl = 'api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('create',newObject.title)
  const newBlog = {
    title: newObject.title,
    author: newObject.author,
    url: newObject.url
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

/* const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
} */

export default { getAll, create,  setToken }