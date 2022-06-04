import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personNames.includes(newName)){
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll
  
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons
    console.log(persons.filter(person => person.name.includes(newFilter.toLowerCase())))


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    
  }
  const personNames = persons.map(person => person.name)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <div> filter shown with: <input value={newFilter} onChange={handleFilterChange}/></div>
      </div>  
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div> 
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => <ul style={{padding:0}} key={person.name}>{person.name} {person.number}</ul>)} 
      </div>
    </div>
  )
}

export default App
