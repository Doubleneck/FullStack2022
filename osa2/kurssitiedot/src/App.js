const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

const Course = ({course}) => {
  console.log(course.name)
  const parts = course.parts
  return(
    <div>
    <h1>{course.name}</h1>
   
    {parts.map(part => <li key={parts.id} style={{ listStyleType: "none" }}>{part.name} {part.exercises}</li>)}
    
    </div>
  )
}

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
export default App