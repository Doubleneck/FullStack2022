const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        id: 1,
        name: 'Arto Hellas', 
        number: '040-123456' ,
    },
    {
        id: 2,
        name: 'Ada Lovelace', 
        number: '39-44-5323523'
    },    
    {
        id:3,
        name: 'Dan Abramov',  
        number: '12-43-234345'
    },
    {
        id:4,
        name: 'Mary Poppendieck', 
        number: '39-23-6423122'
    }          
]

app.get('/info', (req, res) => {
    
    const size = persons.length
    const currentTimeInSeconds=new Date().toString()
    console.log(currentTimeInSeconds)
  res.send(`<div>Phonebook has info for ${size} people</div> ${currentTimeInSeconds} <div> </div>`)
})

app.get('/api/persons', (req, res) => {
    
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})  
const generateId = () => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const randomId = getRandomInt(100000000)
    return randomId
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    names = persons.map(p => p.name)
    
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
    }

    if (names.includes(body.name)) {
        return response.status(400).json({ 
          error: 'name is already added to phonebook' 
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id:generateId()
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})