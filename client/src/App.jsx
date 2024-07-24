import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// axios.defaults.baseURL = "http://localhost:4000/";
// axios.defaults.withCredentials = true;

// Solve : `Cache data may be lost when replacing the getClients field of a Query object` [Warning].

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Login />
    </>
  );
}

export default App;
