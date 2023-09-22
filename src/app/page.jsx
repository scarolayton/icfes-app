'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Cards } from '../Components/Cards'
import  Menu  from '@/Components/Menu';
import supabase  from '@/config/supabase';
import { useMyContext } from '@/context/themeContext';
import { FaUserAstronaut } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Loader from '@/Components/Loader';
import Image from 'next/image';
const Home = () => {
  const {push} = useRouter()
  const {currentUser, setCurrentUser} = useMyContext();
  const [loading, setLoading] = useState(true)
  useEffect( ()  => {
  
    const checkTheUser = async () => {
        try {
  
          const res =  (await supabase.auth.getUser()).data.user
          if(res){
            setCurrentUser({...res})
            setLoading(false)
          }else {
            push('/login')
          }
        }catch (err) {
          console.error(err)
        }
    }
    checkTheUser()
  }, [push, setCurrentUser]) 
  return (
    
          <div className='h-screen w-screen bg-gradient-to-b from-indigo-600 to-indigo-300'>
            {!loading ? ( 
              <>
                  <header className='text-slate-50 text-xl font-semibold flex justify-between p-5 mb-4'>
                  {currentUser.app_metadata.provider === 'email'  ?  (
                      <>

                      Welcome Anonymous-{currentUser.id.slice(0,6)}

                        <FaUserAstronaut className='w-6 h-10 mr-3'/>
                      
                      </>
                    
                    ):
                    ( 
                    <>
                      Welcome {currentUser.user_metadata.full_name}
                      <button onClick={() => {setOpenLogOutMenu(!openLogOutMenu)}}>
                      <Image  width={50} height={50} className='w-14 h-14 rounded-full mr-3' src={currentUser.user_metadata.avatar_url }alt="user-picture" />
                      </button>
                    </>

                    )
                    }
                </header>
                <section className='bg-slate-200 rounded-2xl h-full'>
                  <h3 className='font-bold text-xl p-4'>Categories</h3>
              

                  <Cards/>
        
                </section>
                <Menu/>
              </>
            ): (
              <Loader/>
            )}
            
            
          </div>
  )

}

export default Home