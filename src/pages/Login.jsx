import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Monta o email completo automaticamente
    const emailCompleto = `${username}@goodstudies.com`;

    try {
      await signInWithEmailAndPassword(auth, emailCompleto, senha);
      navigate("/bem-vindo");
    } catch (error) {
      setErro("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Entrar</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="nomeusuario@goodstudies.com"
              className="input input-bordered w-full border-none focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="px-2 text-gray-500 select-none">@goodstudies.com</span>
          </div>

          <input
            type="password"
            placeholder="Senha"
            className="input input-bordered w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="text-error text-sm">{erro}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Entrar
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Não tem conta?{" "}
          <Link to="/register" className="link link-primary">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
