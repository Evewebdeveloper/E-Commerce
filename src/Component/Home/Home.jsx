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
  const { addProductToCart}=useContext(CartContext)
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
  // const [allProducts, setallProducts] = useState(null);
  // async function getAllProducts() {
  //   const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(data.data);
  //   setallProducts(data.data);
  // }
  // useEffect(function () {
  //   getAllProducts();

  // }, [])
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
  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
  <div className="container py-5">

    <div className="row gx-0 mb-5  "> 
      <div className="col-sm-6 ">
      <HomeSlider/>

      </div>
      <div className="col-sm-6">
        <img style={{width:'100%', height:'200px'}} src={require('../../images/slider/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg')} alt="slider" />
        <img style={{width:'100%', height:"200px"}} src={require('../../images/slider/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg')} alt="slider" />

      </div>
    </div>
    <CategorySlider/>
    <input type="text" className='w-75 mx-auto form-control my-5 ng-valid ng-touched ng-dirty ' placeholder='Search' />

      <div className="row gy-4">

        {data?.data.data.map(function(product ,idx){
          return <>
        
          <div key={idx} className="col-md-2">
            <div className="product">
            <Link to={`/ProductDetailes/${product.id}`}>

            <img src={product.imageCover} className='w-100' alt="shoot" />
            <h6 className='main-color'>{product.category.name}</h6>
            <h5>{product.title.split('').slice( 0 , 15).join('')}</h5>
            <div className='d-flex justify-content-between align-items-center '>
            <p>{product.price}EGP</p>

            <p><span><i className='fa-solid fa-star star-color '></i></span>{product.ratingsAverage}</p>
            <p><span><i class="fa-solid fa-heart"></i></span></p>
            </div>
         <div>

         </div>
         </Link>
         <button onClick={()=>addProduct(product.id)} className='w-100 rounded-3 main-bg-color p-2 border-white text-white'>+ ADD TO CART</button>

          </div>
          
        </div>



        
        </>})}
    

      <div/>


    </div>
  </div >


 
  

  </>

}
