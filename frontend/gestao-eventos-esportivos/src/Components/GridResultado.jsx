import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../hooks/formatDate";
import getDataAtual from "../hooks/getDataAtual";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import visualizarEvento from "../Pages/Eventos/VisualizarEvento";
import VisualizarEvento from "../Pages/Eventos/VisualizarEvento";
import EditarEvento from "../Pages/Eventos/editarEvento";

export default () => {
  const [eventos, setEventos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEventoId, setSelectedEventoId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const dataAtual = getDataAtual();

  //CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const eventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/findEventos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    eventos();
  }, []);

  //EXCLUINDO EVENTO
  const deleteEvento = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/deletarProduto/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventos(
        eventos.filter((evento) => {
          if (evento.id !== id) {
            return evento;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle click para abrir o modal com o evento selecionado
  const handleOpenModal = (id, type) => {
    setSelectedEventoId(id);
    setModalType(type);
    setOpen(true);
  };

  return (
    <div className="px-48 pt-24">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Eventos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Segue abaixo a lista de todos os eventos cadastrados.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/home/createEvento"
            className="block rounded-md bg-[#26AB3B] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Adicionar Evento
          </a>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-[#26AB3B]">
                <tr>
                  <th
                    scope="col"
                    className="  py-3.5 pl-4 pr-3 text-left text-sm text-white font-montserrat font-bold sm:pl-4"
                  >
                    Nome Evento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Local Evento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Quantidade Equipes
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Data Inicio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Data Encerramento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold"
                  >
                    Ações
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {eventos.map((evento) => {
                  //VARIÁVEIS PARA VALIDAÇÃO
                  const dataInicialEventoFormatada = formatDate(
                    evento.dataInicial
                  );
                  const dataFinalEventoFormatada = formatDate(evento.dataFinal);
                  //COMPARAÇÃO DAS DATAS
                  const isNaoIniciado = dataAtual < dataInicialEventoFormatada;
                  const isEmAndamento =
                    dataAtual >= dataInicialEventoFormatada &&
                    dataAtual <= dataFinalEventoFormatada;
                  const isEncerrado = dataAtual > dataFinalEventoFormatada;
                  //DETERMINANDO TEXTO E A CLASSE A SER EXIBIDA
                  let statusTexto, statusClasse;
                  if (isNaoIniciado) {
                    statusTexto = "Não Iniciado";
                    statusClasse =
                      "inline-flex items-center rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
                  } else if (isEmAndamento) {
                    statusTexto = "Em Andamento";
                    statusClasse =
                      "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";
                  } else if (isEncerrado) {
                    statusTexto = "Encerrado";
                    statusClasse =
                      "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
                  }
                  //--//
                  return (
                    <tr key={evento.id}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {evento.nomeEvento}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{evento.local}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        {`${evento.quantidadeEquipes} - jogadores`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        {formatDate(evento.dataInicial)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                        {formatDate(evento.dataFinal)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className={statusClasse}>{statusTexto}</span>
                      </td>
                      <td className="flex gap-3 relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal(evento.id, "visualizar");
                          }}
                          className="text-[#26AB3B] hover:text-green-700"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal(evento.id, "editar");
                          }}
                          className="text-[#2193F3] hover:text-indigo-900"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            deleteEvento(evento.id);
                          }}
                          className="text-[#D40606] hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {open && modalType === "visualizar" && (
        <VisualizarEvento open={open} setOpen={setOpen} id={selectedEventoId} />
      )}
      {open && modalType === "editar" && (
        <EditarEvento open={open} setOpen={setOpen} id={selectedEventoId} />
      )}
    </div>
  );
};
