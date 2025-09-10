import React from 'react'
import LoginForm from "./LoginForm";
import SocialLogin from './SocialLogin'

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-96 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
      
        <LoginForm />
        <SocialLogin />
         <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
