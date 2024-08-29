const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const numberValidator = [
  {
    validator: function(value) {
      return value.length >= 8
    },
    message: 'Number must be at least 8 characters long'
  },
  {
    validator: function(value) {
      return /^\d{2,3}-\d+$/.test(value)
    },
    message: 'Number format must be XX-XXXXXXX or XXX-XXXXXXX'
  }
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: numberValidator
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)


module.exports = Person