import Image from "next/image";
import home_bird from '../../assets/imagenes/actualidad.jpg'

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(100vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs font-extrabold">MUNICIPALIDAD DE TRANCAS</p>
        <h1 className="pb-5">
          PANEL <span className="special-word">NOTICIAS</span><br /> 
        </h1>

        <h1 className="pb-5">
          A traves de este Panel puede <br /><br />
          <span className="special-word"> * Cargar Noticias </span>  <br />
          <span className="special-word"> * Ver las  Noticias Cargadas </span> 

        </h1>

        <p className="special-word"> - Se necesita tener usuario para poder acceder al panel de Carga de Noticias.</p><br />
        <p className="special-word"> - Si no tiene Usuario por favor registrar su usuario </p>
      </div>

      <div className="hidden md:block basis-1/3 my-auto">
        <Image 
          src={home_bird}
          alt="Home bird"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
