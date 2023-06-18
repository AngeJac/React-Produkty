import React from 'react';
import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct, setProductsLoadingState } from '../../redux/productsSlice';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function ProductsList() {
	const productsList = useSelector(state => state.products.productsList);
	const loadingStatus = useSelector(state => state.products.productsLoadingState);
	const dispatch = useDispatch();

	const handleItemClick = async product => {
		try {
			dispatch(setProductsLoadingState('loading'));
			const responseProd = await axios.get(`http://localhost:9000/products/${product.id}`);
			dispatch(setSelectedProduct(responseProd.data));
			dispatch(setProductsLoadingState('success'));
		} catch (error) {
			dispatch(setProductsLoadingState('error'));
		}
	};
	return (
		<div className={commonColumnsStyles.AppColumn}>
			<header className={commonColumnsStyles.AppHeader}>
				<p>Products list</p>
				{loadingStatus === 'loading' ? (
					<CircularProgress />
				) : productsList.length > 0 ? (
					productsList.map(product => (
						<span onClick={() => handleItemClick(product)}>
							{' '}
							{product.name} {product.id}{' '}
						</span>
					))
				) : (
					'no products to display'
				)}
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
