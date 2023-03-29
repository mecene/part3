require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
// morgan middleware log in console the request info
app.use(express.static('build'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//app.use(morgan.token('tiny')

app.get("/info", (req, res) => {
    Person.find({}).then(persons => {
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
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})



app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)

        })
        .catch((error) => {
            console.log("error couldn't find this person", error.message)
            res.status(404).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove({ id: req.params.id })
        .then(person => {
            console.log(person.name, 'has been deleted')
            res.status(204).end()

        })
        .catch((error) => {
            console.log("An error happened when trying to delete person", error.message)
            res.status(400).end()
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(result => {
        console.log("added to DB ", result.name)
        res.status(200).end()

    })

    res.status(200).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})