/* eslint-disable react-hooks/exhaustive-deps */
import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadShoppingList, setShoppingProductsLoadingState } from '../../redux/productsSlice';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function ShoppingList() {
	const shoppingList = useSelector(state => state.products.shoppingList);
	const loadingStatus = useSelector(state => state.products.shoppingProductsLoadingState);
	const [deleteProductId, setDeleteProductId] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getShoppingListFromApi() {
			try {
				const responseShoppingList = await axios.get(`http://localhost:9000/products/shoppingList`);
				dispatch(loadShoppingList(responseShoppingList.data));
			} catch (error) {
				console.log(error);
			}
		}
		getShoppingListFromApi();
	}, [dispatch]);

	const deleteProductFromShoppingList = async product => {
		try {
			setDeleteProductId(product.id);
			dispatch(setShoppingProductsLoadingState('Removeing product'));
			await axios.delete(`http://localhost:9000/products/shoppingList/${product.id}`);
			const responseShoppingList = await axios.get(`http://localhost:9000/products/shoppingList`);
			dispatch(loadShoppingList(responseShoppingList.data));
			dispatch(setShoppingProductsLoadingState('success'));
		} catch (error) {
			dispatch(setShoppingProductsLoadingState('error'));
		}
	};

	return (
		<div className={commonColumnsStyles.App}>
			<header className={commonColumnsStyles.AppHeader}>
				<p>Shopping List</p>
				{shoppingList.length > 0
					? shoppingList.map((product, index) => (
							<span onClick={() => deleteProductFromShoppingList(product, index)}>
								{' '}
								{index + 1} {product.name}{' '}
								{loadingStatus === 'Removing product' && product.id === deleteProductId ? <CircularProgress /> : ''}
							</span>
					  ))
					: 'no products to display'}
			</header>
		</div>
	);
}

export default ShoppingList;
