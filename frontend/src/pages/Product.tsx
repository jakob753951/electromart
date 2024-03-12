import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';

const Products = ({ productType }: { productType: ProductType }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:3001/get-products-by-category?productType=${productType.toString()}`);
        const response_products = response.data.map(item => new Product(item.title, item.imageUrl, item.basePrice, item.taxRate, item.discountRate, item.productType));
        setProducts(response_products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="content-container">
      <h2>{productType.toString()}</h2>
      <div className='product-item-container'>
        {products.map((product, index) => (
          <div className='product-item' key={index}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Products;
