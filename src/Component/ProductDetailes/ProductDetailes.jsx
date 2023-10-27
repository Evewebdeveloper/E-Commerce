import axios from 'axios'
import { useContext, useState } from 'react';
import { React, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Bars } from 'react-loader-spinner';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import addProductToWishList from '../WishList/WishList'


export default function ProductDetailes() {
  const { addProductToCart ,addProductToWishList } = useContext(CartContext)
  const { id } = useParams();
  const [sendingLoader, setsendingLoader] = useState(false)
  async function addProduct(id) {
    setsendingLoader(true);
    const res = await addProductToCart(id)
    if (res.status === "success") {
      toast.success(res.message)

    } else {
      toast.error("error happened")
    }

    setsendingLoader(false);
  }

  function getProductDetailes() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const { data, isLoading } = useQuery("ProductDetailes", getProductDetailes);
  if (isLoading) {
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

async function addWish(id){

 const res=await addProductToWishList(id);

 if(res.status ==="success"){
  toast.success(res.message)

 }else{
   toast.error("error happened")
 }
}
  
  return <>
<Helmet>
    <title>{data.data.data.title.split(' ').slice(0,2).join(' ')}</title>
  </Helmet>
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-3">
          <div className="photo">
            <figure>
              <img className='w-100' src={data?.data.data.imageCover} alt={data.data.data.title} />
            </figure>
          </div>

        </div>
        <div className="col-md-9">
          <div className="detailes text-center">
            <h1>{data.data.data.title}</h1>
            <p className='text-muted'>{data.data.data.description}</p>
            <h5>Price: {data.data.data.price} EGP</h5>
            <div className="col-md-3">
        <p><span><i className='fa-solid fa-star star-color '></i>{data?.data.data.ratingsAverage}</span></p>
            <p ><button onClick={() => addWish(id)} ><i class="fa-solid fa-heart"></i></button></p>
        </div>
  
            <button onClick={() => addProduct(data.data.data.id)} className='w-75 text-center rounded-3 main-bg-color p-2 border-white text-white'>

              {sendingLoader ? <Bars
                height="40"
                width="40"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : "+ ADD TO CART"}
              
            </button>
            
          </div>
     
        </div>
      
      </div>
    </div>
  </>
}
