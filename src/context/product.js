import React, { createContext, useReducer, useContext } from 'react';

const ProductContext = createContext();

const initialState = {
  product: {
    photo: null,
    description: '',
    category: '',
  },
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHOTO':
      return { ...state, product: { ...state.product, photo: action.payload } };
    case 'SET_DESCRIPTION':
      return { ...state, product: { ...state.product, description: action.payload } };
    case 'SET_CATEGORY':
      return { ...state, product: { ...state.product, category: action.payload } };
    case 'RESET_PRODUCT':
      return initialState;
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
