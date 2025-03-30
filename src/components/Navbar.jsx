import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                ContentHub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 