/* eslint-disable react/prop-types */
import { Newspaper } from 'lucide-react';

export default function EmptyContainer({category}) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 my-8 text-center mt-12 h-[50vh]">
    <Newspaper className="text-gray-300 mb-4" size={64} />
    <h2 className="text-2xl font-bold text-gray-700 mb-2">No blogs found in the {category} category.</h2>
    <p className="text-gray-500 mb-6 max-w-md">
      It looks like this category is waiting for some amazing content.<br></br> Our Edifors are working on uploading
    </p>
    
  </div>  )
}
