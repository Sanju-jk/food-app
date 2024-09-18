import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMortarPestle, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import Badge from 'react-bootstrap/Badge';
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm " >
            <div className="container-fluid">
                <Link className="navbar-brand text-light fs-3 fw-bold" to="/">
                    <FontAwesomeIcon icon={faMortarPestle} className="me-2 text-warning" /> Foodify
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light fs-5" aria-current="page" to="/">Home</Link>
                        </li>

                        {localStorage.getItem("authToken") && (
                            <li className="nav-item">
                                <Link className="nav-link text-light fs-5" to="/">My Orders</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        {localStorage.getItem("authToken") ? (
                            <>
                                <div className="position-relative mx-3">
                                    <button className="btn text-warning fs-4 bg-dark border-0" onClick={() => setCartView(true)}>
                                        <FontAwesomeIcon icon={faShoppingBasket} className="fs-3" />
                                        {data.length > 0 && (
                                            <Badge pill bg="white" className=" text-danger fs-6 mt-2 position-absolute top-0 start-100 translate-middle badge rounded-pill">
                                                {data.length}
                                            </Badge>
                                        )}
                                    </button>
                                    {cartView && (
                                        <Modal onClose={() => setCartView(false)}>
                                            <Cart />
                                        </Modal>
                                    )}
                                </div>
                                <button className="btn btn-danger text-light fs-5 border-0 mx-3" onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-warning fs-5 mx-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-success fs-5" to="/createuser">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
