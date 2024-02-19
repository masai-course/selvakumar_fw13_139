// src/pages/Products.jsx

import React, { useEffect, useReducer } from 'react';
import { Box, Button, Select, VStack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContextProvider';
import { fetchProducts } from './api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import ProductItem from '../components/ProductItem';

const Products = () => {
  const { authDetails } = useContext(AuthContext);
  const [state, dispatch] = useReducer(productsReducer, {
    loading: false,
    err: false,
    res: {}
  });

  useEffect(() => {
    const fetchProductsData = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const data = await fetchProducts(authDetails.token);
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR' });
      }
    };

    fetchProductsData();
  }, [authDetails.token]);

  const { loading, err, res } = state;

  if (loading) return <LoadingSkeleton />;
  if (err) return <ErrorMessage />;

  return (
    <Box>
      <Select name="sort">
        <option value="">Sort by price: Order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      <Select name="filter">
        <option value="">Filter by</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        <option value="homedecor">Home Decor</option>
      </Select>
      <VStack data-cy="products-container">
        {res.data &&
          res.data.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
      </VStack>
      <Box data-cy="pagination">
        {/* Pagination buttons */}
      </Box>
    </Box>
  );
};

export default Products;
