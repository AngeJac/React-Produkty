import { createSlice } from '@reduxjs/toolkit';
// import products from '../common/consts/airports';

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		productsList: [],
		selectedProduct: null,
		productsLoadingState: 'initial',
		shoppingList: [],
		shoppingProductsLoadingState: 'initial',
	},
	reducers: {
		loadProducts: (state, value) => {
			state.productsList = value.payload;
		},

		setSelectedProduct: (state, value) => {
			state.selectedProduct = value.payload;
		},
		loadShoppingList: (state, value) => {
			state.shoppingList = value.payload;
		},
		setProductsLoadingState: (state, value) => {
			state.productsLoadingState = value.payload;
		},
		setShoppingProductsLoadingState: (state, value) => {
			state.shoppingProductsLoadingStateLoadingState = value.payload;
		},
	},
});

export const {
	loadProducts,
	setSelectedProduct,
	loadShoppingList,
	setProductsLoadingState,
	setShoppingProductsLoadingState,
} = productsSlice.actions;

export default productsSlice.reducer;
