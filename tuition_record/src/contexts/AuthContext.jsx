import { createContext, useState } from "react";

export const AuthContext=createContext({isAuth:'',toggleAuth:()=>{}})

export const AuthContextProvider=({children})=>{
 const [isAuth,setIsAuth]=useState('logout') 



 const toggleAuth =(res)=>{
  // console.log(res) 
  // console.log(isAuth) 
setIsAuth(res.status?"login":"logout")
 }
  return <AuthContext.Provider value={{isAuth,toggleAuth}}>
{children}
  </AuthContext.Provider>
}