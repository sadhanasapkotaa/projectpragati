"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface ValidationState {
  email: boolean;
  password: boolean;
}

interface ErrorMessages {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState<ValidationState>({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState<ValidationState>({
    email: false,
    password: false,
  });

  const validateField = (name: keyof FormData, value: string) => {
    let isFieldValid = false;
    let errorMessage = '';

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isFieldValid = emailRegex.test(value);
        errorMessage = isFieldValid ? '' : 'Please enter a valid email address';
        break;
      
      case 'password':
        isFieldValid = value.length >= 6;
        errorMessage = isFieldValid ? '' : 'Password must be at least 6 characters';
        break;
    }

    setIsValid(prev => ({ ...prev, [name]: isFieldValid }));
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setApiError('');
    
    Object.keys(formData).forEach(field => 
      validateField(field as keyof FormData, formData[field as keyof FormData])
    );

    if (isValid.email && isValid.password) {
      setIsLoading(true);
      try {
        await login(formData.email, formData.password);
      } catch (error: any) {
        setApiError(error.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/assets/svg/CreateAccountBackground.svg"
        alt="Background Pattern"
        fill
        className="object-cover"
        priority
      />

      <div className="min-h-screen flex items-center justify-center relative">
        <div className="w-[80%] flex justify-left">
          <div className="rounded-3xl p-12 w-[550px] bg-white/95 backdrop-blur-sm">
            {/* Logo */}
            <div className="flex mb-16">
              <Image
                src="/assets/svg/PragatiHeaderLogo.svg"
                alt="Pragati Logo"
                width={180}
                height={60}
                priority
              />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Welcome Back!</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {apiError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {apiError}
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 ${touched.email && !isValid.email ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  E-mail
                </label>
                <span className={`absolute right-3 top-3 ${isValid.email ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 ${touched.password && !isValid.password ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                  placeholder=" "
                />
                <label 
                  htmlFor="password" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
                <span className={`absolute right-3 top-3 ${isValid.password ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign Up!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;