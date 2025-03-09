import React from "react";
import { useLocation } from "react-router-dom";
import AuthLoginForm from "../components/AuthLoginForm";

const AuthLoginPage: React.FC = () => {
   const location = useLocation();

   const isLogin = location.pathname === "/auth/login";

   return (
      <div className="h-screen flex flex-col justify-center items-center">
         <div className="w-full max-w-md p-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
               <h3 className="text-xl text-[#434343] font-bold">
                  {isLogin ? "Sign In" : "Sign Up"}
               </h3>
               <p className="text-sm opacity-50 mb-10">
                  {isLogin
                     ? "Use your email and password to sign in"
                     : "Create an account with your email and password"}
               </p>
            </div>
            <AuthLoginForm isLogin={isLogin} />
            {/* <p className="text-center text-sm text-[#434343a9] mt-8">
               {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
               <Link
                  to={isLogin ? "/auth/register" : "/auth/login"}
                  className="font-semibold text-[#434343] hover:underline"
               >
                  {isLogin ? "Sign up" : "Sign in"}
               </Link>
            </p> */}
         </div>
      </div>
   );
};

export default AuthLoginPage;
