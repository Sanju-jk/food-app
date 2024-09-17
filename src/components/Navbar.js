import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMortarPestle } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import Badge from 'react-bootstrap/Badge'
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
    let data = useCart();


    const [cartView, setCartView] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-warning fs-1 fst-italic fw-bold mx-3" to="/"><FontAwesomeIcon icon={faMortarPestle} /> Foodify</Link>

                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav  me-auto mb-1" >
                            <li className="nav-item ">
                                <Link className="nav-link  text-light active fs-5" aria-current="page" to="/">Home</Link>
                            </li>

                            {/* showing my orders and logout if user is logged in. checking it by authtoken */}
                            {
                                (localStorage.getItem("authToken")) &&
                                <li className="nav-item ">
                                    <Link className="nav-link  text-light active fs-5" to="/">My Orders</Link>
                                </li>

                            }

                        </ul>
                        {
                            (localStorage.getItem("authToken")) ?
                                <div className="d-flex ">
                                    <div className="btn  text-warning position-relative fs-4 mx-5" onClick={() => setCartView(true)}>
                                        <FontAwesomeIcon icon={faShoppingBasket} className="fs-2 mx-2" />
                                        {
                                            data.length > 0 &&
                                            <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                                                {data.length}
                                            </Badge>
                                        }
                                    </div>
                                    {
                                        cartView && <Modal onClose={() => setCartView(false)} > <Cart /> </Modal>
                                    }
                                    <button className="btn border text-danger fs-5 mx-3" onClick={logout}>Logout</button>
                                </div> :

                                <div className="d-flex ">
                                    <Link className="btn border text-warning fs-5 " to="/login">Login</Link>
                                    <Link className="btn border  text-success fs-5 mx-3 " to="/createuser">Sign Up</Link>
                                </div>
                        }

                    </div>
                </div>
            </nav>

        </div>
    )
}
