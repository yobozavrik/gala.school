import React from 'react';
import { Home, BookOpen, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around">
        <Link 
          to="/" 
          className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-galya-red' : 'text-gray-600'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Головна</span>
        </Link>
        
        <Link 
          to="/lessons" 
          className={`flex flex-col items-center p-2 ${isActive('/lessons') ? 'text-galya-red' : 'text-gray-600'}`}
        >
          <BookOpen size={24} />
          <span className="text-xs mt-1">Уроки</span>
        </Link>
        
        <Link 
          to="/chat" 
          className={`flex flex-col items-center p-2 ${isActive('/chat') ? 'text-galya-red' : 'text-gray-600'}`}
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1">AI Чат</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'text-galya-red' : 'text-gray-600'}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Профіль</span>
        </Link>
      </div>
    </nav>
  );
}