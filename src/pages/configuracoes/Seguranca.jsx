import React, { useState } from "react";
import {
  auth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const Seguranca = () => {
  const [user] = useAuthState(auth);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!senhaAtual || !novaSenha || !confirmSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A nova senha deve ter exatamente 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    setMostrarModal(true);
  };

  const confirmarAlteracao = async () => {
    setMostrarModal(false);
    setCarregando(true);
    setErro("");
    setSucesso("");

    try {
      const credential = EmailAuthProvider.credential(user.email, senhaAtual);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, novaSenha);
      setSucesso("Senha atualizada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmSenha("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        setErro("Senha atual incorreta.");
      } else {
        setErro("Erro ao atualizar senha. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  const podeSalvar =
    novaSenha.length === 6 &&
    confirmSenha.length === 6 &&
    novaSenha === confirmSenha &&
    !carregando;

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Cabeçalho */}
      <div className="w-full max-w-3xl mb-8">
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li><Link to="/configuracoes/alterar-senha">Segurança e Senha</Link></li>
          </ul>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-primary mb-2">Segurança da Conta</h1>
      <p className="text-base-content/70 mb-8">
        Gerencie suas credenciais de acesso com segurança.
      </p>

      {/* Informações do usuário */}
      <div className="bg-base-200 rounded-2xl p-6 mb-8 border border-base-300/50">
        <p className="font-semibold text-lg">
          Usuário: <span className="text-primary">{user?.displayName || "—"}</span>
        </p>
        <p className="text-base-content/70 mt-1">
          E-mail: <span className="font-medium">{user?.email}</span>
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="label font-medium">Senha atual</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            maxLength={6}
          />
        </div>

        <div>
          <label className="label font-medium">Nova senha (6 caracteres)</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value.slice(0, 6))}
            maxLength={6}
          />
        </div>

        <div>
          <label className="label font-medium">Confirmar nova senha</label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value.slice(0, 6))}
            maxLength={6}
          />
        </div>

        {erro && <p className="text-error text-sm text-center mt-2">{erro}</p>}
        {sucesso && <p className="text-success text-sm text-center mt-2">{sucesso}</p>}

        <button
          type="submit"
          disabled={!podeSalvar}
          className={`btn mt-4 font-semibold tracking-wide transition-all ${
            podeSalvar
              ? "btn-primary hover:scale-105"
              : "btn-disabled opacity-60 cursor-not-allowed"
          } ${carregando ? "loading" : ""}`}
        >
          Salvar alterações
        </button>
      </form>

      {/* Modal de confirmação */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-base-100 p-8 rounded-2xl shadow-2xl text-center border border-primary/30 animate-scaleIn max-w-sm w-full">
            <h2 className="text-xl font-bold text-primary">Confirmar alteração</h2>
            <p className="text-base-content/70 mt-2">
              Tem certeza que deseja alterar sua senha?
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                className="btn btn-outline"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmarAlteracao}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seguranca;
