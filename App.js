import React from 'react';
import { ProductProvider } from './src/context/product';
import  { MainScreen } from './src/screen/Main';

export default function App() {
  return (
    <ProductProvider>
      <MainScreen />
    </ProductProvider>
  );
}
