import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMasters, fetchMasterSchedule } from './mastersThunk';
import { MasterApi, GlobalError, Slot } from '../../types';

interface MasterState {
  masters: MasterApi[];
  schedule: Record<string, Slot[]>;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: MasterState = {
  masters: [],
  schedule: {},
  loading: false,
  error: null,
};

const mastersSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasters.fulfilled, (state, action: PayloadAction<MasterApi[]>) => {
        state.loading = false;
        state.masters = action.payload;
      })
      .addCase(fetchMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchMasterSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasterSchedule.fulfilled, (state, action: PayloadAction<Slot[]>) => {
        const masterId = action.meta.arg;
        state.loading = false;
        state.schedule[masterId] = action.payload;
      })
      .addCase(fetchMasterSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});


export const mastersReducer = mastersSlice.reducer;

export const selectMastersList = (state: RootState) => state.masters.masters;
export const selectMastersLoading = (state: RootState) => state.masters.loading;
export const selectMastersError = (state: RootState) => state.masters.error;
export const selectMasterSchedule = (state: RootState, masterId: string)=> state.masters.schedule[masterId];
