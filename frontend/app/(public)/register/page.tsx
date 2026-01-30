"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

interface ValidationState {
  email: boolean;
  first_name: boolean;
  last_name: boolean;
  password: boolean;
  password2: boolean;
}

interface ErrorMessages {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });

  const [touched, setTouched] = useState<ValidationState>({
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    password2: false
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });

  const [isValid, setIsValid] = useState<ValidationState>({
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    password2: false
  });

  const validateField = (name: keyof FormData, value: string) => {
    let isFieldValid = false;
    let errorMessage = '';

    switch (name) {
      case 'first_name':
      case 'last_name':
        isFieldValid = value.length >= 2;
        errorMessage = isFieldValid ? '' : 'Must be at least 2 characters';
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isFieldValid = emailRegex.test(value);
        errorMessage = isFieldValid ? '' : 'Please enter a valid email address';
        break;
      
      case 'password':
        isFieldValid = value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
        errorMessage = isFieldValid ? '' : 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
        break;
      
      case 'password2':
        isFieldValid = value === formData.password;
        errorMessage = isFieldValid ? '' : 'Passwords do not match';
        break;
    }

    setIsValid(prev => ({ ...prev, [name]: isFieldValid }));
    setErrors(prev => ({ ...prev, [name]: errorMessage }));

    // Validate password confirmation when password changes
    if (name === 'password') {
      const password2Valid = formData.password2 === value;
      setIsValid(prev => ({ ...prev, password2: password2Valid }));
      setErrors(prev => ({ 
        ...prev, 
        password2: password2Valid ? '' : 'Passwords do not match'
      }));
    }
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
    setApiError('');
    const allFields = ['email', 'first_name', 'last_name', 'password', 'password2'] as const;
    
    // Mark all fields as touched
    setTouched({
      email: true,
      first_name: true,
      last_name: true,
      password: true,
      password2: true
    });

    // Validate all fields
    allFields.forEach(field => validateField(field, formData[field]));

    // Check if form is valid
    const isFormValid = allFields.every(field => isValid[field]);
    
    if (isFormValid) {
      setIsLoading(true);
      try {
        await register(formData);
        // Redirect will be handled by AuthContext
      } catch (error: any) {
        if (error.response) {
          setApiError(error.response.data?.message || 'Registration failed. Please try again.');
        } else if (error.request) {
          setApiError('Network error. Please check your connection.');
        } else {
          setApiError('An unexpected error occurred. Please try again.');
        }
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
          {/* Registration Form Card */}
          <div className="rounded-3xl p-12 w-[550px] bg-white/95 backdrop-blur-sm ">
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

            <div className=" mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Welcome to Pragati!</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.first_name && !isValid.first_name ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="first_name" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                First Name
                </label>
                <span className={`absolute right-3 top-3 ${isValid.first_name ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.first_name && errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                )}
            </div>

            <div className="relative">
                <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.last_name && !isValid.last_name ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="last_name" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                Last Name
                </label>
                <span className={`absolute right-3 top-3 ${isValid.last_name ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.last_name && errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
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

            <div className="relative">
                <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.password2 && !isValid.password2 ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="password2" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                Confirm Password
                </label>
                <span className={`absolute right-3 top-3 ${isValid.password2 ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.password2 && errors.password2 && (
                <p className="text-red-500 text-xs mt-1">{errors.password2}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>

            {apiError && (
                <div className="mt-4 text-center text-red-500 text-sm">
                  {apiError}
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign In!
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;