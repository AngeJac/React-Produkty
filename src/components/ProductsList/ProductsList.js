import React from 'react';
import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingProductsLoadingState, loadShoppingList } from '../../redux/productsSlice';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { uniqueId } from 'lodash';

function ProductsList() {
	const productsList = useSelector(state => state.products.filteredProductsList);
	const loadingStatus = useSelector(state => state.products.productsLoadingState);
	const dispatch = useDispatch();

	const addProductShoppingList = async product => {
		try {
			dispatch(setShoppingProductsLoadingState('loading'));
			await axios.post(`http://localhost:9000/products/shoppingList/new`, {
				...product,
				id: uniqueId() + Date.now(),
			});
			const responseShoppingList = await axios.get(`http://localhost:9000/products/shoppingList`);
			dispatch(loadShoppingList(responseShoppingList.data));
			dispatch(setShoppingProductsLoadingState('success'));
		} catch (error) {
			console.log(`something went wrong: ${error}`);
		}
	};

	return (
		<div className={commonColumnsStyles.AppColumn}>
			<header className={commonColumnsStyles.AppHeader}>
				<p>Products list</p>
				{productsList.length > 0
					? productsList.map(product => (
							<span key={product.id} onClick={() => addProductShoppingList(product)}>
								{' '}
								{product.id} {product.name}
								{loadingStatus === 'Adding product' ? <CircularProgress /> : ''}
							</span>
					  ))
					: 'no products to display'}
				{/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
				{/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
			</header>
		</div>
	);
}

export default ProductsList;
