'use client'
import React, { useEffect, useState } from "react";
import illustration from '@/assets/home-illustration.gif'
// import { Helmet } from "react-helmet";
import supabase from "@/config/supabase";
import Chance from "chance";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/themeContext";
import Loader from "@/Components/Loader";
import Image from "next/image";
function Login(props) {
  const {currentUser} = useMyContext()
  const {push} = useRouter()
  const chance = new Chance()
  const [loading, setLoading] = useState(true)
  const signInWithGoogle = async () => {
    try {

      const res = await supabase.auth.signInWithOAuth({
         provider: 'google',
       })      
      console.log(res);
    }catch (err){
      console.error(err)
    }
  }
  const signInAsAsnonymous = async () => {
    try {

      const res = await supabase.auth.signUp({
        email: chance.email(),
        password: chance.string()
      })    
      push('/') 
    }catch (err){
      console.error(err)
    }
  }
  useEffect(() => {
    const checkTheUser = async () => {
      try {
        const res =    (await supabase.auth.getUser()).data.user
        if(res){
          push('/')
        }else {
          setLoading(false)
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    checkTheUser()
  }, [push])  
  return (

    <section className="HomeContainer w-screen h-auto bg-gradient-to-b  from-indigo-600 to-indigo-300 flex justify-around  items-center flex-col min-h-screen">
      {!loading ? (
        
        <React.Fragment>
            <h1 className="text-slate-100 m-10 text-3xl font-extrabold md:text-5xl">ICFES Test</h1>
            <Image src={illustration} alt="illustration" className="w-3/5 md:w-3/12" />
          <div className="bg-white h-auto w-11/12 mb-5 text-center rounded-2xl p-2 md:w-1/3">
            {/* <img src={logo} alt=""/> */}
            <h3 className="font-bold text-gray-900 text-xl ">Login or create an account</h3>
            <p className="text-sm leading-5 text-gray-500 mt-5 m-auto">This is an app to practice your abilities for the icfes test, try to use this app on a mobile phone</p>
            <div className="mt-5 flex justify-center items-center  flex-col">
            <button onClick={signInWithGoogle}  className='block bg-indigo-500 w-11/12 text-lg text-slate-100 p-4 rounded-2xl  mb-6 ' >Login with Google </button>
            <button onClick={signInAsAsnonymous} className='mb-6 bg-gray-300 text-indigo-500 w-11/12 p-4 rounded-2xl' >Sing up as anonymoous</button>
            </div>
          </div> 
        </React.Fragment>
      ): (<Loader/>)}
     
        </section>
  );
}

export default Login