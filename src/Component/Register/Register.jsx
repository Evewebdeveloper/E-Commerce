import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { Circles } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Register() {

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  const [errMsg, seterrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  async function registerNewUser(values) {

    setisLoading(true);

console.log("sendinggggg");


      try{
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
        console.log(data);

     if (data.message === "success") {
        setsuccessMsg('Account Created Successfully , Welcome dear');
        setTimeout(function () {
          Navigate('/Login')
        }, 1500);
    

      } 
      }
      catch(error){
          
        console.log('error occured',error.response.data.message);
        seterrMsg(error.response.data.message)
      }
  }

  
  const formikObj = useFormik({
    initialValues: user,
    onSubmit: registerNewUser,

    validate: function (values) {
      // console.log('validated' , values);
      seterrMsg(null);
      const phoneRegex = /^(02)?01[0125][0-8]{8}&/;
      const errors = {};
      if (values.name.length < 4 || values.name.length > 13) {
        errors.name = "Name must be from 4 charchters to 10"
      }

      if (values.email.includes("@") === false || values.email.includes(".") === false) {
        errors.email = 'email is not valid'
      }
      if (phoneRegex.test(values.phone) === true) {
        errors.phone = "phone is not valid"
      }
      if (values.password.length < 6 || values.password.length > 13) {
        errors.password = "pass must be from 6 to 13 char"
      }
      if (values.password === values.rePassword-1) {

        errors.rePassword = "dosen't match"
      }
      return errors;
    }
  })
  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>
    <div className='w-75 m-auto py-5'>
      {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
      {successMsg ? <div className="alert alert-success">{successMsg}</div> : ""}

      <h2>Register Now:</h2>
      <form onSubmit={formikObj.handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input onBlur={formikObj.handleBlur} className='form-control mb-3  ' onChange={formikObj.handleChange} value={formikObj.values.name} type="text" name='name' placeholder='Name' id='name' />
        {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger'> {formikObj.errors.name}</div> : ""}

        <label htmlFor="email">Email:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="email" name='email' placeholder='Email' id='email' value={formikObj.values.email} />
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'> {formikObj.errors.email}</div> : ""}

        <label htmlFor="password">Password:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" name="password" id="password" placeholder='Password' value={formikObj.values.password} />
        {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'> {formikObj.errors.password}</div> : ""}

        <label htmlFor="rePassword">rePassword:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" placeholder='rePassword' id='rePassword' value={formikObj.values.rePassword} />
        {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger'> {formikObj.errors.rePassword}</div> : ""}

        <label htmlFor="phone">Phone:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="tel" name="phone" id="phone" value={formikObj.values.phone} />
        {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'> {formikObj.errors.phone}</div> : ""}


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



    </div>



  </>
}
