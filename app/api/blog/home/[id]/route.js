// http://localhost:3000/api/blog/home/id

import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import Blog from "../../../../../models/Blog";


  
export async function GET(req, res) {
  await connectDB();

  const id = res.params.id;

  try {
    const blog = await Blog.findById(id)
     

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}

