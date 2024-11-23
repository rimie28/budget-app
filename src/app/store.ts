import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "../containers/Categories/CategoriesSlice.ts";
import transactionsReducer from "../containers/Transactions/TransactionsSlice.ts";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;