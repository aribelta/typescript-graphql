import React,{ useState } from "react";
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Product, Products,ProductDetail} from './ProductModels';

import {
	gql, useQuery, useMutation
} from "@apollo/client";


const DETAILPRODUCT = gql`
mutation ProductDetail($productDetailId: Int) {
  ProductDetail(id: $productDetailId) {
    id
    name
    stock
    price
    created
  }
}
`;

function ShowProductDetail() {
	let navigate = useNavigate();
	let { productid } = useParams();
	const [productId, setProductId] = useState(0);
	const [productName, setPoductName] = useState("");
	const [productStock, setProductStock] = useState(0);
	const [productPrice, setProductPrice] = useState(0);
	const [productCreated, setProductCreated] = useState("");

	const [productDetail, { data, loading, error }] = useMutation<{
		ProductDetail:ProductDetail, 
		productDetailId:number
	}>(DETAILPRODUCT, {
	variables: {		  
		productDetailId: Number(productid)
	}});

	// React.useRef(()=>{
	// 	setProductId(Number(id));
	// 	console.log(id)	;
	// 	productDetail().then((retdata)=>{
	// 		console.log(retdata);
	// 	})
	// })

	React.useEffect(()=>{	
		loader();
	},[]);

	function backtoHome() {
		navigate("/");
	}
	function loader() {
		setProductId(Number(productid));
		productDetail().then((retdata)=>{
			var s:string = JSON.stringify(retdata);
			const ss = JSON.parse(s);
			setPoductName(String(ss.data.ProductDetail.name));
			setProductStock(Number(ss.data.ProductDetail.stock));
			setProductPrice(Number(ss.data.ProductDetail.price));
			setProductCreated(String(ss.data.ProductDetail.created));
			console.log(JSON.stringify(retdata));
		})
	}
	return (
		<div className='container'>
			<h2>Detail Product</h2>
			<br/>
			{/* <button type="button" className="btn btn-primary"  onClick={loader}>Load</button> */}
			<div>
				name : {productName}
				</div>
				<div>
				stock : {productStock}
				</div>
				<div>
				price : {productPrice}
				</div>
				<div>
				created : {productCreated}
				</div>
				<div>
				<button type="button" className="btn btn-primary"  onClick={backtoHome}>Back</button>
				</div>
				
		</div>
	)
}

export default ShowProductDetail;