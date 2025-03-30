import { AxiosError } from "axios";
import { navigateFunction } from "../services/navigatorService";
import Cookies from "js-cookie";

export const checkToken = () => {
   const token = Cookies.get("accessToken");
   if (!token) {
      navigateFunction?.("/auth/login");
      throw new Error("Error getting token");
   }
   return token;
};

export const handleApiError = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
         navigateFunction?.("/auth/login");
         return;
      }
   }
   throw new Error("API request failed");
};
