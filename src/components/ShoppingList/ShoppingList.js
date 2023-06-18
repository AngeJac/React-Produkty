import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import React from 'react';

function ShoppingList() {
	return (
		<div className={commonColumnsStyles.App}>
			<header className={commonColumnsStyles.AppHeader}>
				<p>Shopping List</p>
			</header>
		</div>
	);
}

export default ShoppingList;
