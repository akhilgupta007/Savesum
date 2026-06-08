import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.constants';

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

/**
 * LoginForm — for Figma node 716:624
 *
 * Outer container (716:618):
 *   width: 540px, height: 448px
 *   left: 90px, top: 288px
 *   flexDirection: column, gap: 32px, padding: 16px 16px 29px
 *
 * Form inner container (716:624):
 *   width: 508px, gap: 24px
 *
 * Email input (716:628): width 508px, height 49px, border 0.8px #D1D5DC, radius 12px
 * Password input (716:634): same
 * LOG IN button (716:641): width 508px, height 52px, bg #005EF8, radius 12px
 * "Forgot Password?" (716:640): color #B00020, font Inter 500 14px, right-aligned
 */
const LoginForm = () => {
  const [email, setEmail] = useState('admin@savesum.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800)); // slightly faster for testing
      localStorage.setItem('accessToken', 'dummy-token-123');
      navigate(ROUTES.DASHBOARD);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full" style={{ gap: 24 }}>

      {/* ── Heading block ── */}
      <div className="flex flex-col w-full" style={{ gap: 12 }}>
        {/* "Welcome Back" — Inter 500 20px #0A0A0A center */}
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
          Welcome Back
        </h1>
        {/* Subtitle — Inter 16px #6A7282 center */}
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
          Log in to access your strategic savings dashboard.
        </p>
      </div>

      {/* ── Email field ── */}
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
          placeholder="you@company.com"
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

      {/* ── Password field ── */}
      <div className="flex flex-col w-full" style={{ gap: 8 }}>
        {/* Label row: PASSWORD left | Forgot Password? right — matches Figma Button node 716:639 */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#0A0A0A', lineHeight: '20px' }}
          >
            PASSWORD
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#B00020', lineHeight: '20px', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            disabled={isLoading}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
            }}
            style={{
              ...inputBase,
              borderColor: errors.password ? '#ef4444' : '#D1D5DC',
              paddingRight: 48,
            }}
            onFocus={(e) => { e.target.style.borderColor = '#005EF8'; e.target.style.boxShadow = '0 0 0 1px #005EF8'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.password ? '#ef4444' : '#D1D5DC'; e.target.style.boxShadow = 'none'; }}
          />
          {/* Eye icon — Figma Icon node 716:636, 20×20 at right:16 */}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
          </button>
        </div>
        {errors.password && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444' }}>{errors.password}</span>
        )}
      </div>

      {/* ── LOG IN button — node 716:641: width 508px height 52px bg #005EF8 radius 12px ── */}
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
        {isLoading ? 'LOGGING IN…' : 'LOG IN'}
      </button>

    </form>
  );
};

export default LoginForm;
