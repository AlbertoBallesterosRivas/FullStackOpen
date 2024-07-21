import Person from "./Person";

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.includes(filter))
        .map((person) => (
          <Person name={person.name} number={person.number} />
        ))}
    </ul>
  );
};

export default Persons;
