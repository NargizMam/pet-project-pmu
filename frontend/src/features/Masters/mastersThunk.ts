import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { GlobalError, MasterApi, Slot } from '../../types';

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

export const fetchMasterSchedule = createAsyncThunk<Slot[], string, { rejectValue: GlobalError }>(
  'masters/fetchMasterSchedule',
  async (masterId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/slots/${masterId}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
