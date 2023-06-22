import "./App.css";
import { useState } from "react";
function ProductRow({ product }) {
	const name = product.stocked ? (
		product.name
	) : (
		<span style={{ color: "red" }}>{product.name}</span>
	);

	return (
		<tr>
			<td>{name}</td>
			<td>{product.price}</td>
		</tr>
		/* <tr>
				<td>Mango</td>
				<td>$1</td>
			</tr>
			<tr>
				<td>Chikoo</td>
				<td>$1</td>
			</tr> */
	);
}

function ProductCategoryRow(props) {
	return (
		<tr>
			<th>{props.category}</th>
		</tr>
	);
}

function ProductTable({ products, filterabletext, inStock }) {
	let lastCategory = null;
	const rows = [];
	products.forEach((product) => {
		if (
			product.name.toLowerCase().indexOf(filterabletext.toLowerCase()) ===
			-1
		) {
			return;
		}
		if (inStock && !product.stocked) {
			return;
		}
		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					category={product.category}
					key={product.category}
				/>
			);
		}
		rows.push(<ProductRow product={product} key={product.name} />);
		lastCategory = product.category;
	});
	return (
		<>
			<table>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
				<tbody>{rows}</tbody>
			</table>
		</>
	);
}

function SearchBar({
	filterabletext,
	inStock,
	onFilterTextCange,
	oncheckBoxClick,
}) {
	return (
		<form>
			<input
				type="text"
				placeholder="Search"
				value={filterabletext}
				onChange={(e) => onFilterTextCange(e.target.value)}
			/>
			<br />
			<label>
				<input
					type="checkbox"
					onChange={(e) => oncheckBoxClick(e.target.checked)}
				/>{" "}
				Only Show Products in Stock
			</label>
		</form>
	);
}

function FilterableProductTable({ products }) {
	const [filterabletext, setfilterabletext] = useState("");
	const [inStock, setinStock] = useState(false);
	return (
		<>
			<SearchBar
				filterabletext={filterabletext}
				inStock={inStock}
				onFilterTextCange={setfilterabletext}
				oncheckBoxClick={setinStock}
			/>
			<ProductTable
				products={products}
				filterabletext={filterabletext}
				inStock={inStock}
			/>
		</>
	);
}

const PRODUCTS = [
	{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
	{ category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
	{ category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
	{ category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
	{ category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
	{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
export default function App() {
	return <FilterableProductTable products={PRODUCTS} />;
}
