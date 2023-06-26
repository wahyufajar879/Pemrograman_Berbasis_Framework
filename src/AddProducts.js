import { Button } from "react-bootstrap";
import Header from "./Header";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  
async function addProduct() {
    console.warn(name, file, price, description);
    const formData = new FormData;
    formData.append('file',file);
    formData.append('price',price);
    formData.append('name',name);
    formData.append('description',description);
    let result= await fetch('http://127.0.0.1:8000/api/addProduct',{
        method:"POST",
        body: formData
    });
    alert("Product Added!");
    navigate('/');
  }

  return (
    <div>
      <Header />
      <h1>Tambah Product</h1>
      <br />
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <input
          type="file"
          className="form-control"
          placeholder="File"
          onChange={(e) => setFile(e.target.files[0])}
        ></input>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <br />
        <textarea
          type="text"
          className="form-control"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <Button variant="success" onClick={addProduct}>
          Tambah
        </Button>
        
      </div>
    </div>
  );
}

export default AddProducts;
