import BoxGradient from "./components/BoxGradient";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BoxGradient>
      <BrowserRouter basename='/account'>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </BoxGradient>
  );
}

export default App;
