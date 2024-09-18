import { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
    const option = props.options || {};
    const optionKeys = Object.keys(option);
    const foodItem = props.foodItem || {};

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(optionKeys[0] || "");

    const dispatch = useDispatchCart();
    const cart = useCart();

    // Calculate final price based on selected size and quantity
    const finalPrice = size && option[size] ? quantity * parseInt(option[size]) : 0;

    const addToCart = async () => {
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.id === foodItem._id && item.size === size);

        if (existingItem) {
            // Update the quantity and price of the existing item
            await dispatch({
                type: "UPDATE",
                id: foodItem._id,
                qty: quantity,
                price: finalPrice - existingItem.price, // Adjusting the price difference
                size: size
            });
        } else {
            // Add a new item to the cart
            await dispatch({
                type: "ADD",
                id: foodItem._id,
                name: foodItem.name,
                qty: quantity,
                price: finalPrice,
                size: size,
                img: foodItem.img
            });
        }
    };

    const priceRef = useRef();

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-3" style={{ width: '18rem', maxHeight: "400px" }}>
                <img src={foodItem.img} className="card-img-top" alt="..." style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <p className="card-text"> {foodItem.description.slice(0, 78)} </p>

                    <div className="container w-100">
                        <select
                            className="m-2 h-100  rounded"
                            onChange={e => setSize(e.target.value)}
                            value={size}
                            ref={priceRef}
                        >
                            {
                                optionKeys.map((key) => (
                                    <option key={key} value={key}> {key} </option>
                                ))
                            }
                        </select>

                        <select
                            className="m-2 h-100  rounded"
                            onChange={e => setQuantity(e.target.value)}
                            value={quantity}
                        >
                            {
                                Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                ))
                            }
                        </select>

                        <div className="d-inline h-100 fs-5">
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <button className="btn-sm btn-warning" onClick={addToCart}> Add To Cart </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
