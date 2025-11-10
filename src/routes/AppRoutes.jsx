import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Configuracoes from "../pages/Configuracoes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BemVindo from "../pages/BemVindo";
import Conta from "../pages/configuracoes/conta";
import Tema from "../pages/configuracoes/Tema";
import LoadingScreen from "../components/LoadingScreen";

const AppRoutes = () => {
  const [user, loading] = useAuthState(auth);

  // Enquanto o Firebase checa login
  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={user ? <Layout><Home /></Layout> : <Navigate to="/login" replace />}
      />
      <Route
        path="/bem-vindo"
        element={user ? <Layout><BemVindo /></Layout> : <Navigate to="/login" replace />}
      />
      <Route
        path="/configuracoes"
        element={user ? <Layout><Configuracoes /></Layout> : <Navigate to="/login" replace />}
      />

      {/* Configurações - Subrotas */}
      <Route
        path="/configuracoes/conta"
        element={user ? <Layout><Conta /></Layout> : <Navigate to="/login" replace />}
      />
      <Route
        path="/configuracoes/tema"
        element={user ? <Layout><Tema /></Layout> : <Navigate to="/login" replace />}
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
