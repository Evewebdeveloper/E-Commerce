import axios from 'axios';
import React from 'react'
import { data } from 'jquery';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
const {cartId, setnumOfCartItems , settotalCartPrice, setcartProducts} = useContext(CartContext);
async function confirmCashPayment(){

const detailsValue= document.querySelector('#Details').value;
const phoneValue= document.querySelector('#Phone').value;
const cityValue=document.querySelector('#City').value;

const shippingAddress={
    "shippingAddress":{
"Details":detailsValue,
"Phone":phoneValue,
"City":cityValue

    }


}

try {
  const {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}
    `,shippingAddress,{headers:{token:localStorage.getItem('tkn')}});

    console.log(data);
    if(data.status === 'success'){
        toast.success("order successfuly initialized")
        setcartProducts([]);
        setnumOfCartItems(0);
        settotalCartPrice(0);
    }else{
        toast.error("error on creating order")
    }

} catch (error) {
    console.log('err',error);
}

}

async function confirmOnlinePayment(){

  const detailsValue= document.querySelector('#Details').value;
  const phoneValue= document.querySelector('#Phone').value;
  const cityValue=document.querySelector('#City').value;
  
  const shippingAddress={
      "shippingAddress":{
  "Details":detailsValue,
  "Phone":phoneValue,
  "City":cityValue
  
      }
  
  
  }
  
  try {
    const {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress,{headers:{token:localStorage.getItem('tkn')}},{
      params:{url: window.location.port}
    });


  window.open(  data.session.url , "_blank")
  
      console.log(data);
      if(data.status === 'success'){
          toast.success("order successfuly initialized")
          setcartProducts([]);
          setnumOfCartItems(0);
          settotalCartPrice(0);
      }else{
          toast.error("error on creating order")
      }
  
  } catch (error) {
      console.log('err',error);
  }
  
  }








  return <>
  <Helmet>
    <title>Payment</title>
  </Helmet>
  <div className="container py-5">
<form >
<label >Phone:</label>
<input id='Phone'  type="tel" className=' mb-3 form-control' placeholder='Phone' />



<label >City:</label>
<input id='City' type="tel" className=' mb-3 form-control' placeholder='City' />


<label >Details:</label>
<input id='Details' type="tel" className=' mb-3 form-control' placeholder='Details' />

<button type='button' className='btn btn-primary' onClick={confirmCashPayment}>Confirm cash Payment</button>
<button type='button' className='btn btn-primary' onClick={confirmOnlinePayment}>Confirm Online Payment</button>

</form>

  </div>
  
  
  </>
}
