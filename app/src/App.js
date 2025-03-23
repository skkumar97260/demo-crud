import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { uploadFile } from './utils/upload';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState([]); 
  const [editId, setEditId] = useState(null);
  const profileRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setInputs(Array.isArray(res.data.result) ? res.data.result : []);
    } catch (err) {
      console.log(err);
      setInputs([]); 
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, mobileNumber, image };
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/users/${editId}`, user);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/users/", user);
      }
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobileNumber("");
    setImage("");
    setEditId(null);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setMobileNumber(user.mobileNumber);
    setImage(user.image);
  };


  const handleUpload = (event) => {
    const file = event.target.files[0];
    const folder = "sk-image/";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const uploadedImage = res?.Location;
          setImage(uploadedImage);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="App">
      <h1 className="text-orange-600 text-5xl font-bold text-center">
        CRUD Application
      </h1>

      <div className="flex justify-center mt-5">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border p-2"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 mt-2"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 mt-2"
            placeholder="Enter Mobile"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            className="border p-2 mt-2"
            ref={profileRef}
            name="image"
            id="fileInputImage"
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
          <button className="bg-orange-600 text-white p-2 mt-5">
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      <h1 className="text-orange-600 text-5xl font-bold text-center mt-10">
        CRUD Table
      </h1>

      <div className="flex justify-center mt-5">
        <table className="border w-3/4">
          <thead>
            <tr>
              <th className="border p-2">S.No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inputs?.length > 0 ? (
              inputs.map((item, index) => (
                <tr key={item._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2">{item.mobileNumber}</td>
                  <td className="border p-2">
                    <img src={item.image} alt="User" className="w-20 h-20" />
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white p-1 mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-1"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
