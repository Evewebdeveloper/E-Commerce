import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';




export default function Brands() {
const [brands, setbrands] = useState(null)
    async function getAllBrands(){

const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
setbrands(data.data)

    }

   useEffect(function(){
    getAllBrands()
   },[])






    return <>

<Helmet>
    <title>All Brands</title>
  </Helmet>

{brands?  <div className="container  p-5">
            <div className="row gy-3">
            <h1 className='mt-2 mb-5 main-color text-center'>All Brands</h1>

                {brands.map(function ( brand,idx) {

                    return <>

                        <div key={idx} className="col-sm-3">

                            <div class="card" >

                                <div class="card-body">


                                    <img src={brand.image} className=' text-center' alt="" />

                                    <h2 className="card-title text-center   mt-3">{brand.name}</h2>

                                </div>
                            </div>
                        </div>




                    </>
                })}
            </div>
        </div> :
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
                    </div>}



                
            

     






    </>
}




