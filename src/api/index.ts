import axios from "axios";

const api = axios.create({
   //baseURL: "https://brestok-ocr-2.hf.space",
   baseURL: "https://tim1423-ocr.hf.space",
   
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
});


export default api;
