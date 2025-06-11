import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
   isLogin: boolean;
}

const AuthLoginForm: React.FC<AuthFormProps> = ({ isLogin }) => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [, setErrors] = useState<{ email: boolean; password: boolean }>({
      email: false,
      password: false,
   });

   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors = {
         email: email.trim() === "",
         password: password.trim() === "",
      };
      setErrors(newErrors);

      if (Object.values(newErrors).includes(true)) {
         setError("Please fill in all required fields.");
         return;
      }

      setError("");
      //const result = isLogin ? await loginUser(email, password) : await registerUser(email, password);

      try {
         const result = await loginUser(email, password);

         if (result.successful) {
            if (isLogin) {
               const accessToken = result.data.token;
               if (accessToken) {
                  Cookies.set("accessToken", accessToken, {
                     expires: 30,
                     path: "/",
                  });
               }
               navigate("/");
            } else {
               navigate("/auth/login");
            }
         } else {
            setError(
               result.error?.message ||
                  (isLogin ? "Login failed" : "Registration failed")
            );
         }
      } catch (error: unknown) {
         if (error instanceof Error) {
            setError(error.message);
         } else if (typeof error === "object" && error !== null) {
            const err = error as {
               response?: { data?: { error?: { message?: string } } };
            };
            setError(
               err.response?.data?.error?.message ||
                  "An unexpected error occurred."
            );
         } else {
            setError("An unexpected error occurred.");
         }
      }

      setErrors({ email: false, password: false });
   };

   return (
      <form onSubmit={handleSubmit} className="flex flex-col px-8">
         <div className="flex flex-col gap-1">
            <label htmlFor="email" className="opacity-50 text-sm">
               Email Address
            </label>
            <input
               id="email"
               type="email"
               value={email}
               required
               autoFocus
               onChange={(e) => setEmail(e.target.value)}
               className={`bg-white border border-gray-200 p-2.5 rounded-md text-sm w-full focus:outline-none mb-4`}
            />
         </div>

         <div className="flex flex-col gap-1">
            <label htmlFor="password" className="opacity-50 text-sm">
               Password
            </label>
            <input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className={`bg-white border border-gray-200 p-2.5 rounded-md text-sm w-full focus:outline-none mb-4`}
            />
         </div>
         <span className="text-red-500 min-h-[20px] text-sm font-medium block">
            {error}
         </span>
         <button
            type="submit"
            className="mt-2 py-2.5 bg-[#447dfc] hover:bg-[#4460fc] text-sm text-white font-bold rounded-md transition"
         >
            {isLogin ? "Sign In" : "Sign Up"}
         </button>
      </form>
   );
};

export default AuthLoginForm;
