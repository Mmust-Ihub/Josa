import React from 'react'
import { Link } from 'react-router-dom';
import { BookOpen, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! It seems the page you're looking for has wandered off. Let's get you back on track.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/" className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
         
        </div>
      </div>
    </div>  )
}
