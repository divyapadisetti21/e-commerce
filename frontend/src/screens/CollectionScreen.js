import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const CollectionScreen = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], types: [] });
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/products`
      );
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (filterGroup, value) => {
    setFilters((prevFilters) => {
      const currentGroup = prevFilters[filterGroup];
      const newGroup = currentGroup.includes(value)
        ? currentGroup.filter((item) => item !== value)
        : [...currentGroup, value];
      return { ...prevFilters, [filterGroup]: newGroup };
    });
  };

  const displayedProducts = useMemo(() => {
    let filtered = [...products];
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.types.length > 0) {
      filtered = filtered.filter((p) => filters.types.includes(p.type));
    }
    if (sort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [products, filters, sort]);

  return (
    <Row>
      {/* --- FILTERS SIDEBAR --- */}
      <Col md={3}>
        <div className="filters-sidebar">
          <h4>FILTERS</h4>
          <hr />
          <h5>CATEGORIES</h5>
          <Form>
            {['Men', 'Women', 'Kids'].map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                id={`cat-${category}`}
                label={category}
                onChange={() => handleFilterChange('categories', category)}
                checked={filters.categories.includes(category)}
              />
            ))}
          </Form>
          <hr />
          <h5>TYPE</h5>
          <Form>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <Form.Check
                key={type}
                type="checkbox"
                id={`type-${type}`}
                label={type}
                onChange={() => handleFilterChange('types', type)}
                checked={filters.types.includes(type)}
              />
            ))}
          </Form>
        </div>
      </Col>

      {/* --- PRODUCTS GRID --- */}
      <Col md={9}>
        <Row className="align-items-center mb-3">
          <Col>
            <h3 className="collections-title">ALL COLLECTIONS</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Form.Select
              style={{ width: '200px' }}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowToHigh">Sort by: Low to High</option>
              <option value="highToLow">Sort by: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          {displayedProducts.map((product) => (
            <Col key={product._id} sm={6} md={4} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default CollectionScreen;
