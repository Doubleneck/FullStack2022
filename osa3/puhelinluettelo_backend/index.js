const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :person'),)
//app.listen(8080, () => {
//  console.log('Server listening on port :8080');
//});

morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

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
    const personids = persons.map(person => person.id)
    if (personids.includes(id)){
      persons = persons.filter(person => person.id !== id)
      response.status(204).end()
    } else{
      response.status(404).send({ error: 'unknown endpoint' })
    }
    
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
    // console.log(person)
    response.json(person)
  })
 
  app.put('/api/persons/:id', (request, response) => {  
    const id = Number(request.params.id)
    const personids = persons.map(person => person.id)
    if (personids.includes(id)){
      const body = request.body
      console.log('request body', body)
      const newPerson = {
          name: body.name,
          number: body.number,
          id:id
        }    
      persons = persons.map(person => person.id !== id ? person : newPerson)
      console.log('new person', newPerson)
      response.json(newPerson)
    } else {
      response.status(404).send({ error: 'unknown endpoint' })
    }
  })
 
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)

