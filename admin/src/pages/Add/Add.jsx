import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Biryani",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Biryani",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add-container">
      <div className="add-header">
        <h2>Add New Item</h2>
        <p>Fill in the details to add a new food item</p>
      </div>
      
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="add-form-grid">
          <div className="add-img-upload">
            <label className="form-label" htmlFor="image">Upload Image</label>
            <div className="image-upload-area">
              <label htmlFor="image" className="upload-label">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload"
                  className="upload-preview"
                />
                {!image && <span className="upload-text">Click to upload</span>}
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </div>
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Product Name</label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder="Type product name here"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="description">Product Description</label>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                name="description"
                id="description"
                rows="6"
                className="form-textarea"
                placeholder="Write content here"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select 
                  onChange={onChangeHandler} 
                  name="category" 
                  id="category"
                  className="form-select"
                  value={data.category}
                >
                  <option value="Biryani">Biryani</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Karahi">Karahi</option>
                  <option value="Pasta">Pasta</option>
                  <option value="BBQ">BBQ</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="price">Price</label>
                <input
                  onChange={onChangeHandler}
                  value={data.price}
                  type="Number"
                  name="price"
                  id="price"
                  className="form-input"
                  placeholder="$20"
                />
              </div>
            </div>
          </div>
        </div>
        
        <button type="submit" className="add-submit-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;