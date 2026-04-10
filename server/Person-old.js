
import mongoose from 'mongoose'

if (!process.env.MONGODB_URI)
{
  console.log("Missing env variable")
  process.exit(1);
}
const url = process.env.MONGODB_URI


if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('Usage:')
  console.log('node script.js <password>')
  console.log('node script.js <password> <name> <number>')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})



const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
 .then(__result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })



const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length === 3) {
  Person.find({})
  .then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  })
  .catch(error => {
    console.log('error accessing database:', error.message)
  })
  .finally(() => {
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({ name, number })

  person.save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
    })
    .catch(error => {
      console.log('error saving person:', error.message)
    })
  .finally(() => {
    mongoose.connection.close()
  })
}

export default Person







