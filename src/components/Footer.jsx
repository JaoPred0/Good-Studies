import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    if (window.history.length > 1) {
      navigate(-1); // volta para a página anterior
    } else {
      navigate("/"); // se não houver histórico, vai para a home
    }
  };

  return (
    <footer className="bg-base-300 py-10 text-center text-sm text-base-content/70">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <p>
          © {new Date().getFullYear()} <strong>GoodStudies</strong>. Todos os direitos reservados.
        </p>
        <p className="max-w-lg">
          Estes termos podem ser atualizados periodicamente para refletir novas
          políticas e melhorias na segurança. Recomendamos revisá-los com
          frequência para estar sempre informado.
        </p>

        {/* Botão de Voltar */}
        <button
          onClick={handleVoltar}
          className="btn btn-outline btn-primary mt-4"
        >
          ← Voltar ao site
        </button>
      </div>
    </footer>
  );
};

export default Footer;
