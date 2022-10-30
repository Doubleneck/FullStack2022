import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (props) => {
  const object = { content: props, votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upDate = async (props) => {
  const id = props.id
  const object = { content: props.content, votes : props.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll , createNew, upDate}