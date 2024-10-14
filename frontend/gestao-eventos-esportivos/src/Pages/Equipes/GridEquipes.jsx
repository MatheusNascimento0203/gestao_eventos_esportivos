import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../../hooks/formatDate";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import VisualizarEquipe from "./visualizarEquipe";
import UpdateEquipe from "./UpdateEquipe";

export default () => {
    const [equipes, setEquipes] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEquipeId, setSelectedEquipeId] = useState(null);
    const [modalType, setModalType] = useState(null);

    //CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const equipes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/findEquipes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEquipes(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        equipes();
    }, [open]);

    //EXCLUINDO EVENTO
    const deleteEquipe = async (id) => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.delete(`http://localhost:3000/deletarEquipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEquipes(
                equipes.filter((equipe) => {
                    if (equipe.id !== id) {
                        return equipe;
                    }
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    // Handle click para abrir o modal com o evento selecionado
    const handleOpenModal = (id, type) => {
        setSelectedEquipeId(id);
        setModalType(type);
        setOpen(true);
    };

    return (
        <div className="px-48 pt-24">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 font-montserrat">Equipes</h1>
                    <p className="mt-2 text-sm text-gray-700 font-montserrat">
                        Segue abaixo a lista de todas as equipes cadastradas.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a
                        href="/home/createEquipe"
                        className="block rounded-md bg-[#26AB3B] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 font-montserrat">
                        Adicionar Equipe
                    </a>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        style={{ maxHeight: "300px", overflowY: "auto" }}>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-[#26AB3B]">
                                <tr>
                                    <th
                                        scope="col"
                                        className="  py-3.5 pl-4 pr-3 text-left text-sm text-white font-montserrat font-bold sm:pl-4">
                                        Nome Equipe
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Presidente
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Quantidade Atletas
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Contato
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Data Fundação
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Ações
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {equipes.map((equipe) => {
                                    return (
                                        <tr key={equipe.id}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="font-montserrat text-gray-900">
                                                            {equipe.nomeEquipe}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900 font-montserrat">
                                                    {equipe.nomePresidente}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {`${equipe.quantidadeAtletas} - atletas`}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {equipe.contato}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {formatDate(equipe.dataFundacao)}
                                            </td>
                                            <td className="flex gap-3 relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenModal(equipe.id, "visualizar");
                                                    }}
                                                    className="text-[#26AB3B] hover:text-green-700">
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenModal(equipe.id, "editar");
                                                    }}
                                                    className="text-[#2193F3] hover:text-indigo-900">
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteEquipe(equipe.id);
                                                    }}
                                                    className="text-[#D40606] hover:text-red-900">
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
                <VisualizarEquipe open={open} setOpen={setOpen} id={selectedEquipeId} />
            )}

            {open && modalType === "editar" && <UpdateEquipe open={open} setOpen={setOpen} id={selectedEquipeId} />}
        </div>
    );
};
