import React from 'react';
import Carousel from "../componentsFronend/Carrucel"
import Trancas from "../componentsFronend/Trancas"
import Banner from "../componentsFronend/Banner";
import CardHome from '../componentsFronend/CardHome';

const HomePrincipal = () => {
  return (
    <div className='container mx-auto'>
    <Carousel/>
     <Banner />
     <Trancas/>
     <CardHome />
    </div>
  )
}

export default HomePrincipal
