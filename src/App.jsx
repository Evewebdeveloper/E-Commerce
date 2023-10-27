import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Notfound from './Component/Notfound/Notfound';
import Products from './Component/Products/Products';
import {AuthProvider} from './Component/Context/Authentication'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import WishList from './Component/WishList/WishList';
import Categories from './Component/Categories/Categories';
import Brands from './Component/Brands/Brands';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetailes from './Component/ProductDetailes/ProductDetailes';
import { CartContextProvider } from './Component/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Component/Payment/Payment';
import { Offline } from 'react-detect-offline';
import Code from './Component/ForgetPassword/Code';
import Reset from './Component/ForgetPassword/Reset';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';


const myRouter=createBrowserRouter([
 
{path:"/", element: <Layout/> , children:[
  {index:"true", element: <Home/>},
  {path:"Home", element: <Home/> },
  {path:"cart", element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
  {path:"wish List", element: <WishList/> },
  {path:"products", element:<ProtectedRoute> <Products/> </ProtectedRoute> },
  {path:"categories", element:<ProtectedRoute> <Categories/> </ProtectedRoute>},

  {path:"ProductDetailes/:id", element:<ProtectedRoute> <ProductDetailes/> </ProtectedRoute>},
  {path:"brands", element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
  {path:"payment", element:<ProtectedRoute> <Payment/> </ProtectedRoute>},
  {path:"Login", element:<Login/>},

  {path:"ForgetPassword", element:<ForgetPassword/>},
    {path:"Code", element: <Code/> },
     {path:"Reset", element: <Reset/> },
  {path:"Notfound", element:<Notfound/>},
  {path:"Register", element:<Register/>},
  {path:"*", element:<ProtectedRoute> <Notfound/></ProtectedRoute>},

]}
])


export default function App() {
  let clientQuery= new QueryClient();
  return <>


  
  <QueryClientProvider client={clientQuery}>
    <CartContextProvider >
    <AuthProvider>
  <RouterProvider router={myRouter}/>

  </AuthProvider>
    </CartContextProvider>


<Toaster/>
<Offline>
<div className="div fixed-bottom start-0 bottom-0 bg-dark text-white p-3 rounded-3 ">
oooop.....you are offline
</div>
</Offline>
  </QueryClientProvider>
  
  </>
  
}



