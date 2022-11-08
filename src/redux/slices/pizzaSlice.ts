import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";

type PizzaType = {
  id:string,
  title:string,
  price:number,
  imageUrl:string,
  sizes:Array<number>,
  types:Array<number>
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceStateType {
  items: PizzaType[];
  status: Status;
}

export type SearchPizzaParamsType = {
  categoryId?: string;
  order: string,
  sortBy: string,
  category: string,
  search: string,
  currentPage: string,
}

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParamsType>('pizza/fetchPizzasStatus', async (params) => {
  const {order, sortBy, category, search, currentPage} = params;
  const {data} = await axios.get<PizzaType[]>(
      `https://62a4b5af47e6e400639730b6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data;
})

const initialState: PizzaSliceStateType = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaType[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const selectPizzaData = (state: RootState) => state.pizza;
export default pizzaSlice.reducer;
