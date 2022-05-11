const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          {<button onClick={() => handleDelete(person.id)}> remove</button>}
        </li>
      ))}
    </div>
  );
};

export default Persons;
