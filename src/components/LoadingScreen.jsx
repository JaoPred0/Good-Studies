import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [semConexao, setSemConexao] = useState(false);

  useEffect(() => {
    // Se o loading demorar mais de 10 segundos, considera sem conexão
    const timeout = setTimeout(() => {
      setSemConexao(true);
    }, 10000); // 5000ms = 5s

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 p-6">
      {!semConexao ? (
        <>
          {/* Título */}
          <h1 className="text-4xl font-bold text-primary mb-2">G    ood Studies</h1>
          
          {/* Spinner */}
          <span className="loading loading-spinner loading-lg text-primary"></span>

          {/* Texto opcional */}
          <p className="mt-4 text-base-content/70 text-sm">Carregando conteúdo...</p>
        </>
      ) : (
        <>
          {/* Mensagem de erro */}
          <h1 className="text-3xl font-bold text-error mb-2">Sem conexão</h1>
          <p className="text-base-content/70 text-center">
            Não foi possível carregar o conteúdo. Verifique sua conexão com a internet e tente novamente.
          </p>
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
