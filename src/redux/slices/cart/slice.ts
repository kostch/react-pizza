import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../store";
import {getCartFromLS} from "../../../utils/getCartFromLS";
import {calcTotalPrice} from "../../../utils/calcTotalPrice";
import {CartItemType, CartSliceState} from "./types";

const initialState: CartSliceState =  getCartFromLS();

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
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

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<CartItemType>) {
            const findItem: any = state.items.find(obj => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type);
            state.items = state.items.filter((obj) => obj !== findItem);
            state.totalPrice = state.totalPrice - findItem.price * findItem.count;
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        minusItem(state, action: PayloadAction<CartItemType>) {
            const findItems = state.items.filter((items) => items.id === action.payload.id);
            const findItemUniq = findItems.find((item) => item.size === action.payload.size && item.type === action.payload.type);
            if (findItemUniq) {
                findItemUniq.count--;
                state.totalPrice = state.totalPrice - findItemUniq.price;
            }
        },
    }
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.filter((obj: CartItemType) => obj.id === id);
export const {addItem, removeItem, minusItem, clearItems} = slice.actions;
export default slice.reducer;
