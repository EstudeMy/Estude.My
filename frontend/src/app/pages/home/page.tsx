import Carrousel from "@/app/components/Carrousel"; // Componente carrossel de cursos
import Footer from "@/app/components/Footer"; // Componente do rodapé
import Topo from "@/app/components/Topo"; // Componente do topo/navegação

export default function menuTrilhas() {
  return (
    <>
      {/* ===========================
          Container principal da página
          =========================== */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/img/backgroundteste1.png')", // Imagem de fundo
          backgroundColor: "#f3f4f6", // Cor de fundo alternativa
        }}
      >
        {/* ===========================
            Container relativo para controle de z-index
            =========================== */}
        <div className="relative z-10">
          {/* Estrutura principal da página */}
          <div className="flex min-h-screen flex-col transition-all duration-300 justify-space-between">
            {/* Topo / Barra de navegação */}
            <Topo />
            <div>area que eu não sei ainda</div>

            {/* Seção "Continue" */}

            <Carrousel />

            {/* Seção "Novidades" */}

            <Carrousel />

            {/* Seção "Melhores para você" */}

            <Carrousel />
          </div>

          {/* Rodapé */}
          <Footer />
        </div>
      </div>
    </>
  );
}
