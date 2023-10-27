
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  { Circles } from 'react-loader-spinner';
import { authContext } from '../Context/Authentication';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';



export default function Code() {

  const [errMsg, seterrMsg] = useState(null);
 
  let user = {
  
    resetCode: "",
    
   
  }
  
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  async function loginNew(values) {

    setisLoading(true);

console.log("sendinggggg");


      try{
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" ,values
        );
        console.log(data);

      
        if (data.status === "success") {
          toast.success('Done Succseefully ');
       
          setTimeout(function () {
            Navigate('/Reset')
          }, 500);
      
  
        }

      }
      catch(error){
          
        console.log('error occured',error.response.data.message);
        toast.error("error occured ");
      }
  }

  
  const formikObj = useFormik({
    initialValues: user,
    
    onSubmit: loginNew,
    


  })
  return <>
  <Helmet>
    <title>Vertify Code
</title>
  </Helmet>
    <div className='w-75 m-auto py-5'>
      <h2 className='mb-3'>please enter your Code </h2>
      <form onSubmit={formikObj.handleSubmit}>
        <label htmlFor="Code">Your Code:</label>
        <input className='form-control mt-3 mb-2' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="number" name='Code' placeholder='Code' id='Code' value={formikObj.values.Code} />
        {formikObj.errors.Code && formikObj.touched.Code ? <div className='alert alert-danger'> {formikObj.errors.Code}</div> : ""}

        <button type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success my-3'>
        {isLoading?  <Circles
  height="20"
  width="70"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> : "Vertify"}
        
        </button>
      </form>

    </div>



  </>
}


