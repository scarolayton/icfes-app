import React from 'react'
import { BiMath } from "react-icons/bi";
import { RiEnglishInput } from "react-icons/ri";
import { AiOutlineRead } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";  
import { MdOutlineScience } from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import  supabase  from '@/config/supabase';
import { useMyContext } from '@/context/themeContext';
import { useRouter } from 'next/navigation';
const Cards = () => {
  const {push} = useRouter()
  const {currentUser, setCurrentUser} =useMyContext();
  const categoriesArray = [{
    'id': 1,
    'name' : 'Math',
    'symbol' : <BiMath className='text-20'/>,
    'color' : '#77EC92'
   },
   {
    'id': 2,
    'name' : 'English',
    'symbol' : <RiEnglishInput/>, 
    'color' : '#A6E0EC'
   },
   {
    'id': 3,
    'name' : 'Literature',
    'symbol' : <AiOutlineRead/>, 
    'color' : '#C29AEC'
   },{
    'id': 4,
    'name': 'Social-Science',
    'symbol' : <BsPerson/>,
    'color' : '#ECA6E1'
   },{
    'id': 5,
    'name': 'Science',
    'symbol' : <MdOutlineScience/>,
    'color' : '#EA7B80'
   },{
    'id': 6,
    'name': 'Random',
    'symbol' : <FaRandom/>,
    'color' : '#E9A089'
   }
  ];
  const handdleClick = async (categorie) => {
    try {
      const checkIfItIsReagisterred = await supabase.from('users').select('id').eq('userId', currentUser.id).limit(1);
      if(checkIfItIsReagisterred.data.length === 0){
        try {
          const res = await supabase.from('users').insert({
            user_name: currentUser.user_metadata.full_name,
            avatar_url: currentUser.user_metadata.avatar_url
          })

        }catch (err) {console.error(err)}
      }

    }catch (err) {
      console.error(err)
    }finally{
      push(`/questions/${categorie}`)
    }

  }
  return (
    <div className='grid h-3/4 gap-6 grid-cols-2  p-4'>
      {categoriesArray.map((categorie) => (
        <button key={categorie.id} onClick={() => handdleClick(categorie.name)} className=' flex flex-col rounded-2xl justify-center items-center' style={{background: categorie.color}}>
           <i className='text-4xl bg-slate-300 p-3 rounded-xl bg-opacity-30 inline-block text-slate-50'>{categorie.symbol }</i>
           <p className='text-slate-50 font-semibold mt-3 text-base'>{categorie.name}</p>
        </button>
         
      ))}
    </div>
  )
}


export {Cards}