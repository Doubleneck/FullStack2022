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
  const courseExercisesTotal = courses.map(course => course.parts.map(part => part.exercises).reduce((result,number)=> result+number)) 
  
  console.log(courseExercisesTotal )
  
  return (
    <div>
      {courses.map(course => <ul key={course.id} ><h1>{course.name}</h1> 
      {course.parts.map(part => <li key={part.id} style={{height:30,listStyleType : "none"}}>{part.name} {part.exercises}</li>)}
       <li key={course.id} style={{height:30,listStyleType : "none",fontWeight: "bold"}}>total of {courseExercisesTotal[course.id-1]} exercises</li>
      </ul>)}
    </div>
  )
}


export default App