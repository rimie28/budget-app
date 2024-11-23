import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import { Category } from '../../types.ts';


type CategoriesState = {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
}

export const getCategories = createAsyncThunk('categories/getCategories', async() => {
  const res = await axiosAPI.get('/categories');
  return res.data
})

export const addCategory = createAsyncThunk('categories/addCategories', async(category) => {
  const res = await axiosAPI.post('/categories', category);
  return res.data
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async(id:string) => {
  await axiosAPI.delete(`/categories/${id}`)
  return id;
})


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload)
      })
  }
})

export default categoriesSlice.reducer;

