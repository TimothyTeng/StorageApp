import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./components/RouterScenes/Inventory";
import AddStore from "./components/RouterScenes/AddStore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/addstore" element={<AddStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
