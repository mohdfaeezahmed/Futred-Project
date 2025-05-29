import React from 'react';
import { ArrowRight } from 'lucide-react';

const AuthButton = ({ children, onClick, loading = false, variant = "primary" }) => {
  const baseClasses = "relative group w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-blue-500/25",
    secondary: "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/20"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </div>
    </button>
  );
};

export default AuthButton;