"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import demoImage from '../assets/imagenes/actualidad.jpg'
import {AiOutlineClose} from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import {signOut, useSession} from 'next-auth/react'

const Navbar = () => {
    const [userData, setUserData] = useState({})
    const {data: session, status} = useSession();

    const pathname = usePathname();

    const [showDropdown, setShowDropdown] = useState(false)

    async function fetchUser() {
        try {
            const res = await fetch(`http://localhost:3000/api/user/${session?.user?._id}`);

            const resData = await res.json();

            setUserData(resData)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser();
    },[session?.user?._id])

    const handleShowDropdown = () => setShowDropdown(prev => true)
    const handleHideDropdown = () => setShowDropdown(prev => false)
  return (
    <div className='container py-2 h-16 flex items-center justify-between bg-primaryColor'>
        <Link href="/panel">
            <h2>
                Panel de Noticias
            </h2>
        </Link>

        <ul className='flex items-center gap-3'>
            <li>
                <Link href="/panel/blog" className={ pathname === '/panel/blog' ? "text-green-300 font-bold" : ""}>Noticias</Link>
            </li>

            {
                session?.user ? (
                    <>
                        <li>
                            <Link href="/panel/create-blog"  className={ pathname === '/panel/create-blog' ? "text-green-300 font-bold" : ""}>Cargar Noticias</Link>
                        </li>
                        <li>
                            <div className='relative'>
                                <Image 
                                    onClick={handleShowDropdown}
                                    src={userData?.avatar?.url ? userData?.avatar?.url : demoImage}
                                    alt='avatar'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className='w-10 h-10 rounded-full cursor-pointer'
                                />

                                {showDropdown && (
                                    <div className='absolute top-0 right-0 bg-primaryColorLight p-5'>
                                        <AiOutlineClose onClick={handleHideDropdown} className='w-full cursor-pointer' />
                                        <button onClick={() => {signOut(); handleHideDropdown();}}>Cerrar </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/panel/login"  className={ pathname === '/panel/login' ? "text-green-300 font-bold" : ""}>Login</Link>
                        </li>
                        <li>
                            <Link href="/panel/signup"  className={ pathname === '/panel/signup' ? "text-green-300 font-bold" : ""}>Registrar Usuario</Link>
                        </li>
                    </>
                )
            }


        </ul>
    </div>
  )
}

export default Navbar