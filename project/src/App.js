import "./App.css";
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AddItems = React.lazy(() => import('./components/Form'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Registration = React.lazy(() => import('./components/registration'));
const Login = React.lazy(() => import('./components/login'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" exact element={<AddItems />}></Route>
          <Route path="/registration" exact element={<Registration />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </Router>
      </Suspense>
    </>
  );
}

export default App;
