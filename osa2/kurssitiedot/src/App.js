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
  
  const parts = course.parts
  const exercises = parts.map(part=> part.exercises)
  const sumExercises = exercises.reduce((total, currentValue) => total = total + currentValue,0)
  
console.log(sumExercises);  // 600
  console.log(exercises)
  return(
    <div>
    <h1 key={course.id}>{course.name}</h1>
   
    {parts.map(part => <li key={part.id} style={{ lineHeight: 2, listStyleType: "none" }}>{part.name} {part.exercises}{'\n'}</li>)}
    <p><b>total of {sumExercises} exercises</b></p>
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