import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();

    if (data.length === 0) return (
        <div className='m-5 w-100 text-center fs-2 text-light'> <i className='fa fa-shopping-basket text-warning me-2'></i>The Cart is Empty!</div>
    );

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckOut = async () => {
        const URL = "https://foodify-cxvh.onrender.com/api/orderdata";
        const userEmail = localStorage.getItem("userEmail");

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toISOString(),
                    price: totalPrice
                })
            });

            if (response.status === 200) {
                dispatch({ type: "DROP" });
                alert("Order placed successfully");
            } else {
                alert("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing the order");
        }
    };

    return (
        <div>
            <h2 className='text-center text-white'>
                <i className='fa fa-shopping-basket text-warning'></i> My Cart
            </h2>
            <div className="container mt-5 table-responsive" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <table className="table table-hover table-bordered">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">Image</th>
                            <th scope="col" className="text-center">Name</th>
                            <th scope="col" className="text-center">Quantity</th>
                            <th scope="col" className="text-center">Option</th>
                            <th scope="col" className="text-center">Amount</th>
                            <th scope="col" className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row" className="text-center">{index + 1}</th>
                                <td className="d-flex justify-content-center align-items-center">
                                    <img src={food.img} alt={food.name} style={{ height: "75px", width: "75px", objectFit: "cover" }} />
                                </td>
                                <td className="text-center">{food.name}</td>
                                <td className="text-center">{food.qty}</td>
                                <td className="text-center">{food.size}</td>
                                <td className="text-center">₹{food.price.toFixed(2)}</td>
                                <td className="text-center">
                                    <button
                                        type='button'
                                        className='btn btn-danger'
                                        aria-label={`Remove ${food.name}`}
                                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end align-items-end flex-column me-4 mt-4">
                <h1 className="fs-2 text-light mt-2">Total Price: ₹{totalPrice.toFixed(2)}/-</h1>
                <button className="btn btn-warning mt-3 text-white" onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    );
}
