import { RouterProvider } from "react-router-dom";
import BoxGradient from "./components/BoxGradient";
import router from "./router/router";

function App() {
  
  return (
    <BoxGradient>
        <RouterProvider 
          router={router}
        />
    </BoxGradient>
  );
}

export default App;
