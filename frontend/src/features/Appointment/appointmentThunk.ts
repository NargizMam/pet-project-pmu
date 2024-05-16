import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AppointmentApi, AppointmentApiFullInfo, GlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchAppointments = createAsyncThunk<AppointmentApi[], undefined, { rejectValue: GlobalError }>(
  'appointments/fetchAppointments',
  async (_, {rejectWithValue}) => {
    try{
      const response = await axiosApi.get('http://localhost:8000/appointments');
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);
export const fetchOneAppointmentInfo = createAsyncThunk<AppointmentApiFullInfo, string, { rejectValue: GlobalError }>(
  'appointments/fetchOneAppointmentInfo',
  async (id, {rejectWithValue}) => {
    try{
      const response = await axiosApi.get(`http://localhost:8000/appointments/${id}`);
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);

export const createAppointment = createAsyncThunk<string, AppointmentApi, { rejectValue: GlobalError }>(
  'appointments/addAppointment',
  async (appointmentData, {rejectWithValue}) => {
    try{
      const response = await axiosApi.post('http://localhost:8000/appointments', appointmentData)
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);

export const updateAppointment = createAsyncThunk<string, AppointmentApi, {rejectValue: GlobalError}>(
  'appointments/updateAppointment',
  async (appointmentData, {rejectWithValue}) => {
    try{
      const response = await axiosApi.put(`http://localhost:8000/appointments/${appointmentData._id}`, appointmentData);
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);

export const deleteAppointment = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
  'appointments/deleteAppointment',
  async (appointmentId, {rejectWithValue}) => {
    try{
      const response = await axiosApi.delete(`http://localhost:8000/appointments/${appointmentId}`);
      return response.data;
    }catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }

  }
);

