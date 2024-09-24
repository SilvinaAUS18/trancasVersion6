"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "../../../components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "../../../components/TextArea";
import demoImage from '../../../assets/imagenes/actualidad.jpg'
import Image from 'next/image'

const initialState = {
  title: "",
  excerpt: "",
  description: "",
  quote: "",
  category: "ACTUALIDAD",
  photo: "",
};

const CreateBlog = () => {

  const CLOUD_NAME="dph7ozqvf";
  const UPLOAD_PRESET="trancas_imagenes";

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {data: session, status} = useSession();

  if(status === "loading") {
    return <p>loading...</p>
  }

  if(status === "unauthenticated") {
    return <p>Access denied</p>
  }

  const handleChange = (event) => {
    setError("")
    const {name, value, type, files} = event.target;

    if(type === 'file') {
      setState({...state, [name]: files[0]});
    } else {
      setState({...state, [name]: value})
    }
  };
console.log(session)
  const handleSubmit = async(e) => {
    e.preventDefault();

    const {photo, title, category, description, excerpt, quote} = state;

    if(!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.");
      return;
    }

    if(photo) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if(photo.size > maxSize) {
        setError('File size is too large. Please select a file under 5MB.');
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long.");
      return;
    }

    if (description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.");
      return;
    }

    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long.");
      return;
    }
    
    try{
      setIsLoading(true);
      setError("")
      setSuccess("")
      const image = await uploadImage();

      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id
      }
      console.log(newBlog);

      const response = await fetch("http://localhost:3000/api/blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`
        },
        method: "POST",
        body: JSON.stringify(newBlog)
      })

      if(response?.status === 201) {
        setSuccess("Blog created successfully.");
        setTimeout(() => {
          router.refresh();
          router.push("/panel/blog")
        }, 1500); 
      } else {
        setError("Error al crear la Noticia.")
      }
    } catch(error) {
      console.log(error);
      setError("Error occurred while creating blog.")
    }

    setIsLoading(false)
  }

  const uploadImage = async () => {
    if(!state.photo) return;

    const formdata = new FormData();

    formdata.append('file', state.photo);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try{
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formdata
      });

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data['secure_url']
      }

      return image;
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <section className="container mx-30 mt-5 rounded-xl bg-blue-300">
      <h2 className="mb-5">
        <span className="special-word">Crear </span> Noticia
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="TITULO"
          type="text"
          name="title"
          placeholder="Titulo..."
          onChange={handleChange}
          value={state.title}
        />


        <TextArea
          label="BAJADA"
          rows="2"
          name="excerpt"
          placeholder="Bajada..."
          onChange={handleChange}
          value={state.excerpt}
        />
          <TextArea
          label="TEXTO"
          rows="4"
          name="description"
          placeholder="texto..."
          onChange={handleChange}
          value={state.description}
        />


        <TextArea
          label="RESUMEN"
          rows="2"
          name="quote"
          placeholder="Resumen..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Seleccionar Opcion</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-slate-400 text-blue-600"
          >
            <option value="ACTUALIDAD">ACTUALIDAD</option>
            <option value="DEPORTES">DEPORTES</option>
            <option value="TURISMO">TURISMO</option>
            <option value="PRODUCCION">PRODUCCION</option>
            <option value="INSTITUCIONAL">INSTITUCIONAL</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm  text-blue-800 font-extrabold">
            Subir Imagen
          </label>

          <input onChange={handleChange} type="file" name="photo" accept="image/*" />

          {state.photo && (
            <div>
              <Image 
                src={URL.createObjectURL(state.photo)}
                priority
                alt="Sample image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 mt-5"
              />
            </div>
          )}

          
        </div>

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="btn">
          {isLoading ? "Loading..." : "Crear Noticia"}
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;
