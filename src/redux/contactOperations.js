import { createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = 'https://64899a885fa58521caafe822.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (text, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        body: JSON.stringify(text),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
