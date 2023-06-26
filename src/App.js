import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProducts from './AddProducts';
import UpdateProducts from './UpdateProducts';
import Protected from './Protected';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import ParticlesBg from "particles-bg";

function App() {
  
  return (
    
    <div className="App">
      <ParticlesBg type="random" bg={true}/>
      <BrowserRouter>
      {/* <Header /> */}
      {/* <h1>E-Book</h1> */}
      <Routes>
      
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add"
            element={
              <>
                <Protected Cmp={AddProducts}/>
                {/* <AddProducts /> */}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Protected Cmp={ProductList}/>
                {/* <UpdateProducts /> */}
              </>
            }
            />
          <Route
            path="/update/:id"
            element={
              <>
                <Protected Cmp={UpdateProducts}/>
                {/* <UpdateProducts /> */}
              </>
            }
            />
          <Route
            path="/search"
            element={
              <>
                <Protected Cmp={SearchProduct}/>
                {/* <UpdateProducts /> */}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
