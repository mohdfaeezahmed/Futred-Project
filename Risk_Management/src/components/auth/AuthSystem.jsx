import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Sparkles } from 'lucide-react';

const FloatingParticle = ({ delay = 0, size = "w-2 h-2", color = "bg-blue-300" }) => (
  <div 
    className={`absolute ${size} ${color} rounded-full opacity-20 animate-float`}
    style={{ 
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  />
);

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

const LoginForm = ({ onSwitchToSignup, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock authentication - in real app, make API call here
    console.log('Login attempt:', formData);
    onLogin(formData);
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md animate-slide-in-right">
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
        </div>
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-lg">
          Sign in to your Risk Intelligence account
        </p>
      </div>

      <div className="space-y-8">
        <InputField
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          showPasswordToggle={true}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors duration-200">
            <input type="checkbox" className="mr-2 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
            Remember me
          </label>
          <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">
            Forgot password?
          </button>
        </div>

        <AuthButton onClick={handleSubmit} loading={loading}>
          Sign In
        </AuthButton>

        <div className="text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold"
          >
            Sign up
          </button>
        </div>
        </div>
    </div>
  );
};

const SignupForm = ({ onSwitchToLogin, onSignup }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock registration - in real app, make API call here
    console.log('Signup attempt:', formData);
    onSignup(formData);
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md animate-slide-in-left">
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
        </div>
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Join Us Today
        </h2>
        <p className="text-gray-300 text-lg">
          Create your Risk Intelligence account
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={User}
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            error={errors.firstName}
          />
          <InputField
            icon={User}
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            error={errors.lastName}
          />
        </div>

        <InputField
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          showPasswordToggle={true}
          onPasswordToggle={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          error={errors.password}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          showPasswordToggle={true}
          onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          showPassword={showConfirmPassword}
          error={errors.confirmPassword}
        />

        <div className="text-sm">
          <label className="flex items-start text-gray-300 cursor-pointer hover:text-white transition-colors duration-200">
            <input type="checkbox" className="mt-1 mr-3 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" required />
            <span>
              I agree to the{' '}
              <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </button>
            </span>
          </label>
        </div>

        <AuthButton onClick={handleSubmit} loading={loading}>
          Create Account
        </AuthButton>

        <div className="text-center">
          <span className="text-gray-300">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold"
          >
            Sign in
          </button>
        </div>
        </div>
    </div>
  );
};

export default function AuthSystem() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = (loginData) => {
    // Mock user data - in real app, this would come from your API
    setUser({
      email: loginData.email,
      firstName: 'John',
      lastName: 'Doe'
    });
  };

 const handleSignup = (signupData) => {
  // Mock user creation - in real app, this would make an API call
  setUser({
    email: signupData.email,
    firstName: signupData.firstName,
    lastName: signupData.lastName
  });
};


  const handleLogout = () => {
    setUser(null);
  };

  // If user is logged in, show dashboard placeholder
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-black text-white mb-4">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              You have successfully signed in to Risk Intelligence
            </p>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dotPatternSvg = encodeURIComponent(`<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#9C92AC" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>`);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,${dotPatternSvg}")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5}
            size={Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2"}
            color={["bg-blue-400", "bg-purple-400", "bg-pink-400"][Math.floor(Math.random() * 3)]}
          />
        ))}
      </div>

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-1"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            {/* Brand Section */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-5xl">📊</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 animate-gradient-x">
                Risk Intelligence
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl mb-8">
                Advanced AI-powered employee risk assessment platform for modern enterprises
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
                  <span className="text-blue-400 font-semibold">🔒 Secure</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
                  <span className="text-purple-400 font-semibold">⚡ Fast</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
                  <span className="text-pink-400 font-semibold">🎯 Accurate</span>
                </div>
              </div>
            </div>

            {/* Auth Form Section */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                  {
                    <SignupForm 
                      onSwitchToLogin={() => setIsLogin(true)}
                      onSignup={handleSignup}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, -30px) rotate(-120deg); }
          66% { transform: translate(20px, 20px) rotate(-240deg); }
        }
        
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 30s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease-in-out infinite; background-size: 200% 200%; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}