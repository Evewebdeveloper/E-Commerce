import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";



export const WishContext = createContext();

export function WishContextProvider({ children }) {
  
  const [numOfWishItems, setnumOfWishItems] = useState(0);
  const [wishId, setwishId] = useState(null);


 

  async function getUserWishlist() {

    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",

        {
          headers: {
            token
              : localStorage.getItem('tkn')
          }
        }
      );

      setnumOfWishItems(data.count);
      setwishId(data.data._id);

    } catch (error) {
      console.log("erroe", error);
    }
  };


  async function removeWishData(productId) {

    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        {
          headers: {
            token
              : localStorage.getItem('tkn')
          }
        }
      );

      setnumOfWishItems(0);
      setwishId([]);
    } catch (error) {
      console.log("erroe", error);
    }
  };
  useEffect(function () {
    getUserWishlist()
  }, [])


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
  return <WishContext.Provider value={{ getUserWishlist, addProductToWishList,removeWishData
}} >

    {children}
  </WishContext.Provider> 
}