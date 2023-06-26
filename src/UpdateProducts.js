import Header from "./Header";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProducts() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();
  const [data, setData] = useState([]);

  console.warn("location", location);
  console.warn("id", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/product/${id}`);
        const result = await response.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {
      // Cleanup function to cancel ongoing fetch requests or clear any subscriptions if needed
    };
  }, []); // Empty dependency array to run the effect only once

  async function editProduct(id) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("description", description);
    let result = await fetch(
      "http://127.0.0.1:8000/api/updateproduct/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    alert("Product has been updated");
    navigate('/');
  }
  return (
    <div>
      <Header />
      <h1>Update Product</h1>
      <div className="col-sm-6 offset-sm-3">
        <input
          className="form-control"
          type="text"
          defaultValue={data.name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          defaultValue={data.price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          defaultValue={data.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control"
          type="file"
          defaultValue={data.file_path}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          width="50%"
          height="50%"
          src={"http://127.0.0.1:8000/" + data.file_path}
        />{" "}
        <br />
        <br />
        <button className="btn btn-danger" onClick={() => editProduct(data.id)}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProducts;
