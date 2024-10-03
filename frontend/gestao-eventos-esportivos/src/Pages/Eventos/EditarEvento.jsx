import { useEffect, useState } from "react";
import axios from "axios"; // Não se esqueça de importar o axios
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Inputs from "../../Components/Inputs";
import { toast } from "react-toastify";
import formatDateYDM from "../../hooks/formatDateYDM";

export default ({ open, setOpen, id }) => {
  const [evento, setEvento] = useState(null);
  const [nomeEvento, setNomeEvento] = useState("");
  const [localEvento, setLocalEvento] = useState("");
  const [quantidadeEquipes, setQuantidadeEquipes] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");

  // CHAMANDO API PARA PEGAR OS EVENTO
  const visualizarEvento = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/findEvento/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const eventoData = response.data;
      const formattedDataInicial = formatDateYDM(eventoData.dataInicial);
      const formattedDataFinal = formatDateYDM(eventoData.dataFinal);

      setEvento(eventoData);
      setNomeEvento(eventoData.nomeEvento);
      setLocalEvento(eventoData.local);
      setQuantidadeEquipes(eventoData.quantidadeEquipes);
      setTipoEvento(eventoData.tipoEvento);
      setDataInicio(formattedDataInicial);
      setDataFim(formattedDataFinal);
      setHorarioInicio(eventoData.horarioInicioEvento);
    } catch (error) {
      toast.error("Error ao cadastrar evento. Contate o administrador!", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
    }
  };

  // CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
  const handleSubmitEdit = async (ev) => {
    ev.preventDefault();

    const dataHora = `${dataInicio}T${horarioInicio}`;

    const quantidadeEquipesNum = Number(quantidadeEquipes);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    const dataFormatada = dataAtual.toISOString().split("T")[0];
    const token = window.localStorage.getItem("token");

    //VALIDANDO PREENCHIMENTO DOS CAMPOS.
    if (
      nomeEvento.trim() === "" ||
      localEvento.trim() === "" ||
      quantidadeEquipesNum === "" ||
      tipoEvento.trim() === "" ||
      dataInicio.trim() === "" ||
      dataFim.trim() === "" ||
      horarioInicio === ""
    ) {
      toast.error("Preencha todos os campos, por gentileza!", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    //VALIDANDO CAMPOS DE DATAS
    if (dataInicio < dataFormatada) {
      toast.error("Data inicio não pode ser menor que a data atual.", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    if (dataFim < dataInicio) {
      toast.error("Data fim não pode ser menor que a data inicio.", {
        position: "bottom-center",
        style: {
          border: "2px solid red",
        },
      });
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/updateEvento/${id}`,
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
      toast.success("Evento editado com sucesso!.", {
        position: "bottom-center",
        style: {
          border: "2px solid green",
        },
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      console.log(dataHora);
      toast.error("Erro ao atualizar o evento.");
    }
  };

  useEffect(() => {
    visualizarEvento(id);
  }, [id]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form onSubmit={handleSubmitEdit}>
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-[900px] h-[400px]"
            >
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 pb-10"
                  >
                    Editar Evento
                  </DialogTitle>
                  {evento ? (
                    <div>
                      {console.log(evento.formattedDate)}
                      <div className="flex flex-col gap-8">
                        <div className="flex gap-10 items-center">
                          <Inputs
                            id={evento.nomeEvento}
                            label={"Nome Evento"}
                            defaultValue={evento.nomeEvento}
                            setValue={setNomeEvento}
                            placeholder={"Nome Evento"}
                            type={"text"}
                            cssInput={
                              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            }
                          />
                          <Inputs
                            id={evento.local}
                            label={"Local Evento"}
                            defaultValue={evento.local}
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
                            id={evento.tipoEvento}
                            label={"Tipo do Evento"}
                            defaultValue={evento.tipoEvento}
                            setValue={setTipoEvento}
                            placeholder={"Tipo do Evento"}
                            type={"text"}
                            cssInput={
                              "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            }
                          />
                          <Inputs
                            id={evento.quantidadeEquipes}
                            label={"Quantidade de Equipes"}
                            defaultValue={evento.quantidadeEquipes}
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
                            defaultValue={dataInicio}
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
                            defaultValue={dataFim}
                            setValue={setDataFim}
                            placeholder={"Data Encerramento"}
                            type={"date"}
                            cssInput={
                              "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            }
                          />
                          <Inputs
                            id={evento.horarioInicioEvento}
                            step={"1"}
                            label={"Horário Inicio Evento"}
                            defaultValue={evento.horarioInicioEvento}
                            setValue={setHorarioInicio}
                            placeholder={"Horário Inicio Evento"}
                            type={"time"}
                            cssInput={
                              "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>CARREGANDO EVENTO</p>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  // onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
