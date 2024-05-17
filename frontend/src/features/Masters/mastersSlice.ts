import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMasters } from './mastersThunk';
import { GlobalError, MasterApi } from '../../types';
import { RootState } from '../../app/store.ts';

interface MasterState {
  masters: MasterApi[];
  loading: boolean;
  error: GlobalError | null;
}

const initialState: MasterState = {
  masters: [],
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

  },
});


export const mastersReducer = mastersSlice.reducer;

export const selectMastersList = (state: RootState) => state.masters.masters;
export const selectMastersLoading = (state: RootState) => state.masters.loading;
export const selectMastersError = (state: RootState) => state.masters.error;
