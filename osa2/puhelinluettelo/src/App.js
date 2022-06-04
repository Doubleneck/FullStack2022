import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (personNames.includes(newName)){
      return alert(`${newName} is already added to phonebook`)
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
   
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }
  const personNames = persons.map(person => person.name)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>

          name: <input value={newName} 
          onChange={handleNameChange}
          />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <ul key={person.name}>{person.name}</ul>)} 
      </div>
    </div>
  )

}

export default App
