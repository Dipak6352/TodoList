import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"

const TodoList = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [dataList, setDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userList")) || [];
    setDataList(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(dataList));
  }, [dataList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedList = dataList.map((item, index) =>
        index === editIndex ? formData : item
      );
      setDataList(updatedList);
      setEditIndex(null);
    } else {
      setDataList([...dataList, formData]);
    }
    setFormData({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" });
  };

  const handleDelete = (index) => {
    const filteredList = dataList.filter((_, i) => i !== index);
    setDataList(filteredList);
  };

  const handleEdit = (index) => {
    setFormData(dataList[index]);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">skylink practical</h2>
      <div className="card p-4 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" className="form-control" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-md-12">
              <input type="tel" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary">{editIndex !== null ? "Update" : "Add"}</button>
            </div>
          </div>
        </form>
      </div>

      <h3 className="text-center mt-4">Stored Data</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.phoneNumber}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
