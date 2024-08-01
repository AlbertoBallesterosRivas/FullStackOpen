require('dotenv').config()
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express();

app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456"
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523"
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345"
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122"
//   }
// ];

// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/info", (request, response) => {
  const currentTime = new Date();

  Person.find({}).then(persons => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p></br><p>${currentTime}</p>`
    );
  })

  // response.send(
  //   `<p>Phonebook has info for ${persons.length} people</p></br><p>${currentTime}</p>`
  // );
});

app.get("/api/persons/:id", (request, response) => {
  // const id = request.params.id;
  // const person = persons.find(person => person.id === id);

  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }

  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter(person => person.id !== id);

//   response.status(204).end();
// });

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body)
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: "name missing"
  //   });
  // }else if (!body.number) {
  //   return response.status(400).json({
  //     error: "number missing"
  //   });
  // }else if (persons.some(person => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   });
  // }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  // };

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })

  // persons = persons.concat(person);

  response.json(person);
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
