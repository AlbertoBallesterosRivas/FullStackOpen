import Person from "./Person";

const Persons = ({ persons, filter, removePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <Person name={person.name} number={person.number} id={person.id} removePerson={removePerson} />
        ))}
    </ul>
  );
};

export default Persons;
