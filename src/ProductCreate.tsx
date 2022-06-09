import './App.css';
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import {Product, Products} from './ProductModels';

import {
	gql, useQuery, useMutation
} from "@apollo/client";


const CREATEPRODUCT = gql`
mutation ProductCreate($prod: InputProduct) {
  ProductCreate(prod: $prod) {
    id
    name
    stock
    price
    created
  }
}
`;

function ProductCreate() {	
	let navigate = useNavigate();
	// const [product, setProduct] = useState<Product>({
	// 	id: 0,
	// 	name: "",
	// 	stock: 0,
	// 	price: 0,
	// 	created: (new Date()).toDateString()
	// });
	const [productname, setProductname] = useState('');
	const [stock, setStock] = useState(0);
	const [price, setPrice] = useState(0);

	const [productCreate, { data, loading, error }] = useMutation<{
			ProductCreate:Product,
			prod: Product
		}>(CREATEPRODUCT, {
		variables: {		  
		  prod: {
			id: 0,
			name: productname,
			stock: stock,
			price: price,
			created: (new Date()).toDateString()
		  }
		}});	

	function submittedForm(e:any) {
		e.preventDefault();

		productCreate().then((product)=>{
			console.log(JSON.stringify(product));
			navigate("/");
		});		
	};
	function backtoHome() {
		navigate("/");
	}

	return (
		<div className='container'>
			<h2>Product Form</h2>
			<form onSubmit={submittedForm}>
				<div className="mb-3">
					<label htmlFor="productname" className="form-label">Product Name</label>
					<input type="text" className="form-control" id="productname"
						name="productname" value={productname} onChange={e => setProductname(e.target.value)} />

				</div>
				<div className="mb-3">
					<label htmlFor="stock" className="form-label">Stock</label>
					<input type="number" className="form-control" id="stock"
						name="stock" value={stock} onChange={e => setStock(Number(e.target.value))}  />

				</div>
				<div className="mb-3">
					<label htmlFor="price" className="form-label">Price</label>
					<input type="number" className="form-control" id="price"
						name="price" value={price} onChange={e => setPrice(Number(e.target.value))}  />

				</div>				
				<button type="button" className="btn btn-primary"  onClick={backtoHome}>Cancel</button> &nbsp;
				<button type="submit" className="btn btn-primary">Save</button>
			</form>

		</div>
	)
};

export default ProductCreate;