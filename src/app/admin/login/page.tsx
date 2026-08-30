'use client';

import { useActionState } from 'react';
import { loginAdmin } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center py-3.5 px-4 mt-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Memproses...
        </span>
      ) : (
        <span>Masuk</span>
      )}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(loginAdmin, null);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 font-sans">

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-10 w-full max-w-[460px]">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Admin Login</h1>
          <p className="text-sm text-slate-500 font-medium">Bali Limestone Management System</p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{state.error}</span>
          </div>
        )}

        {/* Form Fields */}
        <form action={formAction} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-bold text-slate-800">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              autoComplete="username"
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 text-sm"
              placeholder="Enter username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-slate-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 text-sm"
              placeholder="Enter password"
            />
          </div>

          <SubmitButton />
        </form>

      </div>
    </div>
  );
}