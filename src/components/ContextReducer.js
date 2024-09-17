import { createContext, useContext, useReducer } from "react"

const CartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state, 
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                }
            ];

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id && food.size === action.size) {
                    return {
                        ...food,
                        qty: food.qty + parseInt(action.qty),
                        price: food.price + action.price
                    };
                }
                return food;
            });

        default:
            console.log("Error in Reducer");
            return state; // Ensure state is returned in the default case
    }
};


export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,[]); //initial value of cart empty []

    return (
        <cartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </cartDispatchContext.Provider>
    )

}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
