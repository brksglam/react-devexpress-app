// src/components/OrderList.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`https://dummyjson.com/users/${userId}/orders`)
        .then(response => response.json())
        .then(data => {
          setOrders(data.orders);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          toast.error('Error fetching orders');
        });
    }
  }, [userId]);

  // Sipariş Silme Fonksiyonu
  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast.success('Order successfully deleted!');
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length ? (
          orders.map(order => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>
                <Button color="danger" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No data</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrderList;
