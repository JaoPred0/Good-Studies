import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [conectado, setConectado] = useState(null); // null = verificando, true = conectado, false = sem conexão

  useEffect(() => {
    // Timeout máximo antes de considerar sem conexão
    const timeout = setTimeout(() => setConectado(false), 10000);

    // Teste de conexão
    fetch("https://jsonplaceholder.typicode.com/todos/1") // recurso público leve
      .then(() => {
        clearTimeout(timeout);
        setConectado(true);
      })
      .catch(() => {
        clearTimeout(timeout);
        setConectado(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 p-6 text-center">
      {conectado === null && (
        <>
          <h1 className="text-4xl font-bold text-primary mb-2">Good Studies</h1>
          <span className="loading loading-spinner loading-lg text-primary mt-6"></span>
          <p className="mt-4 text-base-content/70 text-sm">
            Verificando conexão...
          </p>
        </>
      )}

      {conectado === false && (
        <>
          <h1 className="text-3xl font-bold text-error mb-2">Sem conexão</h1>
          <p className="text-base-content/70 mb-4">
            Não foi possível conectar à internet.
          </p>

          {/* Botão para tentar novamente */}
          <button
            className="btn btn-primary mb-2"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>

          {/* Instrução para baixar a página/pacote */}
          <p className="text-xs text-base-content/50">
            Para acessar offline, baixe a página ou o pacote de rede completo.
            <br />
            Abra o site uma vez com internet e salve os arquivos/localStorage
            para uso offline.
          </p>
        </>
      )}

      {conectado === true && (
        <>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Conexão OK!
          </h1>
          <p className="text-base-content/70">
            Carregando conteúdo...
          </p>
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
