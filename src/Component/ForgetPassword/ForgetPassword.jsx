
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  { Circles } from 'react-loader-spinner';
import { authContext } from '../Context/Authentication';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';



export default function ForgetPassword() {

  const [errMsg, seterrMsg] = useState(null);
  const {setToken}=useContext(authContext);
  let user = {
  
    email: "",

  }

  
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  async function loginNew(values) {

    setisLoading(true);

console.log("sendinggggg");


      try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
        console.log(data);

      
        if (data.statusMsg === "success") {
          toast.success('Reset code sent to your email ');
       
          setTimeout(function () {
            Navigate('/Code')
          }, 500);
      
  
        }else{
          toast.error("error Email")
        }

      }
      catch(error){
          
        console.log('error occured',error.response.data.message);
        toast.error(error.response.data.message)
      }
  }

  
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: loginNew,
    

    validate: function (values) {
      // console.log('validated' , values);
      seterrMsg(null);
      const errors = {};
      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        errors.email = 'email is not valid'
      }
    
     
      return errors;
    }
  })
  return <>
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
    <div className='w-75 m-auto py-5'>
      <h2 className='mb-3'>please enter your Email to verification code</h2>
      <form onSubmit={formikObj.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input className='form-control mt-3 mb-2' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="email" name='email' placeholder='Email' id='email' value={formikObj.values.email} />
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'> {formikObj.errors.email}</div> : ""}

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


