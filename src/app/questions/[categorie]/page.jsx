'use client'
import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {Timer} from '@/Components/Timer'
import { ProgressBarQuestions } from "@/Components/ProgessBarQuestions";
import { useMyContext } from "@/context/themeContext"; 
import  supabase  from '@/config/supabase';
import Loader from "@/Components/Loader";
function Questions ({params}){
  const {push} = useRouter()
  const [currentDateObj, setCurrentDate] = React.useState(Date.now() + 600000);   
  const [sessionQuestions, setSessionQuestions] = React.useState([])
  const [sessionOptions, setSessionsOptions] = React.useState([])
  const [currentQuestion,setCurrentQuestion] = React.useState(0);
  const [newQuestion,setNewQuestion] = React.useState(Math.round(Math.random() * 20));
  const [loading, setLoading] = useState(true)
  const {score, setScore} = useMyContext();
  const categorie = params.categorie
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if(categorie === 'Random'){
          const dataQuestions =  (await supabase.from('Questions').select('*')).data
          setSessionQuestions(dataQuestions)
          
          const dataOptions =  (await supabase.from('Options').select('*')).data
          setSessionsOptions(dataOptions)
          
        }else {
          const dataQuestions =  (await supabase.from('Questions').select('*').eq('categorie', categorie)).data
          setSessionQuestions(dataQuestions)
          
          const dataOptions =  (await supabase.from('Options').select('*').eq('categorie', categorie)).data
          setSessionsOptions(dataOptions)
          
        }
        }catch (err) {
          console.error(err)
        }
        
       
    }
    
    const checkTheUser = async () => {
      try {

        const res =  (await supabase.auth.getUser()).data.user
        if(res){
          fetchQuestions()
          setScore(0)
          setLoading(false)
        }else {
          push('/login')
        }
      }catch (err) {
        console.error(err)
      }
   }
   checkTheUser()
    
  }, [categorie,  setScore, push])
  const displayNextQuestion  =  () => {

    let newPossibleQuestion = Math.round(Math.random() * (sessionQuestions.length - 1));
    if(newPossibleQuestion === sessionQuestions.length - 1){
      newPossibleQuestion = newPossibleQuestion - 1

    }

    setNewQuestion(newPossibleQuestion);
   

    setCurrentQuestion(currentQuestion + 1);
  }

    const validTheAnswer = (e) => { 
      
      if (e.target.innerText === sessionQuestions[newQuestion].correct_answer_id.trim()) {
        e.target.classList.add('bg-green-500')
        setScore(score + 1)
      }else {
        e.target.classList.add('bg-red-500')
      }
      
     

          if ( currentQuestion+2 <= 10 ){
            setTimeout(() => {
              displayNextQuestion();
              let filteredQuestions = sessionQuestions.filter(question => {
                return sessionQuestions.indexOf(question) !== newQuestion;
              })
              let filteredOptions = sessionOptions.filter(options => {
                return sessionOptions.indexOf(options) !== newQuestion;
              })
             setSessionQuestions(filteredQuestions)
             setSessionsOptions(filteredOptions)  
            }, 150)
           

   
         }else {
          setTimeout(() => {

            push(`/results/`)
          }, 1000)
          
         }
        
        



    }
    return (
      <div id="QuestionsContainer  flex-col" className="w-screen h-auto min-h-screen items-center  bg-gradient-to-b from-indigo-600 to-indigo-300">
          {!loading ? (
            <>

              <div className="progressBarQuestions flex justify-center mb-8 pt-8">
                <ProgressBarQuestions  currentQuestion={currentQuestion}/>
              </div>
              <div id="QuestionsContent" className="flex  flex-col items-center   rounded-xl h-auto  w-11/12 m-auto bg-slate-50 md:w-1/2">
                <div className="h-1/6 w-2/5 mt-4">

                <Timer  currentDataObj={currentDateObj} score={score}/>
                </div>
                <p className="mt-5 mb-1 text-left w-full pl-3 text-gray-400 font-semibold text-lg">Question {currentQuestion + 1} of 10</p>
                {sessionQuestions.length > 0 && (
                  <>
                  <p className="bounceInDown text-center text-gray-800 pl-3 pr-4 font-semibold text-lg mb-5">{sessionQuestions[newQuestion].question_text}</p>
                  </>
                )}
                {sessionOptions.map(option => {
                  if(sessionQuestions[newQuestion].id === option.question_id){
                    console.log(sessionQuestions[newQuestion].id)
                    console.log(option.question_id)
                    return(

                  <>
                    <button className="options  text-gray-800 transition-all zoomIn w-11/12 cursor-pointer border-solid border-2 border-gray-400 rounded-2xl p-3 text-left mb-9" onClick={(e) => {validTheAnswer(e)}}>{option.option_texta}</button>
                    <button className="options text-gray-800 transition-all zoomIn w-11/12 cursor-pointer border-solid border-2 border-gray-400 rounded-2xl p-3 text-left mb-9" onClick={(e) => {validTheAnswer(e)}}>{option.option_textb}</button>
                    <button className="options text-gray-800 transition-all zoomIn w-11/12 cursor-pointer border-solid border-2 border-gray-400 rounded-2xl p-3 text-left mb-9" onClick={(e) => {validTheAnswer(e)}}>{option.option_textc}</button>
                    <button className="options text-gray-800 transition-all zoomIn w-11/12 cursor-pointer border-solid border-2 border-gray-400 rounded-2xl p-3 text-left mb-9" onClick={(e) => {validTheAnswer(e)}}>{option.option_textd}</button>
                  </>
                    )
                  }
                })}
              </div>
            </>
          ): (<Loader/>)}
        </div>
  )
}

export default Questions