import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { GlobalError, Slot } from '../../types';

export const fetchAllSlots = createAsyncThunk<Slot[], void, { rejectValue: GlobalError }>(
  'slots/fetchAllSlots',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/slots');
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
export const fetchMastersSlots = createAsyncThunk<{ masterId: string; slots: Slot[] }, string, { rejectValue: GlobalError }>(
  'masters/fetchMasterSchedule',
  async (masterId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/slots/${masterId}`);
      return { masterId, slots: response.data };
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

