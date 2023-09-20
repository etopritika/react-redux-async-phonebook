import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactOperations';
import { selectContacts, selectFilter } from '../redux/selectors';
import css from '../css-modules/Contacts.module.css';

export default function Contacts() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const dispatch = useDispatch();

  const handleDeleteButton = id => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact => contact.name.toLowerCase().includes(filter))
    );
  }, [filter, contacts]);

  const itemsToRender = filter === '' ? contacts : filteredContacts;
  return (
    <>
      <ul className={css.contacts__list}>
        {itemsToRender.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={css.delete__button}
              onClick={() => handleDeleteButton(contact.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
