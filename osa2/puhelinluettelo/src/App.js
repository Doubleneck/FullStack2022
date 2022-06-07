import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personNames.includes(newName)){
      return alert(`${newName} is already added to phonebook`)
    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
    })
  }

  const removePerson = (event) => {
    event.preventDefault()
    const person =  persons.filter(person => person.id.toString() === event.target.value.toString())[0]
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(event.target.value)
        .then(() => {
          setPersons(persons.filter(person => person.id.toString() !== event.target.value))
      })
    } 
  }
  const personNames = persons.map(person => person.name)
  const personsToShow = showAll
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons
    // console.log(persons.filter(person => person.name.includes(newFilter.toLowerCase())))


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)   
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <h2>add a new</h2>
      < PersonForm addPerson={addPerson} newName = {newName }newNumber = {newNumber} handleNameChange={handleNameChange}
      handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      <Persons personstoShow = {personsToShow} removePerson = {removePerson}/> 
      </ul>
    </div>
  )
}

const Person = ({person,removePerson}) => {
  return(
    <div>
      {person.name} {person.number}    
      <button value = {person.id} onClick={removePerson}>
        delete 
      </button>
    </div>
  )
}

const Persons = ({personstoShow,removePerson}) => {
  return(
    <div>
    {personstoShow.map(person => <ul style={{padding:0}} key = {person.id}><Person person={person} removePerson={removePerson}
    />
    </ul>)} 
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <div>
     <form onSubmit={props.addPerson}>
        <div> name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div> number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div> 
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return(
  <div> filter shown with: <input value={props.newFilter} onChange={props.handleFilterChange}/></div>
  )
}

export default App