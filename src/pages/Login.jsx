import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ROLES = [
  { id: "user", label: "User" },
  { id: "admin", label: "Admin" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordValid = form.password.length >= 8;
  const canSubmit = emailValid && passwordValid && !isLoading;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) clearError();
  };

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    const result = await login({
      email: form.email,
      password: form.password,
      role,
    });

    if (result.success) {
      navigate(result.role === "admin" ? "/admin-dashboard" : "/", {
        replace: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2DF] flex items-center justify-center p-4 font-['DM_Sans']">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ECDFC9] p-8 sm:p-10">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#E8823A] mb-2">
          Welcome back
        </p>
        <h1 className="font-['Fraunces'] font-semibold text-3xl text-[#3F2E24] mb-1 leading-tight">
          Sign in to continue
        </h1>
        <p className="text-[#8B6A52] text-sm mb-6">
          Choose how you'd like to sign in.
        </p>

        <div
          className="grid grid-cols-2 gap-2 mb-7 bg-[#FDF2DF] p-1 rounded-xl border border-[#ECDFC9]"
          role="radiogroup"
          aria-label="Login as"
        >
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={role === r.id}
              onClick={() => handleRoleChange(r.id)}
              className={`py-2.5 rounded-lg text-sm font-bold transition-colors ${
                role === r.id
                  ? "bg-[#3F2E24] text-white"
                  : "text-[#8B6A52] hover:text-[#3F2E24]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
              aria-describedby={
                touched && !emailValid ? "email-error" : undefined
              }
              className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#ECDFC9] bg-[#FDF2DF] text-[#3F2E24] font-medium placeholder:text-[#B9A48D] focus:outline-none focus:border-[#FF9E5B] focus:ring-4 focus:ring-[#FF9E5B]/20 focus:bg-white transition-all"
            />
            {touched && !emailValid && (
              <span
                id="email-error"
                role="alert"
                className="block text-xs font-semibold text-[#B5442B] mt-1.5"
              >
                Enter a valid email address.
              </span>
            )}
          </label>

          <label className="block" htmlFor="password">
            <span className="block text-xs font-bold text-[#3F2E24] mb-1.5">
              Password
            </span>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              aria-describedby={
                touched && !passwordValid ? "password-error" : undefined
              }
              className="w-full px-4 py-3 rounded-xl border-[1.5px] border-[#ECDFC9] bg-[#FDF2DF] text-[#3F2E24] font-medium placeholder:text-[#B9A48D] focus:outline-none focus:border-[#FF9E5B] focus:ring-4 focus:ring-[#FF9E5B]/20 focus:bg-white transition-all"
            />
            {touched && !passwordValid && (
              <span
                id="password-error"
                role="alert"
                className="block text-xs font-semibold text-[#B5442B] mt-1.5"
              >
                Password must be at least 8 characters.
              </span>
            )}
          </label>

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
            {isLoading
              ? "Signing in…"
              : `Sign in as ${role === "admin" ? "Admin" : "User"}`}
          </button>
        </form>

        <p className="text-center text-sm text-[#8B6A52] mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-[#E8823A] hover:text-[#3F2E24]"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
