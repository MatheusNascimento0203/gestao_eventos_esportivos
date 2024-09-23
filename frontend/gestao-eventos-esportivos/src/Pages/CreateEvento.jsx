import { useEffect, useState } from "react";
import Inputs from "../Components/Inputs";
import axios from "axios";
import { useLocation } from "react-router-dom";
import handleRedirect from "../hooks/handleRedirect";
import { toast } from "react-toastify";

export default () => {
  const [nomeEvento, setNomeEvento] = useState("");
  const [localEvento, setLocalEvento] = useState("");
  const [quantidadeEquipes, setQuantidadeEquipes] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");

  const token = localStorage.getItem("token");
  const { redirectTo } = handleRedirect();

  useEffect(() => {
    if (!token) {
      redirectTo("/");
    }
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("oi");

    const dataHora = `${dataInicio}T${horarioInicio}`;
    const quantidadeEquipesNum = Number(quantidadeEquipes);
    // console.log({
    //   nomeEvento,
    //   local: localEvento,
    //   quantidadeEquipes: q,
    //   tipoEvento,
    //   dataInicial: dataInicio,
    //   dataFinal: dataFim,
    //   horarioInicioEvento: dataHora,
    // }); // Log

    try {
      const response = await axios.post(
        "http://localhost:3000/cadastrarEvento",
        {
          nomeEvento,
          local: localEvento,
          quantidadeEquipes: quantidadeEquipesNum,
          tipoEvento,
          dataInicial: dataInicio,
          dataFinal: dataFim,
          horarioInicioEvento: dataHora,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cadastro realizado com sucesso!.", {
        position: "bottom-center",
        style: {
          border: "2px solid green",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-8 gap-4 rounded  w-[950px] h-[500px] ml-[200px] mt-[20px] shadow-sm shadow-green-950">
      <div className="flex justify-start">
        <p className="font-montserrat text-xl font-bold pr-[750px]">Cadastro</p>
      </div>
      <hr className="border-2 w-[840px] border-[#26AB3B]" />
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex gap-10 items-center">
          <Inputs
            id={nomeEvento}
            label={"Nome Evento"}
            value={nomeEvento}
            setValue={setNomeEvento}
            placeholder={"Nome Evento"}
            type={"text"}
            cssInput={
              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
          <Inputs
            id={localEvento}
            label={"Local Evento"}
            value={localEvento}
            setValue={setLocalEvento}
            placeholder={"Local do Evento"}
            type={"text"}
            cssInput={
              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
        </div>
        <div className="flex gap-10 items-center">
          <Inputs
            id={tipoEvento}
            label={"Tipo do Evento"}
            value={tipoEvento}
            setValue={setTipoEvento}
            placeholder={"Tipo do Evento"}
            type={"text"}
            cssInput={
              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
          <Inputs
            id={quantidadeEquipes}
            label={"Quantidade de Equipes"}
            value={quantidadeEquipes}
            setValue={setQuantidadeEquipes}
            placeholder={"Quantidade de Equipes"}
            type={"number"}
            cssInput={
              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
        </div>
        <div className="flex gap-10 items-center">
          <Inputs
            id={dataInicio}
            label={"Data Inicio"}
            value={dataInicio}
            setValue={setDataInicio}
            placeholder={"Data Inicio"}
            type={"date"}
            cssInput={
              "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
          <Inputs
            id={dataFim}
            label={"Data Encerramento"}
            value={dataFim}
            setValue={setDataFim}
            placeholder={"Data Encerramento"}
            type={"date"}
            cssInput={
              "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
          <Inputs
            id={horarioInicio}
            step={"1"}
            label={"Horário Inicio Evento"}
            value={horarioInicio}
            setValue={setHorarioInicio}
            placeholder={"Horário Inicio Evento"}
            type={"time"}
            cssInput={
              "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            }
          />
        </div>
        <div className="flex justify-end gap-4">
          <a
            className="bg-[#76787a] text-white font-montserrat font-bold rounded h-8 hover:bg-gray-900 w-[150px] flex flex-col items-center justify-center"
            href="/home/searchEvento"
          >
            Voltar
          </a>
          <button className="bg-[#26AB3B] text-white font-montserrat font-bold rounded h-8 hover:bg-green-600 w-[150px]">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
