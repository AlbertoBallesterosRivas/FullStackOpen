const Person = ({ name, number, id, removePerson }) => {
  const handleDeleteClick = () => {
    window.confirm(`Delete '${name}'?`) ? removePerson(id) : "";
  };
  return (
    <li key={id}>
      {name} {number}
      <button onClick={handleDeleteClick}>delete</button>
    </li>
  );
};

export default Person;
