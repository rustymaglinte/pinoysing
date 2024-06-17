import React, { useState } from 'react'
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage';
import EditSong from './components/EditSong';
import Login from './components/Login';

const PinoySingAdmin = localStorage.getItem("PinoySingAdmin");

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* {user ? <Landing /> : <Navigate to="/workout/login" />} */}

          <Route
            path="/pinoysing"
            element={<LandingPage />}
          />
          <Route
            path="/pinoysing/admin"
            element={PinoySingAdmin ? <AdminPage /> : <Navigate to="/pinoysing/admin/login" />}
          />
          <Route
            path="/pinoysing/admin/login"
            element={!PinoySingAdmin ? <Login /> : <Navigate to="/pinoysing/admin" />}
          />
          <Route
            path="/pinoysing/admin/edit/:id"
            element={PinoySingAdmin ? <EditSong /> : <Navigate to="/pinoysing/admin/login" />}
          />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
