import React from 'react';

interface SkeletonProps {
  type: 'main' | 'card' | 'list';
}

const Skeleton: React.FC<SkeletonProps> = ({ type }) => {
  switch (type) {
    case 'main':
      return (
        <div className="animate-pulse bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-64 bg-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-300 h-10 w-10"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-32 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'card':
      return (
        <div className="animate-pulse bg-gray-200 rounded-lg overflow-hidden">
          <div className="h-40 bg-gray-300"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="animate-pulse flex items-center space-x-4">
          <div className="rounded bg-gray-300 h-20 w-20"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Skeleton;