import React from "react";
import { Link } from "react-router-dom";

// Heroicons importados
import {
  UserIcon,
  MoonIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const Configuracoes = () => {
  const opcoes = [
    {
      titulo: "Conta",
      descricao: "Gerencie suas informações pessoais e login.",
      icone: <UserIcon className="w-6 h-6 text-primary" />,
      rota: "/configuracoes/conta",
    },
    {
      titulo: "Tema",
      descricao: "Altere entre o modo claro e escuro do aplicativo.",
      icone: <MoonIcon className="w-6 h-6 text-primary" />,
      rota: "/configuracoes/tema",
    },
    {
      titulo: "Segurança",
      descricao: "Proteja sua conta e altere sua senha.",
      icone: <ShieldCheckIcon className="w-6 h-6 text-primary" />,
      rota: "/configuracoes/seguranca",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-10 px-4 transition-colors duration-300 overflow-y-auto">
      {/* Cabeçalho */}
      <div className="w-full max-w-6xl mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-base-content">
            Configurações
            <Cog6ToothIcon className="w-6 h-6 text-primary animate-spin-slow" />
          </h1>
          <p className="text-sm text-base-content/70">
            Personalize sua experiência e preferências
          </p>
        </div>
        <div className="divider mt-4"></div>
      </div>

      {/* Cards */}
      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {opcoes.map((opcao, index) => (
          <Link
            to={opcao.rota}
            key={index}
            className="
          card border border-base-300 bg-base-100 
          shadow-md hover:shadow-xl rounded-2xl
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:bg-base-300
          group
        "
          >
            <div className="card-body flex flex-row items-center gap-4">
              <div
                className="
              p-3 rounded-xl bg-base-200
              transition-colors duration-300
              group-hover:bg-primary/20
              flex items-center justify-center
            "
              >
                <span className="text-primary group-hover:text-primary">
                  {opcao.icone}
                </span>
              </div>
              <div>
                <h2 className="card-title text-base font-semibold text-base-content">
                  {opcao.titulo}
                </h2>
                <p className="text-sm text-base-content/70 leading-snug">
                  {opcao.descricao}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default Configuracoes;
