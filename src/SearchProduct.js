import { Button } from "react-bootstrap";
import {Table} from"react-bootstrap";
import Header from "./Header";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"

function SearchProducts() {

    const[data, setData] =useState([]);
    const navigate = useNavigate();

    async function search(key){
        console.warn(key);
        let result = await fetch("http://127.0.0.1:8000/api/search/"+key);
        result = await result.json();
        setData(result);
    }

    async function deleteOperation(id) {
        if (
          window.confirm(
            "Are You Sure Want to Delete This Product With Id =" + id + "?"
          )
        ) {
          let result = await fetch("http://127.0.0.1:8000/api/delete/" + id, {
            method: "DELETE",
          });
          result = await result.json();
          console.warn(result);
          search();
          alert("Product Has Been Deleted");
        } else {
          search();
        }
      }
      function handleUpdateClick(id) {
        navigate("/update/" + id);
      }

  return (
    <div>
      <Header />

      <div className="col-sm-6 offset-sm-3">
        <h1>Search Product</h1>
        <br />
        <input
          onChange={(e)=>search(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Type Here to search for a product"
        />
        <br/> 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{ width: 100 }}
                    src={"http://127.0.0.1:8000/" + item.file_path}
                    alt={item.name}
                  ></img>
                </td>
                <td>
                  <span
                    className="btnDelete"
                    onClick={() => deleteOperation(item.id)}
                  >
                    Delete
                  </span>
                  <span className="btnUpdate" onClick={() => handleUpdateClick(item.id)}>
                    Update
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
}
export default SearchProducts;