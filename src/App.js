import React, { useState } from 'react';
import './App.css';
import contacts from './contacts.json';

function App() {
  // Initialize state variables for the contact list and remaining contacts
  const [contactList, setContactList] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5));

  // Function to sort contacts by name
  const sortByName = () => {
    const sortedContacts = [...contactList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactList(sortedContacts);
  };

  // Function to sort contacts by popularity
  const sortByPopularity = () => {
    const sortedContacts = [...contactList].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactList(sortedContacts);
  };

  // Function to add a random contact to the list
  const getRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert('No more contacts to add.');
      return;
    }

    // Generate a random index to select a contact
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    // Update the remaining contacts by filtering out the selected contact
    const updatedRemainingContacts = remainingContacts.filter(
      (contact) => contact.id !== randomContact.id
    );

    // Update the contact list and remaining contacts using state setters
    setContactList((prevList) => [...prevList, randomContact]);
    setRemainingContacts(updatedRemainingContacts);
  };

  // Function to delete a contact from the list
  const deleteContact = (id) => {
    // Filter out the contact with the specified ID
    const updatedContacts = contactList.filter((contact) => contact.id !== id);

    // Update the contact list using the state setter
    setContactList(updatedContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={getRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : null}</td>
              <td>{contact.wonEmmy ? '🏆' : null}</td>
              <td>
                {/* Button to delete the contact */}
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;