import React from 'react'
import { CartContext } from '../Context/CartContext';
import { useContext } from 'react';
import { Bars } from 'react-loader-spinner';
import { data } from 'jquery';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const{cartProducts, totalCartPrice, numOfCartItems, DeleteProduct , updateCount, removeCartData }=useContext(CartContext);

async function incrementCount(id,count){
const res = await updateCount(id,count);
if(res.status==='success'){
  toast.success("product updated successfully")
}else{
  toast.error("error")
}
}


async function deccrementCount(id,count){
  const res = await updateCount(id,count);
  if(res.status==='success'){
    toast.success("product updated successfully")
  }else{
    toast.error("error")
  }
  }

if(cartProducts=== null){
return<>

<Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
</>
}

async function deleteElement(id){

 const res=await DeleteProduct(id)
 if(res.status==='success'){
toast.success("product remove successfully")
 }else{
  toast.error("error")
 }
}


async function deleteCart(){
 await removeCartData();
}
  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  <div style={{background:"#eee"}} className='container py-5'>

<h3>shop cart</h3>
<h5>total cart price: {totalCartPrice} EGP</h5>
<h6>total items {numOfCartItems}</h6>
<div className="div d-flex justify-content-between align-items-center">
<button onClick={deleteCart} className='btn btn-danger'>clear</button>
<Link to='/payment' className='btn btn-primary'>Confirm</Link>

</div>
{cartProducts.map(function(product ,idx){
  
  return<>
  <div key={idx} className="row align-items-center">

<div className="col-sm-1">
<img src={product.product.imageCover} className='w-100' alt="" />
</div>
<div className="col-sm-9">
<h2>{product.product.title}</h2>
<h5>Price: {product.price}</h5>
<button onClick={()=>deleteElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
</div>
<div className="col-sm-2">
<div className="d-flex align-items-center">
  <button onClick={()=>incrementCount(product.product.id,product.count +1)} className='btn btn-outline-success'>+</button>
  <span className='mx-2'>{product.count}</span>
  <button onClick={()=>deccrementCount(product.product.id,product.count -1)} className='btn btn-outline-success'>-</button>

</div>
</div>
</div>
  </>
  
  
  })}


</div>
  </>
  
 
}
