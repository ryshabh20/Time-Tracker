import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeEntry {
  _id: string;
  start_time: Date;
  end_time?: Date;
  duration?: number;
  task: string;
}

interface TimeEntryState {
  data: TimeEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: TimeEntryState = {
  data: null,
  loading: false,
  error: null,
};

const timeEntrySlice = createSlice({
  name: "timeEntry",
  initialState,
  reducers: {
    setTimeEntryLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTimeEntryError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setTimeEntry(state, action: PayloadAction<TimeEntry | null>) {
      state.data = action.payload;
    },
  },
});

export const { setTimeEntryLoading, setTimeEntryError, setTimeEntry } =
  timeEntrySlice.actions;

export default timeEntrySlice.reducer;
