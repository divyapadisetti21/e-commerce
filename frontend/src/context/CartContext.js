// import React, { createContext, useReducer } from 'react';

// export const CartContext = createContext();

// const initialState = {
//   cartItems: localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : [],
//   shippingAddress: localStorage.getItem('shippingAddress')
//     ? JSON.parse(localStorage.getItem('shippingAddress'))
//     : {},
//   paymentMethod: localStorage.getItem('paymentMethod')
//     ? localStorage.getItem('paymentMethod')
//     : '',
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'CART_ADD_ITEM': {
//       const newItem = action.payload;
//       const existItem = state.cartItems.find(item => item._id === newItem._id);
//       const cartItems = existItem
//         ? state.cartItems.map(item =>
//             item._id === existItem._id ? newItem : item
//           )
//         : [...state.cartItems, newItem];
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       return { ...state, cartItems };
//     }

//     case 'CART_REMOVE_ITEM': {
//       const cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       return { ...state, cartItems };
//     }

//     case 'SAVE_SHIPPING_ADDRESS':
//       localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
//       return { ...state, shippingAddress: action.payload };

//     case 'SAVE_PAYMENT_METHOD':
//       localStorage.setItem('paymentMethod', action.payload);
//       return { ...state, paymentMethod: action.payload };

//     case 'USER_LOGIN':
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       return { ...state, userInfo: action.payload };

//     case 'USER_LOGOUT':
//       localStorage.clear();
//       return {
//         cartItems: [],
//         shippingAddress: {},
//         paymentMethod: '',
//         userInfo: null,
//       };

//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }



// import React, { createContext, useReducer } from 'react';

// export const CartContext = createContext();

// const initialState = {
//   cartItems: localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : [],
//   shippingAddress: localStorage.getItem('shippingAddress')
//     ? JSON.parse(localStorage.getItem('shippingAddress'))
//     : {},
//   paymentMethod: localStorage.getItem('paymentMethod')
//     ? localStorage.getItem('paymentMethod')
//     : '',
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'CART_ADD_ITEM': {
//       const newItem = action.payload;
//       const existItem = state.cartItems.find(item => item._id === newItem._id);
//       const cartItems = existItem
//         ? state.cartItems.map(item =>
//             item._id === existItem._id ? newItem : item
//           )
//         : [...state.cartItems, newItem];
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       return { ...state, cartItems };
//     }

//     case 'CART_REMOVE_ITEM': {
//       const cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       return { ...state, cartItems };
//     }

//     case 'SAVE_SHIPPING_ADDRESS':
//       localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
//       return { ...state, shippingAddress: action.payload };

//     case 'SAVE_PAYMENT_METHOD':
//       localStorage.setItem('paymentMethod', action.payload);
//       return { ...state, paymentMethod: action.payload };

//     case 'USER_LOGIN':
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       return { ...state, userInfo: action.payload };

//     case 'USER_LOGOUT':
//       localStorage.clear();
//       return {
//         cartItems: [],
//         shippingAddress: {},
//         paymentMethod: '',
//         userInfo: null,
//       };

//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }



// src/context/CartContext.js
import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : '',
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cartItems };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cartItems };
    }

    case 'SAVE_SHIPPING_ADDRESS':
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return { ...state, shippingAddress: action.payload };

    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', action.payload);
      return { ...state, paymentMethod: action.payload };

    case 'USER_LOGIN':
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };

    case 'USER_LOGOUT':
      localStorage.clear();
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
        userInfo: null,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
