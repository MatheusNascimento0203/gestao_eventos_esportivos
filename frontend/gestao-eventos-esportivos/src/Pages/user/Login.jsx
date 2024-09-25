import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo-sistema.svg";
import logoSport from "../../assets/logo-sport-events.svg";
import iconLogin from "../../assets/team.png";
import Inputs from "../../Components/Inputs";
import { Helmet } from "react-helmet";
import handleRedirect from "../../hooks/handleRedirect";

export default () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { redirectTo } = handleRedirect();

  //FUNCÃO PARA HENDERIZAR A TELA DE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || !email) {
      toast.error("É necessário um e-mail válido!", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    if (senha.trim() === "" || !senha) {
      toast.error("É necessário um e-mail válido!", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/acess", {
        email,
        senha,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      redirectTo("/home");
      toast.success("Seja bem vindo!", {
        position: "bottom-center",
        style: {
          border: "2px solid green",
        },
      });
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("E-mail ou senha estão incorretos!", {
          position: "bottom-center",
          style: {
            border: "2px solid red",
          },
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <link rel="icon" href={iconLogin} />
        <title>Login</title>
      </Helmet>
      <div className="flex min-h-screen">
        <div className=" w-2/4 flex flex-col items-center justify-center gap-16">
          <div>
            <p className=" font-montserrat font-bold text-4xl">Entrar</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Inputs
              id={email}
              label={"E-mail"}
              placeholder={"E-mail"}
              value={email}
              setValue={setEmail}
              type={"text"}
              cssInput={
                "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
              }
            />
            <Inputs
              id={senha}
              label={"Senha"}
              placeholder={"Senha"}
              value={senha}
              setValue={setSenha}
              type={"password"}
              cssInput={
                "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
              }
            />
            <p className="cursor-pointer hover:text-blue-500 font-montserrat text-[14px]">
              Esqueceu sua senha?
            </p>
            <button className="bg-[#26AB3B] text-white font-montserrat font-bold rounded h-8 hover:bg-green-600">
              Acessar
            </button>
          </form>
          <div className="flex gap-2">
            <p className="font-montserrat">Ainda não possui acesso?</p>
            <p
              className=" text-[#26AB3B] font-montserrat font-bold cursor-pointer"
              onClick={() => {
                redirectTo("/cadastrarUsuario");
              }}
            >
              Registre-se
            </p>
          </div>
        </div>
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
      </div>
    </div>
  );
};
