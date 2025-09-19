"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "react-bootstrap/Button";

type UsuarioTipo = "ALUNO" | "PROFESSOR";

const Cadastrar = () => {
  // ===============================
  // Estados do formulário
  // ===============================
  const [tipoUsuario, setTipoUsuario] = useState<UsuarioTipo | "">("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [registro, setRegistro] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenhas, setMostrarSenhas] = useState(false);

  // ===============================
  // Submissão do formulário
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (!tipoUsuario) {
      setErro("Selecione o tipo de usuário.");
      return;
    }

    try {
      const dados: any = {
        usuarioNome: nome,
        usuarioEmail: email,
        usuarioSenha: senha,
        usuarioUserName: email.split("@")[0], // exemplo de username
        usuarioTipo: tipoUsuario,
        usuarioAutobiografia: "",
        usuarioPontuacao: 0,
      };

      if (tipoUsuario === "PROFESSOR") {
        dados.registro = registro;
        dados.titulacao = titulacao;
      }

      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.mensagem || "Erro no cadastro");
        return;
      }

      console.log("Usuário cadastrado:", data);
      window.location.href = "/pages/login";
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  // ===============================
  // Resetar campos ao trocar tipo
  // ===============================
  const handleTipoUsuarioChange = (tipo: UsuarioTipo) => {
    setTipoUsuario(tipo);
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setRegistro("");
    setTitulacao("");
    setErro("");
  };

  // ===============================
  // Renderização
  // ===============================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 h-screen flex-col relative overflow-hidden bg-cover bg-center"
         style={{ backgroundImage: `url('/img/background-image-login-register.png')` }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <Image width={400} height={128} src="/svg/EstudeMyLogo.svg" alt="Logo" />
        </div>

        {/* Seletor de tipo de usuário */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-3 text-center text-gray-800">
            Selecione o tipo de cadastro:
          </h5>
          <div className="flex gap-4 justify-center">
            <label className="flex items-center">
              <input type="radio" name="tipoUsuario" value="ALUNO"
                     checked={tipoUsuario === "ALUNO"}
                     onChange={() => handleTipoUsuarioChange("ALUNO")}
                     className="mr-2"/>
              <span className="text-sm text-gray-700">Aluno</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="tipoUsuario" value="PROFESSOR"
                     checked={tipoUsuario === "PROFESSOR"}
                     onChange={() => handleTipoUsuarioChange("PROFESSOR")}
                     className="mr-2"/>
              <span className="text-sm text-gray-700">Professor</span>
            </label>
          </div>
        </div>

        {/* Formulário */}
        {tipoUsuario && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            {/* Nome */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-left">Nome Completo:</label>
              <input type="text" placeholder="Seu nome completo"
                     className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                     required value={nome} onChange={e => setNome(e.target.value)} />

              <label className="text-sm mb-1 text-left">Email:</label>
              <input type="email" placeholder="Seu email"
                     className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                     required value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {/* Campos do professor */}
            {tipoUsuario === "PROFESSOR" && (
              <>
                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-left">Registro Profissional:</label>
                  <input type="text" placeholder="Número do registro"
                         className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                         required value={registro} onChange={e => setRegistro(e.target.value)} />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mb-1 text-left">Titulação:</label>
                  <select className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                          required value={titulacao} onChange={e => setTitulacao(e.target.value)}>
                    <option value="">Selecione a titulação</option>
                    <option value="Graduacao">Graduação</option>
                    <option value="Especializacao">Especialização</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutorado">Doutorado</option>
                    <option value="PosDoutorado">Pós-Doutorado</option>
                  </select>
                </div>
              </>
            )}

            {/* Senha */}
            <label className="text-sm mb-1 text-left">Senha:</label>
            <input type={mostrarSenhas ? "text" : "password"} placeholder="Digite sua senha"
                   className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                   required value={senha} onChange={e => setSenha(e.target.value)} />

            <label className="text-sm mb-1 text-left">Confirme a senha:</label>
            <input type={mostrarSenhas ? "text" : "password"} placeholder="Repita sua senha"
                   className="rounded-lg py-2 px-4 text-sm border-1 border-gray-400 bg-gray-100"
                   required value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} />

            {/* Botão */}
            <Button type="submit" variant="primary">
              Cadastrar {tipoUsuario === "ALUNO" ? "Aluno" : "Professor"}
            </Button>

            {/* Mensagem de erro */}
            {erro && <p className="text-red-600 text-sm">{erro}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Cadastrar;
