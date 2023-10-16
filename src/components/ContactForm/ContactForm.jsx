import React, { useState } from "react";
import {Form} from './ContactForm.styled'
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, addContact } from 'redux/contacts/contactsSlice';

export const ContactForm = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);

    
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleDataInput = (e) => {
      let { id, value } = e.target;
      switch (id) {
        case 'name':
          setName(value);
          break;
        case 'number':
          setNumber(value);
          break;
        default:
          break;
      }
    };

    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      let normalizedName = name.toLowerCase();
      const id = nanoid();
      console.log({ id, name, number });
      let newContact = {id, name, number}
      if (contacts.find((contact) => contact.name.toLowerCase() === normalizedName)) {
        alert(`${name} is already in contacts.`)
        return
      };
      dispatch(addContact(newContact));
      reset();
    };

    const reset = () => {
      setName('');
      setNumber('');
    };

    

    
        
        return (
             <Form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name</label>
              <input
                type="text"
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                id='name'
                value={name}
                onChange={handleDataInput}
              />
              <label htmlFor='number'>Phone number</label>
              <input
                type="tel"
                pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                id='number'
                value={number}
                onChange={handleDataInput}
              />
              
              <button type='submit'>Add contact</button>
            </Form>
            );
    };


