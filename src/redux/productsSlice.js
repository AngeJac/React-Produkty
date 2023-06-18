import { createSlice } from '@reduxjs/toolkit';
// import products from '../common/consts/airports';

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		productsList: [],
		selectedProduct: null,
		productsLoadingState: 'initial',
	},
	reducers: {
		loadProducts: (state, value) => {
			state.productsList = value.payload;
		},

		setSelectedProduct: (state, value) => {
			state.selectedProduct = value.payload;
		},
		setProductsLoadingState: (state, value) => {
			state.productsLoadingState = value.payload;
		},
	},
});

export const { loadProducts, setSelectedProduct, setProductsLoadingState } = productsSlice.actions;

export default productsSlice.reducer;
