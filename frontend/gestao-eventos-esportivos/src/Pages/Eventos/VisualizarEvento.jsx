import { useState } from "react";
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

export default ({ open, setOpen }) => {
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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 h-[500px]"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md   bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Nome Evento
                </DialogTitle>
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
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
