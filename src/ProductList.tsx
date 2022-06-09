import React from 'react';
import './App.css';
import {Product, Products} from './ProductModels';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
	gql, useQuery, useMutation
} from "@apollo/client";

const PRODUCTS = gql`
query Products {
  products {
    id
    name
    stock
    price
    created
  }
}
`;

function ProductList() {
	let navigate = useNavigate();

	function createNewProduct() {
		navigate("/create");
	}
	function detailProduct(id:number) {
		navigate("/detail");
	}
	React.useEffect(()=>{		
		refetch();
	},[]);

	const { loading, error, data, refetch } = useQuery<Products>(PRODUCTS);
	return (
		<div className='container'>
			<h3>Products</h3>
			<div>
				<button type="button" className="btn btn-primary" onClick={createNewProduct}>Create new Product</button>
			</div>
			<br/>
			{loading ? (
				<p>Loading ...</p>
			) : (
				<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Stock</th>
						<th scope="col">Price</th>
						<th scope="col">Created</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data && data.products.map(product => (
					<tr key={product.id}>
						<td scope="row"><Link to={"/detail/" + product.id}>{product.id}</Link> </td>
						<td scope="row">{product.name}</td>
						<td scope="row">{product.stock}</td>
						<td scope="row">{product.price}</td>
						<td scope="row">{product.created}</td>
						<td scope="row">							
							<button type="button" className="btn btn-primary">Edit</button> &nbsp;
							<button type="button" className="btn btn-primary">Delete</button>
						</td>
					</tr>
					))}
				</tbody>
				</table>
			)}
		</div>
	)

}

export default ProductList;