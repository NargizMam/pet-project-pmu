import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { GlobalError, MasterApi } from '../../types';

export const fetchMasters = createAsyncThunk<MasterApi[], void, { rejectValue: GlobalError }>(
  'masters/fetchMasters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/masters');
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);


