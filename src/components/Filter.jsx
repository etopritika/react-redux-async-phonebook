import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterContact } from '../redux/contactSlice';
import css from '../css-modules/Filter.module.css';

export default function Filter() {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  const filterInputChange = e => {
    const filterInputValue = e.currentTarget.value;
    setFilter(filterInputValue);
    dispatch(filterContact(filterInputValue.toLowerCase()));
  };

  return (
    <div className={css.filter__container}>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={filterInputChange}
        />
      </label>
    </div>
  );
}
