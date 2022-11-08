import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type SortType = {
  name: string,
  sortProperty: SortPropertyEnum,
}

interface FilterSliceStateType {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: SortType,
}

const initialState: FilterSliceStateType = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceStateType>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC
        }
      }

    }
  }
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const {setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions;
export default filterSlice.reducer;
