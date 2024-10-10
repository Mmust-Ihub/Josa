import React from 'react';
import { FileX } from 'lucide-react';

interface EmptyBlogContainerProps {
  message: string;
}

const EmptyBlogContainer: React.FC<EmptyBlogContainerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 my-8 text-center">
      <FileX className="text-gray-400 mb-4" size={64} />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">No Blogs Found</h2>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyBlogContainer;