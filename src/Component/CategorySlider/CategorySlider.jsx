import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import {  useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



export default function CategorySlider() {

  function getAllCtegories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const {data,isLoading}= useQuery('categorySlider',getAllCtegories,{
    refetchOnMount:false
  })
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows:false 
      };
if(isLoading ){
  return<div className='vh-100 d-flex justify-content-center align-items-center'>
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

}



  return <>

  <div className='mb-5'>
   <h2>Category slider</h2>
   <Slider {...settings}>
{data?.data.data.map(function(category,idx){return<>
  <div key={idx}>
            <img style={{width:'100%' , height: "200px"}} src={category.image} alt='slider'/>
          </div>
</>

})}
   </Slider>
 </div>
  
  
  </>


}


