// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const ProductCard = ({ product }) => (
//   <Card className="my-3 p-3 rounded">
//     <Link to={`/product/${product._id}`}>
//       <Card.Img src={product.image} variant="top" />
//     </Link>
//     <Card.Body>
//       <Link to={`/product/${product._id}`}>
//         <Card.Title as="div">
//           <strong>{product.name}</strong>
//         </Card.Title>
//       </Link>
//       <Card.Text as="h3">${product.price}</Card.Text>
//     </Card.Body>
//   </Card>
// );

// export default ProductCard;


// ProductCard.js or wherever you're showing products

// import React, { useContext } from 'react';
// import { CartContext } from '../context/CartContext';

// function ProductCard({ product }) {
//   const { state, dispatch } = useContext(CartContext);

//   const addToCartHandler = () => {
//     const existItem = state.cartItems.find(x => x._id === product._id);
//     const quantity = existItem ? existItem.quantity + 1 : 1;

//     dispatch({
//       type: 'CART_ADD_ITEM',
//       payload: { ...product, quantity }, // Make sure product has _id
//     });
//   };

//   return (
//     <div>
//       <h3>{product.name}</h3>
//       <p>₹{product.price}</p>
//       <button onClick={addToCartHandler}>Add to Cart</button>
//     </div>
//   );
// }

// export default ProductCard;



// src/components/ProductCard.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { state, dispatch } = useContext(CartContext);

  const addToCartHandler = () => {
    const existItem = state.cartItems.find((x) => x._id === product._id);
    const qty = existItem ? existItem.qty + 1 : 1;

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qty }, // ✅ use consistent qty
    });
  };

  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
