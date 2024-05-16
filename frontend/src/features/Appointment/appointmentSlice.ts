import { createSlice } from '@reduxjs/toolkit';
import { AppointmentApi, AppointmentApiFullInfo, GlobalError } from '../../types';
import { RootState } from '../../app/store.ts';
import {
  createAppointment,
  deleteAppointment,
  fetchAppointments,
  fetchOneAppointmentInfo,
  updateAppointment
} from './appointmentThunk.ts';

interface AppointmentState {
  appointments: AppointmentApi[];
  oneAppointment: AppointmentApiFullInfo | null,
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  deleting: boolean;
  creating: boolean;
  updating: boolean;
  successMessage: string | null;
  errorMessage: GlobalError | null;
}

const initialState: AppointmentState = {
  appointments: [],
  fetchLoading: false,
  oneAppointment: null,
  fetchOneLoading: false,
  deleting: false,
  creating: false,
  updating: false,
  successMessage: null,
  errorMessage: null,
}

const AppointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, { payload: appointments }) => {
        state.fetchLoading = false;
        state.appointments = appointments;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(fetchAppointments.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchOneAppointmentInfo.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchOneAppointmentInfo.fulfilled, (state, { payload: appointment }) => {
        state.fetchLoading = false;
        state.oneAppointment = appointment;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(fetchOneAppointmentInfo.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createAppointment.pending, (state) => {
        state.creating = true;
      })
      .addCase(createAppointment.fulfilled, (state, { payload: success }) => {
        state.creating = false;
        state.successMessage = success;
        state.errorMessage = null;
      })
      .addCase(createAppointment.rejected, (state, { payload: error }) => {
        state.creating = false;
        state.errorMessage = error || null;;
        state.successMessage = null;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateAppointment.fulfilled, (state, { payload: success }) => {
        state.updating = false;
        state.successMessage = success;
        state.errorMessage = null;
      })
      .addCase(updateAppointment.rejected, (state, { payload: error }) => {
        state.updating = false;
        state.errorMessage = error || null;;
        state.successMessage = null;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, { payload: success }) => {
        state.deleting = false;
        state.successMessage = success;
        state.errorMessage = null;
      })
      .addCase(deleteAppointment.rejected, (state, { payload: error }) => {
        state.deleting = false;
        state.errorMessage = error || null;
        state.successMessage = null;
      });
  }
});

export const appointmentReducer = AppointmentsSlice.reducer;

export const selectAppointmentsList = (state: RootState) => state.appointments.appointments;
export const selectAppointmentsFetching = (state: RootState) => state.appointments.fetchLoading;
export const selectOneAppointment = (state: RootState) => state.appointments.oneAppointment;
export const selectOneAppointmentsFetching = (state: RootState) => state.appointments.fetchOneLoading;
export const selectAppointmentCreating = (state: RootState) => state.appointments.creating;
export const selectAppointmentUpdating = (state: RootState) => state.appointments.updating;
export const selectAppointmentDeleting = (state: RootState) => state.appointments.deleting;
export const selectSuccessMessage = (state: RootState) => state.appointments.successMessage;
export const selectErrorMessage = (state: RootState) => state.appointments.errorMessage;

// .catch((error) => {
//   dispatch(setError(error)); // Обработка ошибки
// });