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

export default Course  