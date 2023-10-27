import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { data } from 'jquery';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';



export default function WishList() {
const [AllWishes, setAllWishes] = useState([]);
const {addProductToCart,addProductToWishList}=useContext(CartContext);

  useEffect(() => { 
  
    axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
       { headers: { token: localStorage.getItem("tkn")} }) 
       .then(wishes => { setAllWishes(wishes.data.data);  }) 
       .catch(err => {}); }, [] );


     async  function RemoveWish(productId){
const {data}=  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: { token: localStorage.getItem("tkn")} }

);


if(data.status ==="success"){
  toast.success('item removed successfully')

 }else{
   toast.error("error happened")
 }
    }
  
async function deleteElement(productId){

 await RemoveWish(productId)

}
  if(data === null){
    return <>
  <div className='vh-100 d-flex justify-content-center align-items-center'>
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
  </>
  }
 
  return <>
    <Helmet>
      <title>Wish List</title>
    </Helmet>
    <div className="container">
      <div className="row">
        <h3 className='my-5'>My Wish List</h3>


        {AllWishes?.map(function(wish,idx){
  
        return<>
        {data? <>
        
          <div key={idx} className="row align-items-center">

<div className="col-sm-1">
<img src={wish.imageCover} className='w-100' alt="" />
</div>
<div className="col-sm-9">
<h5>{wish.title}</h5>
<h5>Price: {wish.price} L.E </h5>
<button  onClick={()=>deleteElement(wish.id)} className='btn btn-outline-danger'>Remove</button>
</div>
<div className="col-sm-2">
<div className="d-flex align-items-center">
  <button   onClick={()=>addProductToCart(wish.id)}  className='btn btn-outline-success'>add to cart</button>
</div>
</div>
</div>
        
        </>  :    <div className='vh-100 d-flex justify-content-center align-items-center'>
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>}
        </>
      })}

      </div>
    </div>


  </>
}


       



