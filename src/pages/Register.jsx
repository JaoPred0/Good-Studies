import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCredential.user, { displayName: nome });
      localStorage.setItem("motivo", motivo);
      navigate("/dashboard");
    } catch (error) {
      setErro("Erro ao registrar. Verifique os dados.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Registrar</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="input input-bordered w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Motivo para entrar"
            className="textarea textarea-bordered w-full"
            rows="3"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          ></textarea>
          <input
            type="password"
            placeholder="Senha"
            className="input input-bordered w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro && <p className="text-error text-sm">{erro}</p>}
          <button className="btn btn-primary w-full">Registrar</button>
        </form>

        <p className="text-center mt-4 text-sm">
          Já tem conta?{" "}
          <Link to="/login" className="link link-primary">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
