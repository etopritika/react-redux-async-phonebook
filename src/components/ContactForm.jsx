import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { addContact } from '../redux/contactOperations';
import { selectContacts } from '../redux/selectors';
import css from '../css-modules/ContactForm.module.css';

export const ContactForm = ({ button }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameId = nanoid();
    const newName = {
      id: nameId,
      name: name,
      number: number,
    };

    const existingContact = contacts.find(
      contact => contact.name === newName.name
    );
    if (existingContact) {
      alert(`${newName.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newName));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className="form__container">
      <form className={css.submit__form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">{button}</button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  button: PropTypes.string,
};
