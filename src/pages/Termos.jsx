import React from "react";
import { ShieldCheckIcon, GlobeAltIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";

const Termos = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* 🔹 Cabeçalho */}
      <section className="relative py-20 px-6 lg:px-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-base-200 opacity-80"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-primary mb-4">
            Termos – GoodStudies
          </h1>
          <p className="text-lg text-base-content/70">
            Leia com atenção nossos termos antes de criar sua conta. Nosso
            compromisso é garantir segurança, transparência e privacidade em
            todos os momentos.
          </p>
        </div>
      </section>

      {/* 🔹 Seções principais */}
      <section className="py-16 px-6 lg:px-20 grid md:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300/40">
          <div className="card-body text-center">
            <ShieldCheckIcon className="h-12 w-12 text-primary mx-auto mb-3" />
            <h2 className="card-title justify-center text-primary">Privacidade e Segurança</h2>
            <p>
              Todas as suas informações são protegidas com criptografia e
              armazenadas com segurança no Firebase. Nunca compartilhamos seus
              dados com terceiros sem seu consentimento.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300/40">
          <div className="card-body text-center">
            <GlobeAltIcon className="h-12 w-12 text-secondary mx-auto mb-3" />
            <h2 className="card-title justify-center text-secondary">Uso da Plataforma</h2>
            <p>
              O GoodStudies é destinado a fins educacionais. Qualquer uso
              indevido, tentativa de invasão ou compartilhamento indevido de
              contas resultará em suspensão imediata.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300/40">
          <div className="card-body text-center">
            <UserGroupIcon className="h-12 w-12 text-accent mx-auto mb-3" />
            <h2 className="card-title justify-center text-accent">Responsabilidade do Usuário</h2>
            <p>
              Ao criar uma conta, você se compromete a manter suas informações
              corretas e respeitar a comunidade de aprendizado dentro da
              plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 Divisor */}
      <div className="divider text-primary text-lg font-semibold mx-10">
        Nossa Jornada
      </div>

      {/* 🔹 Timeline importado */}
      <section className="pb-20">
        <Timeline />
      </section>

      {/* 🔹 Rodapé */}
      <Footer />
    </div>
  );
};

export default Termos;
