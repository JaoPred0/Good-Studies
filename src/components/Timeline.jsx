import React from "react";

const Timeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Linha do Tempo dos Termos de Uso
      </h2>

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {/* 1️⃣ Introdução */}
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">1. Introdução</time>
            <div className="text-lg font-black">Aceitação dos Termos</div>
            Ao acessar ou usar a plataforma <strong>GoodStudies</strong>, você
            concorda em cumprir e respeitar estes Termos de Uso. Caso não
            concorde, recomendamos não utilizar nossos serviços.
          </div>
          <hr />
        </li>

        {/* 2️⃣ Cadastro e Conta */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">2. Cadastro e Responsabilidade</time>
            <div className="text-lg font-black">Criação de Conta</div>
            O usuário deve fornecer informações verdadeiras e completas no
            momento do cadastro. É responsabilidade do usuário manter a
            confidencialidade de suas credenciais e notificar qualquer uso não
            autorizado.
          </div>
          <hr />
        </li>

        {/* 3️⃣ Privacidade */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">3. Privacidade e Dados</time>
            <div className="text-lg font-black">Proteção de Informações</div>
            A plataforma adota medidas técnicas e organizacionais para proteger
            seus dados pessoais. O uso de informações está de acordo com nossa
            <strong> Política de Privacidade</strong>.
          </div>
          <hr />
        </li>

        {/* 4️⃣ Conduta */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">4. Conduta do Usuário</time>
            <div className="text-lg font-black">Uso Responsável</div>
            É proibido o uso da plataforma para atividades ilegais, ofensivas ou
            que prejudiquem outros usuários. Qualquer violação pode resultar na
            suspensão ou exclusão da conta.
          </div>
          <hr />
        </li>

        {/* 5️⃣ Encerramento */}
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">5. Encerramento</time>
            <div className="text-lg font-black">Término de Uso</div>
            O usuário pode encerrar sua conta a qualquer momento. A
            <strong> GoodStudies</strong> reserva o direito de remover contas
            que violem estes termos.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Timeline;
