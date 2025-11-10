// src/pages/Conta.jsx
import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import * as Icons from "@heroicons/react/24/outline";
import ModalPerfil from "../../components/ModalPerfil";
import iconesPerfil from "../../data/iconesPerfil.json";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const Conta = () => {
    const [usuario, setUsuario] = useState(null);
    const [iconeSelecionado, setIconeSelecionado] = useState("UserIcon");
    const [carregando, setCarregando] = useState(true);
    const modalRef = useRef(null);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const nomeBase = user.displayName || user.email.split("@")[0];
                setUsuario({
                    nome: nomeBase,
                    email: user.email,
                    foto: user.photoURL || null,
                    dataCriacao: user.metadata.creationTime,
                    ultimoLogin: user.metadata.lastSignInTime,
                    uid: user.uid,
                });

                // carregar ícone selecionado do Firestore
                try {
                    const docRef = doc(db, "usuarios", user.uid); // <-- sempre válido
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data?.iconeSelecionado) setIconeSelecionado(data.iconeSelecionado);
                        if (data?.nomeUsuario) {
                            setUsuario(prev => prev ? { ...prev, nome: data.nomeUsuario } : prev);
                        }
                    }
                } catch (err) {
                    console.error("Erro ao ler Firestore:", err);
                }

            } else {
                setUsuario(null);
            }
            setCarregando(false);
        });

        return () => unsubscribe();
    }, []);

    if (carregando) {
        return (
            <div className="flex flex-col justify-center items-center h-screen p-6 text-center">
                {/* Título */}
                <h1 className="text-4xl font-bold text-primary mb-4">Good Studies</h1>

                {/* Spinner */}
                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>

                {/* Texto informativo */}
                <p className="text-base-content/70 text-sm">
                    Carregando sua conta...
                </p>
            </div>

        );
    }

    if (!usuario) {
        return (
            <div className="flex justify-center items-center min-h-screen ">
                <p className="text-base-content/70">Nenhum usuário autenticado.</p>
            </div>
        );
    }

    // resolve ícone atual
    const IconeComponente = Icons[iconeSelecionado]
        ? React.createElement(Icons[iconeSelecionado], { className: "w-16 h-16 text-primary" })
        : React.createElement(Icons.UserCircleIcon, { className: "w-16 h-16 text-primary" });

    return (
        <div className="flex flex-col items-center w-full min-h-screen py-10 px-4 overflow-y-auto">
            {/* Cabeçalho */}
            <div className="w-full max-w-3xl mb-8">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/configuracoes">Configurações</Link></li>
                        <li><Link to="/configuracoes/conta">Conta</Link></li>
                    </ul>
                </div>
            </div>

            {/* Card principal */}
            <div className="card bg-base-100 shadow-md border border-base-300 w-full max-w-3xl mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div
                            className="avatar transition-transform"
                            onClick={() => modalRef.current?.showModal?.()}
                        >
                            <div className="w-20 h-20 rounded-full ring ring-offset-base-100 ring-offset-2 overflow-hidden">
                                {usuario.foto ? (
                                    <img
                                        src={usuario.foto}
                                        alt="Foto de perfil"
                                        className="w-20 h-20 rounded-full object-cover border shadow"
                                    />
                                ) : (
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-base-300">
                                        {IconeComponente}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info do usuário */}
                    <div className="flex-1 w-full text-center md:text-left">
                        <h2 className="text-xl font-semibold mb-1">{usuario.nome}</h2>
                        <p className="text-sm text-base-content/70 flex items-center gap-2 mb-2">
                            <Icons.EnvelopeIcon className="w-4 h-4 text-primary" />
                            {usuario.email}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                                <Icons.CalendarDaysIcon className="w-4 h-4 text-primary" />
                                <p className="text-sm text-base-content/80">
                                    <strong>Criado em:</strong> {new Date(usuario.dataCriacao).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icons.ClockIcon className="w-4 h-4 text-primary" />
                                <p className="text-sm text-base-content/80">
                                    <strong>Último login:</strong> {new Date(usuario.ultimoLogin).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal de perfil */}
            <ModalPerfil
                ref={modalRef}
                iconesPerfil={iconesPerfil}
                onConfirmar={(dados) => {
                    console.log("Perfil atualizado no Firestore:", dados);

                    // atualiza ícone e nome na tela imediatamente
                    setIconeSelecionado(dados.icone);
                    setUsuario(prev => prev ? { ...prev, nome: dados.nome || prev.nome } : prev);
                }}
            />
        </div>
    );
};

export default Conta;
