import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo-sistema.svg";
import logoSport from "../../assets/logo-sport-events.svg";
import userCreate from "../../assets/coach.png";
import Inputs from "../../Components/Inputs";
import { Helmet } from "react-helmet";
import handleRedirect from "../../hooks/handleRedirect";

export default () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfimeSenha] = useState("");
  const { redirectTo } = handleRedirect();

  //FUNCÃO PARA HENDERIZAR A TELA DE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nome.trim() === "" ||
      sobrenome.trim() === "" ||
      email.trim() === "" ||
      confirmeEmail.trim() === "" ||
      senha.trim() === "" ||
      confirmeSenha.trim() === ""
    ) {
      toast.error("Por gentileza, preencha todos os campos.", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    // Validação de e-mails
    if (email !== confirmeEmail) {
      toast.error("Os e-mails não coincidem.", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    // Validação de senhas
    if (senha !== confirmeSenha) {
      toast.error("As senhas não coincidem.", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    //CHAMANDO API PARA SALVAR OS DADOS NA BASE
    try {
      const response = await axios.post("http://localhost:3000/user", {
        nome,
        sobrenome,
        email,
        senha,
      });
      redirectTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet>
        <link rel="icon" href={userCreate} />
        <title>Cadastrar Usuário</title>
      </Helmet>
      <div className="flex min-h-screen">
        <div className="bg-[#26AB3B] w-2/4 flex flex-col items-center justify-center">
          <div>
            <img src={logoSport} alt="logo-sport" />
          </div>
          <p className="text-white font-bold font-montserrat">
            A emoção do esporte com segurança e execelência!
          </p>
          <div>
            <img src={logo} alt="logo-sistema" />
          </div>
        </div>
        <div className=" w-2/4 flex flex-col items-center justify-center gap-16">
          <div>
            <p className=" font-montserrat font-bold text-4xl">Criar Conta</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-[20px]">
              <Inputs
                id={nome}
                label={"Nome"}
                placeholder={"Nome"}
                value={nome}
                setValue={setNome}
                type={"text"}
                cssInput={
                  "block w-[220px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                }
              />
              <Inputs
                id={sobrenome}
                label={"Sobrenome"}
                placeholder={"Sobrenome"}
                value={sobrenome}
                setValue={setSobrenome}
                type={"text"}
                cssInput={
                  "block w-[220px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                }
              />
            </div>
            <Inputs
              id={email}
              label={"E-mail"}
              placeholder={"E-mail"}
              value={email}
              setValue={setEmail}
              type={"text"}
              cssInput={
                "block w-[459px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
              }
            />
            <Inputs
              id={confirmeEmail}
              label={"Confirme seu e-mail"}
              placeholder={"Confirme seu e-mail"}
              value={confirmeEmail}
              setValue={setConfirmeEmail}
              type={"text"}
              cssInput={
                "block w-[459px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
              }
            />
            <div className="flex gap-[20px]">
              <Inputs
                id={senha}
                label={"Senha"}
                placeholder={"Senha"}
                value={senha}
                setValue={setSenha}
                type={"password"}
                cssInput={
                  "block w-[220px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                }
              />
              <Inputs
                id={confirmeSenha}
                label={"Confirme sua senha"}
                placeholder={"Confirme sua senha"}
                value={confirmeSenha}
                setValue={setConfimeSenha}
                type={"password"}
                cssInput={
                  "block w-[220px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                }
              />
            </div>
            <button className="bg-[#26AB3B] text-white font-montserrat font-bold rounded h-8 hover:bg-green-600">
              Cadastrar
            </button>
          </form>
          <div className="flex gap-2">
            <p className="font-montserrat">Já possui cadastro? Realize </p>
            <p
              className=" text-[#26AB3B] font-montserrat font-bold cursor-pointer"
              onClick={() => {
                redirectTo("/");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
