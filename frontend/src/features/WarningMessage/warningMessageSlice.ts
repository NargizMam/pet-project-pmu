import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface WarningMessageState {
  showErrorMessage: boolean;
  showSuccessMessage: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: WarningMessageState = {
  showErrorMessage: false,
  showSuccessMessage: false,
  errorMessage: null,
  successMessage: null,
};
const warningMessageSlice = createSlice({
  name: 'warningMessage',
  initialState,
  reducers: {
    openErrorMessage: (state) => {
      state.showErrorMessage = !state.showErrorMessage;
    },
    openSuccessMessage: (state) => {
      state.showSuccessMessage = !state.showSuccessMessage;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  }
});
export const warningMessageReducer = warningMessageSlice.reducer;

export const {
  openErrorMessage,
  openSuccessMessage,
  setSuccessMessage,
  clearSuccessMessage,
  setErrorMessage,
  clearErrorMessage
} = warningMessageSlice.actions;
export const selectShowErrorMessage = (state: RootState) => state.warningMessage.showErrorMessage;
export const selectShowSuccessMessage = (state: RootState) => state.warningMessage.showSuccessMessage;
