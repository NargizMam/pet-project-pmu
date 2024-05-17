import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllSlots, fetchMastersSlots } from './slotsThunk';
import { Slot } from '../../types';
import { RootState } from '../../app/store';
import { GlobalError } from '../../types';

interface SlotsState {
  allSlots: Slot[];
  masterSlots: Record<string, Slot[]>;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: SlotsState = {
  allSlots: [],
  masterSlots: {},
  loading: false,
  error: null,
};

const slotsSlice = createSlice({
  name: 'slots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSlots.fulfilled, (state, action: PayloadAction<Slot[]>) => {
        state.loading = false;
        state.allSlots = action.payload;
      })
      .addCase(fetchAllSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchMastersSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMastersSlots.fulfilled, (state, action: PayloadAction<{ masterId: string; slots: Slot[] }>) => {
        state.loading = false;
        state.masterSlots[action.payload.masterId] = action.payload.slots;
      })
      .addCase(fetchMastersSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const slotsReducer = slotsSlice.reducer;

export const selectAllSlots = (state: RootState) => state.slots.allSlots;
export const selectMasterSlots = (state: RootState, masterId: string) => state.slots.masterSlots[masterId] || [];
export const selectSlotsLoading = (state: RootState) => state.slots.loading;
export const selectSlotsError = (state: RootState) => state.slots.error;
