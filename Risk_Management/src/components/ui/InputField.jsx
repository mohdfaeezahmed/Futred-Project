import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ 
  icon: Icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  name,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword = false,
  error = null
}) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-4 group-hover:border-blue-400/50 transition-all duration-300 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/20">
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-gray-300 mr-3" />
        <input
          type={showPasswordToggle && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-lg font-medium"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="ml-3 text-gray-300 hover:text-white transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
    {error && (
      <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-medium animate-shake">
        {error}
      </div>
    )}
  </div>
);

export default InputField;