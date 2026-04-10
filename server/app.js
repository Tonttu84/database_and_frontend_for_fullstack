import express from 'express'
import personsRouter from './routes/persons.js'
import errorHandler from './middleware/errorhandler.js'

const app = express()

app.use(express.json())

app.use('/api/persons', personsRouter)

app.use((req, res) => {
	res.status(404).json({ error: 'unknown endpoint' })
  })
  
app.use(errorHandler)


export default app