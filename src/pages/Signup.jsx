import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const SIGNUP_ROLE = 'user';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

export default function Signup() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState(false);

  const nameValid = form.name.trim().length > 1;
  const phoneValid = PHONE_RE.test(form.phone);
  const emailValid = EMAIL_RE.test(form.email);
  const passwordValid = form.password.length >= 8;
  const passwordsMatch =
    form.confirmPassword.length > 0 && form.confirmPassword === form.password;
  const canSubmit =
    nameValid &&
    phoneValid &&
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    !isLoading;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    const result = await signup({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email,
      password: form.password,
      role: SIGNUP_ROLE,
    });

    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  const fieldClass =
    'w-full px-4 py-3 rounded-xl border-[1.5px] border-[#ECDFC9] bg-[#FDF2DF] text-[#3F2E24] font-medium placeholder:text-[#B9A48D] focus:outline-none focus:border-[#FF9E5B] focus:ring-4 focus:ring-[#FF9E5B]/20 focus:bg-white transition-all';
  const errorClass = 'block text-xs font-semibold text-[#B5442B] mt-1.5';

  return (
    <div className="min-h-screen bg-[#FDF2DF] flex items-center justify-center p-4 font-['DM_Sans']">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ECDFC9] p-8 sm:p-10">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#E8823A] mb-2">
          Get started
        </p>
        <h1 className="font-['Fraunces'] font-semibold text-3xl text-[#3F2E24] mb-1 leading-tight">
          Create your account
        </h1>
        <p className="text-[#8B6A52] text-sm mb-6">
          Tell us a bit about yourself.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 mt-7">
          <label className="block" htmlFor="name">
            <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
              Full name
            </span>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={fieldClass}
            />
            {touched && !nameValid && (
              <span role="alert" className={errorClass}>
                Enter your full name.
              </span>
            )}
          </label>

          <label className="block" htmlFor="phone">
            <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
              Phone number
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className={fieldClass}
            />
            {touched && !phoneValid && (
              <span role="alert" className={errorClass}>
                Enter a valid phone number.
              </span>
            )}
          </label>

          <label className="block" htmlFor="email">
            <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
              Email address
            </span>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={fieldClass}
            />
            {touched && !emailValid && (
              <span role="alert" className={errorClass}>
                Enter a valid email address.
              </span>
            )}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block" htmlFor="password">
              <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
                Password
              </span>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={fieldClass}
              />
              {touched && !passwordValid && (
                <span role="alert" className={errorClass}>
                  At least 8 characters.
                </span>
              )}
            </label>

            <label className="block" htmlFor="confirmPassword">
              <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
                Confirm password
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={fieldClass}
              />
              {touched && !passwordsMatch && (
                <span role="alert" className={errorClass}>
                  Passwords don&apos;t match.
                </span>
              )}
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm font-semibold text-[#B5442B] bg-[#B5442B]/10 border border-[#B5442B]/20 rounded-lg px-3 py-2.5"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-[#3F2E24] hover:bg-[#2C2019] disabled:bg-[#C9BCAE] disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            {isLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-[#8B6A52] mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#E8823A] hover:text-[#3F2E24]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}