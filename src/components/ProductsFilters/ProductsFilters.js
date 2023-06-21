import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { setFilterOnlyFood, filterProducts, setInputValue } from '../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductsFilters() {
	const dispatch = useDispatch();
	const onlyFood = useSelector(state => state.products.filterOnlyFood);
	const inputFilter = useSelector(state => state.products.inputValue);

	const handleFilterOnlyFood = event => {
		dispatch(setFilterOnlyFood(event.target.checked));
		dispatch(filterProducts());
	};
	const handleInputValue = event => {
		dispatch(setInputValue(event.target.value));
		dispatch(filterProducts());
	};

	return (
		<div className={styles.filtersHeaderWrapper}>
			<Typography variant='h4'>Filtruj produkty: </Typography>
			<FormGroup>
				<div className={styles.filtersForm}>
					<FormControlLabel
						control={
							<TextField
								margin='dense'
								label='Nazwa'
								variant='outlined'
								value={inputFilter}
								onChange={handleInputValue}
							/>
						}
					/>
					<FormControlLabel
						control={<Checkbox />}
						checked={onlyFood}
						onChange={handleFilterOnlyFood}
						label='Tylko produkty spożywcze'
					/>
				</div>
			</FormGroup>
		</div>
	);
}

export default ProductsFilters;
