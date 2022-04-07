import "./App.css";
import React, { Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const AddItems = React.lazy(() => import("./components/Form"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Registration = React.lazy(() => import("./components/registration"));
const Login = React.lazy(() => import("./components/login"));
const Profile = React.lazy(() => import("./components/profile"));

function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/home" exact element={<AddItems />}></Route>
              <Route
                path="/registration"
                exact
                element={<Registration />}
              ></Route>
              <Route path="/login" exact element={<Login />}></Route>
              <Route path="/profile" exact element={<Profile />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
