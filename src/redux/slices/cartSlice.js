import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItems = state.items.filter((items) => items.id === action.payload.id);
      const findItemUniq = findItems.find((item) => item.size === action.payload.size && item.type === action.payload.type);
      if (findItemUniq) {
        findItemUniq.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },
    removeItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type);
      state.items = state.items.filter((obj) => obj !== findItem);
      state.totalPrice = state.totalPrice - findItem.price * findItem.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItems = state.items.filter((items) => items.id === action.payload.id);
      const findItemUniq = findItems.find((item) => item.size === action.payload.size && item.type === action.payload.type);
      if (findItemUniq) {
        findItemUniq.count--;
        state.totalPrice = state.totalPrice - findItemUniq.price;
      }
    },
  }
});

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions;
export default cartSlice.reducer;
