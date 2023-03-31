require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const errorHandeler = require('./middleware/errorHandeler')

app.use(express.static('build'))
app.use(express.json())
// morgan middleware log in console the request info
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


app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            person
                ?res.json(person)
                :res.status(404).end()
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove({ id: req.params.id })
        .then(person => {
            //console.log(person.name, 'has been deleted')
            res.status(204).end()
        })
        .catch(error => next(error))
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

app.use(errorHandeler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})