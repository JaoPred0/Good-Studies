import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

// Heroicons — estilo sólido
import {
  UserIcon,
  MoonIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const Configuracoes = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loadingLogout, setLoadingLogout] = useState(false);

  // Função de logout simulando "saindo..."
  const handleLogout = async () => {
    setLoadingLogout(true);

    // Simula um tempo de saída
    setTimeout(async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Erro ao sair:", error);
      } finally {
        setLoadingLogout(false);
      }
    }, 1500);
  };

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
      titulo: "Segurança e Senha",
      descricao: "Mantenha sua conta protegida atualizando sua senha regularmente.",
      icone: <LockClosedIcon className="w-6 h-6 text-primary" />, // Novo ícone 🔒
      rota: "/configuracoes/alterar-senha",
    },    
    {
      titulo: "Sair",
      descricao: "Encerre sua sessão com segurança.",
      icone: <ArrowRightOnRectangleIcon className="w-6 h-6 text-primary" />,
      acao: () => document.getElementById("modalLogout").showModal(),
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
        {opcoes.map((opcao, index) =>
          opcao.acao ? (
            <button
              key={index}
              onClick={opcao.acao}
              className="card border border-base-300 bg-base-100 shadow-md hover:shadow-xl rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-base-300 group w-full text-left"
            >
              <div className="card-body flex flex-row items-center gap-4">
                <div className="p-3 rounded-xl bg-base-200 transition-colors duration-300 group-hover:bg-primary/20 flex items-center justify-center">
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
            </button>
          ) : (
            <Link
              to={opcao.rota}
              key={index}
              className="card border border-base-300 bg-base-100 shadow-md hover:shadow-xl rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-base-300 group"
            >
              <div className="card-body flex flex-row items-center gap-4">
                <div className="p-3 rounded-xl bg-base-200 transition-colors duration-300 group-hover:bg-primary/20 flex items-center justify-center">
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
          )
        )}
      </div>

      {/* Modal de confirmação */}
      <dialog id="modalLogout" className="modal">
        <div className="modal-box">
          {!loadingLogout ? (
            <>
              <h3 className="font-bold text-lg">Deseja realmente sair?</h3>
              <p className="py-4">
                Sua sessão será encerrada e você precisará fazer login novamente.
              </p>
              <div className="modal-action flex justify-end gap-3">
                <form method="dialog">
                  <button className="btn btn-ghost">Cancelar</button>
                </form>
                <button className="btn btn-error text-white" onClick={handleLogout}>
                  Sim, sair
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-3 font-medium text-base-content/70">Saindo...</p>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Fechar</button>
        </form>
      </dialog>
    </div>
  );
};

export default Configuracoes;
