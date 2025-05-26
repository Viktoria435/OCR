import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { FileUploadProvider } from "./context/fileContext";
import AuthLoginPage from "./pages/AuthLoginPage";
import MainPage from "./pages/MainPage";
import { setNavigator } from "./services/navigatorService";
function App() {
   const navigate = useNavigate();
   setNavigator(navigate);
   // useEffect(() => {
   //    const handleWindowDragOver = (e: DragEvent) => {
   //      e.preventDefault();
   //    };
   //    const handleWindowDrop = (e: DragEvent) => {
   //      e.preventDefault();
   //    };
  
   //    window.addEventListener('dragover', handleWindowDragOver);
   //    window.addEventListener('drop', handleWindowDrop);
  
   //    return () => {
   //      window.removeEventListener('dragover', handleWindowDragOver);
   //      window.removeEventListener('drop', handleWindowDrop);
   //    };
   //  }, []);
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
