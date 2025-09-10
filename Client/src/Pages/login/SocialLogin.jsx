import React from 'react'
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

function SocialLogin() {
   const handleGoogleLogin = () => {
    console.log("Login with Google");
  };
  const handleFacebookLogin = () => {
    console.log("Login with Facebook");
  };
  return (
    <div className="mt-6">
      <p className="text-gray-600 text-center mb-3">or continue with</p>
      <div className="flex justify-center gap-4">
      <button
          onClick={handleGoogleLogin}
          className="bg-white border p-2 rounded-full shadow hover:scale-105 transition-transform"
        >
          <FaGoogle size={20} className="text-red-500" />
        </button>
         <button
          onClick={handleFacebookLogin}
          className="bg-white border p-2 rounded-full shadow hover:scale-105 transition-transform"
        >
          <FaFacebook size={20} className="text-blue-600" />
        </button>
        </div>
    </div>
  )
}

export default SocialLogin