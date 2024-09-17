import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

// bootstrap
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup.js";


import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from "./components/ContextReducer.js";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
