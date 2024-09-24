import React from "react";
import Image from "next/image";
import demoImage from "../assets/imagenes/actualidad.jpg";
import Link from "next/link";
import moment from "moment";

const FirstBlog = ({ firstBlog }) => {
  return (
    <section>
      <Link href={`/panel/blog/${firstBlog?._id}`}>
        <div className=" container mx-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full ">
            <Image
              src={firstBlog?.image ? firstBlog.image?.url : demoImage}
              alt="first blog image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className=" space-y-2 mr-16 ">
            <div className="flex items-center gap-3 text-xs">
              <p className="text-primaryColor">{firstBlog?.category}</p>

            </div>

            <div className=" container  space-y-2 text-center">
              <p className=" text-xl text-justify">{firstBlog?.title}</p>
              <p className="text-sm text-justify text-paragraphColor ">
                {firstBlog?.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={
                  firstBlog?.authorId?.avatar?.url
                    ? firstBlog?.authorId?.avatar?.url
                    : demoImage
                }
                alt="picture of the author"
                width={0}
                height={0}
                sizes="100vw"
                className="w-10 h-10 rounded-full"
              />

              <div className="text-xs">
                <h6>{firstBlog?.authorId?.name}</h6>
                <p className="text-paragraphColor">
                  {firstBlog?.authorId?.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FirstBlog;
