import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase = {
    height: 49,
    borderWidth: '0.8px',
    borderStyle: 'solid',
    borderRadius: 12,
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    color: '#0A0A0A',
    backgroundColor: '#FFFFFF',
    outline: 'none',
    width: '100%',
    padding: '0 16px',
    boxSizing: 'border-box',
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col w-full" style={{ gap: 24 }}>
        <div className="flex flex-col w-full" style={{ gap: 12 }}>
          <h1
            className="w-full text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 20,
              fontWeight: 500,
              color: '#0A0A0A',
              lineHeight: '28px',
              margin: 0,
            }}
          >
            Forgot Password?
          </h1>
          <p
            className="text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: '#6A7282',
              lineHeight: '21px',
              margin: 0,
            }}
          >
            If an account exists, a password reset link has been<br />sent to your email<br /><br />
            Please check your inbox and follow the instructions to<br />reset your password
          </p>
        </div>

        <button
          onClick={() => { window.location.href = 'mailto:'; }}
          className="w-full flex items-center justify-center text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EF8]"
          style={{
            height: 52,
            backgroundColor: '#005EF8',
            borderRadius: 12,
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            color: '#FFFFFF',
            lineHeight: '20px',
            cursor: 'pointer',
          }}
        >
          Open Email App
        </button>

        <p
          className="text-center w-full"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Back to{' '}
          <Link
            to={ROUTES.LOGIN}
            style={{
              color: '#005EF8',
              fontWeight: 500,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
          >
            Log In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full" style={{ gap: 24 }}>
      <div className="flex flex-col w-full" style={{ gap: 12 }}>
        <h1
          className="w-full text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 20,
            fontWeight: 500,
            color: '#0A0A0A',
            lineHeight: '28px',
            margin: 0,
          }}
        >
          Forgot Password?
        </h1>
        <p
          className="text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            color: '#6A7282',
            lineHeight: '21px',
            margin: 0,
          }}
        >
          Enter your email address, we will send you a code to reset your password.
        </p>
      </div>

      <div className="flex flex-col w-full" style={{ gap: 8 }}>
        <label
          htmlFor="email"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#0A0A0A', lineHeight: '20px' }}
        >
          EMAIL ADDRESS
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          disabled={isLoading}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          style={{
            ...inputBase,
            borderColor: errors.email ? '#ef4444' : '#D1D5DC',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#005EF8'; e.target.style.boxShadow = '0 0 0 1px #005EF8'; }}
          onBlur={(e) => { e.target.style.borderColor = errors.email ? '#ef4444' : '#D1D5DC'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.email && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444' }}>{errors.email}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005EF8] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          height: 52,
          backgroundColor: '#005EF8',
          borderRadius: 12,
          border: 'none',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: '#FFFFFF',
          lineHeight: '20px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'SENDING...' : 'SEND RESET CODE'}
      </button>

      <p
        className="text-center w-full"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#6A7282',
          margin: 0,
        }}
      >
        Don't have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          style={{
            color: '#005EF8',
            fontWeight: 500,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
        >
          Log In
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
