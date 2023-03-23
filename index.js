const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/info", (req, resp) => {
    resp.send(
        `<p>Phonebook has info for 
        ${persons.length} 
        ${persons.length > 1
            ? 'people'
            : 'person'}
        </p> 
        ${new Date()}`
    )
})

app.get("/api/persons", (req, resp) => {
    resp.json(persons)
})

app.get('/api/persons/:id', (req,resp)=>{
    const person = persons.find(person => person.id === Number(req.params.id))
    person
        ? resp.json(person)
        : resp.status(404).end()
})

app.delete('/api/persons/:id', (req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons);
    res.status(204).end()
})

app.post('/api/persons', (req,res)=>{
    const id = Math.floor(Math.random()*100000)
    const person = {"id": id, ...req.body}
    persons = persons.concat(person)
    res.status(200).end()
    
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})