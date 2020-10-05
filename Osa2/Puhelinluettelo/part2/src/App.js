import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./App.css";
import Notification from "./components/Notification";
import Error from "./components/Error";

const Filter = ({ searchName, handleFilterChange }) => (
  <>
    <div>
      <div>
        <input value={searchName} onChange={handleFilterChange} />
      </div>
    </div>
    <div>
      <button type="submit">Rajaa</button>
    </div>
  </>
);

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => (
  <form onSubmit={addName}>
    <div>
      <div>
        Nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Numero: <input value={newNumber} onChange={handleNumberChange} />
      </div>
    </div>
    <div>
      <button type="submit">Lisää</button>
    </div>
  </form>
);

const PhoneBookList = ({ persons, searchName, handleDeleteClick }) => (
  <>
    {persons
      .filter(
        ({ name }) =>
          name && name.toLowerCase().includes(searchName.toLowerCase())
      )
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDeleteClick(person)} value={person.id}>
            Poista
          </button>
        </p>
      ))}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService.getAllPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameInfo = {
      name: newName,
      number: newNumber,
    };

    const nameChecker = persons.find(({ name }) => name === nameInfo.name);
    if (!nameChecker) {
      personService.createPerson(nameInfo).then((personResult) => {
        setPersons(persons.concat(personResult));
        setNotification(`${personResult.name} lisätty luetteloon!`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
        .catch(error => {
          console.log(error.response.data);
          setError(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    } else {
      const selection = window.confirm(
        `${newName} on jo lisätty luetteloon, haluatko päivittää numeron?`
      );
      if (selection) {
        personService
          .updatePerson(nameChecker.id, nameInfo)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNotification(`Henkilön ${returnedPerson.name} tiedot muutettu!`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setError(`Henkilö '${newName}' on jo poistettu tietokannasta!`);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleDeleteClick = (person) => {
    const { name, id } = person;
    if (window.confirm(`Haluatko varmasti poistaa henkilön ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() =>
          personService.getAllPersons().then((persons) => {
            setPersons(persons);
            setNotification(`${person.name} poistettu tietokannasta!`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
        )
        .catch((error) => {
          console.log(error);
          setError(`Henkilö ${name} on jo poistettu tietokannasta!`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification msg={notification} />
      <Error msg={error} />
      <h3>Etsi nimellä</h3>
      <Filter searchName={searchName} handleFilterChange={handleFilterChange} />
      <h3>Lisää uusi numero</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <PhoneBookList
        persons={persons}
        searchName={searchName}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default App;
