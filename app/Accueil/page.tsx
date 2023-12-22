"use client"
import "./page.css"
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';


const Accueil = () => {

   
    

  return (
      <div className='Corp1'> 
        
      
      <div className='sport-card'>
        <div className='foot' >
        <h1>
          Football
        </h1>
        </div>
        <div className='basket'>
          <h1> 
         Basket
         </h1>
        </div>
        <div className='combat'>
          <h1> 
         Combat
         </h1>
        </div>
      </div>

     
      <div className='Corp'>
        <h1 className='text-5xl'>perfectionner vos compétences</h1>
        <p>Avec nos formations</p> 
        <button className="bg-[#00000] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white">
            Voir nos Formation
          </button>
      </div>
      </div>
  )
}

export default Accueil
