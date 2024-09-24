"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneCalendar } from "react-icons/ai";
//import moment from "moment";

const UltimasNoticias = ({ ultimaNoticia }) => {

  return (
    <section className="  grid grid-cols gap-10 text-blue-950  ">
        {ultimaNoticia?.length > 0 &&
          ultimaNoticia?.map((item, index) => (
            <div  key={index}  className="  container ">

              <Link href={`/noticias-cargadas/home/${item?._id}`} >
              <div className=" grid grid-cols-1 items-center gap-8 text-blue-800">
                <div className="w-full h-auto ">
                <p className="text-primaryColor font-extrabold ">{item?.category}</p>

                  <Image
                    src={ item.image?.url }
                    alt="blog image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full pr-10 pt-10 h-auto rounded-lg mb-2"
                  />
                 </div>
                 
                 
                    <div className=" container  mx-auto grid grid-cols-1 p-5">
                          <h2 className="text-blue-950  flex-row text-lg text-justify">{item?.title}</h2>
                          <p className="text-blue-950  text-lg mx-2 text-justify">{item?.excerpt}</p>
                          <p className="text-blue-950  text-lg mx-2 text-justify">{item?.quote}</p>

                  </div>
               </div>
              </Link>
              </div>
          ))}
      <Link href="/noticias-cargadas/home" className="text-xl  font-bold bg-gray-900 text-white px-1 rounded-2xl "> ver todas las Noticias</Link>
     
      </section>
  );
};

export default UltimasNoticias;
