import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import ProductList from "./ProductList";
import ShowProductDetail from "./ProductDetail";
import ProductCreate from "./ProductCreate";

function Latihan1() {
	return (
        <>
           <Router>
                <Routes>
                    <Route path="/"  element={<ProductList/>} />
                    <Route path="/detail/:productid" element={<ShowProductDetail/>} />
					<Route path="/create" element={<ProductCreate/>} />
                </Routes>
            </Router>
        </>
    );

}

export default Latihan1;