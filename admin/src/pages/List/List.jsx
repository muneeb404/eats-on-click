import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './List.css'

const List = ({url}) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/food/list`);
      
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching food items");
      }
    } catch (error) {
      toast.error("Failed to fetch food items");
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
      
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list-container'>
      <div className="list-header">
        <h2>Food Items</h2>
        <p>Manage your food items inventory</p>
      </div>
      
      <div className="list-card">
        {loading ? (
          <div className="list-loading">
            <div className="loading-spinner"></div>
            <p>Loading food items...</p>
          </div>
        ) : list.length === 0 ? (
          <div className="list-empty">
            <p>No food items found. Add some items to get started.</p>
          </div>
        ) : (
          <div className="list-table">
            <div className="list-table-header">
              <div className="table-cell image-cell">Image</div>
              <div className="table-cell name-cell">Name</div>
              <div className="table-cell category-cell">Category</div>
              <div className="table-cell price-cell">Price</div>
              <div className="table-cell action-cell">Action</div>
            </div>
            
            <div className="list-table-body">
              {list.map((item, index) => (
                <div key={index} className="list-table-row">
                  <div className="table-cell image-cell">
                    <img src={`${url}/images/` + item.image} alt={item.name} />
                  </div>
                  <div className="table-cell name-cell">
                    <p>{item.name}</p>
                  </div>
                  <div className="table-cell category-cell">
                    <span className="category-badge">{item.category}</span>
                  </div>
                  <div className="table-cell price-cell">
                    <p className="price-value">${item.price}</p>
                  </div>
                  <div className="table-cell action-cell">
                    <button 
                      className="delete-btn" 
                      onClick={() => removeFood(item._id)}
                      aria-label="Delete item"
                    >
                      <span className="delete-icon">×</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default List