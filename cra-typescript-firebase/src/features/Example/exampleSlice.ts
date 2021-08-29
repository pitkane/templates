import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ExampleData } from '../../types'
import { getExampleData } from '../../utils/api'

type SliceState = {
  exampleData: ExampleData[]
  status: string
  error: any
}

const initialState: SliceState = {
  exampleData: [],
  status: 'idle',
  error: null,
}

export const fetchExampleData = createAsyncThunk('example/fetchExampleData', async () => {
  const exampleData = await getExampleData()
  return exampleData
})

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExampleData.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchExampleData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.exampleData = action.payload
    })
    builder.addCase(fetchExampleData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  },
})

export const exampleActions = exampleSlice.actions
