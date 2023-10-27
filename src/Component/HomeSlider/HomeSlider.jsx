import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false 
      };

  return <>
  
  <div>
   
        <Slider {...settings}>
          <div>
            <img style={{width:'50%' , height: "400px"}} src={require('../../images/slider/41nN4nvKaAL._AC_SY200_.jpg')} alt=''/>
          </div>
          <div>
            <img style={{width:'50%' , height: "400px"}} src={require('../../images/slider/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg')} alt=''/>
          </div>
          
          <div>
            <img  style={{width:'50%' , height: "400px"}} src={require('../../images/slider/61cSNgtEISL._AC_SY200_.jpg')} alt=''/>
          </div>
    
        </Slider>
      </div>
  </>
}
