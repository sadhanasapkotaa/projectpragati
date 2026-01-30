"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ValidationState {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

interface ErrorMessages {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState<ValidationState>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isValid, setIsValid] = useState<ValidationState>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const validateField = (name: keyof FormData, value: string) => {
    let isFieldValid = false;
    let errorMessage = '';

    switch (name) {
      case 'currentPassword':
        isFieldValid = value.length >= 8;
        errorMessage = isFieldValid ? '' : 'Current password is required';
        break;
      
      case 'newPassword':
        isFieldValid = value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
        errorMessage = isFieldValid ? '' : 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
        break;
      
      case 'confirmPassword':
        isFieldValid = value === formData.newPassword;
        errorMessage = isFieldValid ? '' : 'Passwords do not match';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true
    });

    Object.keys(formData).forEach(field => 
      validateField(field as keyof FormData, formData[field as keyof FormData])
    );

    if (Object.values(isValid).every(Boolean)) {
      console.log('Form submitted:', formData);
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
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Change Password</h1>
              <p className="text-gray-600">Enter your current password and choose a new one</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                <div key={field} className="relative">
                  <input
                    type="password"
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 ${
                      touched[field as keyof ValidationState] && !isValid[field as keyof ValidationState] 
                        ? 'border-red-300' 
                        : 'border-gray-200'
                    } rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                    placeholder=" "
                  />
                  <label 
                    htmlFor={field}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'}
                  </label>
                  <span className={`absolute right-3 top-3 ${isValid[field as keyof ValidationState] ? 'text-green-500' : 'text-red-500'}`}>•</span>
                  {touched[field as keyof ValidationState] && errors[field as keyof ErrorMessages] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field as keyof ErrorMessages]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
              >
                CHANGE PASSWORD
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;