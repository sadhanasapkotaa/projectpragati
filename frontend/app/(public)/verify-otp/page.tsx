"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const VerifyOTPPage = () => {
  const { verifyOTP } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsLoading(true);
      setError('');
      try {
        await verifyOTP(otpString);
        setSuccess(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            OTP Verified Successfully!
          </h2>
          <p className="text-gray-600">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/assets/svg/Background.svg"
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
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Verify OTP</h1>
              <p className="text-gray-600">Please enter the 6-digit code sent to your email</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(element: HTMLInputElement | null) => {
                      inputRefs.current[index] = element;
                    }}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-700"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={otp.join('').length !== 6 || isLoading}
              >
                {isLoading ? 'VERIFYING...' : 'VERIFY'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                className="text-purple-600 hover:text-purple-700 font-medium"
                disabled={isLoading}
                onClick={() => {
                  // TODO: Implement resend OTP functionality
                  console.log('Resend OTP clicked');
                }}
              >
                Resend Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;