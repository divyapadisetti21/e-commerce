import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // state to trigger refresh

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/products'); // Your API endpoint
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);  // refetch when refresh changes

  // Example handler after product add/edit/delete
  const handleRefresh = () => {
    setRefresh(prev => !prev);  // toggle refresh flag to trigger useEffect
  };

  return (
    <div>
      <h1>Product List</h1>
      {/* Pass handleRefresh to child components that add/edit/delete products */}
      {/* Display product list */}
      {loading ? <p>Loading...</p> : (
        <ul>
          {products.map(p => (
            <li key={p._id}>{p.name} - ${p.price}</li>
          ))}
        </ul>
      )}
      {/* Example button to simulate refresh */}
      <button onClick={handleRefresh}>Refresh List</button>
    </div>
  );
};

export default ProductListScreen;
