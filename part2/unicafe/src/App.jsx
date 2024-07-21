import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (!persons.some((person) => person.name == newName)) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const removePerson = (id) => {
    personService.remove(id)
    setPersons(persons.filter(person => person.id !== id));
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
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
