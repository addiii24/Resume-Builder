import {useAuth} from "../Hook/useAuth"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {handlelogin, loading} = useAuth()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await handlelogin({email,password})
    navigate("/home")
  }

  if(loading){
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back to Resume Builder</p>
        </div>

        {/* Form */}
        <form
        onSubmit={handleSubmit}
         className="space-y-5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-colors duration-150 cursor-pointer mt-2"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;