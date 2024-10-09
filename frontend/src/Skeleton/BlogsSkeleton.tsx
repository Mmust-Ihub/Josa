import React from "react";
import BlogSkeleton from "./BlogSkeleton";

export default function BlogsSkeleton() {
  return (
   <>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <BlogSkeleton/>
    <BlogSkeleton/>
    <BlogSkeleton/>

   </div>
   
   </>
  )
}
