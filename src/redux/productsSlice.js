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
		filteredProductsList: [],
		inputValue: '',
		filterOnlyFood: false,
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
			state.shoppingProductsLoadingState = value.payload;
		},
		filterProducts: state => {
			let filteredProductsList = state.productsList.filter(product =>
				product.name.includes(state.inputValue.toLocaleLowerCase())
			);
			if (state.filterOnlyFood) {
				filteredProductsList = filteredProductsList.filter(product => product.isFood === true);
			}
			state.filteredProductsList = filteredProductsList;
		},
		setFilterOnlyFood: (state, value) => {
			state.filterOnlyFood = value.payload;
		},
		setInputValue: (state, value) => {
			state.inputValue = value.payload;
		},
	},
});

export const {
	loadProducts,
	setSelectedProduct,
	loadShoppingList,
	setProductsLoadingState,
	setShoppingProductsLoadingState,
	filterProducts,
	setInputValue,
	setFilterOnlyFood,
} = productsSlice.actions;

export default productsSlice.reducer;
