import { Route, Routes } from "react-router-dom";
import "./App.css";
import { FileUploadProvider } from "./context/fileContext";
import AuthLoginPage from "./pages/AuthLoginPage";
import MainPage from "./pages/MainPage";

function App() {
   return (
      <FileUploadProvider>
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/login" element={<AuthLoginPage />} />
            {/* <Route path="/auth/register" element={<AuthLoginPage />} /> */}
         </Routes>
      </FileUploadProvider>
   );
}

export default App;
