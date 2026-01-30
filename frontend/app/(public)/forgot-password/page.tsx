"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
  email: string;
}

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setIsValid(isValidEmail);
    setError(isValidEmail ? '' : 'Please enter a valid email address');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    validateEmail(email);

    if (isValid) {
      console.log('Reset password email sent to:', email);
      // TODO: Handle password reset request
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
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">Enter your email address to reset your password</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 ${
                    touched && !isValid ? 'border-red-300' : 'border-gray-200'
                  } rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  E-mail
                </label>
                <span className={`absolute right-3 top-3 ${isValid ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched && error && (
                  <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
              >
                RESET PASSWORD
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{' '}
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

export default ForgotPasswordPage;