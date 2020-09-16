import React, { useState } from "react";
import ReactDOM from "react-dom";

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

const PhoneBookList = ({ persons, searchName }) => (
  <>
    {persons
      .filter(({ name }) =>
        name.toLowerCase().includes(searchName.toLowerCase())
      )
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameInfo = {
      name: newName,
      number: newNumber,
    };

    const nameChecker = persons.find(({ name }) => name === nameInfo.name);
    if (!nameChecker) {
      setPersons(persons.concat(nameInfo));
    } else {
      window.alert(`${newName} on jo lisätty luetteloon!`);
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

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <h3>Etsi nimellä</h3>
      <Filter
        searchName={searchName}
        handleFilterChange={handleFilterChange}
      />
      <h3>Lisää uusi numero</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <PhoneBookList persons={persons} searchName={searchName} />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
