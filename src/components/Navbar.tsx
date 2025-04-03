// Navbar.tsx - New navigation bar component
import React from 'react';
import { ChevronLeft, Search, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-medium">Assignment Front End</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5">
              <Search size={16} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent outline-none w-48"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Log in or create account
            </button>
            <button className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-600 flex items-center space-x-2 hover:bg-blue-100">
              <span>Continue with Google</span>
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};