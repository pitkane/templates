import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
  initLoading: Boolean
}

const initialState: SliceState = { initLoading: true }

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.initLoading = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
