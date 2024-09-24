import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import Blog from "../../../../../models/Blog";


export async function GET(req) {
  await connectDB();

  try {
    const blogs = await Blog.find({})
      return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}
