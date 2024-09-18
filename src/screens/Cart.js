import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) return (<div className='m-5 w-100 text-center fs-2 text-warning'>The Cart is Empty!</div>);

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckOut = async () => {
        const URL = "http://localhost:5000/api/orderdata";

      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch(URL, {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            order_data:data,
            email: userEmail,
            order_date: new Date().toDateString()
        })
      });

      if (response.status === 200){
        dispatch({type:"DROP"})
        alert("Order placed")
      }

    }
    return (
        <div>
            <h2 align='center' className='text-white'> <i className='fa fa-shopping-basket text-warning'></i> My Cart </h2>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg" style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <table className="table table-hover " >
                    <thead className="text-success fs-4 ">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col"></th>

                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>

                                    <td><img src={food.img} style={{ height: "75px", width: "75px", alignItems: "center" }} /> </td>
                                    <td> {food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type='button' className='btn p-0' >
                                            <FontAwesomeIcon icon={faTrashCan} className="fs-2" onClick={() => dispatch({ type: "REMOVE", index: index })} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end align-items-end flex-column me-4 mt-4">
                <div className="text-right">
                    <h1 className="fs-2 text-light mt-2">Total Price: {totalPrice}/-</h1>
                </div>
                <button className="btn btn-warning mt-3 text-white" onClick={handleCheckOut}>Check Out</button>
            </div>

        </div>
    )
}
