import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/dashboard";
import routes from "./routes/menuRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path.replace(/^\//, "")} // quita el "/" inicial para rutas hijas
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;