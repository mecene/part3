const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
// morgan middleware log in console the request info
morgan.token('body', req=>{ 
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//app.use(morgan.token('tiny')

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

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for 
        ${persons.length} 
        ${persons.length > 1
            ? 'people'
            : 'person'}
        </p> 
        ${new Date()}`
    )
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req,res)=>{
    const person = persons.find(person => person.id === Number(req.params.id))
    person
        ? res.json(person)
        : res.status(404).end()
})

app.delete('/api/persons/:id', (req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req,res)=>{
    const body = req.body
    const nameExist = persons.find(person => person.name === body.name)

    if(!body.name || !body.number){
       return  res.status(400).json({
        error: 'Name or number is missing'
       })
    }
    
    if(nameExist){
        return res.status(400).json({
            error : 'Name must be unique'
        })
    }

    const id = Math.floor(Math.random()*100000)
    const person = {"id": id, ...req.body}
    persons = persons.concat(person)
   
     res.status(200).end()
    
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})