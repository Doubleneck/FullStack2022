const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log(courses)
  return (
    <div>
      {courses.map(course => <ul key={course.id}> <Course course={course}/></ul>)}
    </div>
  )
}
const Course = ({course}) => {
  
  const totalExercises = course.parts.map(part => part.exercises).reduce((result,number)=> result+number)
  return(
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => <li key={part.id} style={{height:30,listStyleType : "none"}}>{part.name} {part.exercises}</li>)}
      <li key={course.id} style={{height:30,listStyleType : "none",fontWeight: "bold"}}>total of {totalExercises} exercises</li>
    </div>
  )
}



export default App