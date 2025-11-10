import React, { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const imagens = [
  "/conceito-de-aprendizagem-close-up-aluno-usando-laptop-na-biblioteca.jpg",
  "/universitaria-e-universitaria-estudando-juntos.jpg",
  "/mulher-trabalha-online-na-cidade.jpg",
  "/jovem-estudante-sentado-a-mesa-e-use-o-laptop.jpg"
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState(["", "", "", "", "", ""]);
  const [erro, setErro] = useState("");
  const [imagemAtual, setImagemAtual] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  // ⏱️ Troca de imagem a cada 5 segundos com barra de progresso
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

  // 🧩 Atualiza os campos de senha
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const novaSenha = [...senha];
    novaSenha[index] = value;
    setSenha(novaSenha);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const novaSenha = [...senha];
      if (novaSenha[index]) {
        novaSenha[index] = "";
      } else if (index > 0) {
        novaSenha[index - 1] = "";
        inputsRef.current[index - 1].focus();
      }
      setSenha(novaSenha);
    }
  };

  // 🔐 Login Firebase
  const handleLogin = async (e) => {
    e.preventDefault();

    const emailCompleto = `${username}@goodstudies.com`;
    const senhaFinal = senha.join("");

    if (senhaFinal.length < 6) {
      setErro("Digite os 6 números da sua senha.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailCompleto, senhaFinal);
      navigate("/bem-vindo");
    } catch (error) {
      setErro("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="flex h-screen w-full bg-base-200">
      {/* Lado direito - Imagem rotativa */}
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
      {/* Lado esquerdo - Formulário estilizado */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative overflow-hidden">

        {/* Efeito de fundo suave */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-base-200 blur-3xl opacity-60"></div>
        
        {/* 🏷️ Título acima do card */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm tracking-tight">
            GoodStudies
          </h1>
          <p className="text-base text-base-content/70 mt-2">
            Plataforma inteligente para seus estudos
          </p>
        </div>

        {/* Container principal */}
        <div className="relative z-10 w-full max-w-md bg-base-100/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300/40 p-8 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-primary/30">

          {/* Logo / título */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Bem-vindo de volta!</h2>
            <p className="text-sm text-base-content/70 mt-1">Entre para continuar seus estudos.</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-4">

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


            {/* Senha tipo PIN */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Senha numérica</span>
              </label>
              <div className="flex justify-between gap-2">
                {senha.map((valor, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="input input-bordered w-12 h-12 text-center text-xl font-semibold focus:input-primary transition-all duration-200 hover:scale-105 hover:border-primary/60"
                    value={valor}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            {/* Erro */}
            {erro && <p className="text-error text-sm text-center mt-1">{erro}</p>}

            {/* Botão */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-2 font-semibold tracking-wide relative overflow-hidden group"
            >
              <span className="relative z-10">Entrar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Rodapé */}
          <p className="text-center mt-6 text-sm">
            Não tem conta?{" "}
            <Link to="/register" className="link link-primary font-medium">
              Criar conta
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
