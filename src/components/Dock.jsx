import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Settings, User } from "lucide-react";

const Dock = () => {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center transition-colors duration-200 ${
      isActive ? "text-primary" : "text-base-content hover:text-primary"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300 flex justify-around items-center py-3 shadow-lg backdrop-blur-md">
      {/* Home */}
      <NavLink to="/" className={linkClass}>
        <Home className="w-6 h-6" />
      </NavLink>

      {/* Perfil */}
      <NavLink to="/bem-vindo" className={linkClass}>
        <User className="w-6 h-6" />
      </NavLink>

      {/* Configurações */}
      <NavLink to="/configuracoes" className={linkClass}>
        <Settings className="w-6 h-6" />
      </NavLink>
    </div>
  );
};

export default Dock;
