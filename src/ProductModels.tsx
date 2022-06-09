export interface Product {
	id: number;
	name: string;
	stock: number;
	price: number;
	created: string;
}
export interface ProductDetail {
	id: number;
	name: string;
	stock: number;
	price: number;
	created: string;
}

export interface Products {
	products: [Product];
}

