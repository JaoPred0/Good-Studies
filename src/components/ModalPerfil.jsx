import React, { useRef, useState, useEffect } from "react";
import * as Icons from "@heroicons/react/24/outline";
import iconesPerfil from "../data/iconesPerfil.json";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ModalPerfil = ({ onConfirmar }) => {
    const modalRef = useRef(null);
    const [iconeSelecionado, setIconeSelecionado] = useState("UserIcon");
    const [nome, setNome] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    useEffect(() => {
        // carrega dados atuais do usuário
        const loadUserData = async () => {
            if (!auth.currentUser) return;
            try {
                const docRef = doc(db, "usuarios", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.iconeSelecionado) setIconeSelecionado(data.iconeSelecionado);
                    if (data.nomeUsuario) setNome(data.nomeUsuario);
                }
            } catch (err) {
                console.error("Erro ao carregar dados do usuário:", err);
            }
        };
        loadUserData();
    }, []);

    const handleAbrir = () => modalRef.current?.showModal();
    const handleFechar = () => modalRef.current?.close();

    const handleSelecionarNoModal = (icone) => setIconeSelecionado(icone);

    const handleConfirmar = async () => {
        if (!auth.currentUser) return console.error("Usuário não autenticado!");
        setSalvando(true);
        try {
            await setDoc(
                doc(db, "usuarios", auth.currentUser.uid),
                {
                    nomeUsuario: nome, // aqui salvamos no campo nomeUsuario
                    iconeSelecionado: iconeSelecionado,
                },
                { merge: true }
            );




            if (onConfirmar)
                onConfirmar({ icone: iconeSelecionado, nome });

            handleFechar();
        } catch (err) {
            console.error("Erro ao salvar perfil:", err);
        } finally {
            setSalvando(false);
        }
    };

    const Icone = ({ nome }) => {
        const IconComp = Icons[nome] || Icons.UserIcon;
        return <IconComp className="w-7 h-7 text-primary" />;
    };

    const iconesFiltrados = iconesPerfil
        .flatMap((grupo) =>
            grupo.icones.map((item) => ({ ...item, categoria: grupo.categoria }))
        )
        .filter((item) => {
            const nomeMinus = (item.nome || "").toLowerCase();
            const idMinus = (item.id || "").toLowerCase();
            return (
                (categoriaSelecionada === "" || item.categoria === categoriaSelecionada) &&
                (filtro === "" || nomeMinus.includes(filtro.toLowerCase()) || idMinus.includes(filtro.toLowerCase()))
            );
        });

    return (
        <>
            <button
                type="button"
                className="btn btn-outline btn-primary flex items-center gap-2 m-5"
                onClick={handleAbrir}
            >
                <Icons.PencilIcon className="w-5 h-5" />
                Editar Perfil
            </button>


            <dialog ref={modalRef} className="modal">
                <div className="modal-box max-w-lg bg-base-100 rounded-2xl shadow-xl p-5">
                    <form method="dialog" className="absolute right-3 top-3">
                        <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                    </form>

                     <div className="divider">Personalizar Perfil</div>

                    {/* Nome */}
                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text font-medium">Nome de usuário</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="input input-bordered w-full"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    {/* Filtro */}
                    <input
                        type="text"
                        placeholder="Filtrar ícones..."
                        className="input input-bordered w-full mb-3"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />

                    {/* Categoria */}
                    <label className="label mb-3">
                        <span className="label-text">Categoria</span>
                    </label>
                    <select
                        className="select select-bordered w-full mb-4"
                        value={categoriaSelecionada}
                        onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {iconesPerfil.map((grupo) => (
                            <option key={grupo.categoria} value={grupo.categoria}>
                                {grupo.categoria}
                            </option>
                        ))}
                    </select>

                    {/* Ícones */}
                    <div className="max-h-64 overflow-y-auto grid grid-cols-4 gap-3 p-2 rounded-lg">
                        {iconesFiltrados.map((item, index) => (
                            <button
                                key={`${item.id}-${index}`}
                                type="button"
                                onClick={() => handleSelecionarNoModal(item.icone)}
                                className={`p-2 rounded-xl transition-all border ${iconeSelecionado === item.icone
                                    ? "border-primary"
                                    : "hover:bg-base-300 border-base-300"
                                    }`}
                            >
                                <Icone nome={item.icone} />
                                <p className="text-xs mt-1 truncate">{item.nome}</p>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="btn btn-primary w-full"
                            onClick={handleConfirmar}
                            disabled={salvando}
                        >
                            {salvando ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Confirmar alterações"
                            )}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ModalPerfil;
