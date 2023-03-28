const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://mecene:${password}@cluster0.ivuwni8.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
    console.log('Phonebook:');
    Person.find({})
        .then(response => {
            response.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })

} else {

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}


