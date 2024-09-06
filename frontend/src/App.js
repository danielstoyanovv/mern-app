import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <div className="pages">
                <Routes>
                    <Route
                        path="/"
                        element={ <Home /> }
                    >
                    </Route>
                    <Route
                        path="/register"
                        element={ <Register /> }
                    >
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
