import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true
	},
	number: {
	  type: String,
	  required: true
	}
  })

export default mongoose.model('Person', personSchema)