import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Dummy search result — replace with real API later
    setResults([
      { id: 1, name: 'T-Shirt', price: 19.99 },
      { id: 2, name: 'Hoodie', price: 39.99 }
    ]);
  };

  return (
    <div>
      <h2>Search Products</h2>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit" variant="primary" className="mt-2">Search</Button>
      </Form>
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name} - ₹{product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchScreen;
