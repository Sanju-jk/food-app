import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("https://foodify-cxvh.onrender.com/api/myorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrderData(data.orders.order_data); // Set orderData as an array of arrays
        } catch (error) {
            setError('You have not placed an order yet!');
            console.info("You have not placed an order yet!", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Calculate total price for each order
    const calculateOrderTotalPrice = (order) => {
        return order.slice(1).reduce((total, item) => total + item.price, 0);
    };

    // Format the date to include only the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats date only
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                {loading ? (
                    <div className="text-center mt-5">
                        <h3>Loading...</h3>
                    </div>
                ) : error ? (
                    <div className="text-center mt-5">
                        <h3>{error}</h3>
                    </div>
                ) : (
                    <div className='row'>
                        {orderData.length > 0 ? (
                            orderData.slice().reverse().map((order, index) => (
                                <div key={`order-${index}`} className='col-12 col-md-8 col-lg-6 m-auto mt-5'>
                                    <div className="order-card p-3 shadow-sm rounded">
                                        <h5 className="order-date">Order Date: {formatDate(order[0].Order_date)}</h5>
                                        <hr />
                                        <div className='row'>
                                            {order.slice(1).map((item, itemIndex) => (
                                                <div key={`${index}-${itemIndex}`} className='col-12 mb-3'>
                                                    <div className="order-item d-flex align-items-center p-2 border rounded">
                                                        <img src={item.img} alt={item.name} className="order-item-img me-3" />
                                                        <div>
                                                            <h6 className="order-item-title">{item.name}</h6>
                                                            <p className='mb-1'>Qty: {item.qty} | Size: {item.size}</p>
                                                            <p className='mb-0'>Price: ₹{item.price}/-</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Display Total Price for Each Order */}
                                        <div className='mt-3'>
                                            <h5 className="order-total">Total Price: ₹{calculateOrderTotalPrice(order)}/-</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-5">
                                <h3>No Orders Found</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
