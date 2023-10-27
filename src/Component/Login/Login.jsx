import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  { Circles } from 'react-loader-spinner';
import { authContext } from '../Context/Authentication';
import { Helmet } from 'react-helmet';


export default function Login() {

  const {setToken}=useContext(authContext);
  let user = {
  
    email: "",
    password: "",
   
  }

  const [errMsg, seterrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  async function loginNew(values) {

    setisLoading(true);

console.log("sendinggggg");


      try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
        console.log(data);

     if (data.message === "success") {
        setsuccessMsg(' Welcome dear');
        localStorage.setItem('tkn' , data.token)
        setToken(data.token);
        setTimeout(function () {
          Navigate('/Products')
        }, 1000);
    

      } 
      }
      catch(error){
          
        console.log('error occured',error.response.data.message);
        seterrMsg(error.response.data.message)
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
     
      if (values.password.length < 6 || values.password.length > 13) {
        errors.password = "pass must be from 6 to 13 char"
      }
     
      return errors;
    }
  })
  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
    <div className='w-75 m-auto py-5'>
      <h2>Login Now:</h2>
      <form onSubmit={formikObj.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="email" name='email' placeholder='Email' id='email' value={formikObj.values.email} />
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'> {formikObj.errors.email}</div> : ""}

        <label htmlFor="password">Password:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" name="password" id="password" placeholder='Password' value={formikObj.values.password} />
        {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'> {formikObj.errors.password}</div> : ""}

        <button type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success my-3'>
        {isLoading?  <Circles
  height="20"
  width="70"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> : "Submit"}
        
        </button>
      </form>

   <p className='forgetpass '>
   <Link to={'/ForgetPassword'} >Forget Password ..?</Link>
   </p>
      

      

    </div>



  </>
}

