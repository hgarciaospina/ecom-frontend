import { useState } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

import Home from './components/home/Home';
import Products from './components/products/Products';

function App() {
  const [count, setCount] =  useState(0);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes> 
    </Router>
  )
}

export default App;
