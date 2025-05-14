import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      console.log("Backend URL:", url);
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='orders-container'>
      <div className="orders-header">
        <h2>Customer Orders</h2>
        <p>Manage and track all customer orders</p>
      </div>
      
      <div className="orders-content">
        {loading ? (
          <div className="orders-loading">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.slice().reverse().map((order, index) => (
              <div key={index} className='order-card'>
                <div className="order-card-header">
                  <div className="order-icon">
                    <img src={assets.parcel_icon || "/placeholder.svg"} alt="Order" />
                  </div>
                  <div className="order-summary">
                    <div className="order-items-count">
                      <span>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                    </div>
                    <div className="order-amount">
                      <span>${order.amount}</span>
                    </div>
                  </div>
                  <div className="order-status">
                    <select 
                      onChange={(event) => statusHandler(event, order._id)} 
                      value={order.status}
                      className={`status-select ${order.status.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                
                <div className="order-card-content">
                  <div className="order-items">
                    <h4>Order Items</h4>
                    <p className="order-items-list">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " × " + item.quantity
                        } else {
                          return item.name + " × " + item.quantity + ", "
                        }
                      })}
                    </p>
                  </div>
                  
                  <div className="customer-details">
                    <h4>Customer Details</h4>
                    <div className="customer-name">
                      <span>{order.address.firstName + " " + order.address.lastName}</span>
                    </div>
                    <div className="customer-address">
                      <p>{order.address.street},</p>
                      <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                    </div>
                    <div className="customer-phone">
                      <span>{order.address.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders