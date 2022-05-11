import { useEffect, useState } from "react";
import "./App.css";

import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";
import Notification from "./components/Notification/Notification";
import Footer from "./components/Footer/Footer";

import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    flag: null,
  });

  useEffect(() => {
    personsServices.getAll().then((initialPersosns) => {
      setPersons(initialPersosns);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName.name,
      number: newName.number,
    };

    const existedPerson = persons.find(
      (person) => person.name === nameObject.name
    );

    if (existedPerson) {
      let isExecuted = window.confirm(
        `${existedPerson.name} exists. Do you want to replace it?`
      );
      if (isExecuted) {
        personsServices
          .editPerson(existedPerson.id, nameObject)
          .then((responseData) => {
            const personsCopy = [...persons];
            const existedPersonIndex = personsCopy.indexOf(existedPerson);
            personsCopy[existedPersonIndex] = responseData;
            setPersons(personsCopy);

            setNotification({
              message: `${existedPerson.name} is modified`,
              flag: "modified",
            });
            setTimeout(() => setNotification(""), 5000);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setNotification({
              message: error.response.data.error,
              flag: "error",
            });
          });
      }
    } else {
      personsServices
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");

          // console.log(returnedPerson.length);
          // if (returnedPerson.)
          setNotification({
            message: `${returnedPerson.name} is added`,
            flag: "successful",
          });
          setTimeout(() => setNotification(""), 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            flag: "error",
          });
          setTimeout(() => setNotification(""), 5000);
        });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewName((values) => ({ ...values, [name]: value }));
  };

  const handleDelete = (id) => {
    let isExecuted = window.confirm("Are you sure?");
    if (isExecuted) {
      personsServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNewName("");
          setNotification({
            message: `${
              persons.find((person) => person.id === id).name
            } is deleted`,
            flag: "deleted",
          });
          setTimeout(() => setNotification(""), 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Information for ${
              persons.find((person) => person.id === id).name
            } has already deleted`,
            flag: "error",
          });
        });
    }
  };

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearchResult(search);
  };

  const personsToShow =
    searchResult === ""
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(searchResult.toLowerCase());
        });

  return (
    <div>
      <h1>Phone book</h1>
      <Notification message={notification.message} flag={notification.flag} />

      <Filter handleSearch={handleSearch} searchResult={searchResult} />
      <h1>Add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        name={newName.name}
        number={newName.number}
      />

      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
      <Footer />
    </div>
  );
};

export default App;
