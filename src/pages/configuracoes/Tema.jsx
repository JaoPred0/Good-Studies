import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const temas = [
    { id: 'light', titulo: 'Light', descricao: 'Tema claro com cores neutras.', cores: ['#8b5cf6', '#ec4899', '#0ea5e9', '#000000'] },
    { id: 'dark', titulo: 'Dark', descricao: 'Tema escuro com cores sóbrias.', cores: ['#6366f1', '#ec4899', '#06b6d4', '#ffffff'] },
    { id: 'cupcake', titulo: 'Cupcake', descricao: 'Cores doces e suaves.', cores: ['#22d3ee', '#f472b6', '#fbbf24', '#000000'] },
    { id: 'bumblebee', titulo: 'Bumblebee', descricao: 'Cores vibrantes de abelha.', cores: ['#facc15', '#f97316', '#000000', '#ffffff'] },
    { id: 'emerald', titulo: 'Emerald', descricao: 'Cores verdes e azuis.', cores: ['#34d399', '#22d3ee', '#f97316', '#ffffff'] },
    { id: 'corporate', titulo: 'Corporate', descricao: 'Cores profissionais e limpas.', cores: ['#06b6d4', '#06b6d4', '#34d399', '#000000'] },
    { id: 'synthwave', titulo: 'Synthwave', descricao: 'Cores neon dos anos 80.', cores: ['#ec4899', '#22d3ee', '#f97316', '#8b5cf6'] },
    { id: 'retro', titulo: 'Retro', descricao: 'Cores vintage e nostálgicas.', cores: ['#f87171', '#22c55e', '#f97316', '#6b7280'] },
    { id: 'cyberpunk', titulo: 'Cyberpunk', descricao: 'Cores neon e vibrantes.', cores: ['#ec4899', '#22d3ee', '#8b5cf6', '#1e3a8a'] },
    { id: 'valentine', titulo: 'Valentine', descricao: 'Cores românticas e suaves.', cores: ['#ec4899', '#ec4899', '#22d3ee', '#ec4899'] },
    { id: 'halloween', titulo: 'Halloween', descricao: 'Cores escuras e laranja.', cores: ['#f97316', '#ec4899', '#22c55e', '#fbbf24'] },
    { id: 'garden', titulo: 'Garden', descricao: 'Cores florais e suaves.', cores: ['#ec4899', '#ec4899', '#22c55e', '#fbbf24'] },
    { id: 'forest', titulo: 'Forest', descricao: 'Verdes profundos e naturais.', cores: ['#22c55e', '#22c55e', '#22c55e', '#22c55e'] },
    { id: 'aqua', titulo: 'Aqua', descricao: 'Cores frias e calmantes.', cores: ['#22d3ee', '#ec4899', '#fbbf24', '#0ea5e9'] },
    { id: 'lofi', titulo: 'Lofi', descricao: 'Cores neutras e discretas.', cores: ['#000000', '#000000', '#000000', '#000000'] },
    { id: 'pastel', titulo: 'Pastel', descricao: 'Cores suaves e delicadas.', cores: ['#ec4899', '#f472b6', '#34d399', '#3b82f6'] },
    { id: 'fantasy', titulo: 'Fantasy', descricao: 'Cores fantásticas e imaginativas.', cores: ['#ec4899', '#22d3ee', '#f97316', '#1e40af'] },
    { id: 'wireframe', titulo: 'Wireframe', descricao: 'Cores minimalistas e neutras.', cores: ['#000000', '#000000', '#000000', '#000000'] },
    { id: 'black', titulo: 'Black', descricao: 'Tema totalmente escuro.', cores: ['#000000', '#000000', '#000000', '#000000'] },
    { id: 'luxury', titulo: 'Luxury', descricao: 'Cores sofisticadas e elegantes.', cores: ['#f59e0b', '#1e3a8a', '#a855f7', '#c2410c'] },
    { id: 'dracula', titulo: 'Dracula', descricao: 'Cores escuras com contraste.', cores: ['#ec4899', '#ec4899', '#fbbf24', '#8b5cf6'] },
    { id: 'cmyk', titulo: 'CMYK', descricao: 'Cores de impressão clássicas.', cores: ['#06b6d4', '#ec4899', '#fcd34d', '#000000'] },
    { id: 'autumn', titulo: 'Autumn', descricao: 'Cores quentes do outono.', cores: ['#f87171', '#f87171', '#f97316', '#c084fc'] },
    { id: 'business', titulo: 'Business', descricao: 'Cores formais e profissionais.', cores: ['#3b82f6', '#64748b', '#f97316', '#0ea5e9'] },
    { id: 'acid', titulo: 'Acid', descricao: 'Cores fortes e ácidas.', cores: ['#ec4899', '#f87171', '#e4f00c', '#8b5cf6'] },
    { id: 'lemonade', titulo: 'Lemonade', descricao: 'Cores cítricas e vibrantes.', cores: ['#22c55e', '#22c55e', '#22c55e', '#a3ad1c'] },
    { id: 'night', titulo: 'Night', descricao: 'Cores escuras com neon.', cores: ['#22d3ee', '#8b5cf6', '#ec4899', '#8b5cf6'] },
    { id: 'coffee', titulo: 'Coffee', descricao: 'Cores quentes de café.', cores: ['#f97316', '#22d3ee', '#22c55e', '#8b5cf6'] },
    { id: 'winter', titulo: 'Winter', descricao: 'Cores frias e gélidas.', cores: ['#22d3ee', '#8b5cf6', '#ec4899', '#8b5cf6'] },
    { id: 'dim', titulo: 'Dim', descricao: 'Cores escuras e discretas.', cores: ['#22c55e', '#f97316', '#ec4899', '#8b5cf6'] },
    { id: 'nord', titulo: 'Nord', descricao: 'Cores frias e equilibradas.', cores: ['#22d3ee', '#22d3ee', '#22d3ee', '#22d3ee'] },
    { id: 'sunset', titulo: 'Sunset', descricao: 'Cores quentes do pôr do sol.', cores: ['#f97316', '#ec4899', '#ec4899', '#8b5cf6'] },
    { id: 'caramellatte', titulo: 'Caramellatte', descricao: 'Cores quentes e suaves.', cores: ['#000000', '#f97316', '#f97316', '#f97316'] },
    { id: 'abyss', titulo: 'Abyss', descricao: 'Cores escuras com tons vibrantes.', cores: ['#22c55e', '#8b5cf6', '#22d3ee', '#22d3ee'] },
    { id: 'silk', titulo: 'Silk', descricao: 'Cores suaves e luxuosas.', cores: ['#000000', '#f97316', '#22d3ee', '#000000'] },
];


const TemaAccordion = () => {
    const [temaSelecionado, setTemaSelecionado] = useState(localStorage.getItem("tema") || "light");
    const [usuarioCarregado, setUsuarioCarregado] = useState(false);
    const [collapseAberto, setCollapseAberto] = useState(temaSelecionado); // controla qual collapse está aberto

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", temaSelecionado);
        localStorage.setItem("tema", temaSelecionado);
    }, [temaSelecionado]);

    useEffect(() => {
        const carregarTemaFirebase = async () => {
            if (!auth.currentUser) return;
            try {
                const docRef = doc(db, "usuarios", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data?.temaSelecionado) {
                        setTemaSelecionado(data.temaSelecionado);
                        setCollapseAberto(data.temaSelecionado);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar tema do Firebase:", error);
            } finally {
                setUsuarioCarregado(true);
            }
        };
        carregarTemaFirebase();
    }, []);

    const handleSelecionarTema = async (temaId) => {
        setTemaSelecionado(temaId);
        document.documentElement.setAttribute("data-theme", temaId);
        localStorage.setItem("tema", temaId);

        if (!auth.currentUser) return;

        try {
            const docRef = doc(db, "usuarios", auth.currentUser.uid);
            await setDoc(docRef, { temaSelecionado: temaId }, { merge: true });
            console.log("Tema salvo no Firebase:", temaId);
        } catch (error) {
            console.error("Erro ao salvar tema no Firebase:", error);
        }
    };

    if (!usuarioCarregado) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 p-4">
            <div className="w-full max-w-3xl mb-8">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/configuracoes">Configurações</Link></li>
                        <li><Link to="/configuracoes/tema">Tema</Link></li>
                    </ul>
                </div>
            </div>
            {temas.map((tema) => (
                <div
                    key={tema.id}
                    className={`collapse border border-base-300 rounded-lg ${collapseAberto === tema.id ? "collapse-open" : ""}`}
                >
                    <input
                        type="radio"
                        name="accordion-tema"
                        checked={collapseAberto === tema.id}
                        onChange={() => setCollapseAberto(tema.id)}
                    />
                    <div className="collapse-title flex justify-between items-center font-semibold cursor-pointer">
                        <span>{tema.titulo}</span>
                        <div className="flex gap-1">
                            {tema.cores.map((cor, i) => (
                                <span
                                    key={i}
                                    className="w-5 h-5 rounded-full border"
                                    style={{ backgroundColor: cor }}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div className="collapse-content flex flex-col gap-2">
                        <p className="text-sm text-base-content/70">{tema.descricao}</p>
                        <button
                            className={`w-full btn btn-sm ${temaSelecionado === tema.id ? "btn-success" : "btn-primary"
                                }`}
                            onClick={() => handleSelecionarTema(tema.id)}
                        >
                            {temaSelecionado === tema.id ? "Selecionado" : "Definir tema"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemaAccordion;

