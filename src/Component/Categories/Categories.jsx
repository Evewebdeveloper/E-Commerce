import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { data } from 'jquery';
import { Helmet } from 'react-helmet';




export default function Categories() {
    const [categories, setCategories] = useState(null);

    async function getSomeCategory(){

const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
setCategories(data.data)

    }

   useEffect(function(){
    getSomeCategory()
   },[])






    return <>

<Helmet>
    <title>All Gategories</title>
  </Helmet>
{categories? 


<div className="container  p-5">
            <div className="row">
                {categories.map(function ( Category,idx) {

                    return <>

                        <div key={idx} className="col-md-4">

                            <div class="card" >
                                <div class="card-body">


                                    <img src={Category.image} className='w-50 ' alt="" />

                                    <h2 className="card-title text-center p-2 main-color mt-3">{Category.name}</h2>

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




