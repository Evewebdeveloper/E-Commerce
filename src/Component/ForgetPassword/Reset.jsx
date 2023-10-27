import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  { Circles } from 'react-loader-spinner';
import { authContext } from '../Context/Authentication';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';


export default function Reset() {

  const {setToken}=useContext(authContext);
  let user = {
  
   
    PrevPassword: "",
    NewPassword:"",
   
  }

  const [errMsg, seterrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  async function loginNew(values) {

    setisLoading(true);

console.log("sendinggggg");


try{
  const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values ,
  {headers:localStorage.getItem('tkn')}
  );
  console.log(data);


  if (data.statusMsg === "success") {
    toast.success('New Password Creating ');
 
    setTimeout(function () {
      Navigate('/Login')
    }, 500);


  }else{
    toast.error("They don't match")
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
   
     
      if (values.PrevPassword.length < 6 || values.PrevPassword.length > 13) {
        errors.PrevPassword = "pass must be from 6 to 13 char"
      }
      if (values.NewPassword.length < 6 || values.NewPassword.length > 13) {
        errors.NewPassword = "pass must be from 6 to 13 char"
      }
     
     
      return errors;
    }
  })
  return <>
  <Helmet>
    <title>Reset Password</title>
  </Helmet>
    <div className='w-75 m-auto py-5'>
      <h2>Reset Password:</h2>
      <form onSubmit={formikObj.handleSubmit}>

      
        <label htmlFor="PrevPassword">Prev. Password:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="Password" name="PrevPassword" id="PrevPassword" placeholder='PrevPassword' value={formikObj.values.PrevPassword} />
        {formikObj.errors.PrevPassword && formikObj.touched.PrevPassword ? <div className='alert alert-danger'> {formikObj.errors.PrevPassword}</div> : ""}


        <label htmlFor="NewPassword">New Password:</label>
        <input className='form-control mb-3 ' onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} type="password" name="NewPassword" id="NewPassword" placeholder='NewPassword' value={formikObj.values.NewPassword} />
        {formikObj.errors.NewPassword && formikObj.touched.NewPassword ? <div className='alert alert-danger'> {formikObj.errors.NewPassword}</div> : ""}

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
   <Link to={'/Home'} >Welcome</Link>
   </p>
      


    </div>



  </>
}

