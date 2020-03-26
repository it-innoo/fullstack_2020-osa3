const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ahlgren:${password}@cluster0-q7jus.mongodb.net/test?retryWrites=true&w=majority`

// console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
