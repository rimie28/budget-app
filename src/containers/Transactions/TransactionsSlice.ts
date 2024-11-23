import axiosAPI from '../../axiosAPI.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../../types.ts';

type TransactionsState = {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
}

export const getTransactions = createAsyncThunk('transactions/getTransactions', async () => {
  const res = await axiosAPI.get('/transactions');
  return res.data;
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (transaction: Transaction) => {
  const response = await axiosAPI.post('/transactions', transaction);
  return response.data;
});

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (id: string) => {
  await axiosAPI.delete(`/transactions/${id}`);
  return id;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      });
  }
})

export default transactionsSlice.reducer;