import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Context/Authentication';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';



export default function Product() {
  const { addProductToCart,  addProductToWishList}=useContext(CartContext);
  const [isSelected, setisSelected] = useState(false);
  const{id}=useParams();

 async function addProduct(id){
  const res= await addProductToCart(id);
  if(res.status ==="success"){
   toast.success(res.message)

  }else{
    toast.error("error happened")
  }
  }
 async function getAllProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");

 }

 const {isError , isLoading , isFetching , data}=useQuery("allProducts" , getAllProducts

 );
console.log(data?.data.data);

if(isLoading){
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
async function addWish(id,idx){
  const selectedCardId=document.getElementById(idx).id;
  if(selectedCardId==idx){
    isSelected? setisSelected(false):setisSelected(true);

  }
  const res =await addProductToWishList(id);
 console.log(res);
  if(res.status ==="success"){
   toast.success(res.message)
 
  }else{
    toast.error("error happened")
  }
 }
  return <>
  <Helmet>
    <title>All Products</title>
  </Helmet>
  <div className="container py-5">

  <input type="text" className='w-75 mx-auto form-control my-5 ng-valid ng-touched ng-dirty ' placeholder='Search' />

      <div className="container row gy-4">

        {data?.data.data.map(function(product ,idx){
          return <>
        
          <div id={idx} key={idx} className="col-md-3">
            <div className="product">
            <Link to={`/ProductDetailes/${product.id}`}>

            <img src={product.imageCover} className='w-100' alt="shoot" />
            <h6 className='main-color'>{product.category.name}</h6>
            <h5>{product.title.split('').slice( 0 , 15).join('')}</h5>
            <div className='d-flex justify-content-between align-items-center '>
            <p>{product.price}EGP</p>

            <p><span><i className='fa-solid fa-star star-color' ></i></span>{product.ratingsAverage}</p>

            </div>
         <div>

         </div>
         </Link>
         <p ><button onClick={() => addWish(product.id,idx)} className={isSelected?'isItemSelected':null}><i class="fa-solid fa-heart"></i></button></p>

         <button onClick={()=>addProduct(product.id)} className='w-100 rounded-3 main-bg-color p-2 border-white text-white'>+ ADD TO CART</button>

          </div>
      
        </div>


        </>})}
    

      <div/>


    </div>
  </div >


 
  

  </>

}
