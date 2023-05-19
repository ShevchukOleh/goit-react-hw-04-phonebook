import {useState , useEffect} from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? 
  [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])
  const [filter, setFilter] = useState('');

  useEffect((prevState) =>{
    if(prevState !== contacts) {
      const localString = JSON.stringify(contacts)
      window.localStorage.setItem('contacts', localString)
    }
  }, [contacts])

  const handleSubmit = (formData) => {
    const { name } = formData;
    
    if (contacts.find(el => name === el.name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...formData,
    };

    setContacts([newContact, ...contacts]);
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const visibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  
  const handleDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
  };

  return (
    <div style={{padding: "5px 20px"}}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit}/>

      <h2>Contacts</h2>
      <Filter onFilter={handleFilterChange} value={filter}/>
      <ContactList deleteContact={handleDeleteContact} contacts={visibleContacts()} />
    </div>
  );
}

export default App;