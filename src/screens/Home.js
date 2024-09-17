import { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      {/* Carousel */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">

        <div className="carousel-inner" id="carousel">
          {/* Carousel Items */}
          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="Slide 3" />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D" className="d-block w-100" alt="Slide 4" />
          </div>
        </div>

        {/* Single Constant Caption */}
        <div className="carousel-caption d-none d-md-block" style={{ zIndex: '10', marginBottom: "40px" }}>

          {/* <div className="d-flex mb-4 justify-content-center" style={{ gap: '50px' }}>
            <i className="fas fa-drumstick-bite fa-4x"></i>
            <i className="fas fa-pizza-slice fa-4x"></i>
            <i className="fas fa-hamburger fa-4x"></i>
            <i className="fas fa-ice-cream fa-4x"></i>
          </div> */}

          <h2 className="display-4 ">"Satisfy Your Cravings!"</h2>
          <p className="lead">Delicious meals delivered to your doorstep, fresh and fast. </p>
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

      </div>

      <div className="container">
        {foodCategory && foodCategory.map((category) => {
          return (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3">
                {category.CategoryName}
              </div>
              <hr />
              {foodItem &&
                foodItem
                  .filter((fooditem) => (fooditem.CategoryName === category.CategoryName) && (fooditem.name.toLowerCase().includes(search.toLowerCase())))
                  .map((item) => {
                    return (
                      <div key={item._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem={item} options={item.options[0]} />
                      </div>
                    );
                  })
              }
            </div>
          );
        })}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
