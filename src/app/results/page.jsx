'use client'
import React, { useEffect, useState} from "react";
import { useMyContext } from "@/context/themeContext";
import  trophySymbol from '@/assets/trophy.svg'
import  supabase  from '@/config/supabase';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import '../styles/Results.css'
function Results() {
  const {push} = useRouter();
  const {score, setScore} = useMyContext();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      const actualId = session.user.id
      const updateTheGlobalScore = async () => {
        try {
          const points = (await supabase.from('users').select('points').eq('userId', actualId).limit(1)).data[0].points
          if(points !== undefined) {
            const newScore = points + (score * 10)
            try {
              const res = await supabase.from('users').update({points: newScore}).eq('userId', actualId)
              console.log(res);
            } catch (error) {
              console.error(error)
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
      if(!session){
        push('/Login')
      }
        else if(score === -1){
          push('/')
        }
        else {
        updateTheGlobalScore()
        setLoading(false)
      }
    })
  }, [push, score])
  console.log(score);
  const displayScoreMessage = () => {
    let message = '';
    if(score <= 1){
      return message = 'You are not prepared 😥'
    }else if (score > 1 && score <= 6){
      return message = 'You have to improve your skills 😑'
    }else if (score > 6 && score <= 9){
      return message = 'You are good for the icfes 😉'
    }else {
      return message = 'You are ready for the icfes Test 😎'
    }
  }
  return (
    <React.Fragment>
      
      <div className='resultsContainer h-screen w-11/12 m-auto md:w-1/3' >
        <h2 className="text-center text-3xl m-5 mb-9 font-semibold">{displayScoreMessage()} </h2>
        <section className="resultsMainSection bg-red-400 rounded-2xl h-3/5 flex flex-col items-center md:h-auto " >
          <Image src={trophySymbol} alt="trophySymbol" className="w-2/3 mt-4 md:w-52" />
          <p className="text-center text-xl text-slate-50 font-semibold mt-4">You get +{score * 10} ICFES points</p>
          <Link href="/ranking" className="text-white rounded-xl mt-9 bg-slate-300  bg-opacity-60 p-4 text-lg mb-5 ">Check  ICFES test ranking</Link>
        </section>
        <section className=" flex justify-between mt-9 ">
          <div>
            <h5 className=" mb-1 text-left w-full text-gray-400 font-semibold text-base">CORRECT ANSWER</h5>
            <p className="text-2xl font-semibold">{score} questions</p>
          </div>
          <div>
            <h5 className="mb-1 text-left w-full text-gray-400 font-semibold text-base">INCORRECT ANSWER</h5>
            <p className="text-2xl font-semibold">{10 - score} questions</p>
          </div>
        </section>
        <div className="flex justify-center">
        <Link href={'/'} className="bg-indigo-600 w-3/4 p-4 rounded-2xl mt-5 text-slate-50 font-semibold text-lg ml-"  type="submit" >Done</Link>

        </div>
          
      </div>
    </React.Fragment>
  )
}

export default Results