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

export default ({ open, setOpen, id }) => {
  const [evento, setEvento] = useState(null);

  // CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
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
      eventoData.dataInicial = new Date(eventoData.dataInicial)
        .toISOString()
        .split("T")[0];
      eventoData.dataFinal = new Date(eventoData.dataFinal)
        .toISOString()
        .split("T")[0];

      setEvento(eventoData);
    } catch (error) {
      console.log(error);
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
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-[900px] h-[400px]"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-red-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                  Nome Evento
                </DialogTitle>
                {evento ? (
                  <div>
                    <div className="flex flex-col gap-8">
                      <div className="flex gap-10 items-center">
                        <Inputs
                          id={evento.nomeEvento}
                          label={"Nome Evento"}
                          value={evento.nomeEvento}
                          setValue={evento.nomeEvento}
                          placeholder={"Nome Evento"}
                          type={"text"}
                          cssInput={
                            "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                          }
                        />
                        <Inputs
                          id={evento.local}
                          label={"Local Evento"}
                          value={evento.local}
                          setValue={evento.local}
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
                          value={evento.tipoEvento}
                          setValue={evento.tipoEvento}
                          placeholder={"Tipo do Evento"}
                          type={"text"}
                          cssInput={
                            "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                          }
                        />
                        <Inputs
                          id={evento.quantidadeEquipes}
                          label={"Quantidade de Equipes"}
                          value={evento.quantidadeEquipes}
                          setValue={evento.quantidadeEquipes}
                          placeholder={"Quantidade de Equipes"}
                          type={"number"}
                          cssInput={
                            "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                          }
                        />
                      </div>
                      <div className="flex gap-10 items-center">
                        <Inputs
                          id={evento.dataInicial}
                          label={"Data Inicio"}
                          value={evento.dataInicial}
                          setValue={evento.dataInicial}
                          placeholder={"Data Inicio"}
                          type={"date"}
                          cssInput={
                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                          }
                        />
                        <Inputs
                          id={evento.dataFinal}
                          label={"Data Encerramento"}
                          value={evento.dataFinal}
                          setValue={evento.dataFinal}
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
                          value={evento.horarioInicioEvento}
                          setValue={evento.horarioInicioEvento}
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
