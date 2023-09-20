import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactOperations';
import {
  selectError,
  selectIsLoading,
  selectContacts,
} from '../redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm button="Add contact" />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && !error ? (
        <b>Request in progress...</b>
      ) : error ? (
        <b>An error occurred: {error}</b>
      ) : !isLoading && contacts.length === 0 ? (
        <b>No contacts added</b>
      ) : (
        <Contacts />
      )}
    </section>
  );
};
