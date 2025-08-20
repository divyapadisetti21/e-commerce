import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const CollectionScreen = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], types: [] });
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (group, value) => {
    setFilters((prev) => {
      const current = prev[group];
      const newGroup = current.includes(value) ? current.filter((x) => x !== value) : [...current, value];
      return { ...prev, [group]: newGroup };
    });
  };

  const displayedProducts = useMemo(() => {
    let filtered = [...products];
    if (filters.categories.length) filtered = filtered.filter((p) => filters.categories.includes(p.category));
    if (filters.types.length) filtered = filtered.filter((p) => filters.types.includes(p.type));
    if (sort === 'lowToHigh') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'highToLow') filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, filters, sort]);

  return (
    <Row>
      <Col md={3}>
        <div className="filters-sidebar">
          <h4>FILTERS</h4>
          <hr />
          <h5>CATEGORIES</h5>
          <Form>
            {['Men', 'Women', 'Kids'].map((c) => (
              <Form.Check
                key={c}
                type="checkbox"
                label={c}
                onChange={() => handleFilterChange('categories', c)}
                checked={filters.categories.includes(c)}
              />
            ))}
          </Form>
          <hr />
          <h5>TYPE</h5>
          <Form>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((t) => (
              <Form.Check
                key={t}
                type="checkbox"
                label={t}
                onChange={() => handleFilterChange('types', t)}
                checked={filters.types.includes(t)}
              />
            ))}
          </Form>
        </div>
      </Col>
      <Col md={9}>
        <Row className="align-items-center mb-3">
          <Col><h3 className="collections-title">ALL COLLECTIONS</h3></Col>
          <Col className="d-flex justify-content-end">
            <Form.Select style={{ width: '200px' }} onChange={(e) => setSort(e.target.value)}>
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowToHigh">Sort by: Low to High</option>
              <option value="highToLow">Sort by: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          {displayedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            displayedProducts.map((product) => (
              <Col key={product._id} sm={6} md={4} className="mb-4">
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default CollectionScreen;
