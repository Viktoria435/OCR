import axios from "axios";

const api = axios.create({
   baseURL: "https://tim1423-ocr.hf.space",

   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});

interface LoginResponse {
   data: {
      token: "string";
   };
   successful: boolean;
   error: {
      message: "string";
   };
}

export const loginUser = async (
   email: string,
   password: string
): Promise<LoginResponse> => {
   try {
      const response = await api.post<LoginResponse>("/api/user/login", {
         email,
         password,
      });
      return response.data;
   } catch (error: unknown) {
      console.error("Error login user:", error);
      throw new Error("Failed login user");
   }
};
