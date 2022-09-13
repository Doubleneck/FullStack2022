/* eslint-disable no-unused-vars */
const dummy = (blogs) => {   
  return 1
}
  
const totalLikes= (blogs) => {   
  const likesList = blogs.map(b => b.likes)   
  const reducer = (accumulator, curr) => accumulator + curr
  return likesList.reduce(reducer)
}

const favoriteBlog= (blogs) => {   
  const likesList = blogs.map(b => b.likes)  
  const max = Math.max(...likesList)
  const index = likesList.indexOf(max)
  return blogs[index]
}

module.exports = {
  dummy,totalLikes,favoriteBlog
}

