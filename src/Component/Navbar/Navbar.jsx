import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from './../Context/Authentication';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
 
  const {token , setToken}=useContext(authContext);
  const{numOfCartItems}=useContext(CartContext);
  const NavFunc=useNavigate();
  function Logout(){
    console.log("logout");

    localStorage.removeItem("tkn");
    setToken(null);

NavFunc("/Login")
  }
  console.log(token );
  return <>
  
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <div className="d-flex align-items-center justify-content-center">
      
      <i className='fa-solid fa-cart-shopping nav-icon main-color fa-2xl'></i>
      <span className='h3 bold'>Fresh Cart</span>
    </div>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   {token?  <>
    <ul className="navbar-nav m-auto mt-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  " to="/cart">cart

          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wish list">wish list </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">products </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">categories </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">brands </Link>
        </li>
      </ul>
   </>:""}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
    
 {token? <>
 

  <li className="nav-item">
          <Link className="nav-link  position-relative" to="/cart">
          <i  className='fa-solid fa-cart-shopping nav-icon fa-xl'></i>

          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill main-bg-color">
    {numOfCartItems}
    <span class="visually-hidden">unread messages</span>
  </span>
          </Link>
        </li>
        <li className="nav-item">

          <span onClick={Logout} style={{cursor:"pointer"}} className="nav-link" to="/Logout">Log out</span>
        </li>

        </>
        : <>
          <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
        </li>
        </>}
     
      </ul>
    </div>
  </div>
</nav>
  
  
  
  
  </>

  
}
