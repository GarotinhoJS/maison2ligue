import React from 'react';
import Accueil from './Accueil/page';
import "./page.css"
import Navbar from './Navbar/Navbar';
import Contexte from './Contexte/page';





const Page = () => {
  
  return (
    <div className='header'> 
       <Navbar/>
        <Accueil />
        <Contexte/>
       
        
        
        
      


      
    </div>
  );
};

export default Page;