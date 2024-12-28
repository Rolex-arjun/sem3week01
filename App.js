import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <SignedIn>
              <Home />
            </SignedIn>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
