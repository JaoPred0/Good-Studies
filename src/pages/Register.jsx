import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function Register() {
  const navigate = useNavigate();

  // Estados
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState(["", "", "", "", "", ""]);
  const [confirmSenha, setConfirmSenha] = useState(["", "", "", "", "", ""]);
  const [erro, setErro] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const inputsRef = useRef([]);
  const [progresso, setProgresso] = useState(0);
  const [showModal, setShowModal] = useState(false); // ✅ controle do modal

  // Imagens de fundo rotativas
  const imagens = [
    "/conceito-de-aprendizagem-close-up-aluno-usando-laptop-na-biblioteca.jpg",
    "/universitaria-e-universitaria-estudando-juntos.jpg",
    "/mulher-trabalhando-em-casa.jpg",
  ];
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagemAtual((prev) => (prev + 1) % imagens.length);
      setProgresso(0);
    }, 5000);

    const progressoIntervalo = setInterval(() => {
      setProgresso((p) => (p >= 100 ? 100 : p + 2));
    }, 100);

    return () => {
      clearInterval(intervalo);
      clearInterval(progressoIntervalo);
    };
  }, []);

  // Lógica dos inputs de senha tipo PIN
  const handleChange = (e, index, setState, senhaAtual) => {
    const valor = e.target.value.replace(/\D/, "");
    const novaSenha = [...senhaAtual];
    novaSenha[index] = valor;
    setState(novaSenha);

    // Foco automático
    if (valor && index < senhaAtual.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !senha[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Simulação de criação da conta
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!aceitouTermos) {
      setErro("Você precisa aceitar os termos de uso.");
      return;
    }

    if (senha.join("") !== confirmSenha.join("")) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    try {
      // monta o e-mail com base no nome de usuário
      const email = `${username}@goodstudies.com`;
      const senhaFinal = senha.join("");

      // Cria o usuário no Firebase
      await createUserWithEmailAndPassword(auth, email, senhaFinal);

      // Exibe modal de sucesso
      setShowModal(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error(error);

      // Erros comuns do Firebase
      if (error.code === "auth/email-already-in-use") {
        setErro("Este usuário já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha precisa ter pelo menos 6 dígitos.");
      } else {
        setErro("Erro ao criar conta. Tente novamente.");
      }
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* 🧾 Lado esquerdo - Formulário */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Fundo suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-base-200 blur-3xl opacity-60"></div>

        {/* Título */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm tracking-tight">
            Criar conta
          </h1>
          <p className="text-base text-base-content/70 mt-2">
            Junte-se à GoodStudies e comece sua jornada!
          </p>
        </div>

        {/* Card do formulário */}
        <div className="relative z-10 w-full max-w-md bg-base-100/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300/40 p-8 hover:-translate-y-1 hover:shadow-primary/30 transition-all duration-500">
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            {/* Usuário */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm font-medium">Usuário</span>
              </label>
              <div className="w-full flex items-center input input-bordered focus-within:border-primary transition-all duration-300">
                <input
                  type="text"
                  placeholder="nomeusuario"
                  className="w-full bg-transparent outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="px-2 text-gray-500 select-none">@goodstudies.com</span>
              </div>
            </div>

            {/* Senha */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Senha (6 dígitos)</span>
              </label>
              <div className="flex justify-between gap-2">
                {senha.map((valor, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="input input-bordered w-12 h-12 text-center text-xl font-semibold focus:input-primary hover:scale-105 transition-all duration-200"
                    value={valor}
                    onChange={(e) => handleChange(e, index, setSenha, senha)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Confirmar senha</span>
              </label>
              <div className="flex justify-between gap-2">
                {confirmSenha.map((valor, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="input input-bordered w-12 h-12 text-center text-xl font-semibold focus:input-primary hover:scale-105 transition-all duration-200"
                    value={valor}
                    onChange={(e) => handleChange(e, index, setConfirmSenha, confirmSenha)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
            </div>

            {/* Termos de uso */}
            <div className="form-control mt-2">
              <label className="cursor-pointer label justify-start gap-2">
                <input
                  type="checkbox"
                  checked={aceitouTermos}
                  onChange={(e) => setAceitouTermos(e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text text-sm">
                  Aceito os{" "}
                  <Link to="/termos" className="link link-primary font-medium">
                    Termos de Uso
                  </Link>
                </span>
              </label>
            </div>

            {/* Mensagem de erro */}
            {erro && <p className="text-error text-sm text-center">{erro}</p>}

            {/* Botão */}
            <button
              type="submit"
              disabled={!aceitouTermos}
              className={`btn w-full mt-3 font-semibold tracking-wide transition-all ${aceitouTermos
                ? "btn-primary hover:shadow-primary/30"
                : "btn-disabled opacity-60 cursor-not-allowed"
                }`}
            >
              Criar conta
            </button>
          </form>

          {/* Rodapé */}
          <p className="text-center mt-6 text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
      {/* 🖼️ Lado direito - Imagens com transição e opacidade */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">

        {/* Imagens com fade + zoom */}
        {imagens.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Tela de login"
            className={`
        absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms]
        ${index === imagemAtual
                ? "opacity-100 scale-105 translate-x-2"
                : "opacity-0 scale-100"
              }
      `}
          />
        ))}

        {/* Gradiente para destacar o formulário */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />

        {/* Barra de progresso */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-base-300/40 rounded-full overflow-hidden">
          <div
            className="h-2 bg-primary transition-all duration-100"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>

        {/* Frase de destaque opcional */}
        <div className="absolute bottom-10 left-10 text-white max-w-sm drop-shadow-lg">
          <h3 className="text-2xl font-bold mb-2 animate-fadeIn">
            Aprenda com liberdade.
          </h3>
          <p className="text-sm opacity-90 leading-snug">
            O conhecimento te leva além. Continue sua jornada com o GoodStudies.
          </p>
        </div>
      </div>
      {/* ✅ Modal de sucesso */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-base-100 p-8 rounded-2xl shadow-2xl text-center border border-primary/30 animate-scaleIn">
            <h2 className="text-2xl font-bold text-primary">🎉 Conta criada!</h2>
            <p className="text-base mt-2 text-base-content/70">
              Redirecionando para o login...
            </p>
            <progress className="progress progress-primary w-56 mt-4"></progress>
          </div>
        </div>
      )}
    </div>
  );
}
