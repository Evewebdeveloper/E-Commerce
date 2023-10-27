import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";


export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartProducts, setcartProducts] = useState(null);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [cartId, setcartId] = useState(null);


  async function addProductToCart(productId) {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
      "productId": productId
    }, {
      headers: { token: localStorage.getItem("tkn") }
    });
    getUserCart();
    // setnumOfCartItems(data.numOfCartItems);
    // settotalCartPrice(data.data.totalCartPrice);
    // setcartProducts(data.data.products);

    return data;
  }


  async function getUserCart() {

    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",

        {
          headers: {
            token
              : localStorage.getItem('tkn')
          }
        }
      );

      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setcartProducts(data.data.products);
      setcartId(data.data._id);

    } catch (error) {
      console.log("erroe", error);
    }
  };


  async function removeCartData() {

    try {
      const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",

        {
          headers: {
            token
              : localStorage.getItem('tkn')
          }
        }
      );

      setnumOfCartItems(0);
      settotalCartPrice(0);
      setcartProducts([]);
    } catch (error) {
      console.log("erroe", error);
    }
  };
  useEffect(function () {
    getUserCart()
  }, [])

 async function DeleteProduct(productId){
try {
 const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:{
  token:localStorage.getItem('tkn') }});
  setnumOfCartItems(data.numOfCartItems);
  settotalCartPrice(data.data.totalCartPrice);
  setcartProducts(data.data.products);
  return data;

} catch (error) {
  console.log('error', error);
}
  }

  

 async function updateCount(productId, count){
  try {
    const{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { 'count':count },{headers:{token :localStorage.getItem('tkn')}});
    setnumOfCartItems(data.numOfCartItems);
    settotalCartPrice(data.data.totalCartPrice);
    setcartProducts(data.data.products);


return data;
  } catch (error) {
    console.log('error', error);
  }
  }


  async function addProductToWishList(productId){

    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        "productId": productId
      }, {
        headers: { token: localStorage.getItem("tkn") }
        
      });
return data;
    } catch (error) {
      console.log(error, 'err');
    }
    
      }
  return <CartContext.Provider value={{ getUserCart, addProductToCart, cartProducts, totalCartPrice, numOfCartItems, DeleteProduct,updateCount ,removeCartData, cartId
  ,setcartProducts,
  settotalCartPrice,
  setnumOfCartItems,
  addProductToWishList
  }} >

    {children}
  </CartContext.Provider> 
}