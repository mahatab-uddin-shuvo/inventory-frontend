import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Purchase from "./pages/Purchase";
import Login from "./pages/Auth/Login";
import Cookies from "universal-cookie";

import ProtectedRoute from "./helpers/ProtectedRoute";
import Forbidden from "./pages/NotFound/Forbidden.jsx";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Sale from "./pages/Sale";

const App = () => {
  const cookies = new Cookies();
  const [loggedIn, setLoggedIn] = React.useState(false);

  // const loginStatus = cookies.get('userAuth')?.token != null;

  // if(loggedIn !== loginStatus) {setLoggedIn(loginStatus)};

  useEffect(() => {
    if (cookies.get("userAuth")?.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {cookies.get("userAuth") != true && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sale"
            element={
              <ProtectedRoute>
                <Sale />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forbidden"
            element={
              <ProtectedRoute>
                <Forbidden />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

          {/* <Route path="/productList" element={<ProductList />} />
              <Route path="/iconList" element={<Icon />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
