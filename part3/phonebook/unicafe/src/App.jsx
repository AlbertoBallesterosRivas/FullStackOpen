import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((person) => person.name == newName)) {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setMessage(
          `Added '${newPerson.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      });
    } else {
      if(window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const oldPerson = persons.find(person => person.name === newName)
        personService.update(oldPerson.id, newPerson).then((response) => {
          // setPersons(persons.concat(response.data));
          setPersons(persons.map(person =>
            person.id === oldPerson.id ? { ...person, name: newName, number: newNumber, } : person
            )
          );
          setMessage(
            `'${newPerson.name}' edited`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
      }

    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (id) => {
    personService.remove(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
